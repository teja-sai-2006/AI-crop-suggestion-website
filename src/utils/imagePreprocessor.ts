import * as tf from '@tensorflow/tfjs';

/**
 * Image preprocessing utilities for plant disease detection
 * Handles image resizing, normalization, and tensor conversion
 */

export interface ImagePreprocessingConfig {
  targetSize: [number, number]; // [width, height]
  normalize: boolean;
  channels: number; // 3 for RGB, 1 for grayscale
}

export class ImagePreprocessor {
  private static readonly DEFAULT_CONFIG: ImagePreprocessingConfig = {
    targetSize: [224, 224], // Standard size for most plant disease models
    normalize: true,
    channels: 3
  };

  /**
   * Preprocess image file for TensorFlow.js model prediction
   */
  static async preprocessImageFile(
    imageFile: File, 
    config: Partial<ImagePreprocessingConfig> = {}
  ): Promise<tf.Tensor> {
    const fullConfig = { ...this.DEFAULT_CONFIG, ...config };
    
    try {
      // Create image element
      const imageElement = await this.createImageElement(imageFile);
      
      // Convert to tensor
      const tensor = await this.imageToTensor(imageElement, fullConfig);
      
      return tensor;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw new Error('Failed to preprocess image for AI analysis');
    }
  }

  /**
   * Create HTML image element from file
   */
  private static createImageElement(imageFile: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      
      // Create object URL and set as source
      const objectUrl = URL.createObjectURL(imageFile);
      img.src = objectUrl;
      
      // Clean up object URL after image loads
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(img);
      };
    });
  }

  /**
   * Convert image element to TensorFlow tensor
   */
  private static async imageToTensor(
    imageElement: HTMLImageElement,
    config: ImagePreprocessingConfig
  ): Promise<tf.Tensor> {
    return tf.tidy(() => {
      // Convert image to tensor
      let tensor = tf.browser.fromPixels(imageElement, config.channels);
      
      // Resize to target dimensions
      tensor = tf.image.resizeBilinear(
        tensor, 
        config.targetSize
      );
      
      // Normalize pixel values to [0,1] if required
      if (config.normalize) {
        tensor = tensor.div(255.0);
      }
      
      // Add batch dimension [1, height, width, channels]
      tensor = tensor.expandDims(0);
      
      return tensor;
    });
  }

  /**
   * Preprocess multiple images at once
   */
  static async preprocessBatch(
    imageFiles: File[],
    config: Partial<ImagePreprocessingConfig> = {}
  ): Promise<tf.Tensor> {
    const tensors = await Promise.all(
      imageFiles.map(file => this.preprocessImageFile(file, config))
    );
    
    // Concatenate all tensors into a batch
    const batchTensor = tf.concat(tensors, 0);
    
    // Clean up individual tensors
    tensors.forEach(tensor => tensor.dispose());
    
    return batchTensor;
  }

  /**
   * Extract image features for analysis
   */
  static extractImageFeatures(imageElement: HTMLImageElement): {
    brightness: number;
    contrast: number;
    hasGreenPixels: boolean;
    dominantColors: string[];
  } {
    // Create canvas for pixel analysis
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    let totalBrightness = 0;
    let greenPixelCount = 0;
    const colorCounts: { [key: string]: number } = {};
    
    // Analyze pixels
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      totalBrightness += brightness;
      
      // Check for green pixels (vegetation)
      if (g > r && g > b && g > 80) {
        greenPixelCount++;
      }
      
      // Track dominant colors (simplified)
      const colorKey = `${Math.floor(r/32)*32},${Math.floor(g/32)*32},${Math.floor(b/32)*32}`;
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }
    
    const totalPixels = pixels.length / 4;
    const avgBrightness = totalBrightness / totalPixels;
    const hasGreenPixels = (greenPixelCount / totalPixels) > 0.1; // 10% threshold
    
    // Get top 3 dominant colors
    const dominantColors = Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([color]) => `rgb(${color})`);
    
    // Calculate contrast (simplified)
    const contrast = this.calculateContrast(pixels);
    
    return {
      brightness: avgBrightness,
      contrast,
      hasGreenPixels,
      dominantColors
    };
  }

  /**
   * Calculate image contrast
   */
  private static calculateContrast(pixels: Uint8ClampedArray): number {
    const grayscaleValues: number[] = [];
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const gray = (r + g + b) / 3;
      grayscaleValues.push(gray);
    }
    
    const mean = grayscaleValues.reduce((sum, val) => sum + val, 0) / grayscaleValues.length;
    const variance = grayscaleValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / grayscaleValues.length;
    
    return Math.sqrt(variance);
  }

  /**
   * Validate image quality for disease detection
   */
  static validateImageQuality(imageFile: File): Promise<{
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  }> {
    return new Promise(async (resolve) => {
      const issues: string[] = [];
      const suggestions: string[] = [];
      
      try {
        // Check file size
        if (imageFile.size > 10 * 1024 * 1024) { // 10MB
          issues.push('Image file is too large');
          suggestions.push('Compress image to under 10MB');
        }
        
        if (imageFile.size < 50 * 1024) { // 50KB
          issues.push('Image file is too small');
          suggestions.push('Use higher resolution image');
        }
        
        // Check image dimensions and features
        const imageElement = await this.createImageElement(imageFile);
        const features = this.extractImageFeatures(imageElement);
        
        // Check for vegetation
        if (!features.hasGreenPixels) {
          issues.push('No vegetation detected in image');
          suggestions.push('Ensure the image contains plant material');
        }
        
        // Check brightness
        if (features.brightness < 50) {
          issues.push('Image is too dark');
          suggestions.push('Take photo in better lighting');
        }
        
        if (features.brightness > 200) {
          issues.push('Image is too bright/overexposed');
          suggestions.push('Reduce exposure or avoid direct sunlight');
        }
        
        // Check contrast
        if (features.contrast < 20) {
          issues.push('Image has low contrast');
          suggestions.push('Ensure clear focus and good lighting');
        }
        
        // Check dimensions
        if (imageElement.width < 200 || imageElement.height < 200) {
          issues.push('Image resolution is too low');
          suggestions.push('Use higher resolution camera');
        }
        
        resolve({
          isValid: issues.length === 0,
          issues,
          suggestions
        });
        
      } catch (error) {
        resolve({
          isValid: false,
          issues: ['Failed to analyze image quality'],
          suggestions: ['Try uploading a different image']
        });
      }
    });
  }

  /**
   * Clean up tensor memory
   */
  static disposeTensor(tensor: tf.Tensor): void {
    if (tensor && !tensor.isDisposed) {
      tensor.dispose();
    }
  }

  /**
   * Get memory usage information
   */
  static getMemoryInfo(): {
    numTensors: number;
    numDataBuffers: number;
    numBytes: number;
  } {
    return tf.memory();
  }
}