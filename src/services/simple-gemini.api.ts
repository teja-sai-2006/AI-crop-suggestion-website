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
      
      console.log('🔍 API Key check:', apiKey ? `Found (${apiKey.substring(0, 10)}...)` : 'Not found');
      
      if (!apiKey) {
        console.error('❌ VITE_GOOGLE_GEMINI_API_KEY not found in environment variables');
        console.error('📋 Available env vars:', Object.keys(import.meta.env));
        throw new Error('API key not found - check VITE_GOOGLE_GEMINI_API_KEY in .env file');
      }

      if (!apiKey.startsWith('AIza')) {
        console.error('❌ Invalid API key format - should start with "AIza"');
        throw new Error('Invalid API key format');
      }

      console.log('✅ API Key looks valid, initializing Gemini...');
      this.genAI = new GoogleGenerativeAI(apiKey);
      // Start with a common model name, will be updated during testConnection
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      console.log('✅ Gemini AI initialized successfully');
    }
  }

  /**
   * Send message directly to Gemini with language support and retry logic
   */
  static async sendMessage(userInput: string, language: string = 'en', retries: number = 3): Promise<string> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🚀 Sending to Gemini API (attempt ${attempt}/${retries}):`, userInput.substring(0, 50) + '...');
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
        console.error(`❌ Gemini API Error (attempt ${attempt}/${retries}):`, {
          message: error.message,
          cause: error.cause,
          stack: error.stack,
          name: error.name
        });
        
        // Check if it's a 503 Service Unavailable error
        if (error.message?.includes('503') || error.message?.includes('service is currently unavailable')) {
          if (attempt < retries) {
            const waitTime = attempt * 2000; // Exponential backoff: 2s, 4s, 6s
            console.log(`⏳ Service unavailable, waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue; // Retry
          } else {
            throw new Error('🚨 Google Gemini service is temporarily unavailable. Please try again in a few minutes.');
          }
        }
        
        // For other errors, provide specific error messages
        let userFriendlyError = 'Failed to get response from AI';
        
        if (error.message?.includes('API_KEY_INVALID') || error.status === 400) {
          userFriendlyError = '🔑 Invalid API key. Please check your Google AI API key in the .env file.';
          console.error('🔑 API Key Issue: The provided API key is invalid or malformed');
        } else if (error.message?.includes('PERMISSION_DENIED') || error.status === 403) {
          userFriendlyError = '🚫 Permission denied. Please enable the Generative AI API in Google Cloud Console.';
          console.error('🚫 Permission Issue: API key lacks permissions or service not enabled');
        } else if (error.message?.includes('QUOTA_EXCEEDED') || error.status === 429) {
          userFriendlyError = '📊 API quota exceeded. Please check your usage limits or upgrade your plan.';
          console.error('📊 Quota Issue: API usage limits exceeded');
        } else if (error.message?.includes('BILLING_NOT_ACTIVE') || error.status === 403) {
          userFriendlyError = '💳 Billing not enabled. Please enable billing in Google Cloud Console.';
          console.error('💳 Billing Issue: Google Cloud billing not active');
        } else if (error.message?.includes('Failed to fetch') || error.name === 'NetworkError') {
          userFriendlyError = '🌐 Network error. Please check your internet connection.';
          console.error('🌐 Network Issue: Failed to connect to Gemini API');
        }
        
        throw new Error(userFriendlyError);
      }
    }
    
    throw new Error('🚨 Failed to get response after multiple attempts. Please try again later.');
  }

  /**
   * List available models from the API
   */
  static async listAvailableModels(): Promise<string[]> {
    try {
      this.initialize();
      
      console.log('🔍 Discovering available Gemini models...');
      // Use the listModels method from the SDK
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${import.meta.env.VITE_GOOGLE_GEMINI_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`Failed to list models: ${response.status}`);
      }
      
      const data = await response.json();
      const modelNames = data.models
        ?.filter((model: any) => model.supportedGenerationMethods?.includes('generateContent'))
        ?.map((model: any) => model.name.replace('models/', '')) || [];
      
      console.log('📋 Available Gemini models:', modelNames);
      return modelNames;
    } catch (error) {
      console.error('❌ Failed to list models:', error);
      // Fallback to common model names if API fails
      return ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
    }
  }

  /**
   * Test connection with available models
   */
  static async testConnection(): Promise<boolean> {
    try {
      this.initialize();
      
      // First, get the list of available models
      const availableModels = await this.listAvailableModels();
      
      if (availableModels.length === 0) {
        console.error('❌ No models available');
        return false;
      }

      // Prioritize free models if available
      const preferredModels = [
        'gemini-1.5-flash',
        'gemini-1.5-pro', 
        'gemini-pro',
        'gemini-1.0-pro'
      ];

      // First try preferred models that are available
      for (const modelName of preferredModels) {
        if (availableModels.includes(modelName)) {
          console.log(`🧪 Testing preferred model: ${modelName}...`);
          if (await this.testSingleModel(modelName)) {
            return true;
          }
        }
      }

      // If no preferred models work, try all available models
      for (const modelName of availableModels) {
        console.log(`🧪 Testing available model: ${modelName}...`);
        if (await this.testSingleModel(modelName)) {
          return true;
        }
      }

      console.error('❌ All available models failed');
      return false;
      
    } catch (error) {
      console.error('❌ Error during connection test:', error);
      return false;
    }
  }

  /**
   * Test a single model
   */
  private static async testSingleModel(modelName: string): Promise<boolean> {
    try {
      const testModel = this.genAI!.getGenerativeModel({ model: modelName });
      const result = await testModel.generateContent('Hi');
      const response = await result.response;
      const text = response.text();
      
      if (text) {
        console.log(`✅ Model ${modelName} is working!:`, text.substring(0, 30));
        this.model = testModel;
        console.log(`🎯 Using model: ${modelName}`);
        return true;
      }
    } catch (error: any) {
      console.warn(`⚠️ Model ${modelName} failed:`, error.message);
      
      // If it's an API key error, don't try other models
      if (error.message?.includes('API_KEY_INVALID')) {
        console.error('🔑 Invalid API Key detected');
        throw error;
      } else if (error.message?.includes('PERMISSION_DENIED')) {
        console.error('🚫 Permission denied - API key lacks permissions');
        throw error;
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        console.error('📊 API quota exceeded');
        throw error;
      } else if (error.message?.includes('BILLING_NOT_ACTIVE')) {
        console.error('💳 Billing not enabled');
        throw error;
      }
    }
    return false;
  }
}