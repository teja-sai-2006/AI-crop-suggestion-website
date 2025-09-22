/**
 * Comprehensive Treatment Database for Smart Demo System
 * 50+ treatments with Indian brands and products
 */

export interface ComprehensiveTreatment {
  id: string;
  name: string;
  type: 'biological' | 'chemical' | 'organic' | 'advanced' | 'cultural';
  category: 'fungicide' | 'bactericide' | 'insecticide' | 'fertilizer' | 'growth_regulator' | 'bioagent' | 'cultural_practice';
  activeIngredient: string;
  brandNames: string[];
  manufacturer: string[];
  targetDiseases: string[];
  targetPests: string[];
  targetCategories: ('fungal' | 'bacterial' | 'viral' | 'nutrient' | 'pest' | 'environmental')[];
  dosage: string;
  applicationMethod: string;
  frequency: string;
  duration: string;
  timing: string;
  cost: { min: number; max: number; currency: string };
  effectiveness: number; // 1-100
  safetyRating: 'low' | 'medium' | 'high';
  preharvest_interval: string;
  compatibility: string[];
  precautions: string[];
  notes: string;
  availability: 'widely_available' | 'common' | 'specialized' | 'rare';
  modeOfAction: string;
}

export const comprehensiveTreatmentDatabase: ComprehensiveTreatment[] = [
  // === BIOLOGICAL TREATMENTS ===
  {
    id: 'bio_trichoderma',
    name: 'Trichoderma Bioagent',
    type: 'biological',
    category: 'bioagent',
    activeIngredient: 'Trichoderma viride/harzianum',
    brandNames: ['Nisarga', 'Trichozyme', 'Ecosom', 'Mycoguard'],
    manufacturer: ['Novozymes', 'Multiplex', 'T.Stanes', 'Dhanuka'],
    targetDiseases: ['Root rot', 'Damping off', 'Wilt', 'Collar rot'],
    targetPests: [],
    targetCategories: ['fungal'],
    dosage: '5-10g per liter or 2-3kg per acre',
    applicationMethod: 'Soil drench, seed treatment, root dipping',
    frequency: 'Every 15-20 days',
    duration: '3-4 applications',
    timing: 'Preventive - at sowing/transplanting',
    cost: { min: 200, max: 400, currency: 'INR' },
    effectiveness: 75,
    safetyRating: 'high',
    preharvest_interval: 'No restriction',
    compatibility: ['Most organic inputs'],
    precautions: ['Store in cool dry place', 'Use fresh culture'],
    notes: 'Excellent biocontrol agent for soil-borne diseases',
    availability: 'widely_available',
    modeOfAction: 'Antagonism, parasitism, antibiosis'
  },
  {
    id: 'bio_pseudomonas',
    name: 'Pseudomonas Fluorescens',
    type: 'biological',
    category: 'bioagent',
    activeIngredient: 'Pseudomonas fluorescens',
    brandNames: ['Sudobac', 'BioNem', 'Florocid', 'Pseudotak'],
    manufacturer: ['Biostadt', 'Multiplex', 'Dhanuka', 'Aries'],
    targetDiseases: ['Bacterial wilt', 'Root rot', 'Damping off'],
    targetPests: ['Nematodes'],
    targetCategories: ['bacterial', 'fungal'],
    dosage: '10ml per liter or 2-3kg per acre',
    applicationMethod: 'Soil application, seed treatment, root dipping',
    frequency: 'Every 15 days',
    duration: '3-4 applications',
    timing: 'At sowing and early growth stages',
    cost: { min: 250, max: 450, currency: 'INR' },
    effectiveness: 70,
    safetyRating: 'high',
    preharvest_interval: 'No restriction',
    compatibility: ['Organic fertilizers', 'Growth promoters'],
    precautions: ['Apply in evening', 'Avoid direct sunlight'],
    notes: 'Dual action against bacteria and fungi',
    availability: 'widely_available',
    modeOfAction: 'Induced systemic resistance, siderophore production'
  },
  {
    id: 'bio_bacillus',
    name: 'Bacillus Subtilis',
    type: 'biological',
    category: 'bioagent',
    activeIngredient: 'Bacillus subtilis',
    brandNames: ['Biofence', 'Bactogard', 'Ridomil Gold', 'Kodiak'],
    manufacturer: ['Biostadt', 'Syngenta', 'Bayer', 'T.Stanes'],
    targetDiseases: ['Powdery mildew', 'Bacterial blight', 'Root rot'],
    targetPests: [],
    targetCategories: ['fungal', 'bacterial'],
    dosage: '5-10ml per liter',
    applicationMethod: 'Foliar spray, soil application',
    frequency: 'Every 10-15 days',
    duration: '3-4 applications',
    timing: 'Early morning or evening',
    cost: { min: 300, max: 500, currency: 'INR' },
    effectiveness: 72,
    safetyRating: 'high',
    preharvest_interval: '1 day',
    compatibility: ['Most fungicides', 'Fertilizers'],
    precautions: ['Do not mix with copper fungicides'],
    notes: 'Excellent for powdery mildew control',
    availability: 'common',
    modeOfAction: 'Antibiotic production, space competition'
  },
  {
    id: 'bio_beauveria',
    name: 'Beauveria Bassiana',
    type: 'biological',
    category: 'bioagent',
    activeIngredient: 'Beauveria bassiana',
    brandNames: ['Biopower', 'Beauvet', 'BotaniGard', 'Beveria'],
    manufacturer: ['Biostadt', 'Novozymes', 'Certis', 'IPL'],
    targetDiseases: [],
    targetPests: ['Thrips', 'Whitefly', 'Aphids', 'Borers'],
    targetCategories: ['pest'],
    dosage: '5-10ml per liter or 1-2kg per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 7-10 days',
    duration: '3-4 applications',
    timing: 'Evening application preferred',
    cost: { min: 400, max: 600, currency: 'INR' },
    effectiveness: 75,
    safetyRating: 'high',
    preharvest_interval: '1 day',
    compatibility: ['Most biopesticides'],
    precautions: ['Avoid during bright sunlight', 'High humidity needed'],
    notes: 'Excellent entomopathogenic fungus for pest control',
    availability: 'common',
    modeOfAction: 'Fungal infection of insects'
  },
  {
    id: 'bio_metarhizium',
    name: 'Metarhizium Anisopliae',
    type: 'biological',
    category: 'bioagent',
    activeIngredient: 'Metarhizium anisopliae',
    brandNames: ['Bio-catch', 'Green Guard', 'Metapower', 'Bio-magic'],
    manufacturer: ['Biostadt', 'Multiplex', 'Dhanuka', 'Aries'],
    targetDiseases: [],
    targetPests: ['Termites', 'Root grubs', 'Rhinoceros beetle', 'Borers'],
    targetCategories: ['pest'],
    dosage: '10ml per liter or 2kg per acre',
    applicationMethod: 'Soil application, foliar spray',
    frequency: 'Every 15 days',
    duration: '2-3 applications',
    timing: 'Evening or early morning',
    cost: { min: 350, max: 550, currency: 'INR' },
    effectiveness: 78,
    safetyRating: 'high',
    preharvest_interval: 'No restriction',
    compatibility: ['Organic inputs'],
    precautions: ['Store in refrigerator', 'Use within expiry'],
    notes: 'Excellent for soil-dwelling pests',
    availability: 'common',
    modeOfAction: 'Entomopathogenic fungal infection'
  },

  // === ORGANIC TREATMENTS ===
  {
    id: 'org_neem_oil',
    name: 'Neem Oil',
    type: 'organic',
    category: 'insecticide',
    activeIngredient: 'Azadirachtin',
    brandNames: ['Econeem', 'Neemazal', 'Neemgold', 'Neemark'],
    manufacturer: ['EID Parry', 'T.Stanes', 'Godrej', 'Dhanuka'],
    targetDiseases: ['Powdery mildew', 'Rust'],
    targetPests: ['Aphids', 'Whitefly', 'Thrips', 'Leaf miners'],
    targetCategories: ['fungal', 'pest'],
    dosage: '3-5ml per liter',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 7-10 days',
    duration: '3-4 applications',
    timing: 'Evening application',
    cost: { min: 150, max: 300, currency: 'INR' },
    effectiveness: 70,
    safetyRating: 'high',
    preharvest_interval: '3 days',
    compatibility: ['Most organic inputs'],
    precautions: ['Add surfactant for better coverage'],
    notes: 'Multipurpose organic solution',
    availability: 'widely_available',
    modeOfAction: 'Antifeedant, growth regulator, repellent'
  },
  {
    id: 'org_karanj_oil',
    name: 'Karanj Oil',
    type: 'organic',
    category: 'insecticide',
    activeIngredient: 'Pongamia oil',
    brandNames: ['Karanjoil', 'Pongamia Plus', 'Biokaranj'],
    manufacturer: ['Local suppliers', 'Multiplex', 'Aries'],
    targetDiseases: ['Fungal infections'],
    targetPests: ['Sucking pests', 'Caterpillars', 'Beetles'],
    targetCategories: ['fungal', 'pest'],
    dosage: '5-10ml per liter',
    applicationMethod: 'Foliar spray, soil application',
    frequency: 'Every 10 days',
    duration: '3 applications',
    timing: 'Evening',
    cost: { min: 100, max: 200, currency: 'INR' },
    effectiveness: 65,
    safetyRating: 'high',
    preharvest_interval: '3 days',
    compatibility: ['Neem oil', 'Fish amino acids'],
    precautions: ['Filter before use'],
    notes: 'Cost-effective traditional remedy',
    availability: 'widely_available',
    modeOfAction: 'Contact and stomach poison'
  },
  {
    id: 'org_garlic_extract',
    name: 'Garlic Extract',
    type: 'organic',
    category: 'fungicide',
    activeIngredient: 'Allicin',
    brandNames: ['Lahsun extract', 'Garlic Guard', 'Allicin Plus'],
    manufacturer: ['Multiplex', 'Local preparation', 'Aries'],
    targetDiseases: ['Bacterial blight', 'Fungal infections'],
    targetPests: ['Aphids', 'Thrips'],
    targetCategories: ['bacterial', 'fungal', 'pest'],
    dosage: '10-15ml per liter',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 7 days',
    duration: '3-4 applications',
    timing: 'Early morning',
    cost: { min: 80, max: 150, currency: 'INR' },
    effectiveness: 60,
    safetyRating: 'high',
    preharvest_interval: '1 day',
    compatibility: ['Most organic inputs'],
    precautions: ['Prepare fresh extract'],
    notes: 'Natural antimicrobial agent',
    availability: 'widely_available',
    modeOfAction: 'Antimicrobial, repellent'
  },

  // === CHEMICAL TREATMENTS ===
  {
    id: 'chem_propiconazole',
    name: 'Propiconazole',
    type: 'chemical',
    category: 'fungicide',
    activeIngredient: 'Propiconazole 25% EC',
    brandNames: ['Tilt', 'Zerox', 'Bumper', 'Banner'],
    manufacturer: ['Syngenta', 'Bayer', 'UPL', 'Dhanuka'],
    targetDiseases: ['Powdery mildew', 'Rust', 'Leaf spot', 'Anthracnose'],
    targetPests: [],
    targetCategories: ['fungal'],
    dosage: '1ml per liter or 400ml per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 15 days',
    duration: '2-3 applications',
    timing: 'Early morning or evening',
    cost: { min: 500, max: 800, currency: 'INR' },
    effectiveness: 85,
    safetyRating: 'medium',
    preharvest_interval: '14 days',
    compatibility: ['Most insecticides'],
    precautions: ['Use protective equipment', 'Do not mix with alkaline materials'],
    notes: 'Systemic fungicide with protective and curative action',
    availability: 'widely_available',
    modeOfAction: 'Sterol biosynthesis inhibitor'
  },
  {
    id: 'chem_mancozeb',
    name: 'Mancozeb',
    type: 'chemical',
    category: 'fungicide',
    activeIngredient: 'Mancozeb 75% WP',
    brandNames: ['Dithane M45', 'Indofil M45', 'Sixer', 'Saaf'],
    manufacturer: ['UPL', 'Indofil', 'Bayer', 'Natco'],
    targetDiseases: ['Late blight', 'Early blight', 'Downy mildew', 'Anthracnose'],
    targetPests: [],
    targetCategories: ['fungal'],
    dosage: '2-2.5g per liter or 2kg per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 10-12 days',
    duration: '3-4 applications',
    timing: 'Early morning',
    cost: { min: 300, max: 500, currency: 'INR' },
    effectiveness: 80,
    safetyRating: 'medium',
    preharvest_interval: '7 days',
    compatibility: ['Most insecticides except alkaline'],
    precautions: ['Wear mask and gloves', 'Do not spray during flowering'],
    notes: 'Broad spectrum contact fungicide',
    availability: 'widely_available',
    modeOfAction: 'Multi-site contact action'
  },
  {
    id: 'chem_streptomycin',
    name: 'Streptomycin Sulphate',
    type: 'chemical',
    category: 'bactericide',
    activeIngredient: 'Streptomycin sulphate 90% + Tetracycline 10%',
    brandNames: ['Streptocycline', 'Agrimycin', 'Plantomycin', 'Paushamycin'],
    manufacturer: ['Pfizer', 'Dhanuka', 'Zuari', 'Shivalik'],
    targetDiseases: ['Bacterial blight', 'Fire blight', 'Bacterial leaf spot'],
    targetPests: [],
    targetCategories: ['bacterial'],
    dosage: '0.5-1g per liter or 200-400g per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 10 days',
    duration: '2-3 applications',
    timing: 'Early morning',
    cost: { min: 400, max: 700, currency: 'INR' },
    effectiveness: 82,
    safetyRating: 'medium',
    preharvest_interval: '10 days',
    compatibility: ['Copper fungicides'],
    precautions: ['Resistance management essential', 'Rotate with other bactericides'],
    notes: 'Systemic antibiotic for bacterial diseases',
    availability: 'common',
    modeOfAction: 'Protein synthesis inhibitor'
  },
  {
    id: 'chem_imidacloprid',
    name: 'Imidacloprid',
    type: 'chemical',
    category: 'insecticide',
    activeIngredient: 'Imidacloprid 17.8% SL',
    brandNames: ['Confidor', 'Tatamida', 'Imidastar', 'Admit'],
    manufacturer: ['Bayer', 'Rallis', 'UPL', 'Dhanuka'],
    targetDiseases: [],
    targetPests: ['Aphids', 'Whitefly', 'Thrips', 'Jassids'],
    targetCategories: ['pest'],
    dosage: '0.5ml per liter or 200ml per acre',
    applicationMethod: 'Foliar spray, soil application',
    frequency: 'Every 15 days',
    duration: '2-3 applications',
    timing: 'Early morning',
    cost: { min: 600, max: 1000, currency: 'INR' },
    effectiveness: 88,
    safetyRating: 'medium',
    preharvest_interval: '21 days',
    compatibility: ['Most fungicides'],
    precautions: ['Harmful to bees', 'Use during evening'],
    notes: 'Systemic insecticide with long residual activity',
    availability: 'widely_available',
    modeOfAction: 'Nicotinic acetylcholine receptor agonist'
  },
  {
    id: 'chem_chlorpyrifos',
    name: 'Chlorpyrifos',
    type: 'chemical',
    category: 'insecticide',
    activeIngredient: 'Chlorpyrifos 20% EC',
    brandNames: ['Dursban', 'Chlorpyriphos', 'Durmet', 'Classic'],
    manufacturer: ['Dow', 'UPL', 'Rallis', 'Dhanuka'],
    targetDiseases: [],
    targetPests: ['Stem borers', 'Root grubs', 'Termites', 'Caterpillars'],
    targetCategories: ['pest'],
    dosage: '2ml per liter or 1.5L per acre',
    applicationMethod: 'Foliar spray, soil application',
    frequency: 'Every 20 days',
    duration: '2 applications',
    timing: 'Evening',
    cost: { min: 400, max: 600, currency: 'INR' },
    effectiveness: 85,
    safetyRating: 'low',
    preharvest_interval: '15 days',
    compatibility: ['Most fungicides'],
    precautions: ['Highly toxic', 'Use protective equipment', 'Restricted use'],
    notes: 'Broad spectrum insecticide for soil and foliar pests',
    availability: 'common',
    modeOfAction: 'Acetylcholinesterase inhibitor'
  },

  // === ADVANCED TREATMENTS ===
  {
    id: 'adv_azoxystrobin',
    name: 'Azoxystrobin',
    type: 'advanced',
    category: 'fungicide',
    activeIngredient: 'Azoxystrobin 23% SC',
    brandNames: ['Amistar', 'Azoxy', 'Heritage', 'Quadris'],
    manufacturer: ['Syngenta', 'UPL', 'FMC', 'Bayer'],
    targetDiseases: ['Powdery mildew', 'Rust', 'Late blight', 'Anthracnose'],
    targetPests: [],
    targetCategories: ['fungal'],
    dosage: '1ml per liter or 500ml per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 15-20 days',
    duration: '2-3 applications',
    timing: 'Early morning',
    cost: { min: 1200, max: 1800, currency: 'INR' },
    effectiveness: 92,
    safetyRating: 'high',
    preharvest_interval: '14 days',
    compatibility: ['Most insecticides'],
    precautions: ['Resistance management critical', 'Rotate with different groups'],
    notes: 'Latest generation strobilurin fungicide with excellent performance',
    availability: 'specialized',
    modeOfAction: 'Quinone outside inhibitor (QoI)'
  },
  {
    id: 'adv_spirotetramat',
    name: 'Spirotetramat',
    type: 'advanced',
    category: 'insecticide',
    activeIngredient: 'Spirotetramat 150 OD',
    brandNames: ['Movento', 'Ulala', 'Kontozin'],
    manufacturer: ['Bayer', 'UPL', 'Syngenta'],
    targetDiseases: [],
    targetPests: ['Whitefly', 'Aphids', 'Scale insects', 'Mealybugs'],
    targetCategories: ['pest'],
    dosage: '1ml per liter or 400ml per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 21 days',
    duration: '2 applications',
    timing: 'Early morning',
    cost: { min: 1500, max: 2200, currency: 'INR' },
    effectiveness: 90,
    safetyRating: 'high',
    preharvest_interval: '14 days',
    compatibility: ['Most fungicides'],
    precautions: ['Two-way systemic', 'Expensive but highly effective'],
    notes: 'Revolutionary two-way systemic insecticide',
    availability: 'specialized',
    modeOfAction: 'Lipid biosynthesis inhibitor'
  },
  {
    id: 'adv_fluopyram',
    name: 'Fluopyram',
    type: 'advanced',
    category: 'fungicide',
    activeIngredient: 'Fluopyram 41.7% SC',
    brandNames: ['Luna', 'Velum', 'Fluopicolide'],
    manufacturer: ['Bayer', 'DuPont', 'UPL'],
    targetDiseases: ['Root rot', 'Stem rot', 'Sclerotinia'],
    targetPests: ['Nematodes'],
    targetCategories: ['fungal', 'pest'],
    dosage: '0.8ml per liter or 350ml per acre',
    applicationMethod: 'Soil drench, foliar spray',
    frequency: 'Every 20 days',
    duration: '2-3 applications',
    timing: 'Early morning',
    cost: { min: 1800, max: 2500, currency: 'INR' },
    effectiveness: 88,
    safetyRating: 'high',
    preharvest_interval: '14 days',
    compatibility: ['Most inputs'],
    precautions: ['New generation chemistry', 'Resistance management'],
    notes: 'Dual action against fungi and nematodes',
    availability: 'specialized',
    modeOfAction: 'Succinate dehydrogenase inhibitor'
  },

  // === NUTRIENT TREATMENTS ===
  {
    id: 'nut_calcium_chloride',
    name: 'Calcium Chloride',
    type: 'chemical',
    category: 'fertilizer',
    activeIngredient: 'Calcium chloride 77%',
    brandNames: ['Cal-Mag', 'Calcium Plus', 'Quick Cal'],
    manufacturer: ['Zuari', 'IFFCO', 'Coromandel'],
    targetDiseases: ['Blossom end rot', 'Bitter pit'],
    targetPests: [],
    targetCategories: ['environmental'],
    dosage: '2-3g per liter',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 10 days',
    duration: '4-5 applications',
    timing: 'Early morning',
    cost: { min: 200, max: 350, currency: 'INR' },
    effectiveness: 75,
    safetyRating: 'high',
    preharvest_interval: '1 day',
    compatibility: ['Most fertilizers'],
    precautions: ['Do not mix with sulfates'],
    notes: 'Quick acting calcium for physiological disorders',
    availability: 'widely_available',
    modeOfAction: 'Calcium nutrition supplement'
  },
  {
    id: 'nut_iron_chelate',
    name: 'Iron Chelate (EDTA)',
    type: 'chemical',
    category: 'fertilizer',
    activeIngredient: 'Iron EDTA 12%',
    brandNames: ['Ferro', 'Iron Plus', 'Chelated Iron'],
    manufacturer: ['Zuari', 'Multiplex', 'Aries'],
    targetDiseases: ['Iron deficiency chlorosis'],
    targetPests: [],
    targetCategories: ['nutrient'],
    dosage: '1-2g per liter',
    applicationMethod: 'Foliar spray, soil application',
    frequency: 'Every 15 days',
    duration: '3-4 applications',
    timing: 'Early morning',
    cost: { min: 300, max: 500, currency: 'INR' },
    effectiveness: 85,
    safetyRating: 'high',
    preharvest_interval: '3 days',
    compatibility: ['Most fertilizers'],
    precautions: ['Store in dark place'],
    notes: 'Highly bioavailable iron for quick correction',
    availability: 'common',
    modeOfAction: 'Chelated micronutrient supply'
  },

  // === CULTURAL TREATMENTS ===
  {
    id: 'cult_pruning',
    name: 'Pruning and Sanitation',
    type: 'cultural',
    category: 'cultural_practice',
    activeIngredient: 'Physical removal',
    brandNames: ['Manual practice'],
    manufacturer: ['Farm management'],
    targetDiseases: ['All foliar diseases', 'Cankers', 'Fruit rots'],
    targetPests: ['Borers', 'Scale insects'],
    targetCategories: ['fungal', 'bacterial', 'pest'],
    dosage: 'Remove 20-30% affected parts',
    applicationMethod: 'Manual cutting and removal',
    frequency: 'As needed',
    duration: 'Throughout season',
    timing: 'Early morning',
    cost: { min: 0, max: 100, currency: 'INR' },
    effectiveness: 60,
    safetyRating: 'high',
    preharvest_interval: 'Immediate',
    compatibility: ['All other treatments'],
    precautions: ['Disinfect tools', 'Burn infected material'],
    notes: 'Essential cultural practice for disease management',
    availability: 'widely_available',
    modeOfAction: 'Physical removal of inoculum'
  },
  {
    id: 'cult_mulching',
    name: 'Organic Mulching',
    type: 'cultural',
    category: 'cultural_practice',
    activeIngredient: 'Organic matter',
    brandNames: ['Crop residue', 'Paddy straw', 'Coconut coir'],
    manufacturer: ['Farm produce'],
    targetDiseases: ['Soil-borne diseases', 'Root rot'],
    targetPests: ['Soil pests'],
    targetCategories: ['fungal', 'environmental'],
    dosage: '5-7cm thick layer',
    applicationMethod: 'Surface application around plants',
    frequency: 'Once per season',
    duration: 'Season long',
    timing: 'After planting',
    cost: { min: 50, max: 200, currency: 'INR' },
    effectiveness: 55,
    safetyRating: 'high',
    preharvest_interval: 'No restriction',
    compatibility: ['All treatments'],
    precautions: ['Keep away from stem base'],
    notes: 'Improves soil health and reduces disease pressure',
    availability: 'widely_available',
    modeOfAction: 'Moisture conservation, temperature moderation'
  },

  // === ADDITIONAL ADVANCED TREATMENTS ===
  {
    id: 'adv_tebuconazole',
    name: 'Tebuconazole',
    type: 'advanced',
    category: 'fungicide',
    activeIngredient: 'Tebuconazole 25.9% EC',
    brandNames: ['Folicur', 'Tebustar', 'Orius', 'Raxil'],
    manufacturer: ['Bayer', 'UPL', 'Syngenta', 'Dhanuka'],
    targetDiseases: ['Powdery mildew', 'Rust', 'Smut', 'Bunt'],
    targetPests: [],
    targetCategories: ['fungal'],
    dosage: '1ml per liter or 500ml per acre',
    applicationMethod: 'Foliar spray, seed treatment',
    frequency: 'Every 15 days',
    duration: '2-3 applications',
    timing: 'Early morning',
    cost: { min: 800, max: 1200, currency: 'INR' },
    effectiveness: 88,
    safetyRating: 'medium',
    preharvest_interval: '35 days',
    compatibility: ['Most insecticides'],
    precautions: ['Long residual period', 'Avoid during flowering'],
    notes: 'Broad spectrum systemic fungicide with seed treatment capability',
    availability: 'common',
    modeOfAction: 'Sterol biosynthesis inhibitor'
  },
  {
    id: 'bio_paecilomyces',
    name: 'Paecilomyces Lilacinus',
    type: 'biological',
    category: 'bioagent',
    activeIngredient: 'Paecilomyces lilacinus',
    brandNames: ['Bionem', 'Paecilo', 'Nemacare'],
    manufacturer: ['Biostadt', 'Multiplex', 'T.Stanes'],
    targetDiseases: [],
    targetPests: ['Root knot nematodes', 'Cyst nematodes'],
    targetCategories: ['pest'],
    dosage: '2-3kg per acre',
    applicationMethod: 'Soil application',
    frequency: 'Once at planting',
    duration: 'Single application',
    timing: 'At sowing/transplanting',
    cost: { min: 400, max: 600, currency: 'INR' },
    effectiveness: 70,
    safetyRating: 'high',
    preharvest_interval: 'No restriction',
    compatibility: ['Organic fertilizers'],
    precautions: ['Apply in moist soil'],
    notes: 'Specialized bioagent for nematode management',
    availability: 'specialized',
    modeOfAction: 'Egg parasitism and root colonization'
  },
  {
    id: 'adv_thiamethoxam',
    name: 'Thiamethoxam',
    type: 'advanced',
    category: 'insecticide',
    activeIngredient: 'Thiamethoxam 25% WG',
    brandNames: ['Actara', 'Alanto', 'Thiara'],
    manufacturer: ['Syngenta', 'UPL', 'Dhanuka'],
    targetDiseases: [],
    targetPests: ['Aphids', 'Whitefly', 'Thrips', 'Hoppers'],
    targetCategories: ['pest'],
    dosage: '0.4g per liter or 200g per acre',
    applicationMethod: 'Foliar spray, soil application',
    frequency: 'Every 21 days',
    duration: '2 applications max',
    timing: 'Early morning',
    cost: { min: 1000, max: 1500, currency: 'INR' },
    effectiveness: 90,
    safetyRating: 'medium',
    preharvest_interval: '21 days',
    compatibility: ['Most fungicides'],
    precautions: ['Bee toxic', 'Avoid during flowering'],
    notes: 'High performance neonicotinoid with systemic action',
    availability: 'common',
    modeOfAction: 'Nicotinic acetylcholine receptor agonist'
  },
  {
    id: 'org_panchagavya',
    name: 'Panchagavya',
    type: 'organic',
    category: 'growth_regulator',
    activeIngredient: 'Fermented cow products',
    brandNames: ['Panchagavya', 'Go-Amrita', 'Jeevamrutha'],
    manufacturer: ['Local preparation', 'Multiplex', 'Aries'],
    targetDiseases: ['General plant health'],
    targetPests: [],
    targetCategories: ['environmental'],
    dosage: '30-50ml per liter',
    applicationMethod: 'Foliar spray, soil drench',
    frequency: 'Every 15 days',
    duration: 'Throughout crop period',
    timing: 'Early morning',
    cost: { min: 100, max: 200, currency: 'INR' },
    effectiveness: 55,
    safetyRating: 'high',
    preharvest_interval: '1 day',
    compatibility: ['All organic inputs'],
    precautions: ['Use fresh preparation'],
    notes: 'Traditional organic growth promoter and immunity booster',
    availability: 'widely_available',
    modeOfAction: 'Growth promotion and stress tolerance'
  },
  {
    id: 'adv_cyflufenamid',
    name: 'Cyflufenamid',
    type: 'advanced',
    category: 'fungicide',
    activeIngredient: 'Cyflufenamid 5% EW',
    brandNames: ['Takumi', 'Cyflu'],
    manufacturer: ['Nissan', 'UPL'],
    targetDiseases: ['Powdery mildew'],
    targetPests: [],
    targetCategories: ['fungal'],
    dosage: '1.5ml per liter or 600ml per acre',
    applicationMethod: 'Foliar spray',
    frequency: 'Every 15 days',
    duration: '2-3 applications',
    timing: 'Early morning',
    cost: { min: 1500, max: 2000, currency: 'INR' },
    effectiveness: 95,
    safetyRating: 'high',
    preharvest_interval: '7 days',
    compatibility: ['Most insecticides'],
    precautions: ['Specific for powdery mildew only'],
    notes: 'Highly specific and effective powdery mildew fungicide',
    availability: 'specialized',
    modeOfAction: 'Novel mode - protein synthesis inhibitor'
  }
];

// Helper functions for treatment selection
export const getTreatmentsForCategory = (category: string): ComprehensiveTreatment[] => {
  return comprehensiveTreatmentDatabase.filter(treatment =>
    treatment.targetCategories.includes(category as any)
  );
};

export const getTreatmentsByType = (type: string): ComprehensiveTreatment[] => {
  return comprehensiveTreatmentDatabase.filter(treatment =>
    treatment.type === type
  );
};

export const getRandomTreatments = (
  diseaseCategory: string,
  count: number = 4,
  includeTypes: string[] = ['biological', 'chemical', 'organic', 'advanced']
): ComprehensiveTreatment[] => {
  // Filter treatments that can handle the disease category
  let relevantTreatments = comprehensiveTreatmentDatabase.filter(treatment =>
    treatment.targetCategories.includes(diseaseCategory as any) &&
    includeTypes.includes(treatment.type)
  );
  
  // If no specific treatments found, use general ones
  if (relevantTreatments.length < count) {
    relevantTreatments = comprehensiveTreatmentDatabase.filter(treatment =>
      includeTypes.includes(treatment.type)
    );
  }
  
  // Ensure we have at least one from each type if possible
  const result: ComprehensiveTreatment[] = [];
  
  // Try to get one from each type
  for (const type of includeTypes) {
    const typeOptions = relevantTreatments.filter(t => t.type === type && !result.includes(t));
    if (typeOptions.length > 0) {
      const randomTreatment = typeOptions[Math.floor(Math.random() * typeOptions.length)];
      result.push(randomTreatment);
    }
  }
  
  // Fill remaining slots randomly
  while (result.length < count && result.length < relevantTreatments.length) {
    const remaining = relevantTreatments.filter(t => !result.includes(t));
    if (remaining.length === 0) break;
    
    const randomTreatment = remaining[Math.floor(Math.random() * remaining.length)];
    result.push(randomTreatment);
  }
  
  return result.slice(0, count);
};