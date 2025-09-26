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
      
      if (!apiKey || apiKey === 'your_google_gemini_api_key_here') {
        throw new Error('Google Gemini API key not configured. Using fallback responses.');
      }

      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        throw error;
      }
    }
  }

  /**
   * Generate response using Gemini AI - direct API call without modifications
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

      // Simple, direct prompt - just pass user message to AI without modifications
      const result = await this.model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini API');
      }

      console.log('✅ Direct Gemini AI response generated');
      
      return {
        message: text,
        confidence: 95,
        topic: 'general',
        suggestions: [],
        relatedActions: []
      };

    } catch (error) {
      console.log('❌ Gemini API failed:', error.message);
      throw error; // Let the calling service handle the error
    }
  }



  /**
   * Test API connectivity - lightweight check
   */
  static async testConnection(): Promise<boolean> {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_google_gemini_api_key_here') {
        console.log('Gemini API key not configured, using enhanced fallback');
        return false;
      }

      // Just check if we can initialize, don't make actual API call
      // This avoids using up quota just for testing
      this.initialize();
      console.log('✅ Gemini API initialized successfully');
      return true;
      
    } catch (error) {
      console.log('⚠️ Gemini API initialization failed, using enhanced fallback');
      return false;
    }
  }
}