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
      message: "For crop selection, I recommend considering your soil type, climate, and local market demand. What's your soil type - sandy, loamy, or clay?",
      confidence: 90,
      topic: "crop_selection",
      suggestions: ["Tell me about soil types", "Show market prices", "Weather forecast"],
      relatedActions: ["Check soil analysis", "View crop calendar", "Market trends"],
      followUpQuestions: ["What crops did you grow last season?", "Do you have soil test results?"]
    },
    {
      message: "Based on current market trends, wheat and mustard are showing good prices this season. However, crop rotation is important for soil health.",
      confidence: 85,
      topic: "crop_recommendation",
      suggestions: ["Crop rotation benefits", "Market analysis", "Fertilizer guide"],
      relatedActions: ["View crop tracker", "Check fertilizer prices", "Expert consultation"]
    },
    {
      message: "Tomatoes require well-drained soil with pH 6.0-7.0. Plant spacing should be 60cm between rows and 45cm between plants for optimal growth.",
      confidence: 95,
      topic: "crop_cultivation",
      suggestions: ["Tomato diseases", "Fertilizer schedule", "Harvest timing"],
      relatedActions: ["Disease detection", "Set reminders", "Track growth"]
    }
  ],

  // Weather-related responses
  weather: [
    {
      message: "The weather forecast shows light rain expected in 2-3 days. This is perfect timing for sowing if you haven't already. Avoid applying fertilizers just before rain.",
      confidence: 88,
      topic: "weather_advice",
      suggestions: ["Sowing guide", "Fertilizer timing", "Irrigation planning"],
      relatedActions: ["View 7-day forecast", "Set weather alerts", "Crop calendar"]
    },
    {
      message: "Current humidity levels are high (85%). This increases risk of fungal diseases. Ensure good air circulation and consider preventive spraying.",
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
      message: "Hello! I'm your AI farming assistant. I can help with crop selection, disease diagnosis, weather updates, and market information. What would you like to know?",
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
  ]
};

// Language-specific responses
export const languageResponses: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome! I'm your AI farming assistant. How can I help you today?",
    listening: "I'm listening... Speak now",
    processing: "Processing your question...",
    error: "Sorry, I couldn't understand. Could you please rephrase?",
    offline: "You're offline. I'll respond with cached information.",
    voiceNotSupported: "Voice input is not supported in this browser."
  },
  hi: {
    welcome: "स्वागत है! मैं आपका AI खेती सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    listening: "मैं सुन रहा हूं... अब बोलें",
    processing: "आपके प्रश्न को समझ रहा हूं...",
    error: "माफ करें, मैं समझ नहीं पाया। कृपया दोबारा कहें?",
    offline: "आप ऑफलाइन हैं। मैं संग्रहीत जानकारी के साथ जवाब दूंगा।",
    voiceNotSupported: "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।"
  }
};

/**
 * Generate mock chatbot response based on user input
 */
export function generateMockResponse(userMessage: string, language: string = 'en'): ChatBotResponse {
  const message = userMessage.toLowerCase();
  
  // Determine topic based on keywords
  let topic = 'general';
  let responses = mockChatResponses.general;
  
  if (message.includes('crop') || message.includes('plant') || message.includes('grow')) {
    topic = 'crop';
    responses = mockChatResponses.crop;
  } else if (message.includes('weather') || message.includes('rain') || message.includes('temperature')) {
    topic = 'weather';
    responses = mockChatResponses.weather;
  } else if (message.includes('disease') || message.includes('pest') || message.includes('bug') || message.includes('sick')) {
    topic = 'disease';
    responses = mockChatResponses.disease;
  } else if (message.includes('price') || message.includes('market') || message.includes('sell')) {
    topic = 'market';
    responses = mockChatResponses.market;
  }
  
  // Get random response from appropriate category
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Add some variation to confidence based on message clarity
  const confidence = randomResponse.confidence + (Math.random() * 10 - 5);
  
  return {
    ...randomResponse,
    confidence: Math.max(70, Math.min(95, Math.round(confidence)))
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