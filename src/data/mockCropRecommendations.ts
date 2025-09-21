import { 
  CropDatabase, 
  CropSuggestion, 
  CropRecommendationResult,
  SoilParameters,
  ClimateParameters,
  CropRecommendationInput
} from '../types/cropRecommendation.types';

/**
 * Mock Crop Recommendation Data for Frontend-First Development
 * This file contains realistic agricultural data for testing and development
 */

// Comprehensive crop database with Indian agricultural crops
export const mockCropDatabase: CropDatabase[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    varieties: ['HD-2967', 'PBW-343', 'WH-147', 'DBW-88'],
    category: 'cereal',
    requirements: {
      soilType: ['Loamy', 'Clay loam', 'Sandy loam'],
      optimalPH: { min: 6.0, max: 7.5 },
      temperature: { min: 15, max: 25 },
      rainfall: { min: 300, max: 800 },
      nutrients: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' }
    },
    characteristics: {
      droughtTolerant: false,
      diseaseResistant: true,
      highYielding: true,
      organicFriendly: true
    },
    marketDemand: 'high',
    difficulty: 'easy'
  },
  {
    id: 'rice',
    name: 'Rice',
    varieties: ['Basmati-370', 'IR-64', 'Swarna', 'MTU-7029'],
    category: 'cereal',
    requirements: {
      soilType: ['Clay', 'Clay loam'],
      optimalPH: { min: 5.5, max: 7.0 },
      temperature: { min: 20, max: 35 },
      rainfall: { min: 1000, max: 2500 },
      nutrients: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
    },
    characteristics: {
      droughtTolerant: false,
      diseaseResistant: false,
      highYielding: true,
      organicFriendly: false
    },
    marketDemand: 'high',
    difficulty: 'medium'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    varieties: ['Bt-Cotton', 'Suraj', 'Bunny Hybrid'],
    category: 'cash_crop',
    requirements: {
      soilType: ['Black cotton soil', 'Alluvial'],
      optimalPH: { min: 5.8, max: 8.0 },
      temperature: { min: 21, max: 30 },
      rainfall: { min: 500, max: 1000 },
      nutrients: { nitrogen: 'high', phosphorus: 'high', potassium: 'high' }
    },
    characteristics: {
      droughtTolerant: true,
      diseaseResistant: false,
      highYielding: true,
      organicFriendly: false
    },
    marketDemand: 'high',
    difficulty: 'hard'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    varieties: ['Co-86032', 'CoM-0265', 'Co-238'],
    category: 'cash_crop',
    requirements: {
      soilType: ['Loamy', 'Clay loam'],
      optimalPH: { min: 6.0, max: 7.5 },
      temperature: { min: 20, max: 30 },
      rainfall: { min: 750, max: 1200 },
      nutrients: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
    },
    characteristics: {
      droughtTolerant: false,
      diseaseResistant: true,
      highYielding: true,
      organicFriendly: true
    },
    marketDemand: 'high',
    difficulty: 'medium'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    varieties: ['JS-335', 'MACS-450', 'NRC-37'],
    category: 'oilseed',
    requirements: {
      soilType: ['Well-drained loamy', 'Sandy loam'],
      optimalPH: { min: 6.0, max: 7.0 },
      temperature: { min: 20, max: 30 },
      rainfall: { min: 450, max: 700 },
      nutrients: { nitrogen: 'low', phosphorus: 'high', potassium: 'medium' }
    },
    characteristics: {
      droughtTolerant: true,
      diseaseResistant: true,
      highYielding: true,
      organicFriendly: true
    },
    marketDemand: 'high',
    difficulty: 'easy'
  },
  {
    id: 'maize',
    name: 'Maize',
    varieties: ['NK-6240', 'Bio-9681', 'Rajkumar'],
    category: 'cereal',
    requirements: {
      soilType: ['Well-drained loamy', 'Sandy loam'],
      optimalPH: { min: 5.8, max: 7.8 },
      temperature: { min: 21, max: 27 },
      rainfall: { min: 500, max: 1200 },
      nutrients: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' }
    },
    characteristics: {
      droughtTolerant: true,
      diseaseResistant: true,
      highYielding: true,
      organicFriendly: true
    },
    marketDemand: 'medium',
    difficulty: 'easy'
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    varieties: ['TMV-2', 'JL-24', 'TAG-24'],
    category: 'oilseed',
    requirements: {
      soilType: ['Sandy loam', 'Red sandy loam'],
      optimalPH: { min: 6.0, max: 7.0 },
      temperature: { min: 20, max: 30 },
      rainfall: { min: 500, max: 750 },
      nutrients: { nitrogen: 'low', phosphorus: 'high', potassium: 'medium' }
    },
    characteristics: {
      droughtTolerant: true,
      diseaseResistant: false,
      highYielding: true,
      organicFriendly: true
    },
    marketDemand: 'medium',
    difficulty: 'medium'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    varieties: ['Pusa Ruby', 'Arka Meghali', 'Himsona'],
    category: 'vegetable',
    requirements: {
      soilType: ['Well-drained loamy', 'Sandy loam'],
      optimalPH: { min: 6.0, max: 7.0 },
      temperature: { min: 20, max: 25 },
      rainfall: { min: 400, max: 600 },
      nutrients: { nitrogen: 'medium', phosphorus: 'high', potassium: 'high' }
    },
    characteristics: {
      droughtTolerant: false,
      diseaseResistant: false,
      highYielding: true,
      organicFriendly: true
    },
    marketDemand: 'high',
    difficulty: 'medium'
  }
];

// Sample crop recommendations with realistic yield and market data
export const mockCropSuggestions: CropSuggestion[] = [
  {
    id: 'wheat_hd2967',
    name: 'Wheat',
    variety: 'HD-2967 (High Yield)',
    confidence: 92,
    suitability: 'excellent',
    expectedYield: { value: 45, unit: 'quintals/hectare' },
    growthDuration: { min: 110, max: 130, unit: 'days' },
    season: 'Rabi',
    marketPrice: { min: 2000, max: 2200, currency: 'INR/quintal' },
    profitability: { roi: 65, profit: 35000 }
  },
  {
    id: 'soybean_js335',
    name: 'Soybean',
    variety: 'JS-335',
    confidence: 87,
    suitability: 'excellent',
    expectedYield: { value: 25, unit: 'quintals/hectare' },
    growthDuration: { min: 95, max: 115, unit: 'days' },
    season: 'Kharif',
    marketPrice: { min: 3800, max: 4200, currency: 'INR/quintal' },
    profitability: { roi: 78, profit: 45000 }
  },
  {
    id: 'maize_nk6240',
    name: 'Maize',
    variety: 'NK-6240',
    confidence: 82,
    suitability: 'good',
    expectedYield: { value: 55, unit: 'quintals/hectare' },
    growthDuration: { min: 85, max: 105, unit: 'days' },
    season: 'Kharif',
    marketPrice: { min: 1800, max: 2000, currency: 'INR/quintal' },
    profitability: { roi: 55, profit: 28000 }
  },
  {
    id: 'cotton_bt',
    name: 'Cotton',
    variety: 'Bt-Cotton',
    confidence: 78,
    suitability: 'good',
    expectedYield: { value: 18, unit: 'quintals/hectare' },
    growthDuration: { min: 160, max: 200, unit: 'days' },
    season: 'Kharif',
    marketPrice: { min: 5500, max: 6000, currency: 'INR/quintal' },
    profitability: { roi: 85, profit: 65000 }
  },
  {
    id: 'groundnut_tmv2',
    name: 'Groundnut',
    variety: 'TMV-2',
    confidence: 75,
    suitability: 'good',
    expectedYield: { value: 22, unit: 'quintals/hectare' },
    growthDuration: { min: 100, max: 120, unit: 'days' },
    season: 'Kharif',
    marketPrice: { min: 4500, max: 5000, currency: 'INR/quintal' },
    profitability: { roi: 72, profit: 42000 }
  }
];

// Function to generate location-based crop recommendations
export const generateLocationBasedRecommendations = (
  soil: SoilParameters,
  climate: ClimateParameters
): CropSuggestion[] => {
  const recommendations: CropSuggestion[] = [];
  
  // Score each crop based on input parameters
  mockCropDatabase.forEach(crop => {
    const soilScore = calculateSoilCompatibility(soil, crop);
    const climateScore = calculateClimateCompatibility(climate, crop);
    const overallScore = (soilScore + climateScore) / 2;
    
    if (overallScore > 60) { // Only include viable crops
      const suggestion = createCropSuggestion(crop, overallScore, soil, climate);
      recommendations.push(suggestion);
    }
  });
  
  // Sort by confidence score descending
  return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
};

// Helper function to calculate soil compatibility
const calculateSoilCompatibility = (soil: SoilParameters, crop: CropDatabase): number => {
  let score = 0;
  
  // pH compatibility (30% weight)
  const phScore = calculateRangeScore(soil.ph, crop.requirements.optimalPH.min, crop.requirements.optimalPH.max);
  score += phScore * 0.3;
  
  // NPK compatibility (70% weight)
  const nScore = calculateNutrientScore(soil.nitrogen, crop.requirements.nutrients.nitrogen);
  const pScore = calculateNutrientScore(soil.phosphorus, crop.requirements.nutrients.phosphorus);
  const kScore = calculateNutrientScore(soil.potassium, crop.requirements.nutrients.potassium);
  
  score += (nScore + pScore + kScore) / 3 * 0.7;
  
  return Math.round(score);
};

// Helper function to calculate climate compatibility
const calculateClimateCompatibility = (climate: ClimateParameters, crop: CropDatabase): number => {
  let score = 0;
  
  // Temperature compatibility (40% weight)
  const tempScore = calculateRangeScore(
    climate.temperature, 
    crop.requirements.temperature.min, 
    crop.requirements.temperature.max
  );
  score += tempScore * 0.4;
  
  // Rainfall compatibility (40% weight)
  const rainScore = calculateRangeScore(
    climate.rainfall, 
    crop.requirements.rainfall.min, 
    crop.requirements.rainfall.max
  );
  score += rainScore * 0.4;
  
  // Humidity bonus/penalty (20% weight)
  const humidityScore = climate.humidity > 60 ? 80 : 60; // Simplified
  score += humidityScore * 0.2;
  
  return Math.round(score);
};

// Helper function to calculate score for numeric ranges
const calculateRangeScore = (value: number, min: number, max: number): number => {
  if (value >= min && value <= max) {
    return 100; // Perfect match
  } else if (value < min) {
    const deviation = (min - value) / min;
    return Math.max(0, 100 - deviation * 100);
  } else {
    const deviation = (value - max) / max;
    return Math.max(0, 100 - deviation * 100);
  }
};

// Helper function to calculate nutrient score
const calculateNutrientScore = (value: number, requirement: 'low' | 'medium' | 'high'): number => {
  const ranges = {
    low: { min: 0, max: 40 },
    medium: { min: 40, max: 80 },
    high: { min: 80, max: 120 }
  };
  
  const range = ranges[requirement];
  return calculateRangeScore(value, range.min, range.max);
};

// Helper function to create crop suggestion from database
const createCropSuggestion = (
  crop: CropDatabase, 
  confidence: number, 
  soil: SoilParameters, 
  climate: ClimateParameters
): CropSuggestion => {
  // Generate realistic yield based on conditions
  const baseYield = getBaseYield(crop.name);
  const yieldMultiplier = confidence / 100;
  const expectedYield = Math.round(baseYield * yieldMultiplier);
  
  return {
    id: `${crop.id}_${Date.now()}`,
    name: crop.name,
    variety: crop.varieties[0], // Use first variety as default
    confidence: Math.round(confidence),
    suitability: confidence > 85 ? 'excellent' : confidence > 70 ? 'good' : 'fair',
    expectedYield: { value: expectedYield, unit: 'quintals/hectare' },
    growthDuration: getGrowthDuration(crop.name),
    season: getSeason(crop.category, climate.temperature),
    marketPrice: getMarketPrice(crop.name),
    profitability: calculateProfitability(expectedYield, crop.name)
  };
};

// Helper functions for realistic data generation
const getBaseYield = (cropName: string): number => {
  const yields: Record<string, number> = {
    'Wheat': 40, 'Rice': 50, 'Maize': 55, 'Soybean': 25, 
    'Cotton': 18, 'Sugarcane': 600, 'Groundnut': 22, 'Tomato': 350
  };
  return yields[cropName] || 30;
};

const getGrowthDuration = (cropName: string): { min: number; max: number; unit: string } => {
  const durations: Record<string, { min: number; max: number }> = {
    'Wheat': { min: 110, max: 130 }, 'Rice': { min: 120, max: 150 },
    'Maize': { min: 85, max: 105 }, 'Soybean': { min: 95, max: 115 },
    'Cotton': { min: 160, max: 200 }, 'Sugarcane': { min: 300, max: 365 },
    'Groundnut': { min: 100, max: 120 }, 'Tomato': { min: 60, max: 80 }
  };
  return { ...durations[cropName] || { min: 90, max: 120 }, unit: 'days' };
};

const getSeason = (category: string, temperature: number): string => {
  if (temperature < 20) return 'Rabi';
  if (temperature > 25) return 'Kharif';
  return 'Zaid';
};

const getMarketPrice = (cropName: string): { min: number; max: number; currency: string } => {
  const prices: Record<string, { min: number; max: number }> = {
    'Wheat': { min: 2000, max: 2200 }, 'Rice': { min: 1800, max: 2000 },
    'Maize': { min: 1800, max: 2000 }, 'Soybean': { min: 3800, max: 4200 },
    'Cotton': { min: 5500, max: 6000 }, 'Sugarcane': { min: 280, max: 320 },
    'Groundnut': { min: 4500, max: 5000 }, 'Tomato': { min: 1200, max: 1800 }
  };
  return { ...prices[cropName] || { min: 2000, max: 2500 }, currency: 'INR/quintal' };
};

const calculateProfitability = (yieldValue: number, cropName: string): { roi: number; profit: number } => {
  const price = getMarketPrice(cropName);
  const avgPrice = (price.min + price.max) / 2;
  const revenue = yieldValue * avgPrice;
  
  // Estimate costs (simplified)
  const baseCost = {
    'Wheat': 25000, 'Rice': 30000, 'Maize': 22000, 'Soybean': 20000,
    'Cotton': 40000, 'Sugarcane': 50000, 'Groundnut': 25000, 'Tomato': 80000
  };
  
  const cost = baseCost[cropName as keyof typeof baseCost] || 25000;
  const profit = revenue - cost;
  const roi = Math.round((profit / cost) * 100);
  
  return { roi, profit: Math.round(profit) };
};

// Sample recommendation result
export const mockRecommendationResult: CropRecommendationResult = {
  id: 'rec_' + Date.now(),
  inputParameters: {
    soil: { nitrogen: 80, phosphorus: 45, potassium: 60, ph: 6.8 },
    climate: { temperature: 22, humidity: 65, rainfall: 550 },
    farmSize: 2.5,
    experience: 'intermediate'
  },
  recommendations: mockCropSuggestions,
  analysisDate: new Date().toISOString(),
  confidence: 85,
  factors: { soil: 88, climate: 82, market: 85, experience: 85 },
  warnings: [
    'Soil nitrogen levels are slightly high - consider reducing fertilizer application',
    'Monitor for pest activity during flowering stage'
  ],
  tips: [
    'Apply organic compost to improve soil structure',
    'Consider crop rotation with legumes to maintain nitrogen levels',
    'Install drip irrigation for water efficiency'
  ],
  nextSteps: [
    'Prepare field for sowing by deep plowing',
    'Test soil moisture levels before planting',
    'Arrange quality seeds from certified dealers',
    'Plan irrigation schedule based on crop requirements'
  ]
};