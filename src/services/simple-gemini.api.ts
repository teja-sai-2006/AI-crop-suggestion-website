import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Simple Gemini AI Service - Direct Integration
 * No custom rules, no modifications, just pure Google AI
 */
export class SimpleGeminiAPI {
  private static genAI: GoogleGenerativeAI | null = null;
  private static model: any = null;

  /**
   * Initialize Gemini AI
   */
  private static initialize() {
    if (!this.genAI) {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found');
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
    }
  }

  /**
   * Send message directly to Gemini with language support
   */
  static async sendMessage(userInput: string, language: string = 'en'): Promise<string> {
    try {
      console.log('🚀 Sending to Gemini API:', userInput.substring(0, 50) + '...');
      this.initialize();
      
      // Add language instruction to the prompt
      let prompt = userInput;
      if (language !== 'en') {
        const languageNames = {
          'hi': 'Hindi (हिंदी)',
          'kn': 'Kannada (ಕನ್ನಡ)',
          'sat': 'Santali (ᱥᱟᱱᱛᱟᱲᱤ) - the language of Jharkhand state',
          'te': 'Telugu',
          'ta': 'Tamil',
          'bn': 'Bengali',
          'mr': 'Marathi'
        };
        const languageName = languageNames[language as keyof typeof languageNames] || language;
        prompt = `Please respond in ${languageName} language. User's question: ${userInput}`;
      }
      
      // Direct API call with language-aware prompt
      const result = await this.model.generateContent(prompt);
      console.log('📡 Got result from API, extracting response...');
      
      const response = await result.response;
      console.log('✅ Response object received');
      console.log('🔍 Response structure:', Object.keys(response));
      console.log('🔍 Response has text method:', typeof response.text);
      
      // Try both sync and async text extraction
      let text;
      try {
        text = response.text(); // Try sync first (standard Gemini pattern)
        console.log('📝 Sync text extraction successful');
      } catch (syncError) {
        console.log('⚠️ Sync text failed, trying async...');
        text = await response.text(); // Try async if sync fails
        console.log('📝 Async text extraction successful');
      }
      
      console.log('📝 Response text length:', text?.length || 0);
      console.log('📄 Response preview:', text?.substring(0, 100) || 'No text');

      if (!text || text.trim() === '') {
        console.error('❌ Empty response from Gemini API');
        throw new Error('Empty response from API');
      }

      console.log('✅ Successfully got response from Gemini API');
      return text;
    } catch (error: any) {
      console.error('❌ Gemini API Error Details:', {
        message: error.message,
        cause: error.cause,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  }

  /**
   * Test connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      this.initialize();
      return true;
    } catch (error) {
      return false;
    }
  }
}