import { addSyntheticCropsToData } from './syntheticCrops';

export interface CropRecord {
  Nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  label: string;
  Seasons: string;
  Hills: string;
  Plains: string;
  Red: string;
  Black: string;
  Alluvial: string;
  Sandy: string;
  Loamy: string;
  Laterite: string;
  'Growth Duration': string;
  'ROI %': string;
  'Crop Cost per Acre': string;
  Warnings: string;
  'Tips (General)': string;
  'Tips (Specific)': string;
}

let csvData: CropRecord[] = [];
let isLoaded = false;

export async function loadCropData(): Promise<CropRecord[]> {
  if (isLoaded && csvData.length > 0) {
    return csvData;
  }

  try {
    const response = await fetch('/Crop_recommendation_extended.csv');
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    csvData = lines.slice(1).map(line => {
      const values = parseCsvLine(line);
      const record: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index]?.trim().replace(/"/g, '') || '';
        
        // Convert numeric fields
        if (['Nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall'].includes(header)) {
          record[header] = parseFloat(value) || 0;
        } else {
          record[header] = value;
        }
      });
      
      return record as CropRecord;
    });
    
    isLoaded = true;
    
    // Add synthetic diverse crops to ensure variety
    csvData = addSyntheticCropsToData(csvData);
    
    console.log(`Loaded ${csvData.length} crop records (including synthetic varieties)`);
    return csvData;
  } catch (error) {
    console.error('Error loading crop data:', error);
    throw new Error('Failed to load crop database');
  }
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

export interface CropMatchParams {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  season: string;
  soilType: string;
}

export async function findMatchingCrops(params: CropMatchParams): Promise<CropRecord[]> {
  const data = await loadCropData();
  
  // AI-like intelligent matching with dynamic tolerances and scoring
  const scoredCrops = data.map(crop => {
    let score = 0;
    let maxScore = 0;
    
    // Adaptive tolerance based on parameter ranges in data
    const adaptiveTolerance = {
      nitrogen: Math.max(15, Math.abs(params.nitrogen) * 0.3),    // 30% tolerance or min 15
      phosphorus: Math.max(10, Math.abs(params.phosphorus) * 0.25), // 25% tolerance or min 10
      potassium: Math.max(10, Math.abs(params.potassium) * 0.25),   // 25% tolerance or min 10
      ph: 0.8,         // ±0.8 pH units (more forgiving)
      temperature: Math.max(3, Math.abs(params.temperature) * 0.15), // 15% tolerance or min 3°C
      humidity: Math.max(8, Math.abs(params.humidity) * 0.2),      // 20% tolerance or min 8%
      rainfall: Math.max(50, Math.abs(params.rainfall) * 0.4)     // 40% tolerance or min 50mm
    };
    
    // Smart parameter matching with weighted importance
    const parameterWeights = {
      soil_nutrients: 0.3,  // NPK combined weight
      environmental: 0.25,  // Temperature, humidity, rainfall
      ph: 0.2,             // pH level
      season: 0.15,        // Season matching
      soil_type: 0.1       // Soil type matching
    };
    
    // 1. Soil Nutrients (NPK) - Combined smart scoring
    const nutrientScore = calculateNutrientScore(crop, params, adaptiveTolerance);
    score += nutrientScore * parameterWeights.soil_nutrients;
    maxScore += parameterWeights.soil_nutrients;
    
    // 2. Environmental factors - Fuzzy matching
    const envScore = calculateEnvironmentalScore(crop, params, adaptiveTolerance);
    score += envScore * parameterWeights.environmental;
    maxScore += parameterWeights.environmental;
    
    // 3. pH Level - Gaussian scoring
    const phScore = calculateGaussianScore(crop.ph, params.ph, adaptiveTolerance.ph);
    score += phScore * parameterWeights.ph;
    maxScore += parameterWeights.ph;
    
    // 4. Season matching - Flexible string matching
    const seasonScore = calculateSeasonScore(crop.Seasons, params.season);
    score += seasonScore * parameterWeights.season;
    maxScore += parameterWeights.season;
    
    // 5. Soil type matching
    const soilScore = calculateSoilScore(crop, params.soilType);
    score += soilScore * parameterWeights.soil_type;
    maxScore += parameterWeights.soil_type;
    
    // Normalize score to percentage
    const normalizedScore = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    return {
      crop,
      score: normalizedScore,
      matchDetails: {
        nutrient: nutrientScore,
        environment: envScore,
        ph: phScore,
        season: seasonScore,
        soil: soilScore
      }
    };
  });
  
  // Filter crops with reasonable matching threshold (25% minimum for more variety)
  const goodMatches = scoredCrops.filter(item => item.score >= 25);
  
  // Sort by combined score (AI-like ranking)
  const sortedMatches = goodMatches.sort((a, b) => {
    // Primary: Match score
    if (Math.abs(a.score - b.score) > 5) {
      return b.score - a.score;
    }
    // Secondary: ROI for similar scores
    const roiA = parseFloat(a.crop['ROI %']) || 0;
    const roiB = parseFloat(b.crop['ROI %']) || 0;
    return roiB - roiA;
  });
  
  // SMART DIVERSIFICATION: Ensure variety of crops
  const diverseResults = diversifyCrops(sortedMatches.map(item => item.crop), params);
  
  // Ensure minimum 7-8 different crops for better display
  if (diverseResults.length < 8) {
    const additionalCrops = generateAdditionalCrops(diverseResults, params, data);
    diverseResults.push(...additionalCrops);
  }
  
  return diverseResults.slice(0, 10); // Return 10 diverse crops for better variety
}

// ENHANCED SMART DIVERSIFICATION FUNCTION
function diversifyCrops(crops: CropRecord[], params: CropMatchParams): CropRecord[] {
  const uniqueCrops = new Map<string, CropRecord>();
  const cropCategories = new Set<string>();
  
  // Enhanced crop categories for maximum diversity
  const getCropCategory = (cropName: string): string => {
    const name = cropName.toLowerCase();
    if (name.includes('rice') || name.includes('wheat') || name.includes('barley') || name.includes('oats') || name.includes('maize') || name.includes('millet') || name.includes('sorghum')) return 'cereals';
    if (name.includes('potato') || name.includes('onion') || name.includes('tomato') || name.includes('carrot') || name.includes('cabbage') || name.includes('brinjal') || name.includes('cauliflower') || name.includes('cucumber') || name.includes('watermelon')) return 'vegetables';
    if (name.includes('cotton') || name.includes('jute') || name.includes('sugarcane') || name.includes('tobacco')) return 'cash_crops';
    if (name.includes('soybean') || name.includes('groundnut') || name.includes('mustard') || name.includes('sunflower') || name.includes('sesame') || name.includes('castor')) return 'oilseeds';
    if (name.includes('gram') || name.includes('pea') || name.includes('lentil') || name.includes('bean') || name.includes('chickpea') || name.includes('pigeon')) return 'pulses';
    if (name.includes('mango') || name.includes('apple') || name.includes('banana') || name.includes('orange') || name.includes('grape') || name.includes('pomegranate') || name.includes('fig') || name.includes('avocado') || name.includes('dragon')) return 'fruits';
    if (name.includes('coconut') || name.includes('areca') || name.includes('pepper') || name.includes('cardamom') || name.includes('ginger') || name.includes('turmeric') || name.includes('vanilla') || name.includes('coffee')) return 'spices_trees';
    if (name.includes('cactus') || name.includes('date') || name.includes('jojoba') || name.includes('azolla') || name.includes('salt')) return 'specialty';
    return 'others';
  };
  
  // Enhanced prioritization - allow more crops from each category for 10 total
  const prioritizedCrops = [
    ...crops.filter(c => getCropCategory(c.label) === 'cereals').slice(0, 2),
    ...crops.filter(c => getCropCategory(c.label) === 'vegetables').slice(0, 3), 
    ...crops.filter(c => getCropCategory(c.label) === 'cash_crops').slice(0, 1),
    ...crops.filter(c => getCropCategory(c.label) === 'oilseeds').slice(0, 2),
    ...crops.filter(c => getCropCategory(c.label) === 'pulses').slice(0, 1),
    ...crops.filter(c => getCropCategory(c.label) === 'fruits').slice(0, 2),
    ...crops.filter(c => getCropCategory(c.label) === 'spices_trees').slice(0, 1),
    ...crops.filter(c => getCropCategory(c.label) === 'specialty').slice(0, 1),
    ...crops.filter(c => getCropCategory(c.label) === 'others').slice(0, 1)
  ];
  
  // Remove duplicates by crop name
  for (const crop of prioritizedCrops) {
    const cropKey = crop.label.toLowerCase().trim();
    if (!uniqueCrops.has(cropKey)) {
      uniqueCrops.set(cropKey, crop);
    }
  }
  
  // If we don't have enough, add more from remaining crops
  if (uniqueCrops.size < 8) {
    for (const crop of crops) {
      const cropKey = crop.label.toLowerCase().trim();
      if (!uniqueCrops.has(cropKey) && uniqueCrops.size < 8) {
        uniqueCrops.set(cropKey, crop);
      }
    }
  }
  
  return Array.from(uniqueCrops.values());
}

// GENERATE ADDITIONAL DIVERSE CROPS
function generateAdditionalCrops(existingCrops: CropRecord[], params: CropMatchParams, allData: CropRecord[]): CropRecord[] {
  const existingNames = new Set(existingCrops.map(c => c.label.toLowerCase()));
  const additional: CropRecord[] = [];
  
  // Get unique crop types from data
  const uniqueCrops = new Map<string, CropRecord>();
  for (const crop of allData) {
    const key = crop.label.toLowerCase().trim();
    if (!existingNames.has(key) && !uniqueCrops.has(key)) {
      uniqueCrops.set(key, crop);
    }
  }
  
  // Sort by suitability for current conditions
  const suitableCrops = Array.from(uniqueCrops.values())
    .map(crop => ({
      crop,
      suitability: calculateBasicSuitability(crop, params)
    }))
    .sort((a, b) => b.suitability - a.suitability);
  
  // Add top suitable crops
  const needed = 8 - existingCrops.length;
  for (let i = 0; i < needed && i < suitableCrops.length; i++) {
    additional.push(suitableCrops[i].crop);
  }
  
  return additional;
}

function calculateBasicSuitability(crop: CropRecord, params: CropMatchParams): number {
  let score = 0;
  
  // Basic parameter proximity
  score += Math.max(0, 100 - Math.abs(crop.Nitrogen - params.nitrogen));
  score += Math.max(0, 100 - Math.abs(crop.ph - params.ph) * 20);
  score += Math.max(0, 100 - Math.abs(crop.temperature - params.temperature) * 3);
  
  // Season bonus
  if (crop.Seasons.toLowerCase().includes(params.season.toLowerCase())) {
    score += 50;
  }
  
  return score;
}

// AI-like scoring functions
function calculateNutrientScore(crop: CropRecord, params: CropMatchParams, tolerance: any): number {
  const nScore = calculateGaussianScore(crop.Nitrogen, params.nitrogen, tolerance.nitrogen);
  const pScore = calculateGaussianScore(crop.phosphorus, params.phosphorus, tolerance.phosphorus);
  const kScore = calculateGaussianScore(crop.potassium, params.potassium, tolerance.potassium);
  
  // Weighted average (N is most important, then P, then K)
  return (nScore * 0.5 + pScore * 0.3 + kScore * 0.2);
}

function calculateEnvironmentalScore(crop: CropRecord, params: CropMatchParams, tolerance: any): number {
  const tempScore = calculateGaussianScore(crop.temperature, params.temperature, tolerance.temperature);
  const humidScore = calculateGaussianScore(crop.humidity, params.humidity, tolerance.humidity);
  const rainScore = calculateGaussianScore(crop.rainfall, params.rainfall, tolerance.rainfall);
  
  // Equal weighting for environmental factors
  return (tempScore + humidScore + rainScore) / 3;
}

function calculateGaussianScore(actual: number, target: number, tolerance: number): number {
  const diff = Math.abs(actual - target);
  if (diff <= tolerance) {
    // Gaussian decay within tolerance
    return Math.exp(-(diff * diff) / (2 * tolerance * tolerance));
  }
  // Exponential decay outside tolerance
  return Math.exp(-(diff - tolerance) / tolerance) * 0.3;
}

function calculateSeasonScore(cropSeasons: string, targetSeason: string): number {
  if (!cropSeasons || !targetSeason) return 0.5; // Neutral if missing
  
  const seasons = cropSeasons.toLowerCase().split(',').map(s => s.trim());
  const target = targetSeason.toLowerCase().trim();
  
  // Exact match
  if (seasons.includes(target)) return 1.0;
  
  // Partial match (season names can be similar)
  for (const season of seasons) {
    if (season.includes(target) || target.includes(season)) return 0.8;
  }
  
  // Season compatibility (AI-like knowledge)
  const seasonCompatibility: { [key: string]: string[] } = {
    'kharif': ['monsoon', 'rainy', 'summer'],
    'rabi': ['winter', 'cold'],
    'zaid': ['summer', 'hot'],
    'summer': ['kharif', 'zaid', 'hot'],
    'winter': ['rabi', 'cold'],
    'monsoon': ['kharif', 'rainy']
  };
  
  const compatible = seasonCompatibility[target] || [];
  for (const season of seasons) {
    if (compatible.some(comp => season.includes(comp))) return 0.6;
  }
  
  return 0.3; // Some compatibility
}

function calculateSoilScore(crop: CropRecord, targetSoilType: string): number {
  const soilTypeMap: { [key: string]: string } = {
    'red': 'Red',
    'black': 'Black', 
    'alluvial': 'Alluvial',
    'sandy': 'Sandy',
    'loamy': 'Loamy',
    'laterite': 'Laterite'
  };
  
  const targetColumn = soilTypeMap[targetSoilType.toLowerCase()];
  if (!targetColumn) return 0.5; // Neutral if unknown
  
  // Check if crop grows in this soil type
  if (crop[targetColumn as keyof CropRecord] === '1') return 1.0;
  
  // Check soil compatibility (AI-like knowledge)
  const soilCompatibility: { [key: string]: string[] } = {
    'alluvial': ['Loamy', 'Sandy'], // Alluvial is compatible with loamy and sandy
    'loamy': ['Alluvial', 'Black'], // Loamy works with alluvial and black
    'sandy': ['Alluvial', 'Red'],   // Sandy works with alluvial and red
    'black': ['Loamy', 'Red'],      // Black works with loamy and red
    'red': ['Sandy', 'Black'],      // Red works with sandy and black
    'laterite': ['Red', 'Sandy']    // Laterite works with red and sandy
  };
  
  const compatible = soilCompatibility[targetSoilType.toLowerCase()] || [];
  for (const compatibleSoil of compatible) {
    if (crop[compatibleSoil as keyof CropRecord] === '1') return 0.7;
  }
  
  return 0.2; // Low compatibility but not zero
}

function getSoilTypeColumn(soilType: string): string | null {
  const soilTypeMap: { [key: string]: string } = {
    'red': 'Red',
    'black': 'Black',
    'alluvial': 'Alluvial',
    'sandy': 'Sandy',
    'loamy': 'Loamy',
    'laterite': 'Laterite'
  };
  
  return soilTypeMap[soilType.toLowerCase()] || null;
}