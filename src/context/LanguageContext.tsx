import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation interface
interface Translations {
  // Navigation and common
  home: string;
  weather: string;
  crops: string;
  marketplace: string;
  chat: string;
  profile: string;
  settings: string;
  
  // Landing page
  welcomeTitle: string;
  welcomeSubtitle: string;
  getStarted: string;
  learnMore: string;
  landingDescription: string;
  
  // Navigation items
  cropRecommendation: string;
  weatherForecast: string;
  cropTracker: string;
  diseaseDetection: string;
  marketPrices: string;
  farmRecords: string;
  expertCall: string;
  chatbot: string;
  
  // Home page
  smartFarmingAssistant: string;
  farmOverview: string;
  myCrops: string;
  aiPoweredInsights: string;
  noCropsTrackedYet: string;
  startTrackingCrops: string;
  addFirstCrop: string;
  loadingCrops: string;
  optimalPlanting: string;
  basedOnSoilWeather: string;
  diseasePrevention: string;
  earlyWarningSystem: string;
  yieldPrediction: string;
  mlBasedForecasting: string;
  
  // Stats Overview
  activeCrops: string;
  avgYield: string;
  soilHealth: string;
  waterUsage: string;
  fromLastSeason: string;
  vsTargetYield: string;
  npkBalanced: string;
  efficientUsage: string;
  good: string;
  excellent: string;
  poor: string;
  warning: string;
  
  // Weather page
  today: string;
  tomorrow: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  rainfall: string;
  selectLocation: string;
  currentWeather: string;
  forecast: string;
  sunny: string;
  cloudy: string;
  rainy: string;
  noLocationSet: string;
  selectYourLocation: string;
  chooseLocationForWeather: string;
  setLocationToView: string;
  weatherDataNotAvailable: string;
  refresh: string;
  tryAgain: string;
  changeLocation: string;
  lastUpdated: string;
  nextUpdateIn: string;
  updatingWeatherData: string;
  justNow: string;
  minuteAgo: string;
  minutesAgo: string;
  recently: string;
  
  // Crop recommendations
  cropRecommendations: string;
  recommendedCrops: string;
  soilType: string;
  season: string;
  cropRecommendationSystem: string;
  aiPoweredCropSuggestions: string;
  soilClimateParameters: string;
  enterSoilTestResults: string;
  soilParameters: string;
  phLevel: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  climateParameters: string;
  averageTemperature: string;
  averageHumidity: string;
  expectedRainfall: string;
  farmInformation: string;
  farmDetails: string;
  farmSize: string;
  farmingExperience: string;
  experienceLevel: string;
  selectSeason: string;
  getRecommendations: string;
  getCropRecommendations: string;
  analyzing: string;
  locationUpdated: string;
  analysis: string;
  warnings: string;
  tips: string;
  basedOnSoilClimate: string;
  showingDiverseCrops: string;
  soilClimateUpdatedFor: string;
  confidenceScore: string;
  addToTracker: string;
  addedToTracker: string;
  // Soil types
  redSoil: string;
  blackSoil: string;
  alluvialSoil: string;
  sandySoil: string;
  loamySoil: string;
  lateriteSoil: string;
  // Seasons
  kharifSeason: string;
  rabiSeason: string;
  summerSeason: string;
  // Experience levels
  beginner: string;
  intermediate: string;
  expert: string;
  
  // Chat and AI
  chatWithAI: string;
  typeMessage: string;
  send: string;
  voiceInput: string;
  
  // User interface
  login: string;
  register: string;
  logout: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  update: string;
  
  // Farm management
  expertConsultation: string;
  
  // Common phrases
  loading: string;
  error: string;
  success: string;
  addedToCropTracker: string;
  errorAddingToTracker: string;
  failedToGetRecommendations: string;
  
  // Crop Tracker - New Keys Only
  monitorCropsFromSeedToHarvest: string;
  upcomingTasks: string;
  totalFields: string;
  totalArea: string;
  pendingTasks: string;
  addNewCrop: string;
  addYourFirstCrop: string;
  startTrackingCropsMessage: string;
  growthProgress: string;
  currentStage: string;
  activityTimeline: string;
  day: string;
  logIrrigation: string;
  addActivity: string;
  viewDetails: string;
  remove: string;
  markDone: string;
  scheduleTask: string;
  reschedule: string;
  scheduleYourFirstTask: string;
  refreshing: string;
  dataRefreshed: string;
  cropTrackingDataUpdated: string;
  failedToRefreshData: string;
  cropRemoved: string;
  cropRemovedMessage: string;
  failedToRemoveCrop: string;
  removeCropFromTracker: string;
  removeCropConfirmMessage: string;
  removeCrop: string;
  removing: string;
  taskCompleted: string;
  taskCompletedMessage: string;
  failedToMarkTaskDone: string;
  noUpcomingTasksScheduled: string;
  average: string;
  upcoming: string;
  overdue: string;
  due: string;
  scheduled: string;
  acres: string;
  
  noData: string;
  selectOption: string;
  
  // Agricultural terms
  irrigation: string;
  fertilizer: string;
  harvest: string;
  planting: string;
  pest: string;
  yield: string;
  
  // Location and geography
  location: string;
  district: string;
  state: string;
  country: string;
  
  // Time and dates
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

// Translation data for different languages
const translations: Record<string, Translations> = {
  en: {
    // Navigation and common
    home: 'Home',
    weather: 'Weather',
    crops: 'Crops',
    marketplace: 'Marketplace',
    chat: 'Chat',
    profile: 'Profile',
    settings: 'Settings',
    
    // Landing page
    welcomeTitle: 'KrishiMitra',
    welcomeSubtitle: 'Your AI-Powered Smart Farming Assistant',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    landingDescription: 'Get personalized crop recommendations, weather insights, and expert farming advice in your local language',
    
    // Navigation items
    cropRecommendation: 'Crop Recommendation',
    weatherForecast: 'Weather Forecast',
    cropTracker: 'Crop Tracker',
    diseaseDetection: 'Disease Detection',
    marketPrices: 'Market Prices',
    farmRecords: 'Farm Records',
    expertCall: 'Expert Call',
    chatbot: 'Chatbot',
    
    // Home page
    smartFarmingAssistant: 'Smart Farming Assistant',
    farmOverview: 'Farm Overview',
    myCrops: 'My Crops',
    aiPoweredInsights: 'AI-Powered Insights',
    noCropsTrackedYet: 'No crops tracked yet',
    startTrackingCrops: 'Start tracking your crops to see them here',
    addFirstCrop: 'Add Your First Crop',
    loadingCrops: 'Loading crops...',
    optimalPlanting: 'Optimal Planting',
    basedOnSoilWeather: 'Based on soil & weather data',
    diseasePrevention: 'Disease Prevention',
    earlyWarningSystem: 'Early warning system',
    yieldPrediction: 'Yield Prediction',
    mlBasedForecasting: 'ML-based forecasting',
    
    // Stats Overview
    activeCrops: 'Active Crops',
    avgYield: 'Avg Yield',
    soilHealth: 'Soil Health',
    waterUsage: 'Water Usage',
    fromLastSeason: 'from last season',
    vsTargetYield: 'vs target yield',
    npkBalanced: 'NPK balanced',
    efficientUsage: 'efficient usage',
    good: 'Good',
    excellent: 'Excellent',
    poor: 'Poor',
    warning: 'Warning',
    
    // Weather page
    today: 'Today',
    tomorrow: 'Tomorrow',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    rainfall: 'Rainfall',
    selectLocation: 'Select Location',
    currentWeather: 'Current Weather',
    forecast: 'Forecast',
    sunny: 'Sunny',
    cloudy: 'Cloudy',
    rainy: 'Rainy',
    noLocationSet: 'No location set',
    selectYourLocation: 'Select Your Location',
    chooseLocationForWeather: 'Choose your location to get accurate weather forecasts',
    setLocationToView: 'Set your location to view weather data',
    weatherDataNotAvailable: 'Weather data not available',
    refresh: 'Refresh',
    tryAgain: 'Try Again',
    changeLocation: 'Change Location',
    lastUpdated: 'Last updated',
    nextUpdateIn: 'Next update in 15 min',
    updatingWeatherData: 'Updating weather data...',
    justNow: 'Just now',
    minuteAgo: '1 minute ago',
    minutesAgo: 'minutes ago',
    recently: 'Recently',
    
    // Crop recommendations
    cropRecommendations: 'Crop Recommendations',
    recommendedCrops: 'Recommended Crops',
    soilType: 'Soil Type',
    season: 'Season',
    cropRecommendationSystem: 'Crop Recommendation System',
    aiPoweredCropSuggestions: 'Get AI-powered crop suggestions based on your soil and climate parameters',
    soilClimateParameters: 'Soil & Climate Parameters',
    enterSoilTestResults: 'Enter your soil test results and climate information to get personalized crop recommendations',
    soilParameters: 'Soil Parameters',
    phLevel: 'pH Level',
    nitrogen: 'Nitrogen (N)',
    phosphorus: 'Phosphorus (P)',
    potassium: 'Potassium (K)',
    climateParameters: 'Climate Parameters',
    averageTemperature: 'Average Temperature (°C)',
    averageHumidity: 'Average Humidity (%)',
    expectedRainfall: 'Expected Rainfall (mm)',
    farmInformation: 'Farm Information',
    farmDetails: 'Farm Details',
    farmSize: 'Farm Size (hectares)',
    farmingExperience: 'Farming Experience',
    experienceLevel: 'Experience Level',
    selectSeason: 'Select Season',
    getRecommendations: 'Get Recommendations',
    getCropRecommendations: 'Get Crop Recommendations',
    analyzing: 'Analyzing',
    locationUpdated: 'Location Updated!',
    analysis: 'Analysis',
    warnings: 'Warnings',
    tips: 'Tips',
    basedOnSoilClimate: 'Based on your soil and climate parameters',
    showingDiverseCrops: 'Showing diverse crops',
    soilClimateUpdatedFor: 'Soil and climate parameters have been updated for',
    confidenceScore: 'Confidence Score',
    addToTracker: 'Add to Tracker',
    addedToTracker: 'Added to Tracker',
    redSoil: 'Red Soil',
    blackSoil: 'Black Soil',
    alluvialSoil: 'Alluvial Soil',
    sandySoil: 'Sandy Soil',
    loamySoil: 'Loamy Soil',
    lateriteSoil: 'Laterite Soil',
    kharifSeason: 'Kharif (Monsoon)',
    rabiSeason: 'Rabi (Winter)',
    summerSeason: 'Summer',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    expert: 'Expert',
    
    // Chat and AI
    chatWithAI: 'Chat with AI',
    typeMessage: 'Type your message...',
    send: 'Send',
    voiceInput: 'Voice Input',
    
    // User interface
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    update: 'Update',
    
    // Farm management
    expertConsultation: 'Expert Consultation',
    
    // Common phrases
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    addedToCropTracker: 'added to your Crop Tracker!',
    errorAddingToTracker: 'Something went wrong while adding to tracker.',
    failedToGetRecommendations: 'Failed to get recommendations',
    
    // Crop Tracker - New Keys
    monitorCropsFromSeedToHarvest: 'Monitor your crops from seed to harvest',
    upcomingTasks: 'Upcoming Tasks',
    totalFields: 'Total Fields',
    totalArea: 'Total Area',
    pendingTasks: 'Pending Tasks',
    addNewCrop: 'Add New Crop',
    addYourFirstCrop: 'Add Your First Crop',
    startTrackingCropsMessage: 'Start tracking your crops to monitor their progress from seed to harvest',
    growthProgress: 'Growth Progress',
    currentStage: 'Current Stage',
    activityTimeline: 'Activity Timeline',
    day: 'Day',
    logIrrigation: 'Log Irrigation',
    addActivity: 'Add Activity',
    viewDetails: 'View Details',
    remove: 'Remove',
    markDone: 'Mark Done',
    scheduleTask: 'Schedule Task',
    reschedule: 'Reschedule',
    scheduleYourFirstTask: 'Schedule Your First Task',
    refreshing: 'Refreshing',
    dataRefreshed: 'Data refreshed',
    cropTrackingDataUpdated: 'Crop tracking data has been updated with latest information.',
    failedToRefreshData: 'Failed to refresh data. Please try again.',
    cropRemoved: 'Crop Removed',
    cropRemovedMessage: 'has been successfully removed from your tracker.',
    failedToRemoveCrop: 'Failed to remove crop.',
    removeCropFromTracker: 'Remove Crop from Tracker?',
    removeCropConfirmMessage: 'This action cannot be undone and will permanently delete all associated activities and progress data.',
    removeCrop: 'Remove Crop',
    removing: 'Removing',
    taskCompleted: 'Task Completed',
    taskCompletedMessage: 'has been marked as completed.',
    failedToMarkTaskDone: 'Failed to mark task as done.',
    noUpcomingTasksScheduled: 'No upcoming tasks scheduled',
    average: 'Average',
    upcoming: 'Upcoming',
    overdue: 'Overdue',
    due: 'Due',
    scheduled: 'Scheduled',
    acres: 'acres',
    
    noData: 'No data available',
    selectOption: 'Select an option',
    
    // Agricultural terms
    irrigation: 'Irrigation',
    fertilizer: 'Fertilizer',
    harvest: 'Harvest',
    planting: 'Planting',
    pest: 'Pest',
    yield: 'Yield',
    
    // Location and geography
    location: 'Location',
    district: 'District',
    state: 'State',
    country: 'Country',
    
    // Time and dates
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  },
  
  hi: {
    // Navigation and common
    home: 'होम',
    weather: 'मौसम',
    crops: 'फसलें',
    marketplace: 'बाज़ार',
    chat: 'चैट',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    
    // Landing page
    welcomeTitle: 'कृषिमित्र',
    welcomeSubtitle: 'आपका AI-संचालित स्मार्ट कृषि सहायक',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    landingDescription: 'अपनी स्थानीय भाषा में व्यक्तिगत फसल सुझाव, मौसम की जानकारी और विशेषज्ञ कृषि सलाह प्राप्त करें',
    
    // Navigation items
    cropRecommendation: 'फसल सुझाव',
    weatherForecast: 'मौसम पूर्वानुमान',
    cropTracker: 'फसल ट्रैकर',
    diseaseDetection: 'बीमारी का पता लगाना',
    marketPrices: 'बाजार के भाव',
    farmRecords: 'खेत के रिकॉर्ड',
    expertCall: 'विशेषज्ञ कॉल',
    chatbot: 'चैटबॉट',
    
    // Home page
    smartFarmingAssistant: 'स्मार्ट कृषि सहायक',
    farmOverview: 'फार्म अवलोकन',
    myCrops: 'मेरी फसलें',
    aiPoweredInsights: 'AI-संचालित अंतर्दृष्टि',
    noCropsTrackedYet: 'अभी तक कोई फसल ट्रैक नहीं की गई',
    startTrackingCrops: 'यहां देखने के लिए अपनी फसलों को ट्रैक करना शुरू करें',
    addFirstCrop: 'अपनी पहली फसल जोड़ें',
    loadingCrops: 'फसलें लोड हो रही हैं...',
    optimalPlanting: 'इष्टतम रोपण',
    basedOnSoilWeather: 'मिट्टी और मौसम डेटा के आधार पर',
    diseasePrevention: 'रोग की रोकथाम',
    earlyWarningSystem: 'प्रारंभिक चेतावनी प्रणाली',
    yieldPrediction: 'उत्पादन पूर्वानुमान',
    mlBasedForecasting: 'ML-आधारित पूर्वानुमान',
    
    // Stats Overview
    activeCrops: 'सक्रिय फसलें',
    avgYield: 'औसत उत्पादन',
    soilHealth: 'मिट्टी का स्वास्थ्य',
    waterUsage: 'पानी का उपयोग',
    fromLastSeason: 'पिछले सीजन से',
    vsTargetYield: 'लक्षित उत्पादन के मुकाबले',
    npkBalanced: 'NPK संतुलित',
    efficientUsage: 'कुशल उपयोग',
    good: 'अच्छा',
    excellent: 'उत्कृष्ट',
    poor: 'खराब',
    warning: 'चेतावनी',
    
    // Weather page
    today: 'आज',
    tomorrow: 'कल',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    windSpeed: 'हवा की गति',
    rainfall: 'वर्षा',
    selectLocation: 'स्थान चुनें',
    currentWeather: 'वर्तमान मौसम',
    forecast: 'पूर्वानुमान',
    sunny: 'धूप',
    cloudy: 'बादल',
    rainy: 'बारिश',
    noLocationSet: 'कोई स्थान सेट नहीं',
    selectYourLocation: 'अपना स्थान चुनें',
    chooseLocationForWeather: 'सटीक मौसम पूर्वानुमान के लिए अपना स्थान चुनें',
    setLocationToView: 'मौसम डेटा देखने के लिए अपना स्थान सेट करें',
    weatherDataNotAvailable: 'मौसम डेटा उपलब्ध नहीं',
    refresh: 'रीफ्रेश',
    tryAgain: 'फिर कोशिश करें',
    changeLocation: 'स्थान बदलें',
    lastUpdated: 'अंतिम अपडेट',
    nextUpdateIn: 'अगला अपडेट 15 मिनट में',
    updatingWeatherData: 'मौसम डेटा अपडेट हो रहा है...',
    justNow: 'अभी',
    minuteAgo: '1 मिनट पहले',
    minutesAgo: 'मिनट पहले',
    recently: 'हाल ही में',
    
    // Crop recommendations
    cropRecommendations: 'फसल सुझाव',
    recommendedCrops: 'सुझाई गई फसलें',
    soilType: 'मिट्टी का प्रकार',
    season: 'मौसम',
    cropRecommendationSystem: 'फसल सुझाव प्रणाली',
    aiPoweredCropSuggestions: 'अपनी मिट्टी और जलवायु पैरामीटर के आधार पर AI-संचालित फसल सुझाव प्राप्त करें',
    soilClimateParameters: 'मिट्टी और जलवायु पैरामीटर',
    enterSoilTestResults: 'व्यक्तिगत फसल सुझाव प्राप्त करने के लिए अपनी मिट्टी परीक्षण परिणाम और जलवायु जानकारी दर्ज करें',
    soilParameters: 'मिट्टी के पैरामीटर',
    phLevel: 'pH स्तर',
    nitrogen: 'नाइट्रोजन (N)',
    phosphorus: 'फास्फोरस (P)',
    potassium: 'पोटेशियम (K)',
    climateParameters: 'जलवायु पैरामीटर',
    averageTemperature: 'औसत तापमान (°C)',
    averageHumidity: 'औसत आर्द्रता (%)',
    expectedRainfall: 'अपेक्षित वर्षा (mm)',
    farmInformation: 'खेत की जानकारी',
    farmDetails: 'खेत का विवरण',
    farmSize: 'खेत का आकार (हेक्टेयर)',
    farmingExperience: 'कृषि अनुभव',
    experienceLevel: 'अनुभव स्तर',
    selectSeason: 'मौसम चुनें',
    getRecommendations: 'सुझाव प्राप्त करें',
    getCropRecommendations: 'फसल सिफारिशें प्राप्त करें',
    analyzing: 'विश्लेषण कर रहे हैं',
    locationUpdated: 'स्थान अपडेट हो गया!',
    analysis: 'विश्लेषण',
    warnings: 'चेतावनी',
    tips: 'सुझाव',
    basedOnSoilClimate: 'आपकी मिट्टी और जलवायु पैरामीटर के आधार पर',
    showingDiverseCrops: 'विभिन्न फसलें दिखा रहे हैं',
    soilClimateUpdatedFor: 'मिट्टी और जलवायु पैरामीटर अपडेट हो गए हैं',
    confidenceScore: 'विश्वसनीयता स्कोर',
    addToTracker: 'ट्रैकर में जोड़ें',
    addedToTracker: 'ट्रैकर में जोड़ा गया',
    redSoil: 'लाल मिट्टी',
    blackSoil: 'काली मिट्टी',
    alluvialSoil: 'जलोढ़ मिट्टी',
    sandySoil: 'रेतीली मिट्टी',
    loamySoil: 'दोमट मिट्टी',
    lateriteSoil: 'लेटराइट मिट्टी',
    kharifSeason: 'खरीफ (मानसून)',
    rabiSeason: 'रबी (सर्दी)',
    summerSeason: 'गर्मी',
    beginner: 'शुरुआती',
    intermediate: 'मध्यम',
    expert: 'विशेषज्ञ',
    
    // Chat and AI
    chatWithAI: 'AI से चैट करें',
    typeMessage: 'अपना संदेश लिखें...',
    send: 'भेजें',
    voiceInput: 'आवाज़ इनपुट',
    
    // User interface
    login: 'लॉगिन',
    register: 'रजिस्टर',
    logout: 'लॉगआउट',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    update: 'अपडेट करें',
    
    // Farm management
    expertConsultation: 'विशेषज्ञ सलाह',
    
    // Common phrases
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    addedToCropTracker: 'आपके क्रॉप ट्रैकर में जोड़ दिया गया!',
    errorAddingToTracker: 'ट्रैकर में जोड़ते समय कुछ गलत हुआ।',
    failedToGetRecommendations: 'सिफारिशें प्राप्त करने में विफल',
    
    // Crop Tracker - New Keys
    monitorCropsFromSeedToHarvest: 'बीज से फसल तक अपनी फसलों की निगरानी करें',
    upcomingTasks: 'आगामी काम',
    totalFields: 'कुल खेत',
    totalArea: 'कुल क्षेत्रफल',
    pendingTasks: 'लंबित काम',
    addNewCrop: 'नई फसल जोड़ें',
    addYourFirstCrop: 'अपनी पहली फसल जोड़ें',
    startTrackingCropsMessage: 'बीज से फसल तक अपनी फसलों की प्रगति की निगरानी करने के लिए फसल ट्रैकिंग शुरू करें',
    growthProgress: 'विकास प्रगति',
    currentStage: 'वर्तमान स्तर',
    activityTimeline: 'गतिविधि समयरेखा',
    day: 'दिन',
    logIrrigation: 'सिंचाई लॉग करें',
    addActivity: 'गतिविधि जोड़ें',
    viewDetails: 'विवरण देखें',
    remove: 'हटाएं',
    markDone: 'पूरा किया',
    scheduleTask: 'काम निर्धारित करें',
    reschedule: 'पुनः निर्धारित करें',
    scheduleYourFirstTask: 'अपना पहला काम निर्धारित करें',
    refreshing: 'रिफ्रेश हो रहा है',
    dataRefreshed: 'डेटा रिफ्रेश हो गया',
    cropTrackingDataUpdated: 'फसल ट्रैकिंग डेटा नवीनतम जानकारी के साथ अपडेट हो गया है।',
    failedToRefreshData: 'डेटा रिफ्रेश करने में विफल। कृपया पुनः प्रयास करें।',
    cropRemoved: 'फसल हटा दी गई',
    cropRemovedMessage: 'आपके ट्रैकर से सफलतापूर्वक हटा दिया गया है।',
    failedToRemoveCrop: 'फसल हटाने में विफल।',
    removeCropFromTracker: 'ट्रैकर से फसल हटाएं?',
    removeCropConfirmMessage: 'यह क्रिया पूर्ववत नहीं की जा सकती और सभी संबंधित गतिविधियों और प्रगति डेटा को स्थायी रूप से डिलीट कर देगी।',
    removeCrop: 'फसल हटाएं',
    removing: 'हटाया जा रहा है',
    taskCompleted: 'काम पूरा हो गया',
    taskCompletedMessage: 'पूरा होने का निशान लगाया गया है।',
    failedToMarkTaskDone: 'काम को पूरा करने का निशान लगाने में विफल।',
    noUpcomingTasksScheduled: 'कोई आगामी काम निर्धारित नहीं है',
    average: 'औसत',
    upcoming: 'आगामी',
    overdue: 'देर से',
    due: 'देय',
    scheduled: 'निर्धारित',
    acres: 'एकड़',
    
    noData: 'कोई डेटा उपलब्ध नहीं',
    selectOption: 'एक विकल्प चुनें',
    
    // Agricultural terms
    irrigation: 'सिंचाई',
    fertilizer: 'खाद',
    harvest: 'फसल कटाई',
    planting: 'बुवाई',
    pest: 'कीट',
    yield: 'उत्पादन',
    
    // Location and geography
    location: 'स्थान',
    district: 'जिला',
    state: 'राज्य',
    country: 'देश',
    
    // Time and dates
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात',
    monday: 'सोमवार',
    tuesday: 'मंगलवार',
    wednesday: 'बुधवार',
    thursday: 'गुरुवार',
    friday: 'शुक्रवार',
    saturday: 'शनिवार',
    sunday: 'रविवार',
  },
  
  te: {
    // Navigation and common
    home: 'హోమ్',
    weather: 'వాతావరణం',
    crops: 'పంటలు',
    marketplace: 'మార్కెట్',
    chat: 'చాట్',
    profile: 'ప్రొఫైల్',
    settings: 'సెట్టింగ్స్',
    
    // Landing page
    welcomeTitle: 'కృషిమిత్ర',
    welcomeSubtitle: 'మీ AI-శక్తితో కూడిన స్మార్ట్ వ్యవసాయ సహాయకుడు',
    getStarted: 'ప్రారంభించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    landingDescription: 'మీ స్థానిక భాషలో వ్యక్తిగత పంట సిఫార్సులు, వాతావరణ అంతర్దృష్టులు మరియు నిపుణుల వ్యవసాయ సలహాలను పొందండి',
    
    // Navigation items
    cropRecommendation: 'పంట సిఫార్సు',
    weatherForecast: 'వాతావరణ సూచన',
    cropTracker: 'పంట ట్రాకర్',
    diseaseDetection: 'వ్యాధి గుర్తింపు',
    marketPrices: 'మార్కెట్ ధరలు',
    farmRecords: 'వ్యవసాయ రికార్డులు',
    expertCall: 'నిపుణుల కాల్',
    chatbot: 'చాట్‌బాట్',
    
    // Home page
    smartFarmingAssistant: 'స్మార్ట్ వ్యవసాయ సహాయకుడు',
    farmOverview: 'వ్యవసాయ అవలోకనం',
    myCrops: 'నా పంటలు',
    aiPoweredInsights: 'AI-శక్తితో కూడిన అంతర్దృష్టులు',
    noCropsTrackedYet: 'ఇంకా ఎలాంటి పంటలు ట్రాక్ చేయలేదు',
    startTrackingCrops: 'ఇక్కడ చూడటానికి మీ పంటలను ట్రాక్ చేయడం ప్రారంభించండి',
    addFirstCrop: 'మీ మొదటి పంటను జోడించండి',
    loadingCrops: 'పంటలు లోడ్ అవుతున్నాయి...',
    optimalPlanting: 'సరైన విత్తనం',
    basedOnSoilWeather: 'మట్టి మరియు వాతావరణ డేటా ఆధారంగా',
    diseasePrevention: 'వ్యాధి నివారణ',
    earlyWarningSystem: 'ముందస్తు హెచ్చరిక వ్యవస్థ',
    yieldPrediction: 'దిగుబడి సూచన',
    mlBasedForecasting: 'ML-ఆధారిత సూచన',
    
    // Stats Overview
    activeCrops: 'క్రియాశీల పంటలు',
    avgYield: 'సగటు దిగుబడి',
    soilHealth: 'మట్టి ఆరోగ్యం',
    waterUsage: 'నీటి వాడకం',
    fromLastSeason: 'గత సీజన్ నుండి',
    vsTargetYield: 'లక్ష్య దిగుబడితో పోలిస్తే',
    npkBalanced: 'NPK సమతుల్యం',
    efficientUsage: 'సమర్థవంతమైన వాడకం',
    good: 'మంచిది',
    excellent: 'అద్భుతం',
    poor: 'పేలవం',
    warning: 'హెచ్చరిక',
    
    // Weather page
    today: 'ఈరోజు',
    tomorrow: 'రేపు',
    temperature: 'ఉష్ణోగ్రత',
    humidity: 'తేమ',
    windSpeed: 'గాలి వేగం',
    rainfall: 'వర్షపాతం',
    selectLocation: 'స్థానం ఎంచుకోండి',
    currentWeather: 'ప్రస్తుత వాతావరణం',
    forecast: 'సూచన',
    sunny: 'వెలుగుతున్న',
    cloudy: 'మేఘాలు',
    rainy: 'వర్షం',
    noLocationSet: 'స్థానం సెట్ చేయలేదు',
    selectYourLocation: 'మీ స్థానాన్ని ఎంచుకోండి',
    chooseLocationForWeather: 'ఖచ్చితమైన వాతావరణ అంచనాల కోసం మీ స్థానాన్ని ఎంచుకోండి',
    setLocationToView: 'వాతావరణ డేటాను చూడటానికి మీ స్థానాన్ని సెట్ చేయండి',
    weatherDataNotAvailable: 'వాతావరణ డేటా అందుబాటులో లేదు',
    refresh: 'రిఫ్రెష్',
    tryAgain: 'మళ్లీ ప్రయత్నించండి',
    changeLocation: 'స్థానం మార్చండి',
    lastUpdated: 'చివరిగా అప్‌డేట్ చేయబడింది',
    nextUpdateIn: 'తదుపరి అప్‌డేట్ 15 నిమిషాల్లో',
    updatingWeatherData: 'వాతావరణ డేటా అప్‌డేట్ అవుతోంది...',
    justNow: 'ఇప్పుడే',
    minuteAgo: '1 నిమిషం క్రితం',
    minutesAgo: 'నిమిషాల క్రితం',
    recently: 'ఇటీవల',
    
    // Crop recommendations
    cropRecommendations: 'పంట సిఫార్సులు',
    recommendedCrops: 'సిఫార్సు చేసిన పంటలు',
    soilType: 'మట్టి రకం',
    season: 'సీజన్',
    cropRecommendationSystem: 'పంట సిఫార్సు వ్యవస్థ',
    aiPoweredCropSuggestions: 'మీ మట్టి మరియు వాతావరణ పరామితుల ఆధారంగా AI-శక్తితో కూడిన పంట సూచనలను పొందండి',
    soilClimateParameters: 'మట్టి మరియు వాతావరణ పరామితులు',
    enterSoilTestResults: 'వ్యక్తిగత పంట సిఫార్సులను పొందడానికి మీ మట్టి పరీక్ష ఫలితాలు మరియు వాతావరణ సమాచారాన్ని నమోదు చేయండి',
    soilParameters: 'మట్టి పరామితులు',
    phLevel: 'pH స్థాయి',
    nitrogen: 'నైట్రోజన్ (N)',
    phosphorus: 'ఫాస్పరస్ (P)',
    potassium: 'పొటాషియం (K)',
    climateParameters: 'వాతావరణ పరామితులు',
    averageTemperature: 'సగటు ఉష్ణోగ్రత (°C)',
    averageHumidity: 'సగటు తేమ (%)',
    expectedRainfall: 'ఊహించిన వర్షపాతం (mm)',
    farmInformation: 'వ్యవసాయ సమాచారం',
    farmDetails: 'వ్యవసాయ వివరాలు',
    farmSize: 'వ్యవసాయ భూమి పరిమాణం (హెక్టార్లు)',
    farmingExperience: 'వ్యవసాయ అనుభవం',
    experienceLevel: 'అనుభవ స్థాయి',
    selectSeason: 'సీజన్ ఎంచుకోండి',
    getRecommendations: 'సిఫార్సులను పొందండి',
    getCropRecommendations: 'పంట సిఫార్సులను పొందండి',
    analyzing: 'విశ్లేషిస్తోంది',
    locationUpdated: 'స్థానం అప్‌డేట్ చేయబడింది!',
    soilClimateUpdatedFor: 'మట్టి మరియు వాతావరణ పరామితులు అప్‌డేట్ చేయబడ్డాయి',
    confidenceScore: 'నమ్మకం స్కోర్',
    addToTracker: 'ట్రాకర్‌కు జోడించు',
    addedToTracker: 'ట్రాకర్‌కు జోడించబడింది',
    redSoil: 'ఎర్ర మట్టి',
    blackSoil: 'నల్ల మట్టి',
    alluvialSoil: 'వరద మట్టి',
    sandySoil: 'ఇసుక మట్టి',
    loamySoil: 'మట్టి',
    lateriteSoil: 'లేటరైట్ మట్టి',
    kharifSeason: 'ఖరీఫ్ (వర్షాకాలం)',
    rabiSeason: 'రబీ (శీతాకాలం)',
    summerSeason: 'వేసవి',
    beginner: 'ప్రారంభకుడు',
    intermediate: 'మధ్యస్థ',
    expert: 'నిపుణుడు',
    analysis: 'విశ్లేషణ',
    warnings: 'యెచ్చరికలు',
    tips: 'సలహాలు',
    basedOnSoilClimate: 'మీ మాటి మరియు వాతావరణ పరామితుల ఆధారంగా',
    showingDiverseCrops: 'వివిధ పంటలను చూపిస్తోంది',
    
    // Chat and AI
    chatWithAI: 'AI తో చాట్ చేయండి',
    typeMessage: 'మీ సందేశాన్ని టైప్ చేయండి...',
    send: 'పంపండి',
    voiceInput: 'వాయిస్ ఇన్‌పుట్',
    
    // User interface
    login: 'లాగిన్',
    register: 'రిజిస్టర్',
    logout: 'లాగౌట్',
    save: 'సేవ్',
    cancel: 'రద్దు',
    delete: 'తొలగించు',
    edit: 'ఎడిట్',
    update: 'అప్‌డేట్',
    
    // Farm management
    expertConsultation: 'నిపుణుల సలహా',
    
    // Common phrases
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయం',
    addedToCropTracker: 'మీ పంట ట్రాకర్‌లో చేర్చబడింది!',
    errorAddingToTracker: 'ట్రాకర్‌లో చేర్చడానికి ఏదో తప్పు అయ్యింది।',
    failedToGetRecommendations: 'సిఫార్సులను పొందడానికి విఫలమైంది',
    
    // Crop Tracker - New Keys
    monitorCropsFromSeedToHarvest: 'విత్తనం నుండి పంట వరకు మీ పంటలను మానిటర్ చేయండి',
    upcomingTasks: 'వచ్చే కార్యాలు',
    totalFields: 'మొత్తం పండ్లు',
    totalArea: 'మొత్తం వీడెపు',
    pendingTasks: 'బాకీ ఉన్న కార్యాలు',
    addNewCrop: 'కొత్త పంట చేర్చండి',
    addYourFirstCrop: 'మీ ముందు పంట చేర్చండి',
    startTrackingCropsMessage: 'విత్తనం నుండి పంట వరకు వారి ప్రగతిని మానిటర్ చేయడానికి మీ పంటల ట్రాకింగ్ ప్రారంభించండి',
    growthProgress: 'వృద్ధి ప్రగతి',
    currentStage: 'ప్రస్తుత దశ',
    activityTimeline: 'కార్యకలాప సమయ రేఖ',
    day: 'రోజు',
    logIrrigation: 'నీటిపారుదల లాగ్',
    addActivity: 'కార్యకలాపం చేర్చండి',
    viewDetails: 'వివరాలను చూడండి',
    remove: 'తీసివేయండి',
    markDone: 'పూర్తి అయ్యింది',
    scheduleTask: 'కార్యం షెడ్యూల్ చేయండి',
    reschedule: 'మరలా షెడ్యూల్ చేయండి',
    scheduleYourFirstTask: 'మీ ముందు కార్యం షెడ్యూల్ చేయండి',
    refreshing: 'రిఫ్రెష్ అవుతోంది',
    dataRefreshed: 'డేటా రిఫ్రెష్ అయ్యింది',
    cropTrackingDataUpdated: 'పంట ట్రాకింగ్ డేటా కొత్త సమాచారంతో అప్‌డేట్ అయ్యింది।',
    failedToRefreshData: 'డేటా రిఫ్రెష్ చేయడానికి విఫలమైంది। దయచేసి మరలా ప్రయత్నించండి।',
    cropRemoved: 'పంట తీసివేయబడింది',
    cropRemovedMessage: 'మీ ట్రాకర్ నుండి విజయవంతంగా తీసివేయబడింది।',
    failedToRemoveCrop: 'పంట తీసివేయడానికి విఫలమైంది।',
    removeCropFromTracker: 'ట్రాకర్ నుండి పంట తీసివేయాలా?',
    removeCropConfirmMessage: 'ఈ క్రియ రద్దు చేయలేదు మరియు అనుబంధిత అన్ని కార్యకలాపాలు మరియు ప్రగతి డేటాను స్థాయీగా డిలీట్ చేస్తుంది।',
    removeCrop: 'పంట తీసివేయండి',
    removing: 'తీసివేస్తోంది',
    taskCompleted: 'కార్యం పూర్తి అయ్యింది',
    taskCompletedMessage: 'పూర్తి అయ్యిందిగా గుర్తు చేయబడింది।',
    failedToMarkTaskDone: 'కార్యం పూర్తి అయ్యిందిగా గుర్తు చేయడానికి విఫలమైంది।',
    noUpcomingTasksScheduled: 'వచ్చే కార్యాలు షెడ్యూల్ చేయలేదు',
    average: 'సరాసరి',
    upcoming: 'వచ్చేది',
    overdue: 'తరువాత',
    due: 'దేయ',
    scheduled: 'షెడ్యూల్ అయ్యింది',
    acres: 'ఏకర్లు',
    
    noData: 'డేటా అందుబాటులో లేదు',
    selectOption: 'ఒక ఎంపికను ఎంచుకోండి',
    
    // Agricultural terms
    irrigation: 'నీటిపారుదల',
    fertilizer: 'ఎరువు',
    harvest: 'పంట కోత',
    planting: 'విత్తనలు',
    pest: 'కీటకాలు',
    yield: 'దిగుబడి',
    
    // Location and geography
    location: 'స్థానం',
    district: 'జిల్లా',
    state: 'రాష్ట్రం',
    country: 'దేశం',
    
    // Time and dates
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి',
    monday: 'సోమవారం',
    tuesday: 'మంగళవారం',
    wednesday: 'బుధవారం',
    thursday: 'గురువారం',
    friday: 'శుక్రవారం',
    saturday: 'శనివారం',
    sunday: 'ఆదివారం',
  },
  
  sat: {
    // Navigation and common (Santali)
    home: 'ᱚᱲᱟᱜ',
    weather: 'ᱦᱚᱭ ᱫᱟᱜ',
    crops: 'ᱠᱷᱮᱛ ᱡᱚ',
    marketplace: 'ᱦᱟᱴ',
    chat: 'ᱨᱚᱲ',
    profile: 'ᱪᱷᱟᱵᱤ',
    settings: 'ᱥᱟᱡᱟᱣ',
    
    // Landing page
    welcomeTitle: 'ᱠᱨᱤᱥᱤᱢᱤᱛᱨᱚ',
    welcomeSubtitle: 'ᱟᱢᱟᱜ AI ᱥᱢᱟᱨᱴ ᱠᱷᱮᱛ ᱜᱚᱲᱚ',
    getStarted: 'ᱮᱛᱦᱚᱵ ᱢᱮ',
    learnMore: 'ᱰᱷᱮᱨ ᱵᱟᱰᱟᱭ ᱢᱮ',
    landingDescription: 'ᱟᱢᱟᱜ ᱴᱷᱟᱶᱟᱜ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱱᱤᱡᱚᱨ ᱠᱷᱮᱛ ᱵᱟᱛᱟᱣ, ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱟᱨ ᱜᱮᱭᱟᱱᱤᱭᱟᱜ ᱠᱷᱮᱛ ᱠᱟᱛᱷᱟ ᱧᱟᱢ ᱢᱮ',
    
    // Navigation items
    cropRecommendation: 'ᱠᱷᱮᱛ ᱵᱟᱛᱟᱣ',
    weatherForecast: 'ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ',
    cropTracker: 'ᱠᱷᱮᱛ ᱯᱟᱧᱡᱟᱭ',
    diseaseDetection: 'ᱨᱩᱣᱟᱹ ᱥᱮᱸᱫᱨᱟ',
    marketPrices: 'ᱦᱟᱴ ᱫᱟᱢ',
    farmRecords: 'ᱠᱷᱮᱛ ᱠᱷᱚᱛᱟ',
    expertCall: 'ᱜᱮᱭᱟᱱᱤ ᱜᱟᱞᱢᱟᱨᱟᱣ',
    chatbot: 'ᱠᱟᱛᱷᱟᱵᱟᱨᱛᱟ ᱥᱟᱢᱴᱟᱣ',
    
    // Home page
    smartFarmingAssistant: 'ᱥᱢᱟᱨᱴ ᱠᱷᱮᱛ ᱜᱚᱲᱚ',
    farmOverview: 'ᱠᱷᱮᱛ ᱧᱮᱞ',
    myCrops: 'ᱤᱧᱟᱜ ᱠᱷᱮᱛ ᱠᱚ',
    aiPoweredInsights: 'AI ᱥᱚᱠᱛᱤ ᱟᱱᱛᱮ ᱵᱟᱰᱟᱭ',
    noCropsTrackedYet: 'ᱵᱟᱝ ᱜᱮ ᱠᱷᱮᱛ ᱠᱚ ᱯᱟᱧᱡᱟ ᱟᱠᱟᱱᱟ',
    startTrackingCrops: 'ᱤᱧᱟᱜ ᱠᱷᱮᱛ ᱠᱚ ᱯᱟᱧᱡᱟᱭ ᱢᱮ ᱱᱚᱸᱰᱮ ᱧᱮᱞ ᱞᱟᱹᱜᱤᱫ',
    addFirstCrop: 'ᱯᱩᱭᱞᱩ ᱠᱷᱮᱛ ᱥᱮᱞᱮᱫ ᱢᱮ',
    loadingCrops: 'ᱠᱷᱮᱛ ᱠᱚ ᱞᱟᱫᱮ ᱠᱟᱱᱟ...',
    optimalPlanting: 'ᱵᱮᱥ ᱵᱟᱞᱟᱭ',
    basedOnSoilWeather: 'ᱢᱟᱴᱤ ᱟᱨ ᱦᱚᱭ ᱫᱟᱜ ᱠᱷᱚᱱ',
    diseasePrevention: 'ᱨᱩᱣᱟᱹ ᱯᱷᱮᱰ',
    earlyWarningSystem: 'ᱚᱠᱛᱚᱨᱮ ᱦᱩᱞᱢᱟᱹᱱ',
    yieldPrediction: 'ᱚᱨᱡᱚ ᱞᱮᱠᱷᱟ',
    mlBasedForecasting: 'ML ᱠᱷᱚᱱ ᱞᱮᱠᱷᱟ',
    
    // Stats Overview
    activeCrops: 'ᱠᱟᱹᱢᱤᱭᱟᱜ ᱠᱷᱮᱛ ᱠᱚ',
    avgYield: 'ᱢᱚᱬᱮ ᱚᱨᱡᱚ',
    soilHealth: 'ᱢᱟᱴᱤ ᱵᱟᱹᱲᱛᱤ',
    waterUsage: 'ᱫᱟᱜ ᱵᱮᱵᱷᱟᱨ',
    fromLastSeason: 'ᱢᱟᱬᱟᱝ ᱨᱤᱛᱩ ᱠᱷᱚᱱ',
    vsTargetYield: 'ᱞᱟᱹᱠᱛᱤ ᱚᱨᱡᱚ ᱨᱮ',
    npkBalanced: 'NPK ᱥᱚᱢᱟᱱ',
    efficientUsage: 'ᱥᱚᱨᱮᱥ ᱵᱮᱵᱷᱟᱨ',
    good: 'ᱵᱟᱹᱲᱛᱤ',
    excellent: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ',
    poor: 'ᱟᱥᱚᱞ',
    warning: 'ᱦᱩᱞᱢᱟᱹᱱ',
    
    // Weather page
    today: 'ᱛᱮᱦᱮᱧ',
    tomorrow: 'ᱵᱷᱟᱜᱮ',
    temperature: 'ᱞᱚᱞᱚ ᱪᱟᱞᱟᱜ',
    humidity: 'ᱫᱟᱜ ᱨᱮᱭᱟᱲ',
    windSpeed: 'ᱦᱚᱭ ᱞᱚᱦᱚᱨ',
    rainfall: 'ᱫᱟᱜ ᱡᱟᱹᱯᱩᱫ',
    selectLocation: 'ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    currentWeather: 'ᱱᱤᱛᱚᱜᱟᱜ ᱦᱚᱭ ᱫᱟᱜ',
    forecast: 'ᱞᱮᱠᱷᱟ ᱡᱚᱠᱷᱟ',
    sunny: 'ᱧᱤᱫᱟᱹ',
    cloudy: 'ᱨᱟᱹᱯᱩᱫ',
    rainy: 'ᱫᱟᱜ ᱡᱟᱹᱯᱩᱫ',
    noLocationSet: 'ᱴᱷᱟᱶ ᱵᱟᱝ ᱥᱟᱡᱟᱣ',
    selectYourLocation: 'ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    chooseLocationForWeather: 'ᱥᱚᱴᱷᱤᱠ ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱞᱟᱹᱜᱤᱫ ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    setLocationToView: 'ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱧᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱟᱶ ᱥᱟᱡᱟᱣ ᱢᱮ',
    weatherDataNotAvailable: 'ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱵᱟᱹᱱᱩᱜ',
    refresh: 'ᱱᱟᱶᱟ ᱢᱮ',
    tryAgain: 'ᱫᱩᱦᱲᱟᱹ ᱠᱩᱨᱩᱢᱩᱴᱩ ᱢᱮ',
    changeLocation: 'ᱴᱷᱟᱶ ᱵᱚᱫᱚᱞ ᱢᱮ',
    lastUpdated: 'ᱢᱩᱪᱟᱹᱫ ᱱᱟᱶᱟ',
    nextUpdateIn: 'ᱫᱚᱥᱟᱨ ᱱᱟᱶᱟ ᱑᱕ ᱴᱤᱯᱤᱡ ᱨᱮ',
    updatingWeatherData: 'ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱱᱟᱶᱟᱜ ᱠᱟᱱᱟ...',
    justNow: 'ᱱᱤᱛᱚᱜ',
    minuteAgo: '᱑ ᱴᱤᱯᱤᱡ ᱞᱟᱦᱟ',
    minutesAgo: 'ᱴᱤᱯᱤᱡ ᱞᱟᱦᱟ',
    recently: 'ᱱᱤᱛᱚᱜᱟᱜ',
    
    // Crop recommendations
    cropRecommendations: 'ᱠᱷᱮᱛ ᱠᱚ ᱵᱟᱛᱟᱣ',
    recommendedCrops: 'ᱵᱟᱛᱟᱣ ᱠᱷᱮᱛ ᱠᱚ',
    soilType: 'ᱢᱟᱴᱤ ᱡᱟᱹᱛ',
    season: 'ᱨᱤᱛᱩ',
    cropRecommendationSystem: 'ᱠᱷᱮᱛ ᱵᱟᱛᱟᱣ ᱵᱮᱵᱚᱥᱛᱷᱟ',
    aiPoweredCropSuggestions: 'ᱟᱢᱟᱜ ᱢᱟᱴᱤ ᱟᱨ ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱞᱮᱠᱟᱛᱮ AI ᱠᱷᱮᱛ ᱵᱟᱛᱟᱣ ᱧᱟᱢ ᱢᱮ',
    soilClimateParameters: 'ᱢᱟᱴᱤ ᱟᱨ ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ',
    enterSoilTestResults: 'ᱱᱤᱡᱚᱨ ᱠᱷᱮᱛ ᱵᱟᱛᱟᱣ ᱧᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱢᱟᱴᱤ ᱯᱟᱨᱠᱷᱟ ᱟᱨ ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱮᱢ ᱢᱮ',
    soilParameters: 'ᱢᱟᱴᱤ ᱞᱮᱠᱷᱟ',
    phLevel: 'pH ᱞᱮᱵᱟᱞ',
    nitrogen: 'ᱱᱟᱭᱴᱨᱚᱡᱮᱱ (N)',
    phosphorus: 'ᱯᱷᱥᱯᱷᱚᱨᱚᱥ (P)',
    potassium: 'ᱯᱚᱴᱟᱥᱤᱭᱚᱢ (K)',
    climateParameters: 'ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ',
    averageTemperature: 'ᱥᱤᱫ ᱞᱚᱞᱚ ᱪᱟᱞᱟᱜ (°C)',
    averageHumidity: 'ᱥᱤᱫ ᱫᱟᱜ ᱨᱮᱭᱟᱲ (%)',
    expectedRainfall: 'ᱛᱟᱯᱟᱜ ᱫᱟᱜ ᱡᱟᱹᱯᱩᱫ (mm)',
    farmInformation: 'ᱠᱷᱮᱛ ᱞᱮᱠᱷᱟ',
    farmDetails: 'ᱠᱷᱮᱛ ᱵᱤᱥᱛᱟᱹᱨ',
    farmSize: 'ᱠᱷᱮᱛ ᱢᱟᱯ (ᱦᱮᱠᱴᱚᱨ)',
    farmingExperience: 'ᱠᱷᱮᱛ ᱞᱟᱹᱠᱛᱤ',
    experienceLevel: 'ᱞᱟᱹᱠᱛᱤ ᱞᱮᱵᱚᱞ',
    selectSeason: 'ᱨᱤᱛᱩ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    getRecommendations: 'ᱵᱟᱛᱟᱣ ᱧᱟᱢ ᱢᱮ',
    getCropRecommendations: 'ᱞᱟᱥᱮᱨ ᱵᱟᱛᱟᱣ ᱧᱟᱢ ᱢᱮ',
    analyzing: 'ᱵᱤᱪᱟᱹᱨ ᱞᱮ',
    locationUpdated: 'ᱴᱷᱟᱶ ᱱᱟᱶᱟ ᱦᱩᱭ ᱮᱱᱟ!',
    soilClimateUpdatedFor: 'ᱢᱟᱴᱤ ᱟᱨ ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱱᱟᱶᱟ ᱦᱩᱭ ᱮᱱᱟ',
    confidenceScore: 'ᱵᱷᱚᱨᱚᱥᱟ ᱞᱮᱠᱷᱟ',
    addToTracker: 'ᱯᱟᱧᱡᱟᱭ ᱨᱮ ᱥᱮᱞᱮᱫ ᱢᱮ',
    addedToTracker: 'ᱯᱟᱧᱡᱟᱭ ᱨᱮ ᱥᱮᱞᱮᱫ ᱮᱱᱟ',
    redSoil: 'ᱟᱨᱟᱜ ᱢᱟᱴᱤ',
    blackSoil: 'ᱦᱮᱸᱫᱮ ᱢᱟᱴᱤ',
    alluvialSoil: 'ᱯᱟᱨᱦᱟᱲ ᱢᱟᱴᱤ',
    sandySoil: 'ᱵᱟᱞᱤ ᱢᱟᱴᱤ',
    loamySoil: 'ᱢᱟᱨᱟᱝ ᱢᱟᱴᱤ',
    lateriteSoil: 'ᱞᱟᱴᱮᱨᱟᱭᱴ ᱢᱟᱴᱤ',
    kharifSeason: 'ᱠᱷᱚᱨᱤᱯ (ᱵᱚᱨᱥᱟ)',
    rabiSeason: 'ᱨᱚᱵᱤ (ᱨᱟᱵᱟᱝ)',
    summerSeason: 'ᱥᱤᱛᱩᱝ',
    beginner: 'ᱮᱛᱦᱚᱵᱤᱭᱟᱹ',
    intermediate: 'ᱛᱟᱞᱟ',
    expert: 'ᱜᱮᱭᱟᱱᱤ',
    analysis: 'ᱵᱤᱪᱟᱹᱨ',
    warnings: 'ᱥᱟᱜᱟᱫ',
    tips: 'ᱵᱟᱛᱟᱣ',
    basedOnSoilClimate: 'ᱟᱢᱟᱜ ᱢᱟᱴᱤ ᱟᱨ ᱦᱚᱭ ᱫᱟᱜ ᱞᱮᱠᱷᱟ ᱨᱮ',
    showingDiverseCrops: 'ᱵᱤᱱᱟᱤ ᱞᱟᱥᱮᱨ ᱩᱬᱵᱟᱺ ᱢᱮ',
    
    // Chat and AI
    chatWithAI: 'AI ᱥᱟᱶ ᱨᱚᱲ',
    typeMessage: 'ᱟᱢᱟᱜ ᱠᱷᱚᱵᱚᱨ ᱚᱞ...',
    send: 'ᱞᱟᱪᱷᱟ',
    voiceInput: 'ᱥᱟᱰᱮ ᱵᱚᱞᱚᱱ',
    
    // User interface
    login: 'ᱵᱚᱞᱚᱱ',
    register: 'ᱧᱩᱛᱩᱢ ᱚᱞ',
    logout: 'ᱵᱟᱦᱨᱮ',
    save: 'ᱫᱚᱦᱚ',
    cancel: 'ᱵᱟᱹᱰᱨᱟᱹ',
    delete: 'ᱚᱪᱚᱜ',
    edit: 'ᱥᱟᱯᱲᱟᱣ',
    update: 'ᱱᱟᱶᱟ',
    
    // Farm management
    expertConsultation: 'ᱜᱭᱟᱱᱤ ᱜᱚᱲᱚ',
    
    // Common phrases
    loading: 'ᱞᱟᱫᱮᱜ ᱠᱟᱱᱟ...',
    error: 'ᱦᱩᱞ',
    success: 'ᱠᱟᱹᱢᱤ ᱦᱩᱭ',
    addedToCropTracker: 'ᱟᱢᱟᱜ ᱪᱨᱚᱯ ᱴᱨᱮᱠᱚᱨ ᱨᱮ ᱥᱮᱞᱮᱫ ᱮᱱᱟ!',
    errorAddingToTracker: 'ᱴᱨᱮᱠᱚᱨ ᱨᱮ ᱥᱮᱞᱮᱫ ᱚᱠᱛᱚ ᱦᱩᱞ ᱦᱩᱭᱞᱮᱱᱟ᱾',
    failedToGetRecommendations: 'ᱵᱟᱛᱟᱣ ᱟᱨᱡᱟᱣ ᱨᱮ ᱦᱩᱞ ᱦᱩᱭᱞᱮᱱᱟ',
    
    // Crop Tracker - New Keys
    monitorCropsFromSeedToHarvest: 'ᱵᱤᱡ ᱘ᱟᱨ ᱠᱟᱴᱤ ᱦᱟᱛᱟᱣ ᱨᱮ ᱧᱤᱚᱞᱹᱨ ᱟᱢᱞ',
    upcomingTasks: 'ᱟᱜᱟᱢᱤ ᱠᱟᱢ',
    totalFields: 'ᱟᱬᱦᱟᱨᱩ ᱠᱟᱹᱠᱟᱦ',
    totalArea: 'ᱟᱬᱦᱟᱨᱩ ᱣᱟᱨᱠᱟ',
    pendingTasks: 'ᱵᱟᱛᱟᱣ ᱠᱟᱢ',
    addNewCrop: 'ᱱᱟᱣᱟ ᰦᱟᱥᱮᱨ ᱮᱢ ᱮ',
    addYourFirstCrop: 'ᱟᱢ ᱣᱟᱜ ᰪᱨᱚᰪ ᱮᱢ ᱮ',
    startTrackingCropsMessage: 'ᱵᱤᱡ ᱘ᱟᱨ ᱠᱟᱴᱤ ᱦᱟᱛᱟᱣ ᱨᱹᱠ ᰪᱨᱚᰪ ᱴᱨᱮᱠᱤᰂ ᱠᱟᱱᱮ',
    growthProgress: 'ᱵᱤᱨᱟᱭ ᱟᱜᱟᱣ',
    currentStage: 'ᱥᱩᰲ ᱨᱹᱠ',
    activityTimeline: 'ᱠᱟᱢ ᱱᱟᱶᱟ ᱨᱮᱠᱷᱟ',
    day: 'ᱥ᰿ᱱ',
    logIrrigation: 'ᱫᱟᱜ ᱮᱢ ᰲᱟᱜ',
    addActivity: 'ᱠᱟᱢ ᱮᱢ ᱮ',
    viewDetails: 'ᱲᱵ᰿ᱱᱨᱟᰲ ᱱᱮᰲ ᱮ',
    remove: 'ᱟᱪᱪᱟᱜ',
    markDone: 'ᱟᱦᱟᱱ ᱟᱦᱟᱱ',
    scheduleTask: 'ᱠᱟᱢ ᰷ᱧᱮᰡᱴᱵᰲ',
    reschedule: 'ᱟᱨᱧᱱ ᰷ᱧᱮᰡᱴᱵᰲ',
    scheduleYourFirstTask: 'ᱟᱢ ᰲᱩᰰ ᱣᱟᱜ ᱠᱟᱢ ᰷ᱧᱮᰡᱴᱵᰲ',
    refreshing: 'ᱱᱟᱣᱟ ᱦᱮ',
    dataRefreshed: 'ᰡᱮᰟᱟ ᱱᱟᱣᱟ ᱦᱩᰲ',
    cropTrackingDataUpdated: 'ᰪᱨᱚᰪ ᱴᱨᱮᱠᱤᰂ ᰡᱮᰟᱟ ᱱᱟᱣᱟ ᱦᱩᰲᱬᱹᱧ ᱮᰱᱟᱮ',
    failedToRefreshData: 'ᰡᱮᰟᱟ ᱨ᰿ᰫᱨᱮ᰷ ᱦᱩᰲ ᱦᱵᱭᰲᱩᱞᱤ ᱟᱨᱧᱩ ᱠᱩᰲᱹᱬ ᱢᱮ',
    cropRemoved: 'ᰪᱨᱚᰪ ᱟᱪᱪᱟᱜ ᱟᱠᱹᱨ',
    cropRemovedMessage: 'ᱟᱢ ᱴᱨᱮᱠᱚᱨ ᱘ᱟᱨ ᱱᱟᰲ ᱟᱪᱪᱟᱜ ᱟᱠᱹᱨ',
    failedToRemoveCrop: 'ᰪᱨᱚᰪ ᱟᱪᱪᱟᱜ ᱨᱮ ᱦᱩᰲ ᱦᱵᱭᰲᱮᱱᱟ',
    removeCropFromTracker: 'ᱴᱨᱮᱠᱚᱨ ᱘ᱟᱨ ᰪᱨᱚᰪ ᱟᱪᱪᱟᱜ?',
    removeCropConfirmMessage: 'ᱮᱱᱚ ᱢᱟᱨᱟᱢ ᱟᱨ᱑ᱹᱨ ᱟᰲ ᱨᱟᱶᱣ ᱟᱨᱧᱩ ᱫᱟᱧᱩᱧ᰿ᱱ ᱟᰲ ᱯᱨᱚᱠᱚᱮ᰸ ᱟᱱᱪᱟᱹᱜ ᱢᱮ',
    removeCrop: 'ᰪᱨᱚᰪ ᱟᱪᱪᱟᱜ',
    removing: 'ᱟᱪᱪᱟᱜ ᱟᱶᱟ',
    taskCompleted: 'ᱠᱟᱢ ᰷ᱟᱜᱟᱠ ᱦᱵᰲ',
    taskCompletedMessage: '᰷ᱟᱜᱟᱠ ᱦᱹᱜ ᱠᱞᱱᱟ ᱱᱮᱠ ᱢᱮ',
    failedToMarkTaskDone: 'ᱠᱟᱢ ᰷ᱟᱜᱟᱠ ᱦᱵᰲ ᱠᱮᱱᱟ ᱱᱮᱠ ᱦᱩᰲ ᱦᱵᱭᰲᱩᱞᱤ',
    noUpcomingTasksScheduled: 'ᱟᱜᱟᱢᱤ ᱠᱟᱢ ᰷ᱧᱮᰡᱴᱵᰲ ᱵᱟᱹᱱᱩᱜ',
    average: 'ᰦᱩᰲ ᱟᱣᱟᱜ',
    upcoming: 'ᱟᱜᱟᱢᱤ',
    overdue: 'ᰦ᱾ᱨ ᱟᱜᱟᱢ',
    due: 'ᱥᱮᱭ',
    scheduled: '᰷ᱧᱮᰡᱴᱵᰲ ᱦᱹᱜ',
    acres: 'ᰭ᰿ᱜᱷᱟ',
    
    noData: 'ᱪᱤᱱᱦᱟᱹ ᱵᱟᱹᱱᱩᱜ',
    selectOption: 'ᱢᱤᱫ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
    
    // Agricultural terms
    irrigation: 'ᱫᱟᱜ ᱮᱢ',
    fertilizer: 'ᱠᱷᱟᱫ',
    harvest: 'ᱠᱷᱮᱛ ᱠᱟᱴᱟᱣ',
    planting: 'ᱵᱤᱦᱚᱱ',
    pest: 'ᱠᱤᱰᱟᱹ',
    yield: 'ᱦᱟᱨᱟ ᱵᱟᱨᱟ',
    
    // Location and geography
    location: 'ᱡᱟᱭᱜᱟ',
    district: 'ᱦᱚᱱᱚᱛ',
    state: 'ᱯᱚᱱᱚᱛ',
    country: 'ᱫᱤᱥᱚᱢ',
    
    // Time and dates
    morning: 'ᱥᱮᱛᱟᱜ',
    afternoon: 'ᱢᱟᱺᱦᱤᱸ',
    evening: 'ᱧᱤᱫᱟᱹ',
    night: 'ᱧᱤᱫᱟᱹ',
    monday: 'ᱚᱛᱮ',
    tuesday: 'ᱵᱟᱞᱮ',
    wednesday: 'ᱥᱟᱹᱜᱩᱱ',
    thursday: 'ᱥᱟᱨᱦᱟᱣ',
    friday: 'ᱡᱟᱹᱨᱩᱵ',
    saturday: 'ᱧᱤᱫᱟᱹ',
    sunday: 'ᱚᱛᱮ',
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (languageCode: string) => void;
  t: (key: keyof Translations) => string;
  availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  // Load saved language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('km.selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail;
      if (translations[language]) {
        setCurrentLanguage(language);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const setLanguage = (languageCode: string) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('km.selectedLanguage', languageCode);
      
      // Dispatch event for language selector component
      window.dispatchEvent(new CustomEvent('languageChange', { 
        detail: { language: languageCode } 
      }));
    }
  };

  const t = (key: keyof Translations): string => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  const availableLanguages = Object.keys(translations);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;