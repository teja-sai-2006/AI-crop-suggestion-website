/**
 * Crop Recommendation Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface SoilParameters {
  nitrogen: number;    // N content in kg/ha
  phosphorus: number;  // P content in kg/ha  
  potassium: number;   // K content in kg/ha
  ph: number;         // pH level (0-14)
}

export interface ClimateParameters {
  temperature: number;     // Average temperature in °C
  humidity: number;        // Humidity percentage
  rainfall: number;        // Annual rainfall in mm
  location?: {
    lat: number;
    lon: number;
    name: string;
  };
}

export interface CropRecommendationInput {
  soil: SoilParameters;
  climate: ClimateParameters;
  farmSize?: number;       // Farm size in acres
  previousCrop?: string;   // Previous crop grown
  budget?: number;         // Available budget
  experience?: 'beginner' | 'intermediate' | 'expert';
}

export interface CropSuggestion {
  id: string;
  name: string;
  variety: string;
  confidence: number;      // Confidence score 0-100
  suitability: 'excellent' | 'good' | 'fair' | 'poor';
  expectedYield: {
    value: number;
    unit: string;         // e.g., "quintals/hectare"
  };
  growthDuration: {
    min: number;
    max: number;
    unit: string;         // e.g., "days"
  };
  season: string;         // e.g., "Rabi", "Kharif", "Zaid"
  marketPrice: {
    min: number;
    max: number;
    currency: string;
  };
  profitability: {
    roi: number;          // Return on Investment percentage
    profit: number;       // Expected profit per acre
  };
}

export interface CropRequirements {
  soilType: string[];
  optimalPH: {
    min: number;
    max: number;
  };
  temperature: {
    min: number;
    max: number;
  };
  rainfall: {
    min: number;
    max: number;
  };
  nutrients: {
    nitrogen: 'low' | 'medium' | 'high';
    phosphorus: 'low' | 'medium' | 'high';
    potassium: 'low' | 'medium' | 'high';
  };
}

export interface CropRecommendationResult {
  id: string;
  inputParameters: CropRecommendationInput;
  recommendations: CropSuggestion[];
  analysisDate: string;
  confidence: number;      // Overall analysis confidence
  factors: {
    soil: number;         // Soil suitability score 0-100
    climate: number;      // Climate suitability score 0-100
    market: number;       // Market potential score 0-100
    experience: number;   // Experience compatibility score 0-100
  };
  warnings: string[];
  tips: string[];
  nextSteps: string[];
}

export interface CropDatabase {
  id: string;
  name: string;
  varieties: string[];
  category: 'cereal' | 'pulse' | 'oilseed' | 'vegetable' | 'fruit' | 'cash_crop';
  requirements: CropRequirements;
  characteristics: {
    droughtTolerant: boolean;
    diseaseResistant: boolean;
    highYielding: boolean;
    organicFriendly: boolean;
  };
  marketDemand: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RecommendationFilters {
  season?: string;
  category?: string[];
  minConfidence?: number;
  maxGrowthDuration?: number;
  minROI?: number;
  difficulty?: string[];
}

export interface RecommendationHistory {
  id: string;
  date: string;
  location: string;
  parameters: CropRecommendationInput;
  selectedCrop?: string;
  actualYield?: number;
  satisfaction?: number; // 1-5 rating
}

export interface CropRecommendationError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}