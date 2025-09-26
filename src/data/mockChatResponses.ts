/**
 * Mock ChatBot Responses Data
 * Realistic farming-related responses for frontend development
 */

import { ChatBotResponse, QuickReply } from '../types/chatbot.types';

// Multi-language farming responses
export const mockChatResponses: Record<string, ChatBotResponse[]> = {
  // Crop-related responses
  crop: [
    {
      message: "## Crop Selection Guide 🌱\n\nFor optimal crop selection, I recommend considering these key factors:\n\n**Main Factors:**\n• **Soil Type** - Sandy, loamy, or clay\n• **Climate Conditions** - Temperature and rainfall patterns\n• **Market Demand** - Current and projected prices\n\n**Next Steps:**\n1. Test your soil pH and nutrient levels\n2. Check local weather forecasts\n3. Research market prices for different crops\n\n**Question:** What's your soil type - sandy, loamy, or clay?",
      confidence: 90,
      topic: "crop_selection",
      suggestions: ["Tell me about soil types", "Show market prices", "Weather forecast"],
      relatedActions: ["Check soil analysis", "View crop calendar", "Market trends"],
      followUpQuestions: ["What crops did you grow last season?", "Do you have soil test results?"]
    },
    {
      message: "## Market-Based Crop Recommendations 📈\n\n**Current Market Leaders:**\n• **Wheat** - ₹2,450/quintal (+8% growth)\n• **Mustard** - ₹5,200/quintal (+12% growth)\n\n**Important Note:**\n**⚠️ Crop Rotation is Essential** - Don't plant the same crop continuously as it depletes soil nutrients and increases pest problems.\n\n**Recommended Rotation:**\n1. **Kharif Season** - Rice/Cotton → **Rabi Season** - Wheat/Mustard\n2. Include legumes every 2-3 seasons to fix nitrogen",
      confidence: 85,
      topic: "crop_recommendation",
      suggestions: ["Crop rotation benefits", "Market analysis", "Fertilizer guide"],
      relatedActions: ["View crop tracker", "Check fertilizer prices", "Expert consultation"]
    },
    {
      message: "## Tomato Cultivation Guide 🍅\n\n**Soil Requirements:**\n• **pH Level:** 6.0-7.0 (slightly acidic to neutral)\n• **Type:** Well-drained, fertile soil\n• **Organic Matter:** Add 2-3 kg compost per plant\n\n**Planting Guidelines:**\n• **Row Spacing:** 60 cm between rows\n• **Plant Spacing:** 45 cm between plants\n• **Depth:** 1-2 cm deep for seeds\n\n**Pro Tips:**\n• Install support stakes early\n• Mulch around plants to retain moisture\n• Regular watering but avoid waterlogging",
      confidence: 95,
      topic: "crop_cultivation",
      suggestions: ["Tomato diseases", "Fertilizer schedule", "Harvest timing"],
      relatedActions: ["Disease detection", "Set reminders", "Track growth"]
    }
  ],

  // Weather-related responses
  weather: [
    {
      message: "## Weather Update & Farming Advice 🌧️\n\n**Forecast Alert:**\n• **Light rain expected** in 2-3 days\n• **Perfect timing** for sowing operations\n\n**Action Items:**\n1. **Complete sowing** before rain arrives\n2. **Avoid fertilizer application** 24-48 hours before rain\n3. **Prepare drainage** to prevent waterlogging\n\n**⚠️ Important:** Don't apply urea or DAP just before rain as it will wash away and waste money.",
      confidence: 88,
      topic: "weather_advice",
      suggestions: ["Sowing guide", "Fertilizer timing", "Irrigation planning"],
      relatedActions: ["View 7-day forecast", "Set weather alerts", "Crop calendar"]
    },
    {
      message: "## High Humidity Alert! 🌡️💨\n\n**Current Conditions:**\n• **Humidity Level:** 85% (High Risk)\n• **Disease Risk:** Fungal infections likely\n\n**Immediate Actions:**\n1. **Improve air circulation** - Remove weeds between rows\n2. **Preventive spraying** - Apply copper oxychloride\n3. **Monitor plants** daily for early symptoms\n\n**⚠️ Warning:** High humidity creates perfect conditions for blight, mildew, and other fungal diseases. Act now to prevent crop loss!",
      confidence: 92,
      topic: "weather_alert",
      suggestions: ["Fungal diseases", "Preventive measures", "Humidity control"],
      relatedActions: ["Disease detection", "Expert call", "Treatment guide"]
    }
  ],

  // Disease-related responses
  disease: [
    {
      message: "For leaf spots on tomatoes, it could be early blight or bacterial spot. Upload a clear photo for accurate diagnosis and treatment recommendations.",
      confidence: 87,
      topic: "disease_diagnosis",
      suggestions: ["Upload photo", "Common diseases", "Treatment options"],
      relatedActions: ["Disease detection", "Treatment tracker", "Expert consultation"],
      followUpQuestions: ["When did you first notice the symptoms?", "Is it spreading to other plants?"]
    },
    {
      message: "Yellowing leaves often indicate nutrient deficiency (nitrogen) or overwatering. Check soil moisture and consider soil testing.",
      confidence: 82,
      topic: "plant_health",
      suggestions: ["Soil testing", "Nutrient deficiency", "Watering guide"],
      relatedActions: ["Soil analysis", "Fertilizer calculator", "Irrigation planning"]
    }
  ],

  // Market-related responses
  market: [
    {
      message: "Current market prices: Wheat ₹2,450/quintal (+5% from last week), Rice ₹2,890/quintal (-2%). Best selling locations are nearby mandis.",
      confidence: 90,
      topic: "market_prices",
      suggestions: ["Price trends", "Best markets", "Transport options"],
      relatedActions: ["Market tracker", "Price alerts", "Buyer contacts"]
    }
  ],

  // General farming responses
  general: [
    {
      message: "# नमस्कार! 🌾 KrishiMitra में आपका स्वागत है!\n\nमैं आपका **AI कृषि सहायक** हूं। मैं इन सभी में आपकी मदद कर सकता हूं:\n\n**मुख्य सेवाएं:**\n• 🌱 **फसल चयन और सिफारिशें**\n• 🦠 **रोग निदान और उपचार**\n• 🌤️ **मौसम अपडेट और सलाह**\n• 💰 **बाजार की कीमतें और ट्रेंड्स**\n• 🧪 **मिट्टी और उर्वरक सलाह**\n\n**आज मैं आपकी कैसे मदद कर सकता हूं?**",
      confidence: 95,
      topic: "greeting",
      suggestions: ["Crop recommendations", "Weather forecast", "Disease help", "Market prices"],
      relatedActions: ["Start crop tracker", "View dashboard", "Expert consultation"]
    },
    {
      message: "Organic farming focuses on natural methods. Key practices include composting, crop rotation, biological pest control, and avoiding synthetic chemicals.",
      confidence: 90,
      topic: "organic_farming",
      suggestions: ["Composting guide", "Natural pesticides", "Certification process"],
      relatedActions: ["Organic tracker", "Natural remedies", "Certification help"]
    }
  ]
};

// Quick reply options in multiple languages
export const quickReplies: Record<string, QuickReply[]> = {
  en: [
    { id: 'greeting_1', text: 'Hello! Need farming help', category: 'greeting', language: 'en' },
    { id: 'crop_1', text: 'Crop recommendations', category: 'crop', language: 'en' },
    { id: 'weather_1', text: 'Weather forecast', category: 'weather', language: 'en' },
    { id: 'disease_1', text: 'Plant disease help', category: 'disease', language: 'en' },
    { id: 'market_1', text: 'Market prices', category: 'market', language: 'en' },
    { id: 'general_1', text: 'Organic farming tips', category: 'general', language: 'en' }
  ],
  hi: [
    { id: 'greeting_1_hi', text: 'नमस्ते! खेती में मदद चाहिए', category: 'greeting', language: 'hi' },
    { id: 'crop_1_hi', text: 'फसल की सिफारिशें', category: 'crop', language: 'hi' },
    { id: 'weather_1_hi', text: 'मौसम का पूर्वानुमान', category: 'weather', language: 'hi' },
    { id: 'disease_1_hi', text: 'पौधों की बीमारी की मदद', category: 'disease', language: 'hi' },
    { id: 'market_1_hi', text: 'बाजार की कीमतें', category: 'market', language: 'hi' },
    { id: 'general_1_hi', text: 'जैविक खेती के टिप्स', category: 'general', language: 'hi' }
  ],
  kn: [
    { id: 'greeting_1_kn', text: 'ನಮಸ್ಕಾರ! ಕೃಷಿ ಸಹಾಯ ಬೇಕು', category: 'greeting', language: 'kn' },
    { id: 'crop_1_kn', text: 'ಬೆಳೆ ಶಿಫಾರಸುಗಳು', category: 'crop', language: 'kn' },
    { id: 'weather_1_kn', text: 'ಹವಾಮಾನ ಮುನ್ನೋಟ', category: 'weather', language: 'kn' },
    { id: 'disease_1_kn', text: 'ಸಸ್ಯ ರೋಗ ಸಹಾಯ', category: 'disease', language: 'kn' },
    { id: 'market_1_kn', text: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು', category: 'market', language: 'kn' },
    { id: 'general_1_kn', text: 'ಸಾವಯವ ಕೃಷಿ ಸಲಹೆಗಳು', category: 'general', language: 'kn' }
  ]
};

// Comprehensive language-specific responses for all categories
export const languageResponses: Record<string, Record<string, any>> = {
  en: {
    welcome: "Welcome! I'm your AI farming assistant. How can I help you today?",
    listening: "I'm listening... Speak now",
    processing: "Processing your question...",
    error: "Sorry, I couldn't understand. Could you please rephrase?",
    offline: "You're offline. I'll respond with cached information.",
    voiceNotSupported: "Voice input is not supported in this browser.",
    
    // Comprehensive farming responses in English
    cropAdvice: "## 🌾 Complete Crop Cultivation Guide\n\n**Soil Preparation (Week 1-2):**\n• Conduct soil testing for pH, nitrogen, phosphorus, and potassium levels\n• Deep plowing to 8-10 inches depth for better root penetration\n• Add 5-7 tons of well-decomposed farmyard manure per acre\n• Level the field properly for uniform irrigation and drainage\n\n**Seed Selection & Sowing:**\n• Choose certified seeds with 85%+ germination rate\n• Treat seeds with fungicide (Carbendazim @ 2g/kg seed)\n• Maintain row-to-row spacing of 22-25 cm for cereals\n• Sow at 2-3 cm depth for optimal emergence\n\n**Fertilizer Management:**\n• Basal dose: DAP 100 kg + MOP 50 kg per acre\n• Top dressing: Urea 130 kg in 2-3 splits during active growth\n• Apply micronutrients (Zinc, Boron) if soil test indicates deficiency\n\n**Irrigation Schedule:**\n• First irrigation: 20-25 days after sowing (crown root initiation)\n• Second irrigation: 45-50 days (tillering stage for cereals)\n• Maintain field capacity at 80% throughout critical growth stages\n• Avoid waterlogging - ensure proper drainage channels\n\n**Pest & Disease Management:**\n• Monitor weekly for early pest detection\n• Use yellow sticky traps for aphids and whiteflies\n• Apply neem oil (5ml/liter) as preventive spray\n• IPM approach: Encourage beneficial insects\n\n**Expected Results:**\n• Germination: 85-90% within 7-10 days\n• Yield potential: 25-30 quintals per acre with proper management\n• Quality improvement: Higher protein content and market value\n\n**Next Steps:** Would you like specific guidance for your crop type or growing season?",
    
    weatherAdvice: "## 🌤️ Weather-Based Farming Strategy\n\n**Current Conditions Analysis:**\n• Temperature: Optimal range 20-30°C for most crops\n• Humidity: 60-70% ideal for plant growth\n• Wind speed: Light breeze (5-15 km/h) promotes pollination\n\n**7-Day Forecast Implications:**\n• **Days 1-3:** Clear skies - Perfect for land preparation and sowing\n• **Day 4-5:** Light showers expected - Hold fertilizer applications\n• **Day 6-7:** Sunny conditions return - Resume field operations\n\n**Weather-Responsive Actions:**\n\n**Before Rain (24-48 hours):**\n• Complete any pending spray applications\n• Ensure field drainage is adequate\n• Harvest ready crops if possible\n• Cover stored produce and machinery\n\n**During Rain:**\n• Monitor for waterlogging in low-lying areas\n• Check for fungal disease development\n• Avoid field traffic to prevent soil compaction\n\n**After Rain (12-24 hours):**\n• Assess field moisture for irrigation planning\n• Resume fertilizer applications after soil dries\n• Monitor for pest activity increase\n• Side-dress nitrogen if rain was heavy\n\n**Seasonal Strategies:**\n• **Summer:** Focus on water conservation, mulching, drought-resistant varieties\n• **Monsoon:** Disease management, drainage improvement, timely operations\n• **Winter:** Frost protection, cold-hardy varieties, protected cultivation\n\n**Climate-Smart Practices:**\n• Install weather monitoring station for micro-climate data\n• Use weather apps with 15-day forecasts for planning\n• Maintain crop insurance for weather-related losses\n• Practice water harvesting during good rain years\n\n**Emergency Preparedness:**\n• Keep emergency contact numbers of local agriculture officers\n• Stock essential supplies (seeds, fertilizers, pesticides)\n• Plan alternative crops for extreme weather scenarios",
    
    diseaseManagement: "## 🦠 Comprehensive Plant Disease Management\n\n**Disease Identification Process:**\n\n**Visual Symptoms Assessment:**\n• **Leaf symptoms:** Spots, discoloration, wilting, curling\n• **Stem symptoms:** Cankers, galls, discoloration, breaking\n• **Root symptoms:** Rot, discoloration, reduced growth\n• **Fruit symptoms:** Spots, rot, deformation, premature dropping\n\n**Common Disease Categories:**\n\n**1. Fungal Diseases (60% of plant diseases):**\n• **Early Blight:** Brown spots with concentric rings on leaves\n• **Late Blight:** Dark, water-soaked lesions spreading rapidly\n• **Powdery Mildew:** White, powdery coating on leaf surfaces\n• **Rust:** Orange/yellow pustules on leaf undersides\n\n**Treatment Protocol:**\n• Remove infected plant parts immediately\n• Apply copper-based fungicide (Copper Oxychloride @ 3g/L)\n• Improve air circulation between plants\n• Avoid overhead watering during humid conditions\n\n**2. Bacterial Diseases (20% of plant diseases):**\n• **Bacterial Blight:** Water-soaked lesions with yellow halos\n• **Bacterial Wilt:** Sudden wilting despite adequate moisture\n• **Fire Blight:** Scorched appearance of leaves and shoots\n\n**Treatment Approach:**\n• Streptocycline spray (0.5g/L) in early stages\n• Remove and burn infected plants\n• Disinfect tools with 70% alcohol\n• Use resistant varieties in future plantings\n\n**3. Viral Diseases (15% of plant diseases):**\n• **Mosaic Virus:** Mottled yellow-green leaf patterns\n• **Leaf Curl:** Upward curling and thickening of leaves\n• **Ring Spot:** Circular patterns on leaves and fruits\n\n**Management Strategy:**\n• Control vector insects (aphids, whiteflies, thrips)\n• Remove infected plants immediately\n• Use virus-free planting material\n• Maintain proper plant nutrition for resistance\n\n**Integrated Disease Management (IDM):**\n\n**Prevention (70% effective):**\n• Crop rotation with non-host crops\n• Use certified disease-free seeds\n• Maintain proper plant spacing for air circulation\n• Regular field sanitation and weed control\n\n**Cultural Practices:**\n• Balanced fertilization - avoid excess nitrogen\n• Proper irrigation management - avoid waterlogging\n• Mulching to reduce soil splash and moisture retention\n• Timely harvest to avoid over-ripening\n\n**Biological Control:**\n• Trichoderma application in soil @ 5kg/acre\n• Neem cake incorporation @ 200kg/acre\n• Encourage beneficial microorganisms\n• Use bio-pesticides like Bacillus subtilis\n\n**Chemical Control (Last Resort):**\n• Rotate different classes of fungicides\n• Follow PHI (Pre-Harvest Interval) strictly\n• Use recommended doses only\n• Apply during calm weather conditions\n\n**Monitoring & Record Keeping:**\n• Weekly field scouting for early detection\n• Maintain spray records with dates and products\n• Monitor weather conditions for disease-favorable periods\n• Track disease incidence and treatment effectiveness"
  },
  
  hi: {
    welcome: "स्वागत है! मैं आपका AI खेती सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    listening: "मैं सुन रहा हूं... अब बोलें",
    processing: "आपके प्रश्न को समझ रहा हूं...",
    error: "माफ करें, मैं समझ नहीं पाया। कृपया दोबारा कहें?",
    offline: "आप ऑफलाइन हैं। मैं संग्रहीत जानकारी के साथ जवाब दूंगा।",
    voiceNotSupported: "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।",
    
    cropAdvice: "## 🌾 संपूर्ण फसल की खेती गाइड\n\n**भूमि की तैयारी (सप्ताह 1-2):**\n• मिट्टी की जांच करें - pH, नाइट्रोजन, फास्फोरस और पोटाश के लिए\n• 8-10 इंच गहरी जुताई करें बेहतर जड़ विकास के लिए\n• 5-7 टन अच्छी सड़ी गोबर की खाद प्रति एकड़ डालें\n• खेत को समतल करें सिंचाई और जल निकासी के लिए\n\n**बीज चयन और बुआई:**\n• 85%+ अंकुरण दर वाले प्रमाणित बीज चुनें\n• बीजों का उपचार करें कार्बेन्डाजिम से @ 2 ग्राम/किलो बीज\n• अनाज के लिए कतार से कतार 22-25 सेमी दूरी रखें\n• 2-3 सेमी गहराई पर बुआई करें बेहतर अंकुरण के लिए\n\n**उर्वरक प्रबंधन:**\n• मूल खुराक: DAP 100 किग्रा + MOP 50 किग्रा प्रति एकड़\n• टॉप ड्रेसिंग: यूरिया 130 किग्रा को 2-3 बार में दें\n• सूक्ष्म पोषक तत्व (जिंक, बोरान) मिट्टी परीक्षण के अनुसार\n\n**सिंचाई का कार्यक्रम:**\n• पहली सिंचाई: बुआई के 20-25 दिन बाद (मुकुट जड़ शुरुआत)\n• दूसरी सिंचाई: 45-50 दिन बाद (कल्ले निकलने की अवस्था)\n• महत्वपूर्ण वृद्धि अवस्था में 80% नमी बनाए रखें\n• जल जमाव से बचें - उचित जल निकासी की व्यवस्था करें\n\n**कीट और रोग प्रबंधन:**\n• साप्ताहिक निगरानी करें जल्दी पहचान के लिए\n• एफिड और सफेद मक्खी के लिए पीले चिपकने वाले जाल का उपयोग करें\n• नीम का तेल (5 मिली/लीटर) बचाव के रूप में छिड़कें\n• IPM दृष्टिकोण: लाभकारी कीड़ों को प्रोत्साहित करें\n\n**अपेक्षित परिणाम:**\n• अंकुरण: 7-10 दिनों में 85-90%\n• उत्पादन क्षमता: उचित प्रबंधन से 25-30 क्विंटल प्रति एकड़\n• गुणवत्ता सुधार: उच्च प्रोटीन सामग्री और बाजार मूल्य\n\n**अगले कदम:** क्या आप अपनी फसल के प्रकार या बुआई के मौसम के लिए विशिष्ट मार्गदर्शन चाहते हैं?",
    
    weatherAdvice: "## 🌤️ मौसम आधारित खेती रणनीति\n\n**वर्तमान स्थिति विश्लेषण:**\n• तापमान: अधिकांश फसलों के लिए 20-30°C इष्टतम सीमा\n• आर्द्रता: पौधों की वृद्धि के लिए 60-70% आदर्श\n• हवा की गति: हल्की हवा (5-15 किमी/घंटा) परागण को बढ़ावा देती है\n\n**7-दिन पूर्वानुमान के प्रभाव:**\n• **दिन 1-3:** साफ आसमान - भूमि तैयारी और बुआई के लिए एकदम सही\n• **दिन 4-5:** हल्की बारिश की संभावना - उर्वरक छिड़काव रोकें\n• **दिन 6-7:** धूप की स्थिति वापसी - खेत के काम फिर से शुरू करें\n\n**मौसम के अनुकूल कार्य:**\n\n**बारिश से पहले (24-48 घंटे):**\n• लंबित छिड़काव कार्य पूरे करें\n• खेत में जल निकासी पर्याप्त हो यह सुनिश्चित करें\n• तैयार फसल की कटाई यदि संभव हो\n• भंडारित उत्पाद और मशीनरी को ढकें\n\n**बारिश के दौरान:**\n• निचले क्षेत्रों में जल जमाव की निगरानी करें\n• फंगल रोग के विकास की जांच करें\n• मिट्टी के संघनन को रोकने के लिए खेत में आवाजाही से बचें\n\n**बारिश के बाद (12-24 घंटे):**\n• सिंचाई योजना के लिए खेत की नमी का आकलन करें\n• मिट्टी सूखने के बाद उर्वरक का प्रयोग फिर से शुरू करें\n• कीट गतिविधि में वृद्धि की निगरानी करें\n• यदि बारिश तेज थी तो नाइट्रोजन का साइड ड्रेसिंग करें\n\n**मौसमी रणनीतियां:**\n• **गर्मी:** जल संरक्षण, मल्चिंग, सूखा प्रतिरोधी किस्मों पर ध्यान\n• **मानसून:** रोग प्रबंधन, जल निकासी सुधार, समय पर कार्य\n• **सर्दी:** पाला संरक्षण, ठंड प्रतिरोधी किस्में, संरक्षित खेती\n\n**जलवायु-स्मार्ट प्रथाएं:**\n• सूक्ष्म जलवायु डेटा के लिए मौसम निगरानी स्टेशन स्थापित करें\n• योजना के लिए 15-दिन के पूर्वानुमान वाले मौसम ऐप्स का उपयोग करें\n• मौसम संबंधी नुकसान के लिए फसल बीमा रखें\n• अच्छे बारिश के वर्षों में जल संचयन का अभ्यास करें"
  },
  
  kn: {
    welcome: "ಸ್ವಾಗತ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    listening: "ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ... ಈಗ ಮಾತನಾಡಿ",
    processing: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    error: "ಕ್ಷಮಿಸಿ, ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ?",
    offline: "ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ನಾನು ಸಂಗ್ರಹಿತ ಮಾಹಿತಿಯೊಂದಿಗೆ ಉತ್ತರಿಸುತ್ತೇನೆ.",
    voiceNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
    
    cropAdvice: "## 🌾 ಸಂಪೂರ್ಣ ಬೆಳೆ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ\n\n**ಭೂಮಿ ತಯಾರಿಕೆ (ವಾರ 1-2):**\n• ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ನಡೆಸಿ - pH, ಸಾರಜನಕ, ರಂಜಕ ಮತ್ತು ಪೊಟಾಷ್ ಮಟ್ಟಗಳಿಗಾಗಿ\n• ಉತ್ತಮ ಬೇರು ನುಗ್ಗುವಿಕೆಗಾಗಿ 8-10 ಇಂಚು ಆಳಕ್ಕೆ ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ\n• ಪ್ರತಿ ಎಕರೆಗೆ 5-7 ಟನ್ ಚೆನ್ನಾಗಿ ಕೊಳೆತ ಹೊಲದ ಖಾದ್ಯ ಸೇರಿಸಿ\n• ಏಕರೂಪದ ನೀರಾವರಿ ಮತ್ತು ಒಳಚರಂಡಿಗಾಗಿ ಹೊಲವನ್ನು ಸರಿಯಾಗಿ ನೆಲಸಮ ಮಾಡಿ\n\n**ಬೀಜ ಆಯ್ಕೆ ಮತ್ತು ಬಿತ್ತನೆ:**\n• 85%+ ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ ದರ ಹೊಂದಿರುವ ಪ್ರಮಾಣಿತ ಬೀಜಗಳನ್ನು ಆರಿಸಿ\n• ಬೀಜಗಳನ್ನು ಶಿಲೀಂಧ್ರನಾಶಕದಿಂದ ಸಂಸ್ಕರಿಸಿ (ಕಾರ್ಬೆಂಡಜಿಮ್ @ 2g/kg ಬೀಜ)\n• ಧಾನ್ಯಗಳಿಗೆ ಸಾಲಿನಿಂದ ಸಾಲಿಗೆ 22-25 cm ಅಂತರ ಇರಿಸಿ\n• ಅತ್ಯುತ್ತಮ ಮೊಳಕೆಯೊಡೆಯುವಿಕೆಗಾಗಿ 2-3 cm ಆಳದಲ್ಲಿ ಬಿತ್ತಿ\n\n**ರಸಗೊಬ್ಬರ ನಿರ್ವಹಣೆ:**\n• ಮೂಲ ಪ್ರಮಾಣ: DAP 100 kg + MOP 50 kg ಪ್ರತಿ ಎಕರೆಗೆ\n• ಮೇಲ್ಪೂಸು ಸಾರ: ಸಕ್ರಿಯ ಬೆಳವಣಿಗೆಯ ಸಮಯದಲ್ಲಿ ಯೂರಿಯಾ 130 kg ಅನ್ನು 2-3 ಭಾಗಗಳಲ್ಲಿ\n• ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯು ಸೂಚಿಸಿದರೆ ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳು (ಸತು, ಬೋರಾನ್) ಅನ್ವಯಿಸಿ\n\n**ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ:**\n• ಮೊದಲ ನೀರಾವರಿ: ಬಿತ್ತನೆಯ 20-25 ದಿನಗಳ ನಂತರ (ಕಿರೀಟ ಬೇರು ಆರಂಭ)\n• ದ್ವಿತೀಯ ನೀರಾವರಿ: 45-50 ದಿನಗಳು (ಧಾನ್ಯಗಳಿಗೆ ತೊಟ್ಟುಗಟ್ಟುವ ಹಂತ)\n• ನಿರ್ಣಾಯಕ ಬೆಳವಣಿಗೆಯ ಹಂತಗಳ ಉದ್ದಕ್ಕೂ ಹೊಲ ಸಾಮರ್ಥ್ಯವನ್ನು 80% ನಲ್ಲಿ ನಿರ್ವಹಿಸಿ\n• ನೀರು ಕಟ್ಟುವಿಕೆಯನ್ನು ತಪ್ಪಿಸಿ - ಸರಿಯಾದ ಒಳಚರಂಡಿ ಚಾನಲ್‌ಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ\n\n**ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ವಹಣೆ:**\n• ಆರಂಭಿಕ ಕೀಟ ಪತ್ತೆಗಾಗಿ ಸಾಪ್ತಾಹಿಕ ಮೇಲ್ವಿಚಾರಣೆ\n• ಆಫಿಡ್‌ಗಳು ಮತ್ತು ಬಿಳಿ ನೊಣಗಳಿಗಾಗಿ ಹಳದಿ ಅಂಟಿಕೊಳ್ಳುವ ಬಲೆಗಳನ್ನು ಬಳಸಿ\n• ತಡೆಗಟ್ಟುವ ಸಿಂಪಡಣೆಯಾಗಿ ಬೇವಿನ ಎಣ್ಣೆ (5ml/ಲೀಟರ್) ಅನ್ವಯಿಸಿ\n• IPM ವಿಧಾನ: ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ\n\n**ನಿರೀಕ್ಷಿತ ಫಲಿತಾಂಶಗಳು:**\n• ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ: 7-10 ದಿನಗಳಲ್ಲಿ 85-90%\n• ಇಳುವರಿ ಸಾಮರ್ಥ್ಯ: ಸರಿಯಾದ ನಿರ್ವಹಣೆಯೊಂದಿಗೆ ಎಕರೆಗೆ 25-30 ಕ್ವಿಂಟಲ್‌ಗಳು\n• ಗುಣಮಟ್ಟ ಸುಧಾರಣೆ: ಹೆಚ್ಚಿನ ಪ್ರೋಟೀನ್ ಅಂಶ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯ\n\n**ಮುಂದಿನ ಹಂತಗಳು:** ನಿಮ್ಮ ಬೆಳೆ ಪ್ರಕಾರ ಅಥವಾ ಬೆಳೆಯುವ ಋತುವಿಗೆ ನಿರ್ದಿಷ್ಟ ಮಾರ್ಗದರ್ಶನ ಬೇಕೇ?",
    
    weatherAdvice: "## 🌤️ ಹವಾಮಾನ ಆಧಾರಿತ ಕೃಷಿ ತಂತ್ರ\n\n**ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿ ವಿಶ್ಲೇಷಣೆ:**\n• ಉಷ್ಣಾಂಶ: ಹೆಚ್ಚಿನ ಬೆಳೆಗಳಿಗೆ 20-30°C ಅತ್ಯುತ್ತಮ ವ್ಯಾಪ್ತಿ\n• ಆರ್ದ್ರತೆ: ಸಸ್ಯ ಬೆಳವಣಿಗೆಗೆ 60-70% ಆದರ್ಶ\n• ಗಾಳಿಯ ವೇಗ: ಲಘು ಗಾಳಿ (5-15 km/h) ಪರಾಗಸ್ಪರ್ಶವನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ\n\n**7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ ಪರಿಣಾಮಗಳು:**\n• **ದಿನ 1-3:** ಸ್ಪಷ್ಟ ಆಕಾಶ - ಭೂಮಿ ತಯಾರಿಕೆ ಮತ್ತು ಬಿತ್ತನೆಗೆ ಪರಿಪೂರ್ಣ\n• **ದಿನ 4-5:** ಹಗುರ ಮಳೆ ನಿರೀಕ್ಷೆ - ರಸಗೊಬ್ಬರ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿಲ್ಲಿಸಿ\n• **ದಿನ 6-7:** ಬಿಸಿಲು ಪರಿಸ್ಥಿತಿಗಳು ಹಿಂತಿರುಗುತ್ತವೆ - ಹೊಲ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಪುನರಾರಂಭಿಸಿ\n\n**ಹವಾಮಾನ-ಸ್ಪಂದನಾತ್ಮಕ ಕ್ರಿಯೆಗಳು:**\n\n**ಮಳೆಯ ಮೊದಲು (24-48 ಗಂಟೆಗಳು):**\n• ಯಾವುದೇ ಬಾಕಿ ಇರುವ ಸಿಂಪಡಣೆ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ\n• ಹೊಲದ ಒಳಚರಂಡಿ ಸಾಕಷ್ಟಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ\n• ಸಾಧ್ಯವಾದರೆ ಸಿದ್ಧ ಬೆಳೆಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ\n• ಸಂಗ್ರಹಿಸಿದ ಉತ್ಪನ್ನ ಮತ್ತು ಯಂತ್ರೋಪಕರಣಗಳನ್ನು ಮುಚ್ಚಿ\n\n**ಮಳೆಯ ಸಮಯದಲ್ಲಿ:**\n• ತಗ್ಗು ಪ್ರದೇಶಗಳಲ್ಲಿ ನೀರು ಕಟ್ಟುವಿಕೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ\n• ಶಿಲೀಂಧ್ರ ರೋಗ ಬೆಳವಣಿಗೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ\n• ಮಣ್ಣಿನ ಸಂಕೋಚನವನ್ನು ತಡೆಯಲು ಹೊಲದ ಟ್ರಾಫಿಕ್ ಅನ್ನು ತಪ್ಪಿಸಿ\n\n**ಮಳೆಯ ನಂತರ (12-24 ಗಂಟೆಗಳು):**\n• ನೀರಾವರಿ ಯೋಜನೆಗಾಗಿ ಹೊಲದ ತೇವಾಂಶವನ್ನು ನಿರ್ಣಯಿಸಿ\n• ಮಣ್ಣು ಒಣಗಿದ ನಂತರ ರಸಗೊಬ್ಬರ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ಪುನರಾರಂಭಿಸಿ\n• ಕೀಟ ಚಟುವಟಿಕೆ ಹೆಚ್ಚಳವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ\n• ಮಳೆ ಭಾರಿಯಾಗಿದ್ದರೆ ಸೈಡ್-ಡ್ರೆಸ್ ನೈಟ್ರೋಜನ್\n\n**ಕಾಲೋಚಿತ ತಂತ್ರಗಳು:**\n• **ಬೇಸಿಗೆ:** ನೀರಿನ ಸಂರಕ್ಷಣೆ, ಮಲ್ಚಿಂಗ್, ಬರ-ನಿರೋಧಕ ಪ್ರಭೇದಗಳ ಮೇಲೆ ಗಮನ\n• **ಮಾನ್ಸೂನ್:** ರೋಗ ನಿರ್ವಹಣೆ, ಒಳಚರಂಡಿ ಸುಧಾರಣೆ, ಸಮಯೋಚಿತ ಕಾರ್ಯಾಚರಣೆಗಳು\n• **ಚಳಿಗಾಲ:** ಹಿಮ ರಕ್ಷಣೆ, ಶೀತ-ಹಾರ್ಡಿ ಪ್ರಭೇದಗಳು, ರಕ್ಷಿತ ಕೃಷಿ"
  },

  sat: {
    welcome: "ᱡᱚᱦᱟᱨ! ᱟᱢᱟᱜ AI ᱪᱟᱥ ᱜᱚᱲᱚᱜᱤᱡ ᱠᱟᱱᱟ ᱞᱮ ᱾ ᱛᱤᱦᱤᱱ ᱟᱢᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱜᱚᱲᱚ ᱛᱟᱢ?",
    listening: "ᱟᱞᱮ ᱟᱧᱡᱚᱢ ᱠᱟᱱᱟ... ᱱᱤᱛᱚᱜ ᱨᱚᱲᱮ",
    processing: "ᱟᱢᱟᱜ ᱠᱩᱞᱤ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱱᱟ...",
    error: "ᱢᱟᱯᱷ ᱢᱮ, ᱟᱞᱮ ᱵᱟᱞᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱱᱟ ᱾ ᱫᱚᱦᱲᱟ ᱠᱟᱛᱷᱟᱢᱮ?",
    offline: "ᱟᱢ ᱚᱯᱷᱞᱟᱭᱤᱱ ᱢᱮᱱᱟᱢᱟ ᱾ ᱚᱞᱚᱜ ᱟᱠᱟᱱ ᱠᱟᱛᱷᱟ ᱞᱮᱠᱟᱛᱮ ᱡᱟᱦᱟᱸᱭᱟᱢ ᱾",
    voiceNotSupported: "ᱱᱚᱣᱟ ᱵᱨᱟᱣᱡᱚᱨ ᱨᱮ ᱥᱚᱫᱚᱨ ᱤᱱᱯᱩᱴ ᱵᱟᱝ ᱥᱟᱦᱟᱭᱟ ᱾",
    
    cropAdvice: "## 🌾 ᱜᱚᱴᱟ ᱡᱚ ᱪᱟᱥ ᱦᱩᱰᱟᱹᱞ\n\n**ᱚᱛ ᱛᱮᱭᱟᱨ (ᱦᱟᱯᱛᱟ 1-2):**\n• ᱚᱛ ᱧᱮᱞ - pH, ᱱᱟᱭᱴᱨᱚᱡᱮᱱ, ᱯᱷᱚᱥᱯᱷᱚᱨᱚᱥ ᱟᱨ ᱯᱚᱴᱟᱥ ᱞᱟᱹᱜᱤᱫ\n• ᱪᱮᱛᱟᱱ ᱥᱮᱫ ᱪᱟᱥ ᱞᱟᱹᱜᱤᱫ 8-10 ᱤᱧᱪ ᱩᱥᱩᱞ ᱦᱟᱞ ᱨᱟᱹᱯᱩᱫᱽᱢᱮ\n• ᱢᱤᱫ ᱮᱠᱚᱨ ᱨᱮ 5-7 ᱴᱚᱱ ᱪᱮᱛᱟᱱ ᱥᱟᱨᱟᱣ ᱜᱚᱵᱚᱨ ᱮᱢᱚᱜ ᱢᱮ\n• ᱫᱟᱜ ᱪᱟᱞᱟᱣ ᱟᱨ ᱚᱰᱚᱠ ᱞᱟᱹᱜᱤᱫ ᱚᱛ ᱥᱚᱢᱚᱛ ᱢᱮ\n\n**ᱞᱟᱦᱟᱱ ᱵᱟᱪᱷᱟᱣ ᱟᱨ ᱡᱚ:**\n• 85%+ ᱩᱰᱩᱠ ᱦᱚᱨ ᱨᱮᱭᱟᱜ ᱥᱚᱨᱠᱟᱨᱤ ᱞᱟᱦᱟᱱ ᱵᱟᱪᱷᱟᱣ ᱢᱮ\n• ᱞᱟᱦᱟᱱ ᱫᱟᱣᱟ ᱞᱮᱠᱟᱛᱮ ᱥᱤᱸᱜᱟᱹᱲ ᱢᱮ (ᱠᱟᱨᱵᱮᱱᱰᱟᱡᱤᱢ @ 2ᱜᱨᱟᱢ/ᱠᱤᱞᱚ ᱞᱟᱦᱟᱱ)\n• ᱚᱱᱟᱡ ᱞᱟᱹᱜᱤᱫ ᱞᱟᱭᱤᱱ ᱠᱷᱚᱱ ᱞᱟᱭᱤᱱ 22-25 cm ᱥᱟᱝᱜᱤᱧ ᱫᱚᱦᱚᱭ ᱢᱮ\n• ᱩᱰᱩᱠ ᱞᱟᱹᱜᱤᱫ 2-3 cm ᱩᱥᱩᱞ ᱨᱮ ᱡᱚᱢᱮ\n\n**ᱠᱷᱟᱫᱽ ᱵᱮᱵᱚᱥᱛᱷᱟ:**\n• ᱫᱷᱟᱹᱨᱛᱤ ᱮᱢᱚᱜ: DAP 100 kg + MOP 50 kg ᱢᱤᱫ ᱮᱠᱚᱨ ᱨᱮ\n• ᱪᱮᱛᱟᱱ ᱮᱢᱚᱜ: ᱦᱟᱨᱟᱵᱩᱨᱩ ᱚᱠᱛᱚ ᱨᱮ ᱭᱩᱨᱤᱭᱟ 130 kg ᱨᱮ 2-3 ᱫᱷᱟᱣ\n• ᱚᱛ ᱧᱮᱞ ᱞᱮᱠᱟᱛᱮ ᱦᱩᱰᱤᱧ ᱠᱷᱟᱫᱽ (ᱡᱤᱸᱠ, ᱵᱚᱨᱚᱱ) ᱮᱢᱚᱜ ᱢᱮ\n\n**ᱫᱟᱜ ᱮᱢᱚᱜ ᱨᱮᱭᱟᱜ ᱚᱠᱛᱚ:**\n• ᱯᱩᱭᱞᱩ ᱫᱟᱜ ᱮᱢᱚᱜ: ᱡᱚ ᱛᱟᱭᱚᱢ 20-25 ᱢᱟᱦᱟᱸ (ᱨᱤᱲ ᱨᱮᱭᱟᱜ ᱮᱛᱦᱚᱵ)\n• ᱫᱚᱥᱟᱨ ᱫᱟᱜ ᱮᱢᱚᱜ: 45-50 ᱢᱟᱦᱟᱸ ᱛᱟᱭᱚᱢ (ᱚᱱᱟᱡ ᱨᱮ ᱰᱟᱞ ᱵᱮᱨ ᱚᱠᱛᱚ)\n• ᱞᱟᱹᱠᱛᱤᱭᱟᱜ ᱦᱟᱨᱟᱵᱩᱨᱩ ᱚᱠᱛᱚ ᱨᱮ 80% ᱫᱟᱜ ᱫᱚᱦᱚᱭ ᱢᱮ\n• ᱫᱟᱜ ᱡᱟᱦᱟᱸᱭ ᱠᱷᱚᱱ ᱟᱲᱟᱜ - ᱪᱮᱛᱟᱱ ᱚᱰᱚᱠ ᱦᱚᱨᱚ ᱵᱮᱱᱟᱣ ᱢᱮ\n\n**ᱠᱤᱰᱟᱹ ᱟᱨ ᱨᱩᱜᱤ ᱫᱚᱦᱚᱭ:**\n• ᱡᱚᱛᱚ ᱦᱟᱯᱛᱟ ᱧᱮᱞ ᱡᱷᱚᱛᱚᱡ ᱠᱤᱰᱟᱹ ᱞᱟᱹᱜᱤᱫ\n• ᱟᱯᱷᱤᱰ ᱟᱨ ᱯᱩᱸᱰ ᱢᱟᱪᱷᱤ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱥᱟᱝ ᱫᱷᱚᱨᱟ ᱪᱟᱸᱫᱚ ᱵᱮᱵᱷᱟᱨ\n• ᱟᱲᱟᱜ ᱨᱩᱠᱷᱤᱭᱟ ᱞᱮᱠᱟᱛᱮ ᱱᱤᱢ ᱛᱮᱞ (5ml/ᱞᱤᱴᱚᱨ) ᱠᱟᱛᱮ ᱪᱷᱟᱯᱟ\n• IPM ᱦᱚᱨ: ᱥᱟᱦᱟᱭᱤᱡ ᱠᱤᱰᱟᱹ ᱠᱚ ᱵᱟᱹᱲᱛᱤᱭᱟᱹ ᱮᱢ\n\n**ᱚᱥᱟᱨ ᱚᱝᱠᱟ ᱦᱩᱭᱩᱜ-ᱟ:**\n• ᱩᱰᱩᱠ: 7-10 ᱢᱟᱦᱟᱸ ᱨᱮ 85-90%\n• ᱦᱟᱹᱠᱩ ᱫᱟᱲᱮ: ᱪᱮᱛᱟᱱ ᱫᱚᱦᱚᱭ ᱞᱮᱠᱟᱛᱮ 25-30 ᱠᱩᱭᱤᱱᱴᱟᱞ ᱢᱤᱫ ᱮᱠᱚᱨ ᱨᱮ\n• ᱜᱩᱱ ᱥᱩᱫᱷᱨᱟᱹᱣ: ᱰᱷᱮᱨ ᱯᱨᱚᱴᱤᱱ ᱟᱨ ᱦᱟᱴ ᱫᱟᱢ\n\n**ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ:** ᱟᱢᱟᱜ ᱪᱟᱥ ᱦᱚᱨ ᱟᱨ ᱵᱟᱝ ᱨᱤᱛᱩ ᱞᱟᱹᱜᱤᱫ ᱥᱚᱫᱚᱨ ᱦᱩᱰᱟᱹᱞ ᱞᱟᱹᱠᱛᱤᱜ-ᱟ?",
    
    weatherAdvice: "## 🌤️ ᱦᱚᱭᱦᱤᱥᱤᱫ ᱞᱮᱠᱟᱛᱮ ᱪᱟᱥ ᱦᱚᱨᱚ\n\n**ᱱᱤᱛᱚᱜᱟᱜ ᱦᱟᱞᱚᱛ ᱧᱮᱞᱚᱜ:**\n• ᱞᱚᱞᱚ: ᱡᱚᱛᱚ ᱪᱟᱥ ᱞᱟᱹᱜᱤᱫ 20-30°C ᱪᱮᱛᱟᱱ ᱦᱟᱞᱚᱛ\n• ᱦᱚᱭᱦᱤᱥᱤᱫ: ᱫᱟᱨᱮ ᱦᱟᱨᱟᱵᱩᱨᱩ ᱞᱟᱹᱜᱤᱫ 60-70% ᱪᱮᱛᱟᱱ\n• ᱦᱚᱭ ᱪᱟᱹᱞᱟᱹᱣ: ᱞᱚᱞᱚ ᱦᱚᱭ (5-15 km/h) ᱛᱮ ᱯᱷᱩᱞ ᱢᱤᱞᱟᱹᱣ ᱜᱮ ᱞᱟᱹᱠᱛᱤ\n\n**7-ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟᱛᱮ ᱞᱟᱹᱭ:**\n• **ᱢᱟᱦᱟᱸ 1-3:** ᱥᱟᱯᱷᱟ ᱥᱮᱨᱢᱟ - ᱚᱛ ᱛᱮᱭᱟᱨ ᱟᱨ ᱡᱚ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱛᱟᱱ\n• **ᱢᱟᱦᱟᱸ 4-5:** ᱦᱩᱰᱤᱧ ᱫᱟᱜ ᱦᱤᱡᱩᱜᱼᱟ - ᱠᱷᱟᱫᱽ ᱮᱢᱚᱜ ᱵᱚᱸᱫᱚᱭ ᱢᱮ\n• **ᱢᱟᱦᱟᱸ 6-7:** ᱵᱷᱟᱹᱞᱮ ᱦᱤᱸᱥ ᱨᱩᱣᱟᱹᱲ - ᱚᱛ ᱠᱟᱹᱢᱤ ᱫᱚᱦᱲᱟ ᱮᱛᱦᱚᱵ\n\n**ᱦᱚᱭᱦᱤᱥᱤᱫ ᱞᱮᱠᱟᱛᱮ ᱠᱟᱹᱢᱤ:**\n\n**ᱫᱟᱜ ᱞᱟᱦᱟ (24-48 ᱜᱷᱚᱱᱴᱟ):**\n• ᱡᱟᱦᱟᱸ ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱵᱟᱝ ᱦᱩᱭ ᱟᱠᱟᱱ ᱚᱱᱟ ᱯᱩᱨᱟᱹᱣ ᱢᱮ\n• ᱚᱛ ᱨᱮ ᱫᱟᱜ ᱚᱰᱚᱠ ᱦᱚᱨᱚ ᱪᱮᱛᱟᱱ ᱢᱮᱱᱟᱜ ᱥᱮ ᱧᱮᱞᱮ\n• ᱦᱩᱭ ᱞᱮᱱᱠᱷᱟᱱ ᱛᱮᱭᱟᱨ ᱪᱟᱥ ᱠᱟᱴᱮ\n• ᱫᱚᱦᱚ ᱟᱠᱟᱱ ᱡᱤᱱᱤᱥ ᱟᱨ ᱢᱮᱥᱤᱱ ᱠᱚ ᱫᱟᱱᱟᱝ ᱮᱢ\n\n**ᱫᱟᱜ ᱚᱠᱛᱚ ᱨᱮ:**\n• ᱞᱚᱞᱚ ᱡᱟᱜᱟ ᱨᱮ ᱫᱟᱜ ᱡᱟᱦᱟᱸᱭ ᱧᱮᱞᱮ\n• ᱦᱩᱸᱥᱤ ᱨᱩᱜᱤ ᱦᱟᱨᱟᱵᱩᱨᱩ ᱧᱮᱞᱮ\n• ᱚᱛ ᱛᱤᱸᱜᱩ ᱠᱷᱚᱱ ᱟᱲᱟᱜ ᱛᱟᱦᱮᱸ ᱞᱟᱹᱜᱤᱫ ᱚᱛ ᱨᱮ ᱥᱮᱸᱫᱽᱨᱟ ᱵᱟᱭ ᱛᱟᱦᱮᱸᱫ\n\n**ᱫᱟᱜ ᱛᱟᱭᱚᱢ (12-24 ᱜᱷᱚᱱᱴᱟ):**\n• ᱫᱟᱜ ᱮᱢᱚᱜ ᱦᱩᱰᱟᱹᱞ ᱞᱟᱹᱜᱤᱫ ᱚᱛ ᱫᱟᱜ ᱧᱮᱞᱮ\n• ᱚᱛ ᱦᱚᱨᱚᱜ ᱛᱟᱭᱚᱢ ᱠᱷᱟᱫᱽ ᱮᱢᱚᱜ ᱫᱚᱦᱲᱟ ᱮᱛᱦᱚᱵ\n• ᱠᱤᱰᱟᱹ ᱠᱟᱹᱢᱤ ᱵᱟᱹᱲᱛᱤ ᱧᱮᱞᱮ\n• ᱡᱚᱛᱚ ᱫᱟᱜ ᱞᱮᱱᱠᱷᱟᱱ ᱥᱟᱭᱤᱰ-ᱰᱨᱮᱥ ᱱᱟᱭᱤᱴᱨᱚᱡᱮᱱ ᱮᱢᱮ\n\n**ᱨᱤᱛᱩ ᱞᱮᱠᱟᱛᱮ ᱦᱚᱨᱚ:**\n• **ᱸᱞᱚᱞᱚᱛ:** ᱫᱟᱜ ᱫᱚᱦᱚᱭ, ᱢᱚᱞᱪᱤᱝ, ᱡᱷᱟᱣ ᱜᱚᱴᱟᱣ ᱪᱟᱥ ᱞᱮᱠᱟᱛᱮ ᱢᱚᱱᱮ\n• **ᱵᱚᱨᱥᱟᱛ:** ᱨᱩᱜᱤ ᱫᱚᱦᱚᱭ, ᱚᱰᱚᱠ ᱥᱩᱫᱷᱨᱟᱹᱣ, ᱚᱠᱛᱚ ᱞᱮᱠᱟ ᱠᱟᱹᱢᱤ\n• **ᱨᱟᱵᱟᱝ:** ᱡᱚᱯᱚᱲ ᱨᱟᱠᱷᱟ, ᱨᱟᱵᱟᱝ ᱨᱮ ᱡᱤᱣᱤᱫᱽ ᱪᱟᱥ ᱦᱚᱨ, ᱨᱟᱠᱷᱟ ᱠᱟᱛᱮ ᱪᱟᱥ\n\n**ᱦᱚᱭᱦᱤᱥᱤᱫ-ᱥᱤᱢᱟᱨᱴ ᱦᱚᱨᱚ:**\n• ᱦᱩᱰᱤᱧ ᱦᱚᱭᱦᱤᱥᱤᱫ ᱰᱟᱴᱟ ᱞᱟᱹᱜᱤᱫ ᱦᱚᱭᱦᱤᱥᱤᱫ ᱧᱮᱞ ᱥᱴᱮᱥᱚᱱ ᱵᱮᱱᱟᱣ ᱢᱮ\n• ᱦᱩᱰᱟᱹᱞ ᱞᱟᱹᱜᱤᱫ 15-ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟᱛᱮ ᱞᱟᱹᱭ ᱦᱚᱭᱦᱤᱥᱤᱫ ᱮᱯ ᱵᱮᱵᱷᱟᱨ ᱢᱮ\n• ᱦᱚᱭᱦᱤᱥᱤᱫ ᱵᱮᱜᱟᱨ ᱦᱟᱨᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱪᱟᱥ ᱵᱤᱢᱟ ᱫᱚᱦᱚᱭ ᱢᱮ\n• ᱪᱮᱛᱟᱱ ᱫᱟᱜ ᱥᱮᱨᱢᱟ ᱨᱮ ᱫᱟᱜ ᱫᱚᱦᱚᱭ ᱦᱚᱨᱚ"
  }
};

/**
 * Generate enhanced mock chatbot response based on user input with proper language support
 */
export function generateMockResponse(userMessage: string, language: string = 'en'): ChatBotResponse {
  const message = userMessage.toLowerCase();
  
  console.log(`🌐 Generating response in language: ${language} for message: ${userMessage.substring(0, 50)}...`);
  
  // Determine response category based on keywords
  let responseCategory = 'general';
  
  // Enhanced keyword detection for better categorization
  if (message.includes('crop') || message.includes('plant') || message.includes('grow') || 
      message.includes('wheat') || message.includes('rice') || message.includes('corn') ||
      message.includes('tomato') || message.includes('potato') || message.includes('seed') ||
      message.includes('बीज') || message.includes('फसल') || message.includes('ಬೀಜ') || message.includes('ಬೆಳೆ')) {
    responseCategory = 'crop';
  } else if (message.includes('weather') || message.includes('rain') || message.includes('temperature') ||
             message.includes('climate') || message.includes('season') || message.includes('monsoon') ||
             message.includes('मौसम') || message.includes('बारिश') || message.includes('ಹವಾಮಾನ') || message.includes('ಮಳೆ')) {
    responseCategory = 'weather';
  } else if (message.includes('disease') || message.includes('pest') || message.includes('bug') || 
             message.includes('sick') || message.includes('infection') || message.includes('fungus') ||
             message.includes('yellow') || message.includes('spot') || message.includes('dying') ||
             message.includes('रोग') || message.includes('बीमारी') || message.includes('ರೋಗ') || message.includes('ಕೀಟ')) {
    responseCategory = 'disease';
  } else if (message.includes('price') || message.includes('market') || message.includes('sell') ||
             message.includes('buy') || message.includes('cost') || message.includes('rate') ||
             message.includes('बाजार') || message.includes('कीमत') || message.includes('ಮಾರುಕಟ್ಟೆ') || message.includes('ಬೆಲೆ')) {
    responseCategory = 'market';
  }
  
  // Generate comprehensive response based on language and category
  let responseContent: string;
  let confidence = 85 + Math.floor(Math.random() * 10); // 85-95% confidence
  let suggestions: string[] = [];
  let relatedActions: string[] = [];
  
  // Get language-specific responses
  const langResponses = languageResponses[language] || languageResponses['en'];
  
  switch (responseCategory) {
    case 'crop':
      responseContent = langResponses.cropAdvice || languageResponses.en.cropAdvice;
      suggestions = language === 'hi' ? 
        ['मिट्टी परीक्षण', 'बीज की किस्में', 'उर्वरक योजना', 'कटाई का समय'] :
        language === 'kn' ? 
        ['ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ', 'ಬೀಜ ಪ್ರಭೇದಗಳು', 'ರಸಗೊಬ್ಬರ ಯೋಜನೆ', 'ಕೊಯ್ಲು ಸಮಯ'] :
        ['Soil testing', 'Seed varieties', 'Fertilizer plan', 'Harvest timing'];
      
      relatedActions = language === 'hi' ? 
        ['मिट्टी का नमूना लें', 'बाजार की कीमतें जांचें', 'मौसम देखें', 'विशेषज्ञ से संपर्क करें'] :
        language === 'kn' ? 
        ['ಮಣ್ಣಿನ ಮಾದರಿ ತೆಗೆದುಕೊಳ್ಳಿ', 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ', 'ಹವಾಮಾನ ನೋಡಿ', 'ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ'] :
        ['Collect soil sample', 'Check market prices', 'View weather', 'Contact expert'];
      break;
      
    case 'weather':
      responseContent = langResponses.weatherAdvice || languageResponses.en.weatherAdvice;
      suggestions = language === 'hi' ? 
        ['7-दिन पूर्वानुमान', 'सिंचाई योजना', 'रोग की रोकथाम', 'आपातकालीन तैयारी'] :
        language === 'kn' ? 
        ['7-ದಿನ ಮುನ್ಸೂಚನೆ', 'ನೀರಾವರಿ ಯೋಜನೆ', 'ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ', 'ತುರ್ತು ತಯಾರಿಕೆ'] :
        ['7-day forecast', 'Irrigation plan', 'Disease prevention', 'Emergency prep'];
      
      relatedActions = language === 'hi' ? 
        ['मौसम अलर्ट सेट करें', 'फसल कैलेंडर देखें', 'जल संरक्षण', 'बीमा जांचें'] :
        language === 'kn' ? 
        ['ಹವಾಮಾನ ಅಲರ್ಟ್ ಹೊಂದಿಸಿ', 'ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್ ನೋಡಿ', 'ನೀರಿನ ಸಂರಕ್ಷಣೆ', 'ವಿಮೆ ಪರಿಶೀಲಿಸಿ'] :
        ['Set weather alerts', 'View crop calendar', 'Water conservation', 'Check insurance'];
      break;
      
    case 'disease':
      responseContent = langResponses.diseaseManagement || languageResponses.en.diseaseManagement;
      confidence = 92; // Higher confidence for disease management
      suggestions = language === 'hi' ? 
        ['रोग की पहचान', 'इलाज के विकल्प', 'रोकथाम उपाय', 'जैविक नियंत्रण'] :
        language === 'kn' ? 
        ['ರೋಗ ಗುರುತಿಸುವಿಕೆ', 'ಚಿಕಿತ್ಸೆ ಆಯ್ಕೆಗಳು', 'ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು', 'ಜೈವಿಕ ನಿಯಂತ್ರಣ'] :
        ['Disease ID', 'Treatment options', 'Prevention measures', 'Biological control'];
      
      relatedActions = language === 'hi' ? 
        ['फोटो अपलोड करें', 'विशेषज्ञ से बात करें', 'छिड़काव अनुसूची', 'ट्रैकिंग शुरू करें'] :
        language === 'kn' ? 
        ['ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', 'ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ', 'ಸಿಂಪಡಣೆ ವೇಳಾಪಟ್ಟಿ', 'ಟ್ರ್ಯಾಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ'] :
        ['Upload photo', 'Talk to expert', 'Spray schedule', 'Start tracking'];
      break;
      
    case 'market':
      responseContent = language === 'hi' ? 
        "## 💰 बाजार की कीमतें और बिक्री रणनीति\n\n**आज की कीमतें (प्रमुख मंडियां):**\n• **गेहूं:** ₹2,450/क्विंटल (+8% वृद्धि)\n• **चावल:** ₹2,890/क्विंटल (-2% गिरावट)\n• **सरसों:** ₹5,200/क्विंटल (+12% वृद्धि)\n• **कपास:** ₹6,800/क्विंटल (स्थिर)\n\n**बाजार विश्लेषण:**\n• त्योहारी सीजन की वजह से मांग बढ़ी है\n• निर्यात नीति में बदलाव से कीमतों पर प्रभाव\n• मौसम की स्थिति अनुकूल होने से आपूर्ति बेहतर\n\n**बिक्री रणनीति:**\n\n**इष्टतम बिक्री समय:**\n• **सुबह 8-10 बजे:** सबसे अच्छी कीमतें मिलती हैं\n• **मध्य सप्ताह:** मंगलवार-गुरुवार बेहतर दरें\n• **त्योहारों से पहले:** प्रीमियम कीमतें\n\n**गुणवत्ता मानक:**\n• नमी की मात्रा: 12% से कम हो\n• मिश्रण: 2% से अधिक न हो\n• साफ-सुथरा, कीड़े-मकोड़े रहित\n• उचित ग्रेडिंग और पैकेजिंग\n\n**परिवहन और भंडारण:**\n• ट्रकों का पहले से इंतजाम करें\n• 25-30 किमी के दायरे में बेहतर मंडियां देखें\n• भंडारण की सुविधा उपलब्ध हो तो बेहतर कीमत का इंतजार करें\n\n**सरकारी योजनाएं:**\n• MSP (न्यूनतम समर्थन मूल्य) की जानकारी रखें\n• PM-KISAN योजना का लाभ उठाएं\n• फसल बीमा योजना में पंजीकरण कराएं" :
        language === 'kn' ? 
        "## 💰 ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಮಾರಾಟ ಕಾರ್ಯತಂತ್ರ\n\n**ಇಂದಿನ ಬೆಲೆಗಳು (ಪ್ರಮುಖ ಮಾರುಕಟ್ಟೆಗಳು):**\n• **ಗೋಧಿ:** ₹2,450/ಕ್ವಿಂಟಲ್ (+8% ಹೆಚ್ಚಳ)\n• **ಅಕ್ಕಿ:** ₹2,890/ಕ್ವಿಂಟಲ್ (-2% ಕಡಿಮೆ)\n• **ಸಾಸಿವೆ:** ₹5,200/ಕ್ವಿಂಟಲ್ (+12% ಹೆಚ್ಚಳ)\n• **ಹತ್ತಿ:** ₹6,800/ಕ್ವಿಂಟಲ್ (ಸ್ಥಿರ)\n\n**ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ:**\n• ಹಬ್ಬದ ಋತುವಿನಿಂದಾಗಿ ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗಿದೆ\n• ರಫ್ತು ನೀತಿ ಬದಲಾವಣೆಗಳಿಂದ ಬೆಲೆಗಳ ಮೇಲೆ ಪರಿಣಾಮ\n• ಹವಾಮಾನ ಸ್ಥಿತಿ ಅನುಕೂಲಕರವಾಗಿರುವುದರಿಂದ ಪೂರೈಕೆ ಉತ್ತಮ\n\n**ಮಾರಾಟ ಕಾರ್ಯತಂತ್ರ:**\n\n**ಅತ್ಯುತ್ತಮ ಮಾರಾಟ ಸಮಯ:**\n• **ಬೆಳಿಗ್ಗೆ 8-10 ಗಂಟೆ:** ಅತ್ಯುತ್ತಮ ಬೆಲೆಗಳು ಸಿಗುತ್ತವೆ\n• **ಮಧ್ಯ ವಾರ:** ಮಂಗಳವಾರ-ಗುರುವಾರ ಉತ್ತಮ ದರಗಳು\n• **ಹಬ್ಬಗಳ ಮೊದಲು:** ಪ್ರೀಮಿಯಂ ಬೆಲೆಗಳು\n\n**ಗುಣಮಟ್ಟದ ಮಾನದಂಡಗಳು:**\n• ತೇವಾಂಶದ ಪ್ರಮಾಣ: 12% ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು\n• ಮಿಶ್ರಣ: 2% ಕ್ಕಿಂತ ಹೆಚ್ಚಿರಬಾರದು\n• ಸ್ವಚ್ಛ, ಕೀಟ-ಪತಂಗರಹಿತ\n• ಸೂಕ್ತ ಗ್ರೇಡಿಂಗ್ ಮತ್ತು ಪ್ಯಾಕೇಜಿಂಗ್\n\n**ಸಾರಿಗೆ ಮತ್ತು ಭಂಡಾರಣೆ:**\n• ಟ್ರಕ್‌ಗಳ ವ್ಯವಸ್ಥೆಯನ್ನು ಮೊದಲೇ ಮಾಡಿ\n• 25-30 ಕಿ.ಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಉತ್ತಮ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ನೋಡಿ\n• ಭಂಡಾರಣಾ ಸೌಲಭ್ಯ ಇದ್ದರೆ ಉತ್ತಮ ಬೆಲೆಗಾಗಿ ಕಾಯಿರಿ\n\n**ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು:**\n• MSP (ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ) ಮಾಹಿತಿ ಇಟ್ಟುಕೊಳ್ಳಿ\n• PM-KISAN ಯೋಜನೆಯ ಲಾಭ ಪಡೆಯಿರಿ\n• ಬೆಳೆ ವಿಮಾ ಯೋಜನೆಯಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿಸಿ" :
        "## 💰 Market Prices & Sales Strategy\n\n**Today's Prices (Major Markets):**\n• **Wheat:** ₹2,450/quintal (+8% increase)\n• **Rice:** ₹2,890/quintal (-2% decrease)\n• **Mustard:** ₹5,200/quintal (+12% increase)\n• **Cotton:** ₹6,800/quintal (stable)\n\n**Market Analysis:**\n• Demand increased due to festival season\n• Export policy changes affecting prices\n• Weather conditions favorable leading to better supply\n\n**Sales Strategy:**\n\n**Optimal Selling Time:**\n• **Morning 8-10 AM:** Best prices available\n• **Mid-week:** Tuesday-Thursday better rates\n• **Before festivals:** Premium prices\n\n**Quality Standards:**\n• Moisture content: Should be less than 12%\n• Admixture: Should not exceed 2%\n• Clean, pest-free produce\n• Proper grading and packaging\n\n**Transportation & Storage:**\n• Arrange trucks in advance\n• Check better markets within 25-30 km radius\n• If storage facility available, wait for better prices\n\n**Government Schemes:**\n• Keep MSP (Minimum Support Price) information\n• Utilize PM-KISAN scheme benefits\n• Register for crop insurance schemes";
      
      suggestions = language === 'hi' ? 
        ['कीमत के रुझान', 'नजदीकी मंडी', 'परिवहन विकल्प', 'भंडारण सुझाव'] :
        language === 'kn' ? 
        ['ಬೆಲೆ ಟ್ರೆಂಡ್‌ಗಳು', 'ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ', 'ಸಾರಿಗೆ ಆಯ್ಕೆಗಳು', 'ಭಂಡಾರಣಾ ಸಲಹೆಗಳು'] :
        ['Price trends', 'Nearby markets', 'Transport options', 'Storage tips'];
      
      relatedActions = language === 'hi' ? 
        ['कीमत ट्रैकर', 'खरीदार संपर्क', 'गुणवत्ता जांच', 'बीमा क्लेम'] :
        language === 'kn' ? 
        ['ಬೆಲೆ ಟ್ರ್ಯಾಕರ್', 'ಖರೀದಾರ ಸಂಪರ್ಕ', 'ಗುಣಮಟ್ಟ ಪರಿಶೀಲನೆ', 'ವಿಮಾ ಕ್ಲೈಮ್'] :
        ['Price tracker', 'Buyer contacts', 'Quality check', 'Insurance claim'];
      break;
      
    default:
      responseContent = langResponses.welcome || languageResponses.en.welcome;
      suggestions = language === 'hi' ? 
        ['फसल की सलाह', 'मौसम का पूर्वानुमान', 'रोग की मदद', 'बाजार की कीमतें'] :
        language === 'kn' ? 
        ['ಬೆಳೆ ಸಲಹೆ', 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ', 'ರೋಗ ಸಹಾಯ', 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು'] :
        ['Crop advice', 'Weather forecast', 'Disease help', 'Market prices'];
      
      relatedActions = language === 'hi' ? 
        ['फसल ट्रैकर शुरू करें', 'डैशबोर्ड देखें', 'विशेषज्ञ परामर्श', 'रिकॉर्ड्स देखें'] :
        language === 'kn' ? 
        ['ಬೆಳೆ ಟ್ರ್ಯಾಕರ್ ಆರಂಭಿಸಿ', 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ', 'ತಜ್ಞ ಸಲಹೆ', 'ದಾಖಲೆಗಳು ನೋಡಿ'] :
        ['Start crop tracker', 'View dashboard', 'Expert consultation', 'View records'];
  }
  
  console.log(`✅ Generated ${responseContent.length} character response in ${language} language`);
  
  return {
    message: responseContent,
    confidence,
    topic: responseCategory,
    suggestions,
    relatedActions,
    followUpQuestions: language === 'hi' ? 
      ['और कोई प्रश्न?', 'विस्तार से जानना चाहते हैं?', 'कोई अन्य मदद चाहिए?'] :
      language === 'kn' ? 
      ['ಇನ್ನೇನಾದರೂ ಪ್ರಶ್ನೆ?', 'ವಿವರವಾಗಿ ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಾ?', 'ಬೇರೆ ಸಹಾಯ ಬೇಕೇ?'] :
      ['Any other questions?', 'Want to know more details?', 'Need any other help?']
  };
}

/**
 * Simulate voice input transcription
 */
export function simulateVoiceInput(duration: number = 3000): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const voiceQueries = [
        "What crops should I plant this season?",
        "How is the weather looking for next week?",
        "My tomato plants have yellow spots, what should I do?",
        "What are the current market prices for wheat?",
        "How do I prepare organic fertilizer?",
        "When is the best time to harvest rice?"
      ];
      
      const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
      resolve(randomQuery);
    }, duration);
  });
}

/**
 * Get farming tips based on season and location
 */
export function getSeasonalTips(season: string, location: string): string[] {
  const tips = {
    kharif: [
      "Prepare fields for monsoon crops like rice, cotton, and sugarcane",
      "Ensure proper drainage to prevent waterlogging",
      "Monitor weather for optimal sowing time"
    ],
    rabi: [
      "Sow winter crops like wheat, barley, and mustard",
      "Apply organic matter to improve soil fertility",
      "Plan irrigation schedule for dry season"
    ],
    zaid: [
      "Focus on quick-growing summer crops",
      "Ensure adequate water supply for irrigation",
      "Use mulching to conserve soil moisture"
    ]
  };
  
  return tips[season as keyof typeof tips] || tips.kharif;
}

/**
 * Get farming vocabulary for better response matching
 */
export const farmingKeywords = {
  crops: ['wheat', 'rice', 'cotton', 'sugarcane', 'tomato', 'potato', 'onion', 'garlic', 'maize', 'barley'],
  diseases: ['blight', 'rust', 'mildew', 'spot', 'rot', 'wilt', 'mosaic', 'curl', 'burn'],
  nutrients: ['nitrogen', 'phosphorus', 'potassium', 'NPK', 'fertilizer', 'compost', 'manure'],
  weather: ['rain', 'temperature', 'humidity', 'wind', 'drought', 'flood', 'hail'],
  farming: ['irrigation', 'harvesting', 'sowing', 'planting', 'cultivation', 'pest', 'yield']
};