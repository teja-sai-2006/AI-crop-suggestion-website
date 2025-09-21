import { 
  CropRecommendationInput, 
  CropRecommendationResult, 
  CropSuggestion,
  RecommendationFilters,
  RecommendationHistory,
  CropDatabase 
} from '../types/cropRecommendation.types';
import { 
  mockCropDatabase, 
  mockRecommendationResult, 
  generateLocationBasedRecommendations 
} from '../data/mockCropRecommendations';

/**
 * Crop Recommendation API Service - Frontend-first implementation with mock data
 * All functions are structured as async API calls for easy backend replacement
 */

export class CropRecommendationAPIService {
  private static CACHE_KEY = 'km.cropRecommendation.cache';
  private static HISTORY_KEY = 'km.cropRecommendation.history';
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Get crop recommendations based on soil and climate parameters
   */
  static async getCropRecommendations(input: CropRecommendationInput): Promise<CropRecommendationResult> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/crop-recommendations', { method: 'POST', body: JSON.stringify(input) });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check cache first
      const cached = this.getCachedRecommendation(input);
      if (cached) {
        return cached;
      }

      // Generate location-based recommendations
      const recommendations = generateLocationBasedRecommendations(input.soil, input.climate);
      
      // Create comprehensive result
      const result: CropRecommendationResult = {
        id: `rec_${Date.now()}`,
        inputParameters: input,
        recommendations,
        analysisDate: new Date().toISOString(),
        confidence: this.calculateOverallConfidence(recommendations),
        factors: this.analyzeSuitabilityFactors(input),
        warnings: this.generateWarnings(input),
        tips: this.generateTips(input),
        nextSteps: this.generateNextSteps(recommendations[0])
      };

      // Cache the result
      this.cacheRecommendation(input, result);
      
      // Save to history
      this.saveToHistory(result);
      
      return result;
    } catch (error) {
      console.error('Error getting crop recommendations:', error);
      throw new Error('Failed to get crop recommendations');
    }
  }

  /**
   * Get filtered crop recommendations
   */
  static async getFilteredRecommendations(
    input: CropRecommendationInput, 
    filters: RecommendationFilters
  ): Promise<CropSuggestion[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-recommendations/filtered?${new URLSearchParams(filters)}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const allRecommendations = await this.getCropRecommendations(input);
      let filtered = allRecommendations.recommendations;

      // Apply filters
      if (filters.season) {
        filtered = filtered.filter(crop => crop.season.toLowerCase() === filters.season?.toLowerCase());
      }
      
      if (filters.minConfidence) {
        filtered = filtered.filter(crop => crop.confidence >= filters.minConfidence!);
      }
      
      if (filters.maxGrowthDuration) {
        filtered = filtered.filter(crop => crop.growthDuration.max <= filters.maxGrowthDuration!);
      }
      
      if (filters.minROI) {
        filtered = filtered.filter(crop => crop.profitability.roi >= filters.minROI!);
      }

      return filtered;
    } catch (error) {
      console.error('Error getting filtered recommendations:', error);
      throw new Error('Failed to get filtered recommendations');
    }
  }

  /**
   * Get crop database for reference
   */
  static async getCropDatabase(): Promise<CropDatabase[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/crops/database');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCropDatabase;
    } catch (error) {
      console.error('Error getting crop database:', error);
      throw new Error('Failed to get crop database');
    }
  }

  /**
   * Get recommendation history
   */
  static async getRecommendationHistory(): Promise<RecommendationHistory[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/crop-recommendations/history');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const history = localStorage.getItem(this.HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting recommendation history:', error);
      return [];
    }
  }

  /**
   * Save user feedback on recommendation
   */
  static async saveFeedback(
    recommendationId: string, 
    selectedCrop: string, 
    satisfaction: number
  ): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/crop-recommendations/feedback', { method: 'POST', body: JSON.stringify({ recommendationId, selectedCrop, satisfaction }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update history with feedback
      const history = await this.getRecommendationHistory();
      const updatedHistory = history.map(item => 
        item.id === recommendationId 
          ? { ...item, selectedCrop, satisfaction }
          : item
      );
      
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw new Error('Failed to save feedback');
    }
  }

  /**
   * Get crop market prices
   */
  static async getCropMarketPrices(cropNames: string[]): Promise<Record<string, any>> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/market-prices', { method: 'POST', body: JSON.stringify({ crops: cropNames }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock market prices
      const prices: Record<string, any> = {};
      cropNames.forEach(crop => {
        prices[crop] = {
          current: Math.round(2000 + Math.random() * 3000),
          trend: Math.random() > 0.5 ? 'up' : 'down',
          change: Math.round((Math.random() - 0.5) * 200),
          lastUpdated: new Date().toISOString()
        };
      });
      
      return prices;
    } catch (error) {
      console.error('Error getting market prices:', error);
      throw new Error('Failed to get market prices');
    }
  }

  // Private helper methods

  private static calculateOverallConfidence(recommendations: CropSuggestion[]): number {
    if (recommendations.length === 0) return 0;
    const avgConfidence = recommendations.reduce((sum, crop) => sum + crop.confidence, 0) / recommendations.length;
    return Math.round(avgConfidence);
  }

  private static analyzeSuitabilityFactors(input: CropRecommendationInput): any {
    // Simplified factor analysis
    const soilScore = this.calculateSoilScore(input.soil);
    const climateScore = this.calculateClimateScore(input.climate);
    const marketScore = 75 + Math.random() * 20; // Mock market score
    const experienceScore = this.getExperienceScore(input.experience);

    return {
      soil: Math.round(soilScore),
      climate: Math.round(climateScore),
      market: Math.round(marketScore),
      experience: Math.round(experienceScore)
    };
  }

  private static calculateSoilScore(soil: any): number {
    // Simplified soil scoring
    let score = 50;
    
    // pH scoring
    if (soil.ph >= 6.0 && soil.ph <= 7.5) score += 20;
    else score += Math.max(0, 20 - Math.abs(soil.ph - 6.75) * 10);
    
    // NPK scoring  
    const avgNPK = (soil.nitrogen + soil.phosphorus + soil.potassium) / 3;
    if (avgNPK >= 40 && avgNPK <= 100) score += 30;
    else score += Math.max(0, 30 - Math.abs(avgNPK - 70) * 0.5);
    
    return Math.min(100, score);
  }

  private static calculateClimateScore(climate: any): number {
    // Simplified climate scoring
    let score = 50;
    
    // Temperature scoring (assuming moderate temps are good)
    if (climate.temperature >= 20 && climate.temperature <= 30) score += 25;
    else score += Math.max(0, 25 - Math.abs(climate.temperature - 25) * 2);
    
    // Rainfall scoring
    if (climate.rainfall >= 400 && climate.rainfall <= 1200) score += 25;
    else score += Math.max(0, 25 - Math.abs(climate.rainfall - 800) * 0.02);
    
    return Math.min(100, score);
  }

  private static getExperienceScore(experience?: string): number {
    const scores = { beginner: 60, intermediate: 80, expert: 95 };
    return scores[experience as keyof typeof scores] || 70;
  }

  private static generateWarnings(input: CropRecommendationInput): string[] {
    const warnings = [];
    
    if (input.soil.ph < 5.5) {
      warnings.push('Soil pH is acidic. Consider lime application to improve pH levels.');
    } else if (input.soil.ph > 8.0) {
      warnings.push('Soil pH is alkaline. Consider sulfur application to reduce pH levels.');
    }
    
    if (input.soil.nitrogen > 100) {
      warnings.push('High nitrogen levels detected. Reduce fertilizer application to prevent nutrient burn.');
    }
    
    if (input.climate.rainfall < 300) {
      warnings.push('Low rainfall area. Ensure adequate irrigation infrastructure.');
    } else if (input.climate.rainfall > 2000) {
      warnings.push('High rainfall area. Ensure proper drainage to prevent waterlogging.');
    }
    
    if (input.climate.temperature > 35) {
      warnings.push('High temperature region. Consider heat-tolerant varieties and shade protection.');
    }

    return warnings.length > 0 ? warnings : ['No significant warnings for your soil and climate conditions.'];
  }

  private static generateTips(input: CropRecommendationInput): string[] {
    const tips = [
      'Conduct soil test every 2-3 years to monitor nutrient levels',
      'Implement crop rotation to maintain soil health and prevent pest buildup',
      'Use organic matter like compost to improve soil structure and water retention'
    ];
    
    if (input.experience === 'beginner') {
      tips.push('Start with easy-to-grow crops to gain experience');
      tips.push('Join local farmer groups for knowledge sharing');
    }
    
    if (input.climate.rainfall < 600) {
      tips.push('Install drip irrigation system for water efficiency');
    }
    
    return tips;
  }

  private static generateNextSteps(topRecommendation?: CropSuggestion): string[] {
    const steps = [
      'Prepare field by clearing weeds and deep plowing',
      'Test soil moisture levels before sowing',
      'Arrange quality seeds from certified dealers',
      'Plan irrigation schedule based on crop water requirements'
    ];
    
    if (topRecommendation) {
      steps.push(`Order ${topRecommendation.variety} seeds for ${topRecommendation.season} season`);
      steps.push(`Plan harvesting for ${topRecommendation.growthDuration.max} days after sowing`);
    }
    
    return steps;
  }

  private static getCachedRecommendation(input: CropRecommendationInput): CropRecommendationResult | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${this.hashInput(input)}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < this.CACHE_DURATION) {
        return data;
      }
      
      // Clear expired cache
      localStorage.removeItem(`${this.CACHE_KEY}_${this.hashInput(input)}`);
      return null;
    } catch {
      return null;
    }
  }

  private static cacheRecommendation(input: CropRecommendationInput, result: CropRecommendationResult): void {
    try {
      const cacheData = {
        data: result,
        timestamp: Date.now()
      };
      localStorage.setItem(`${this.CACHE_KEY}_${this.hashInput(input)}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache recommendation:', error);
    }
  }

  private static saveToHistory(result: CropRecommendationResult): void {
    try {
      const historyJson = localStorage.getItem(this.HISTORY_KEY);
      const history = historyJson ? JSON.parse(historyJson) : [];
      const historyItem: RecommendationHistory = {
        id: result.id,
        date: result.analysisDate,
        location: result.inputParameters.climate.location?.name || 'Unknown Location',
        parameters: result.inputParameters
      };
      
      const updatedHistory = [historyItem, ...history.slice(0, 9)]; // Keep last 10
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.warn('Failed to save to history:', error);
    }
  }

  private static hashInput(input: CropRecommendationInput): string {
    // Simple hash function for caching
    const str = JSON.stringify(input);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }
}