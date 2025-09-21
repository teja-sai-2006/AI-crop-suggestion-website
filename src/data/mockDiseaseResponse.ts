/**
 * Mock Disease Detection Data
 * Realistic disease analysis responses for frontend development
 */

import { 
  DiseaseDetectionResult, 
  DiseaseDiagnosis, 
  TreatmentRecommendation, 
  PreventionTip,
  DiseaseDatabase 
} from '../types/diseaseDetection.types';

// Mock disease database
export const mockDiseaseDatabase: DiseaseDatabase[] = [
  {
    id: 'disease_001',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    category: 'fungal',
    commonCrops: ['tomato', 'potato', 'brinjal'],
    symptoms: ['Dark spots on leaves', 'White fungal growth', 'Fruit rot', 'Stem lesions'],
    causes: ['High humidity', 'Cool temperatures', 'Poor air circulation', 'Contaminated seeds'],
    seasonalRisk: [
      { season: 'monsoon', riskLevel: 'high' },
      { season: 'winter', riskLevel: 'medium' },
      { season: 'summer', riskLevel: 'low' }
    ],
    treatmentOptions: ['Copper fungicides', 'Mancozeb', 'Propiconazole'],
    preventionMethods: ['Crop rotation', 'Resistant varieties', 'Proper spacing', 'Drip irrigation']
  },
  {
    id: 'disease_002',
    name: 'Bacterial Leaf Spot',
    scientificName: 'Xanthomonas campestris',
    category: 'bacterial',
    commonCrops: ['tomato', 'pepper', 'cucumber'],
    symptoms: ['Small water-soaked spots', 'Yellow halos around spots', 'Leaf drop', 'Fruit cracking'],
    causes: ['Overhead irrigation', 'High humidity', 'Contaminated tools', 'Infected seeds'],
    seasonalRisk: [
      { season: 'monsoon', riskLevel: 'high' },
      { season: 'summer', riskLevel: 'medium' },
      { season: 'winter', riskLevel: 'low' }
    ],
    treatmentOptions: ['Copper compounds', 'Streptomycin', 'Bacteriophages'],
    preventionMethods: ['Drip irrigation', 'Tool sanitization', 'Certified seeds', 'Crop rotation']
  },
  {
    id: 'disease_003',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphe cichoracearum',
    category: 'fungal',
    commonCrops: ['cucumber', 'muskmelon', 'pumpkin', 'beans'],
    symptoms: ['White powdery coating', 'Stunted growth', 'Yellowing leaves', 'Premature leaf drop'],
    causes: ['High humidity', 'Poor air circulation', 'Overhead watering', 'Dense planting'],
    seasonalRisk: [
      { season: 'winter', riskLevel: 'high' },
      { season: 'monsoon', riskLevel: 'medium' },
      { season: 'summer', riskLevel: 'low' }
    ],
    treatmentOptions: ['Sulfur spray', 'Potassium bicarbonate', 'Triazole fungicides'],
    preventionMethods: ['Proper spacing', 'Good ventilation', 'Resistant varieties', 'Avoid overhead watering']
  }
];

// Mock treatment recommendations
export const mockTreatments: TreatmentRecommendation[] = [
  {
    type: 'chemical',
    name: 'Copper Hydroxide',
    activeIngredient: 'Copper hydroxide 77%',
    dosage: '2-3 grams per liter',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 10-14 days',
    duration: '3-4 applications',
    cost: { min: 150, max: 250, currency: 'INR' },
    effectiveness: 85,
    safetyRating: 'medium',
    notes: 'Apply during cooler hours to avoid phytotoxicity'
  },
  {
    type: 'organic',
    name: 'Neem Oil Solution',
    activeIngredient: 'Azadirachtin',
    dosage: '5ml per liter of water',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 7 days',
    duration: '4-6 applications',
    cost: { min: 80, max: 120, currency: 'INR' },
    effectiveness: 70,
    safetyRating: 'high',
    notes: 'Safe for beneficial insects when applied correctly'
  },
  {
    type: 'biological',
    name: 'Trichoderma Viride',
    activeIngredient: 'Trichoderma viride spores',
    dosage: '5-10 grams per liter',
    applicationMethod: 'Soil drench and foliar spray',
    frequency: 'Every 15 days',
    duration: 'Throughout growing season',
    cost: { min: 100, max: 180, currency: 'INR' },
    effectiveness: 75,
    safetyRating: 'high',
    notes: 'Best used as preventive measure'
  }
];

// Mock prevention tips
export const mockPreventionTips: PreventionTip[] = [
  {
    category: 'cultural',
    title: 'Improve Air Circulation',
    description: 'Ensure proper spacing between plants and prune lower branches to improve airflow',
    implementation: 'immediate',
    difficulty: 'easy',
    cost: 'low'
  },
  {
    category: 'environmental',
    title: 'Install Drip Irrigation',
    description: 'Replace overhead sprinklers with drip irrigation to reduce leaf wetness',
    implementation: 'next_season',
    difficulty: 'moderate',
    cost: 'medium'
  },
  {
    category: 'biological',
    title: 'Beneficial Microorganisms',
    description: 'Apply beneficial bacteria and fungi to soil to create competitive environment',
    implementation: 'immediate',
    difficulty: 'easy',
    cost: 'low'
  },
  {
    category: 'chemical',
    title: 'Preventive Fungicide Application',
    description: 'Apply systemic fungicides before disease symptoms appear during high-risk periods',
    implementation: 'next_season',
    difficulty: 'moderate',
    cost: 'medium'
  }
];

/**
 * Generate mock disease detection result
 */
export function generateMockDiseaseResult(
  imageFileName: string, 
  cropType: string = 'tomato'
): DiseaseDetectionResult {
  const diseases = mockDiseaseDatabase.filter(d => d.commonCrops.includes(cropType));
  const primaryDisease = diseases[Math.floor(Math.random() * diseases.length)] || mockDiseaseDatabase[0];
  
  const confidence = 75 + Math.random() * 20; // 75-95% confidence
  const severity = confidence > 85 ? 'high' : confidence > 70 ? 'medium' : 'low';
  
  const primaryDiagnosis: DiseaseDiagnosis = {
    id: primaryDisease.id,
    diseaseName: primaryDisease.name,
    scientificName: primaryDisease.scientificName,
    confidence: Math.round(confidence),
    severity: severity as any,
    category: primaryDisease.category as any,
    description: `${primaryDisease.name} is a common ${primaryDisease.category} disease affecting ${cropType} plants.`,
    symptoms: primaryDisease.symptoms,
    causes: primaryDisease.causes,
    affectedParts: ['leaves', 'stems']
  };

  // Generate alternative diagnoses
  const alternativeDiseases = diseases.filter(d => d.id !== primaryDisease.id).slice(0, 2);
  const alternativeDiagnoses: DiseaseDiagnosis[] = alternativeDiseases.map((disease, index) => ({
    id: disease.id,
    diseaseName: disease.name,
    scientificName: disease.scientificName,
    confidence: Math.round(confidence - 15 - (index * 10)),
    severity: 'medium' as any,
    category: disease.category as any,
    description: `Alternative diagnosis: ${disease.name}`,
    symptoms: disease.symptoms.slice(0, 3),
    causes: disease.causes.slice(0, 2),
    affectedParts: ['leaves']
  }));

  const urgency = severity === 'high' ? 'high' : severity === 'medium' ? 'medium' : 'low';
  const estimatedLoss = {
    percentage: severity === 'high' ? 25 + Math.random() * 25 : 
                severity === 'medium' ? 10 + Math.random() * 15 : 
                Math.random() * 10,
    value: 0,
    currency: 'INR'
  };
  estimatedLoss.value = Math.round(estimatedLoss.percentage * 1000); // ₹1000 per % loss

  return {
    id: `analysis_${Date.now()}`,
    imageFileName,
    analysisDate: new Date().toISOString(),
    cropType,
    confidence: Math.round(confidence),
    primaryDiagnosis,
    alternativeDiagnoses,
    treatments: mockTreatments.slice(0, 3),
    preventionTips: mockPreventionTips,
    urgency: urgency as any,
    estimatedLoss,
    followUpActions: [
      'Monitor affected plants daily',
      'Apply recommended treatment immediately',
      'Isolate affected plants if possible',
      'Check neighboring plants for similar symptoms',
      'Document treatment progress with photos'
    ],
    expertConsultation: severity === 'high' || confidence < 80
  };
}

/**
 * Generate location-based disease risk assessment
 */
export function getLocationBasedRisks(location: string, season: string): string[] {
  const risks = [
    'High humidity levels increase fungal disease risk',
    'Recent rainfall may promote bacterial infections',
    'Temperature fluctuations stress plants making them vulnerable',
    'Local pest population may be carrying viral diseases'
  ];
  
  // Simulate location and season-based risks
  if (season === 'monsoon') {
    risks.push('Monsoon season increases risk of water-borne diseases');
  }
  
  if (location.toLowerCase().includes('mumbai') || location.toLowerCase().includes('kerala')) {
    risks.push('Coastal humidity creates favorable conditions for fungal growth');
  }
  
  return risks.slice(0, 3);
}

/**
 * Mock crop type detection from image analysis
 */
export function detectCropType(imageFileName: string): string {
  const cropTypes = ['tomato', 'potato', 'cucumber', 'pepper', 'beans', 'brinjal'];
  // Simple mock detection based on filename
  const detectedCrop = cropTypes.find(crop => 
    imageFileName.toLowerCase().includes(crop)
  ) || 'tomato';
  
  return detectedCrop;
}