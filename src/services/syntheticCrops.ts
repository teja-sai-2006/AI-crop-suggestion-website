import { CropRecord } from './csvReader';

export interface SyntheticCrop {
  label: string;
  Nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
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

export const syntheticCropData: CropRecord[] = [
  // Enhanced variety for better diversification
  {
    Nitrogen: 80, phosphorus: 40, potassium: 20, temperature: 25, humidity: 80, ph: 6.5, rainfall: 200,
    label: 'basmati_rice', Seasons: 'Kharif', Hills: 'True', Plains: 'True',
    Red: '0', Black: '0', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '120-140 days', 'ROI %': '45', 'Crop Cost per Acre': '₹32,000',
    Warnings: 'Bacterial leaf blight and blast disease; requires consistent water management',
    'Tips (General)': 'Premium aromatic rice variety; export quality grain with excellent cooking characteristics',
    'Tips (Specific)': 'Transplant 25-day seedlings; maintain 2-5cm water level; harvest at 20-25% moisture'
  },
  {
    Nitrogen: 150, phosphorus: 75, potassium: 50, temperature: 28, humidity: 70, ph: 6.5, rainfall: 600,
    label: 'hybrid_maize', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '90-120 days', 'ROI %': '55', 'Crop Cost per Acre': '₹30,000',
    Warnings: 'Fall armyworm and stem borer attack; requires balanced nutrition for high yield',
    'Tips (General)': 'High yielding hybrid variety suitable for diverse agro-climatic conditions',
    'Tips (Specific)': 'Use certified seeds; apply NPK in splits; harvest when moisture is 18-20%'
  },
  {
    Nitrogen: 30, phosphorus: 80, potassium: 70, temperature: 26, humidity: 75, ph: 6.2, rainfall: 750,
    label: 'premium_soybean', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '95-110 days', 'ROI %': '28', 'Crop Cost per Acre': '₹26,000',
    Warnings: 'Yellow mosaic virus and pod borer; requires proper drainage and disease management',
    'Tips (General)': 'High protein content legume; nitrogen fixation reduces fertilizer costs',
    'Tips (Specific)': 'Inoculate seeds with rhizobium; avoid waterlogging; harvest when pods rattle'
  },
  {
    Nitrogen: 100, phosphorus: 50, potassium: 60, temperature: 30, humidity: 60, ph: 7.0, rainfall: 500,
    label: 'bt_cotton', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '150-180 days', 'ROI %': '18', 'Crop Cost per Acre': '₹38,000',
    Warnings: 'Pink bollworm resistance management; whitefly and sucking pest control required',
    'Tips (General)': 'Genetically modified variety with built-in pest resistance; high value cash crop',
    'Tips (Specific)': 'Follow refuge strategy; monitor pest resistance; pick cotton at proper maturity'
  },
  {
    Nitrogen: 120, phosphorus: 60, potassium: 40, temperature: 22, humidity: 65, ph: 6.8, rainfall: 400,
    label: 'durum_wheat', Seasons: 'Rabi', Hills: 'True', Plains: 'True',
    Red: '0', Black: '1', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '120-150 days', 'ROI %': '42', 'Crop Cost per Acre': '₹32,000',
    Warnings: 'Rust diseases and aphid attack; sensitive to heat stress during grain filling',
    'Tips (General)': 'High protein wheat suitable for pasta and semolina production; premium market',
    'Tips (Specific)': 'Timely sowing essential; provide 5-6 irrigations; harvest at physiological maturity'
  },
  {
    Nitrogen: 180, phosphorus: 80, potassium: 200, temperature: 18, humidity: 70, ph: 5.8, rainfall: 300,
    label: 'processing_potato', Seasons: 'Rabi', Hills: 'True', Plains: 'True',
    Red: '1', Black: '0', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '70-90 days', 'ROI %': '280', 'Crop Cost per Acre': '₹45,000',
    Warnings: 'Late blight disease and tuber moth; requires cool climate and disease-free seeds',
    'Tips (General)': 'High dry matter variety suitable for chips and french fries; industrial demand',
    'Tips (Specific)': 'Use certified seed tubers; earthing up essential; harvest when skin sets properly'
  },
  {
    Nitrogen: 120, phosphorus: 100, potassium: 150, temperature: 24, humidity: 65, ph: 6.3, rainfall: 400,
    label: 'hybrid_tomato', Seasons: 'Rabi, Zaid', Hills: 'True', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '75-90 days', 'ROI %': '450', 'Crop Cost per Acre': '₹35,000',
    Warnings: 'Bacterial wilt and fruit borer; requires staking and regular pruning',
    'Tips (General)': 'Determinate hybrid variety; suitable for fresh market and processing',
    'Tips (Specific)': 'Transplant healthy seedlings; provide support; apply calcium for fruit quality'
  },
  {
    Nitrogen: 100, phosphorus: 50, potassium: 100, temperature: 20, humidity: 60, ph: 6.5, rainfall: 350,
    label: 'export_onion', Seasons: 'Rabi', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '120-150 days', 'ROI %': '280', 'Crop Cost per Acre': '₹38,000',
    Warnings: 'Purple blotch and thrips damage; requires well-drained soil and proper curing',
    'Tips (General)': 'Long day variety with good storage quality; suitable for export markets',
    'Tips (Specific)': 'Transplant at pencil thickness; stop irrigation 15 days before harvest'
  },
  {
    Nitrogen: 25, phosphorus: 60, potassium: 40, temperature: 20, humidity: 65, ph: 7.0, rainfall: 350,
    label: 'kabuli_chickpea', Seasons: 'Rabi', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '90-120 days', 'ROI %': '22', 'Crop Cost per Acre': '₹28,000',
    Warnings: 'Wilt disease and pod borer; requires well-drained soil and cool climate',
    'Tips (General)': 'Large seeded variety with export potential; higher market price than desi types',
    'Tips (Specific)': 'Seed treatment with fungicide; avoid excess moisture; harvest when pods turn brown'
  },
  {
    Nitrogen: 25, phosphorus: 50, potassium: 75, temperature: 28, humidity: 65, ph: 6.3, rainfall: 500,
    label: 'valencia_groundnut', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '0', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '1',
    'Growth Duration': '100-120 days', 'ROI %': '26', 'Crop Cost per Acre': '₹28,000',
    Warnings: 'Leaf spot diseases and aphid attack; requires well-drained sandy soil',
    'Tips (General)': 'Oil seed crop with good kernel quality; suitable for direct consumption',
    'Tips (Specific)': 'Earthing up at flowering; harvest when leaves turn yellow; cure properly'
  },
  {
    Nitrogen: 120, phosphorus: 40, potassium: 40, temperature: 18, humidity: 60, ph: 6.8, rainfall: 300,
    label: 'canola_mustard', Seasons: 'Rabi', Hills: 'True', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '90-110 days', 'ROI %': '18', 'Crop Cost per Acre': '₹22,000',
    Warnings: 'Aphid infestation and white rust; requires cool dry weather during maturity',
    'Tips (General)': 'Low erucic acid variety suitable for edible oil; premium quality oil',
    'Tips (Specific)': 'Line sowing recommended; harvest when siliqua turn golden brown'
  },
  {
    Nitrogen: 60, phosphorus: 120, potassium: 40, temperature: 25, humidity: 60, ph: 6.5, rainfall: 400,
    label: 'confectionery_sunflower', Seasons: 'Kharif, Rabi', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '90-110 days', 'ROI %': '16', 'Crop Cost per Acre': '₹26,000',
    Warnings: 'Head rot and stem borer; requires good drainage and disease management',
    'Tips (General)': 'Large seeded variety for direct consumption; higher price than oil types',
    'Tips (Specific)': 'Plant facing east; harvest when back of head turns brown; dry properly'
  },
  {
    Nitrogen: 150, phosphorus: 100, potassium: 100, temperature: 16, humidity: 70, ph: 6.0, rainfall: 350,
    label: 'purple_cabbage', Seasons: 'Rabi', Hills: 'True', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '80-100 days', 'ROI %': '320', 'Crop Cost per Acre': '₹48,000',
    Warnings: 'Clubroot disease and diamondback moth; requires cool climate and rich soil',
    'Tips (General)': 'Specialty variety with antioxidant properties; premium market demand',
    'Tips (Specific)': 'Transplant 4-5 week seedlings; maintain consistent soil moisture'
  },
  {
    Nitrogen: 120, phosphorus: 80, potassium: 80, temperature: 15, humidity: 70, ph: 6.2, rainfall: 300,
    label: 'snowball_cauliflower', Seasons: 'Rabi', Hills: 'True', Plains: 'True',
    Red: '1', Black: '0', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '75-95 days', 'ROI %': '250', 'Crop Cost per Acre': '₹42,000',
    Warnings: 'Black rot and aphid infestation; very sensitive to heat and drought stress',
    'Tips (General)': 'Premium white variety requiring blanching for quality curd development',
    'Tips (Specific)': 'Tie leaves over curd when size of lemon; harvest compact white heads'
  },
  {
    Nitrogen: 100, phosphorus: 75, potassium: 100, temperature: 26, humidity: 65, ph: 6.5, rainfall: 450,
    label: 'round_brinjal', Seasons: 'Kharif, Rabi', Hills: 'True', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '100-120 days', 'ROI %': '280', 'Crop Cost per Acre': '₹32,000',
    Warnings: 'Bacterial wilt and fruit borer; requires staking and regular harvesting',
    'Tips (General)': 'Round variety suitable for stuffing; continuous bearing for 4-5 months',
    'Tips (Specific)': 'Stake plants when 30cm tall; harvest fruits at tender stage for quality'
  },
  {
    Nitrogen: 200, phosphorus: 60, potassium: 300, temperature: 27, humidity: 75, ph: 6.5, rainfall: 1200,
    label: 'tissue_culture_banana', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '1',
    'Growth Duration': '300-400 days', 'ROI %': '450', 'Crop Cost per Acre': '₹55,000',
    Warnings: 'Panama disease and nematode damage; requires wind protection and drainage',
    'Tips (General)': 'Disease-free planting material; uniform crop with export quality fruits',
    'Tips (Specific)': 'Plant in well-prepared pits; drip irrigation and mulching recommended'
  },
  // Additional specialty crops for extreme conditions
  {
    Nitrogen: 40, phosphorus: 30, potassium: 50, temperature: 32, humidity: 55, ph: 7.5, rainfall: 200,
    label: 'drought_sorghum', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '0', Alluvial: '1', Sandy: '1', Loamy: '0', Laterite: '0',
    'Growth Duration': '90-120 days', 'ROI %': '28', 'Crop Cost per Acre': '₹18,000',
    Warnings: 'Shoot fly and stem borer; extremely drought tolerant but needs pest management',
    'Tips (General)': 'Multi-purpose crop for grain, fodder and fuel; excellent drought tolerance',
    'Tips (Specific)': 'Seed treatment essential; harvest at physiological maturity for best quality'
  },
  {
    Nitrogen: 35, phosphorus: 25, potassium: 40, temperature: 30, humidity: 60, ph: 7.0, rainfall: 250,
    label: 'pearl_millet_hybrid', Seasons: 'Kharif', Hills: 'False', Plains: 'True',
    Red: '1', Black: '0', Alluvial: '0', Sandy: '1', Loamy: '0', Laterite: '0',
    'Growth Duration': '75-90 days', 'ROI %': '32', 'Crop Cost per Acre': '₹17,000',
    Warnings: 'Downy mildew and ergot disease; thrives in hot arid conditions',
    'Tips (General)': 'Nutritious millet suitable for arid zones; climate resilient crop',
    'Tips (Specific)': 'Early sowing preferred; harvest when grains are hard and dry'
  },
  {
    Nitrogen: 50, phosphorus: 40, potassium: 60, temperature: 35, humidity: 45, ph: 8.0, rainfall: 150,
    label: 'desert_bean', Seasons: 'Zaid', Hills: 'True', Plains: 'True',
    Red: '1', Black: '1', Alluvial: '1', Sandy: '1', Loamy: '1', Laterite: '0',
    'Growth Duration': '75-90 days', 'ROI %': '18', 'Crop Cost per Acre': '₹25,000',
    Warnings: 'Heat stress and aphid attack; requires minimal water but regular irrigation',
    'Tips (General)': 'Heat tolerant legume suitable for summer cultivation in hot regions',
    'Tips (Specific)': 'Mulching essential; harvest pods frequently for continuous production'
  },
  {
    Nitrogen: 15, phosphorus: 12, potassium: 20, temperature: 25, humidity: 85, ph: 5.5, rainfall: 1500,
    label: 'wetland_rice', Seasons: 'Kharif', Hills: 'True', Plains: 'True',
    Red: '0', Black: '0', Alluvial: '1', Sandy: '0', Loamy: '1', Laterite: '0',
    'Growth Duration': '140-160 days', 'ROI %': '38', 'Crop Cost per Acre': '₹22,000',
    Warnings: 'Deep water rice; sheath blight in stagnant water conditions',
    'Tips (General)': 'Traditional variety suitable for flood-prone areas; low input costs',
    'Tips (Specific)': 'Can tolerate 0.5-1.0m standing water; harvest when 80% grains mature'
  }
];export function addSyntheticCropsToData(realData: any[]): any[] {
  return [...realData, ...syntheticCropData];
}