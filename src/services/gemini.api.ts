import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini AI Service - Handles all interactions with Google Gemini AI
 */
export class GeminiAPIService {
  private static genAI: GoogleGenerativeAI | null = null;
  private static model: any = null;

  /**
   * Initialize Gemini AI with API key
   */
  private static initialize() {
    if (!this.genAI) {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Google Gemini API key not found. Please add VITE_GOOGLE_GEMINI_API_KEY to your .env file');
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  /**
   * Generate farming advice using Gemini AI
   */
  static async generateFarmingAdvice(
    userMessage: string,
    language: string = 'en',
    conversationHistory: { role: string; content: string }[] = []
  ): Promise<{
    message: string;
    confidence: number;
    topic: string;
    suggestions: string[];
    relatedActions: string[];
  }> {
    try {
      this.initialize();

      // Create a comprehensive farming context prompt
      const systemPrompt = this.createFarmingSystemPrompt(language);
      
      // Build conversation context
      const conversationContext = conversationHistory
        .slice(-6) // Keep last 6 messages for context
        .map(msg => `${msg.role === 'user' ? 'Farmer' : 'KrishiMitra'}: ${msg.content}`)
        .join('\n');

      // Create the full prompt
      const fullPrompt = `${systemPrompt}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ''}

Current farmer's question: ${userMessage}

Please provide a comprehensive, practical response in ${this.getLanguageName(language)} language. Structure your response with:
1. Direct answer to the farmer's question
2. Practical steps or recommendations
3. Important warnings or precautions if any
4. Additional tips for success

Keep the response helpful, actionable, and easy to understand for farmers.`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Analyze the response to extract metadata
      const analysis = this.analyzeResponse(userMessage, text);

      return {
        message: text,
        confidence: analysis.confidence,
        topic: analysis.topic,
        suggestions: analysis.suggestions,
        relatedActions: analysis.relatedActions
      };

    } catch (error) {
      console.error('Error generating farming advice:', error);
      
      // Provide a fallback response
      return this.getFallbackResponse(userMessage, language);
    }
  }

  /**
   * Create a comprehensive farming system prompt
   */
  private static createFarmingSystemPrompt(language: string): string {
    const languageName = this.getLanguageName(language);
    
    return `You are KrishiMitra, an expert AI agricultural advisor with deep knowledge of:

CORE EXPERTISE:
- Crop cultivation (rice, wheat, cotton, sugarcane, vegetables, fruits)
- Soil health and fertility management
- Irrigation and water management
- Pest and disease control (IPM practices)
- Weather-based farming decisions
- Sustainable and organic farming
- Farm economics and market trends
- Modern agricultural technologies
- Regional farming practices in India

COMMUNICATION STYLE:
- Respond in ${languageName} language
- Use clear, practical language that farmers can understand
- Provide step-by-step actionable advice
- Include specific timelines, quantities, and methods
- Mention both traditional and modern approaches when relevant
- Be encouraging and supportive
- Acknowledge regional variations when applicable

RESPONSE GUIDELINES:
- Always prioritize farmer safety and sustainable practices
- Include cost-effective solutions
- Mention weather considerations when relevant
- Suggest both immediate and long-term solutions
- Include preventive measures
- Reference local agricultural extension services when helpful
- Avoid overly technical jargon without explanation

FOCUS AREAS:
- Practical solutions over theoretical knowledge
- Cost-effective methods accessible to small farmers
- Environmentally sustainable practices
- Integration of traditional wisdom with modern science
- Seasonal and regional considerations
- Market-oriented advice when relevant`;
  }

  /**
   * Analyze the response to extract metadata
   */
  private static analyzeResponse(userMessage: string, response: string): {
    confidence: number;
    topic: string;
    suggestions: string[];
    relatedActions: string[];
  } {
    // Determine confidence based on response length and content
    const confidence = Math.min(95, Math.max(75, 80 + (response.length / 50)));

    // Extract topic from user message
    const topic = this.extractTopic(userMessage);

    // Generate relevant suggestions
    const suggestions = this.generateSuggestions(userMessage, topic);

    // Generate related actions
    const relatedActions = this.generateRelatedActions(topic);

    return {
      confidence: Math.round(confidence),
      topic,
      suggestions,
      relatedActions
    };
  }

  /**
   * Extract topic from user message
   */
  private static extractTopic(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    // Crop-specific topics
    if (lowerMessage.includes('rice') || lowerMessage.includes('paddy')) return 'Rice Farming';
    if (lowerMessage.includes('wheat')) return 'Wheat Cultivation';
    if (lowerMessage.includes('cotton')) return 'Cotton Farming';
    if (lowerMessage.includes('sugarcane')) return 'Sugarcane';
    if (lowerMessage.includes('tomato')) return 'Tomato Growing';
    if (lowerMessage.includes('potato')) return 'Potato Farming';
    if (lowerMessage.includes('onion')) return 'Onion Cultivation';
    if (lowerMessage.includes('corn') || lowerMessage.includes('maize')) return 'Corn/Maize';

    // Problem-specific topics
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect')) return 'Pest Control';
    if (lowerMessage.includes('disease') || lowerMessage.includes('fungus')) return 'Plant Disease';
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) return 'Fertilization';
    if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) return 'Irrigation';
    if (lowerMessage.includes('soil')) return 'Soil Management';
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) return 'Weather Planning';
    if (lowerMessage.includes('seed')) return 'Seeds & Planting';
    if (lowerMessage.includes('harvest')) return 'Harvesting';
    if (lowerMessage.includes('market') || lowerMessage.includes('price')) return 'Market Advice';

    return 'General Farming';
  }

  /**
   * Generate contextual suggestions
   */
  private static generateSuggestions(userMessage: string, topic: string): string[] {
    const suggestions: { [key: string]: string[] } = {
      'Rice Farming': ['Best rice varieties for your region', 'Water management in rice', 'Rice pest control'],
      'Wheat Cultivation': ['Wheat sowing time', 'Wheat fertilizer schedule', 'Wheat disease prevention'],
      'Cotton Farming': ['Cotton variety selection', 'Bollworm control in cotton', 'Cotton irrigation schedule'],
      'Pest Control': ['Integrated pest management', 'Organic pest control methods', 'Pesticide safety measures'],
      'Plant Disease': ['Disease prevention strategies', 'Fungicide application timing', 'Crop rotation benefits'],
      'Soil Management': ['Soil testing importance', 'Organic matter improvement', 'Soil pH management'],
      'Irrigation': ['Drip irrigation benefits', 'Water conservation techniques', 'Irrigation scheduling'],
      'General Farming': ['Crop planning calendar', 'Weather forecast importance', 'Market price trends']
    };

    return suggestions[topic] || suggestions['General Farming'];
  }

  /**
   * Generate related actions
   */
  private static generateRelatedActions(topic: string): string[] {
    const actions: { [key: string]: string[] } = {
      'Rice Farming': ['Check weather forecast', 'Monitor water levels', 'Schedule fertilizer application'],
      'Wheat Cultivation': ['Plan sowing schedule', 'Prepare soil', 'Arrange quality seeds'],
      'Cotton Farming': ['Install pheromone traps', 'Monitor pest levels', 'Plan picking schedule'],
      'Pest Control': ['Scout field regularly', 'Set up monitoring traps', 'Contact extension officer'],
      'Plant Disease': ['Remove infected plants', 'Apply preventive spray', 'Improve drainage'],
      'Soil Management': ['Collect soil samples', 'Add organic compost', 'Plan crop rotation'],
      'Irrigation': ['Check water source', 'Maintain irrigation system', 'Monitor soil moisture'],
      'General Farming': ['Update farm records', 'Check market prices', 'Plan next season']
    };

    return actions[topic] || actions['General Farming'];
  }

  /**
   * Get language name from code
   */
  private static getLanguageName(languageCode: string): string {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'hi': 'Hindi',
      'te': 'Telugu',
      'ta': 'Tamil',
      'bn': 'Bengali',
      'mr': 'Marathi'
    };

    return languages[languageCode] || 'English';
  }

  /**
   * Provide fallback response when Gemini API fails
   */
  private static getFallbackResponse(userMessage: string, language: string): {
    message: string;
    confidence: number;
    topic: string;
    suggestions: string[];
    relatedActions: string[];
  } {
    const fallbackMessages: { [key: string]: string } = {
      'en': "I'm currently having trouble accessing my knowledge base. Please try again in a moment. In the meantime, I recommend consulting with your local agricultural extension officer for immediate farming advice.",
      'hi': "मुझे अपनी जानकारी तक पहुंचने में समस्या हो रही है। कृपया कुछ देर बाद फिर से कोशिश करें। इस बीच, तत्काल कृषि सलाह के लिए अपने स्थानीय कृषि विस्तार अधिकारी से संपर्क करने की सलाह दी जाती है।",
      'te': "నేను ప్రస్తుతం నా జ్ఞాన భాండారాన్ని యాక్సెస్ చేయడంలో ఇబ్బంది పడుతున్నాను. దయచేసి కొద్దిసేపటి తర్వాత మళ్లీ ప్రయత్నించండి. ఈ మధ్య, తక్షణ వ్యవసాయ సలహా కోసం మీ స్థానిక వ్యవసాయ పొడిగింపు అధికారిని సంప్రదించమని సిఫార్సు చేస్తున్నాను.",
      'ta': "நான் தற்போது எனது அறிவுத் தளத்தை அணுகுவதில் சிக்கல் உள்ளது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும். இதற்கிடையில், உடனடி விவசாய ஆலோசனைக்காக உங்கள் உள்ளூர் விவசாய விரிவாக்க அதிகாரியை தொடர்பு கொள்ள பரிந்துரைக்கிறேன்.",
      'bn': "আমি বর্তমানে আমার জ্ঞানের ভাণ্ডার অ্যাক্সেস করতে সমস্যায় পড়ছি। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন। এই সময়ে, তাৎক্ষণিক কৃষি পরামর্শের জন্য আপনার স্থানীয় কৃষি সম্প্রসারণ কর্মকর্তার সাথে যোগাযোগ করার পরামর্শ দিচ্ছি।",
      'mr': "मला सध्या माझ्या ज्ञान संग्रहात प्रवेश करण्यात अडचण येत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा. यादरम्यान, तात्काळ शेती सल्ल्यासाठी तुमच्या स्थानिक शेती विस्तार अधिकाऱ्याशी संपर्क साधण्याची शिफारस करतो."
    };

    return {
      message: fallbackMessages[language] || fallbackMessages['en'],
      confidence: 50,
      topic: this.extractTopic(userMessage),
      suggestions: ['Try again later', 'Contact local expert', 'Check internet connection'],
      relatedActions: ['Retry message', 'Contact extension officer', 'Check network']
    };
  }

  /**
   * Test API connectivity
   */
  static async testConnection(): Promise<boolean> {
    try {
      this.initialize();
      const result = await this.model.generateContent('Hello, test message for connectivity');
      return !!result;
    } catch (error) {
      console.error('Gemini API connection test failed:', error);
      return false;
    }
  }
}