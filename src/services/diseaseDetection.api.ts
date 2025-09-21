import { 
  DiseaseDetectionInput, 
  DiseaseDetectionResult, 
  DiseaseDetectionHistory,
  DiseaseDatabase 
} from '../types/diseaseDetection.types';
import { 
  generateMockDiseaseResult, 
  detectCropType,
  getLocationBasedRisks,
  mockDiseaseDatabase 
} from '../data/mockDiseaseResponse';

/**
 * Disease Detection API Service - Frontend-first implementation with mock data
 * All functions are structured as async API calls for easy backend replacement
 */

export class DiseaseDetectionAPIService {
  private static CACHE_KEY = 'km.diseaseDetection.cache';
  private static HISTORY_KEY = 'km.diseaseDetection.history';
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Analyze uploaded image for disease detection
   */
  static async analyzeImage(input: DiseaseDetectionInput): Promise<DiseaseDetectionResult> {
    // TODO: Replace with real backend API call
    // Example: const formData = new FormData(); formData.append('image', input.imageFile);
    // const response = await fetch('/api/disease-detection/analyze', { method: 'POST', body: formData });
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock crop type detection from image
      const detectedCropType = input.cropType || detectCropType(input.imageFile.name);
      
      // Generate mock disease analysis result
      const result = generateMockDiseaseResult(input.imageFile.name, detectedCropType);
      
      // Add location-based risk factors if location provided
      if (input.location) {
        const locationRisks = getLocationBasedRisks(input.location.name, 'current');
        result.followUpActions.push(...locationRisks);
      }
      
      // Cache the result
      this.cacheResult(result);
      
      // Save to history
      this.saveToHistory(result);
      
      return result;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image for disease detection');
    }
  }

  /**
   * Get disease detection history
   */
  static async getAnalysisHistory(): Promise<DiseaseDetectionHistory[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/disease-detection/history');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const history = localStorage.getItem(this.HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting analysis history:', error);
      return [];
    }
  }

  /**
   * Update treatment effectiveness feedback
   */
  static async updateTreatmentFeedback(
    analysisId: string, 
    treatmentApplied: string,
    effectiveness: number,
    notes?: string
  ): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/disease-detection/feedback', { method: 'POST', body: JSON.stringify({ analysisId, treatmentApplied, effectiveness, notes }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const history = await this.getAnalysisHistory();
      const updatedHistory = history.map(item => 
        item.id === analysisId 
          ? { ...item, treated: true, treatmentApplied, effectiveness, notes }
          : item
      );
      
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error updating treatment feedback:', error);
      throw new Error('Failed to update treatment feedback');
    }
  }

  /**
   * Get disease database for reference
   */
  static async getDiseaseDatabase(): Promise<DiseaseDatabase[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/disease-detection/database');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDiseaseDatabase;
    } catch (error) {
      console.error('Error getting disease database:', error);
      throw new Error('Failed to get disease database');
    }
  }

  /**
   * Search diseases by symptoms
   */
  static async searchDiseasesBySymptoms(symptoms: string[]): Promise<DiseaseDatabase[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/disease-detection/search', { method: 'POST', body: JSON.stringify({ symptoms }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allDiseases = mockDiseaseDatabase;
      const matchingDiseases = allDiseases.filter(disease => 
        symptoms.some(symptom => 
          disease.symptoms.some(diseaseSymptom => 
            diseaseSymptom.toLowerCase().includes(symptom.toLowerCase())
          )
        )
      );
      
      return matchingDiseases;
    } catch (error) {
      console.error('Error searching diseases by symptoms:', error);
      throw new Error('Failed to search diseases by symptoms');
    }
  }

  /**
   * Get seasonal disease risks for location
   */
  static async getSeasonalRisks(location: string, season: string): Promise<string[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/disease-detection/seasonal-risks?location=${location}&season=${season}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      return getLocationBasedRisks(location, season);
    } catch (error) {
      console.error('Error getting seasonal risks:', error);
      throw new Error('Failed to get seasonal risks');
    }
  }

  /**
   * Delete analysis from history
   */
  static async deleteAnalysis(analysisId: string): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch(`/api/disease-detection/analysis/${analysisId}`, { method: 'DELETE' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const history = await this.getAnalysisHistory();
      const updatedHistory = history.filter(item => item.id !== analysisId);
      
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error deleting analysis:', error);
      throw new Error('Failed to delete analysis');
    }
  }

  // Private helper methods

  private static cacheResult(result: DiseaseDetectionResult): void {
    try {
      const cacheData = {
        data: result,
        timestamp: Date.now()
      };
      localStorage.setItem(`${this.CACHE_KEY}_${result.id}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache result:', error);
    }
  }

  private static saveToHistory(result: DiseaseDetectionResult): void {
    try {
      const historyJson = localStorage.getItem(this.HISTORY_KEY);
      const history = historyJson ? JSON.parse(historyJson) : [];
      
      const historyItem: DiseaseDetectionHistory = {
        id: result.id,
        date: result.analysisDate,
        imageFileName: result.imageFileName,
        cropType: result.cropType,
        diseaseName: result.primaryDiagnosis.diseaseName,
        confidence: result.confidence,
        severity: result.primaryDiagnosis.severity,
        treated: false
      };
      
      const updatedHistory = [historyItem, ...history.slice(0, 49)]; // Keep last 50
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.warn('Failed to save to history:', error);
    }
  }

  private static getCachedResult(resultId: string): DiseaseDetectionResult | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${resultId}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < this.CACHE_DURATION) {
        return data;
      }
      
      // Clear expired cache
      localStorage.removeItem(`${this.CACHE_KEY}_${resultId}`);
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get cached result by ID
   */
  static async getCachedAnalysis(resultId: string): Promise<DiseaseDetectionResult | null> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/disease-detection/analysis/${resultId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.getCachedResult(resultId);
    } catch (error) {
      console.error('Error getting cached analysis:', error);
      return null;
    }
  }

  /**
   * Validate image file
   */
  static validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: 'Please upload a valid image file (JPEG, PNG, or WebP)' 
      };
    }
    
    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: 'Image file size must be less than 10MB' 
      };
    }
    
    return { valid: true };
  }
}