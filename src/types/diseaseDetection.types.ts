/**
 * Disease Detection Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface DiseaseDetectionInput {
  imageFile: File;
  cropType?: string;
  location?: {
    lat: number;
    lon: number;
    name: string;
  };
  farmConditions?: {
    irrigation: 'drip' | 'sprinkler' | 'flood' | 'manual';
    fertilizer: 'organic' | 'chemical' | 'mixed';
    previousTreatment?: string;
  };
}

export interface DiseaseDiagnosis {
  id: string;
  diseaseName: string;
  scientificName: string;
  confidence: number;          // Confidence score 0-100
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'nutrient' | 'environmental';
  description: string;
  symptoms: string[];
  causes: string[];
  affectedParts: string[];     // e.g., ["leaves", "stems", "fruits"]
}

export interface TreatmentRecommendation {
  type: 'chemical' | 'organic' | 'biological' | 'cultural';
  name: string;
  activeIngredient?: string;
  dosage: string;
  applicationMethod: string;
  frequency: string;
  duration: string;
  cost: {
    min: number;
    max: number;
    currency: string;
  };
  effectiveness: number;       // 0-100
  safetyRating: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface PreventionTip {
  category: 'cultural' | 'biological' | 'chemical' | 'environmental';
  title: string;
  description: string;
  implementation: 'immediate' | 'next_season' | 'long_term';
  difficulty: 'easy' | 'moderate' | 'difficult';
  cost: 'low' | 'medium' | 'high';
}

export interface DiseaseDetectionResult {
  id: string;
  imageFileName: string;
  analysisDate: string;
  cropType: string;
  confidence: number;          // Overall analysis confidence
  primaryDiagnosis: DiseaseDiagnosis;
  alternativeDiagnoses: DiseaseDiagnosis[];
  treatments: TreatmentRecommendation[];
  preventionTips: PreventionTip[];
  urgency: 'low' | 'medium' | 'high' | 'immediate';
  estimatedLoss: {
    percentage: number;
    value: number;
    currency: string;
  };
  followUpActions: string[];
  expertConsultation: boolean;
}

export interface DiseaseDetectionHistory {
  id: string;
  date: string;
  imageFileName: string;
  cropType: string;
  diseaseName: string;
  confidence: number;
  severity: string;
  treated: boolean;
  treatmentApplied?: string;
  effectiveness?: number;      // User feedback on treatment effectiveness
  notes?: string;
}

export interface DiseaseDatabase {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  commonCrops: string[];
  symptoms: string[];
  causes: string[];
  seasonalRisk: {
    season: string;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  treatmentOptions: string[];
  preventionMethods: string[];
}

export interface DiseaseDetectionError {
  code: string;
  message: string;
  details?: any;
}