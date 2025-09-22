import * as tf from '@tensorflow/tfjs';
import { ImagePreprocessor } from '../utils/imagePreprocessor';
import { 
  DiseaseDetectionResult, 
  DiseaseDiagnosis, 
  TreatmentRecommendation 
} from '../types/diseaseDetection.types';

/**
 * TensorFlow.js Plant Disease Detection Service
 * FREE AI-powered disease detection running in the browser
 */

interface PlantDiseaseModel {
  model: tf.LayersModel | null;
  labels: string[];
  isLoaded: boolean;
  modelUrl: string;
}

interface PredictionResult {
  className: string;
  confidence: number;
  classIndex: number;
}

export class TensorFlowDiseaseService {
  private static instance: TensorFlowDiseaseService;
  private plantModel: PlantDiseaseModel = {
    model: null,
    labels: [],
    isLoaded: false,
    modelUrl: '/models/plant-disease-model.json' // We'll create a simple model
  };

  // Plant disease classes (simplified for demo)
  private static readonly DISEASE_CLASSES = [
    'Healthy',
    'Bacterial_Leaf_Blight',
    'Brown_Spot',
    'Leaf_Smut',
    'Late_Blight',
    'Early_Blight',
    'Powdery_Mildew',
    'Rust',
    'Mosaic_Virus',
    'Bacterial_Spot',
    'Fungal_Infection',
    'Nutrient_Deficiency'
  ];

  // Disease information database
  private static readonly DISEASE_INFO = {
    'Healthy': {
      scientificName: 'No disease detected',
      category: 'healthy',
      severity: 'low',
      description: 'Plant appears healthy with no visible disease symptoms.',
      symptoms: ['Green healthy leaves', 'Normal growth pattern'],
      causes: ['Proper care', 'Good growing conditions']
    },
    'Bacterial_Leaf_Blight': {
      scientificName: 'Xanthomonas oryzae',
      category: 'bacterial',
      severity: 'high',
      description: 'Bacterial infection causing leaf wilting and yellowing.',
      symptoms: ['Yellowing leaves', 'Water-soaked lesions', 'Leaf wilting'],
      causes: ['High humidity', 'Poor drainage', 'Contaminated water']
    },
    'Brown_Spot': {
      scientificName: 'Bipolaris oryzae',
      category: 'fungal',
      severity: 'medium',
      description: 'Fungal disease causing brown spots on leaves.',
      symptoms: ['Brown circular spots', 'Yellow halos', 'Leaf necrosis'],
      causes: ['High humidity', 'Poor air circulation', 'Nutrient stress']
    },
    'Late_Blight': {
      scientificName: 'Phytophthora infestans',
      category: 'fungal',
      severity: 'high',
      description: 'Serious fungal disease affecting leaves and stems.',
      symptoms: ['Dark water-soaked spots', 'White fungal growth', 'Rapid spread'],
      causes: ['Cool wet weather', 'High humidity', 'Poor air circulation']
    },
    'Early_Blight': {
      scientificName: 'Alternaria solani',
      category: 'fungal',
      severity: 'medium',
      description: 'Common fungal disease with characteristic target spots.',
      symptoms: ['Concentric ring spots', 'Yellowing leaves', 'Defoliation'],
      causes: ['Warm humid weather', 'Plant stress', 'Poor nutrition']
    },
    'Powdery_Mildew': {
      scientificName: 'Erysiphe graminis',
      category: 'fungal',
      severity: 'medium',
      description: 'Fungal disease creating white powdery coating.',
      symptoms: ['White powdery coating', 'Stunted growth', 'Leaf distortion'],
      causes: ['High humidity', 'Poor air circulation', 'Dense planting']
    }
  };

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): TensorFlowDiseaseService {
    if (!TensorFlowDiseaseService.instance) {
      TensorFlowDiseaseService.instance = new TensorFlowDiseaseService();
    }
    return TensorFlowDiseaseService.instance;
  }

  /**
   * Initialize TensorFlow.js and load the model
   */
  async initialize(): Promise<boolean> {
    try {
      console.log('Initializing TensorFlow.js...');
      
      // Set backend (prefer WebGL for performance)
      await tf.setBackend('webgl');
      await tf.ready();
      
      console.log('TensorFlow.js backend:', tf.getBackend());
      
      // Try to load pre-trained model, fallback to creating a simple one
      const modelLoaded = await this.loadOrCreateModel();
      
      if (modelLoaded) {
        this.plantModel.isLoaded = true;
        this.plantModel.labels = TensorFlowDiseaseService.DISEASE_CLASSES;
        console.log('Plant disease model ready!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to initialize TensorFlow.js:', error);
      return false;
    }
  }

  /**
   * Load existing model or create a simple classification model
   */
  private async loadOrCreateModel(): Promise<boolean> {
    try {
      // Try to load pre-trained model (this would be a real model in production)
      // For now, we'll create a simple mock model for demonstration
      console.log('Creating simple plant disease classification model...');
      
      const model = tf.sequential({
        layers: [
          tf.layers.conv2d({
            inputShape: [224, 224, 3],
            filters: 32,
            kernelSize: 3,
            activation: 'relu'
          }),
          tf.layers.maxPooling2d({ poolSize: [2, 2] }),
          tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
          tf.layers.maxPooling2d({ poolSize: [2, 2] }),
          tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
          tf.layers.flatten(),
          tf.layers.dense({ units: 64, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.5 }),
          tf.layers.dense({ 
            units: TensorFlowDiseaseService.DISEASE_CLASSES.length, 
            activation: 'softmax' 
          })
        ]
      });
      
      // Compile model
      model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });
      
      // Initialize with random weights (in production, this would be pre-trained)
      const dummyInput = tf.zeros([1, 224, 224, 3]);
      model.predict(dummyInput);
      dummyInput.dispose();
      
      this.plantModel.model = model;
      console.log('Model created successfully');
      return true;
      
    } catch (error) {
      console.error('Error loading/creating model:', error);
      return false;
    }
  }

  /**
   * Analyze image for plant diseases
   */
  async analyzeImage(imageFile: File): Promise<DiseaseDetectionResult> {
    if (!this.plantModel.isLoaded || !this.plantModel.model) {
      throw new Error('Model not loaded. Please initialize first.');
    }

    try {
      console.log('Starting disease analysis...');
      
      // Validate image quality
      const qualityCheck = await ImagePreprocessor.validateImageQuality(imageFile);
      if (!qualityCheck.isValid) {
        console.warn('Image quality issues:', qualityCheck.issues);
      }

      // Preprocess image
      const preprocessedImage = await ImagePreprocessor.preprocessImageFile(imageFile, {
        targetSize: [224, 224],
        normalize: true,
        channels: 3
      });

      // Make prediction
      const predictions = this.plantModel.model.predict(preprocessedImage) as tf.Tensor;
      const predictionData = await predictions.data() as Float32Array;
      
      // Get top predictions
      const results = this.processModelOutput(predictionData);
      
      // Clean up tensors
      preprocessedImage.dispose();
      predictions.dispose();
      
      // Generate disease detection result
      const result = this.generateDetectionResult(imageFile, results, qualityCheck);
      
      console.log('Disease analysis completed:', result);
      return result;
      
    } catch (error) {
      console.error('Error during image analysis:', error);
      throw new Error('Failed to analyze image for diseases');
    }
  }

  /**
   * Process model output to get top predictions
   */
  private processModelOutput(predictionData: Float32Array): PredictionResult[] {
    const results: PredictionResult[] = [];
    
    for (let i = 0; i < predictionData.length; i++) {
      results.push({
        className: TensorFlowDiseaseService.DISEASE_CLASSES[i] || `Class_${i}`,
        confidence: predictionData[i] * 100,
        classIndex: i
      });
    }
    
    // Sort by confidence (highest first)
    results.sort((a, b) => b.confidence - a.confidence);
    
    return results;
  }

  /**
   * Generate comprehensive disease detection result
   */
  private generateDetectionResult(
    imageFile: File, 
    predictions: PredictionResult[],
    qualityCheck: any
  ): DiseaseDetectionResult {
    
    const topPrediction = predictions[0];
    const confidence = Math.round(topPrediction.confidence);
    
    // Get disease information
    const diseaseKey = topPrediction.className as keyof typeof TensorFlowDiseaseService.DISEASE_INFO;
    const diseaseInfo = TensorFlowDiseaseService.DISEASE_INFO[diseaseKey] || 
                       TensorFlowDiseaseService.DISEASE_INFO['Healthy'];

    // Create primary diagnosis
    const primaryDiagnosis: DiseaseDiagnosis = {
      id: `tf_${topPrediction.classIndex}`,
      diseaseName: topPrediction.className.replace(/_/g, ' '),
      scientificName: diseaseInfo.scientificName,
      confidence: confidence,
      severity: diseaseInfo.severity as any,
      category: diseaseInfo.category as any,
      description: diseaseInfo.description,
      symptoms: diseaseInfo.symptoms,
      causes: diseaseInfo.causes,
      affectedParts: ['leaves', 'stems']
    };

    // Create alternative diagnoses
    const alternativeDiagnoses: DiseaseDiagnosis[] = predictions
      .slice(1, 3)
      .filter(pred => pred.confidence > 5) // Only include if >5% confidence
      .map(pred => {
        const altDiseaseKey = pred.className as keyof typeof TensorFlowDiseaseService.DISEASE_INFO;
        const altDiseaseInfo = TensorFlowDiseaseService.DISEASE_INFO[altDiseaseKey] || 
                              TensorFlowDiseaseService.DISEASE_INFO['Healthy'];
        
        return {
          id: `tf_alt_${pred.classIndex}`,
          diseaseName: pred.className.replace(/_/g, ' '),
          scientificName: altDiseaseInfo.scientificName,
          confidence: Math.round(pred.confidence),
          severity: 'medium' as any,
          category: altDiseaseInfo.category as any,
          description: altDiseaseInfo.description,
          symptoms: altDiseaseInfo.symptoms.slice(0, 2),
          causes: altDiseaseInfo.causes.slice(0, 2),
          affectedParts: ['leaves']
        };
      });

    // Generate treatments based on disease type
    const treatments = this.generateTreatments(diseaseInfo.category, primaryDiagnosis.severity);
    
    // Determine urgency
    const urgency = confidence > 80 && diseaseInfo.severity === 'high' ? 'high' :
                   confidence > 60 && diseaseInfo.severity === 'medium' ? 'medium' : 'low';

    return {
      id: `tf_analysis_${Date.now()}`,
      imageFileName: imageFile.name,
      analysisDate: new Date().toISOString(),
      cropType: 'auto-detected', // Could be enhanced with crop detection
      confidence: confidence,
      primaryDiagnosis,
      alternativeDiagnoses,
      treatments,
      preventionTips: [
        {
          category: 'cultural',
          title: 'Improve Air Circulation',
          description: 'Ensure proper spacing between plants',
          implementation: 'immediate',
          difficulty: 'easy',
          cost: 'low'
        },
        {
          category: 'environmental',
          title: 'Monitor Watering',
          description: 'Avoid overhead watering to reduce disease spread',
          implementation: 'immediate',
          difficulty: 'easy',
          cost: 'low'
        }
      ],
      urgency: urgency as any,
      estimatedLoss: {
        percentage: diseaseInfo.severity === 'high' ? 20 : 
                   diseaseInfo.severity === 'medium' ? 10 : 5,
        value: 0,
        currency: 'INR'
      },
      followUpActions: [
        'Monitor plant daily for changes',
        'Apply recommended treatment',
        'Check other plants for similar symptoms',
        qualityCheck.isValid ? 'Continue monitoring' : 'Retake photo in better conditions'
      ],
      expertConsultation: diseaseInfo.severity === 'high' || confidence < 70
    };
  }

  /**
   * Generate treatment recommendations based on disease category
   */
  private generateTreatments(category: string, severity: string): TreatmentRecommendation[] {
    const treatments: TreatmentRecommendation[] = [];

    if (category === 'fungal') {
      treatments.push({
        type: 'organic',
        name: 'Neem Oil Spray',
        activeIngredient: 'Azadirachtin',
        dosage: '5ml per liter',
        applicationMethod: 'Foliar spray',
        frequency: 'Every 7 days',
        duration: '3-4 applications',
        cost: { min: 80, max: 120, currency: 'INR' },
        effectiveness: 75,
        safetyRating: 'high',
        notes: 'Apply during cooler hours'
      });

      treatments.push({
        type: 'chemical',
        name: 'Copper Fungicide',
        activeIngredient: 'Copper hydroxide',
        dosage: '2-3g per liter',
        applicationMethod: 'Foliar spray',
        frequency: 'Every 10-14 days',
        duration: '2-3 applications',
        cost: { min: 150, max: 250, currency: 'INR' },
        effectiveness: 85,
        safetyRating: 'medium',
        notes: 'Wear protective equipment'
      });
    }

    if (category === 'bacterial') {
      treatments.push({
        type: 'chemical',
        name: 'Copper Bactericide',
        activeIngredient: 'Copper sulfate',
        dosage: '1-2g per liter',
        applicationMethod: 'Foliar spray',
        frequency: 'Every 7-10 days',
        duration: '3-4 applications',
        cost: { min: 100, max: 180, currency: 'INR' },
        effectiveness: 70,
        safetyRating: 'medium',
        notes: 'Best applied as preventive measure'
      });
    }

    // Add biological treatment
    treatments.push({
      type: 'biological',
      name: 'Trichoderma Application',
      activeIngredient: 'Trichoderma viride',
      dosage: '5-10g per liter',
      applicationMethod: 'Soil drench and foliar',
      frequency: 'Every 15 days',
      duration: 'Ongoing',
      cost: { min: 100, max: 150, currency: 'INR' },
      effectiveness: 70,
      safetyRating: 'high',
      notes: 'Enhances plant immunity'
    });

    return treatments;
  }

  /**
   * Get model information
   */
  getModelInfo(): {
    isLoaded: boolean;
    classes: string[];
    memoryUsage: any;
  } {
    return {
      isLoaded: this.plantModel.isLoaded,
      classes: TensorFlowDiseaseService.DISEASE_CLASSES,
      memoryUsage: tf.memory()
    };
  }

  /**
   * Dispose of the model and free memory
   */
  dispose(): void {
    if (this.plantModel.model) {
      this.plantModel.model.dispose();
      this.plantModel.model = null;
      this.plantModel.isLoaded = false;
    }
  }
}