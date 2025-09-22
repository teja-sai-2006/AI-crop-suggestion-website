import { 
  ChatMessage, 
  ChatSession, 
  ChatBotResponse, 
  ChatBotSettings,
  VoiceInputSimulation,
  ChatBotAnalytics 
} from '../types/chatbot.types';
import { 
  generateMockResponse, 
  simulateVoiceInput, 
  quickReplies,
  languageResponses 
} from '../data/mockChatResponses';
import { GeminiAPIService } from './gemini.api';

/**
 * ChatBot API Service - Frontend-first implementation with mock data
 * All functions are structured as async API calls for easy backend replacement
 */

export class ChatBotAPIService {
  private static SESSIONS_KEY = 'km.chatbot.sessions';
  private static SETTINGS_KEY = 'km.chatbot.settings';
  private static ANALYTICS_KEY = 'km.chatbot.analytics';
  private static CURRENT_SESSION_KEY = 'km.chatbot.currentSession';

  /**
   * Send message to chatbot and get response using Gemini AI
   */
  static async sendMessage(
    message: string, 
    sessionId: string,
    language: string = 'en'
  ): Promise<{ userMessage: ChatMessage; botResponse: ChatMessage }> {
    try {
      // Simulate API processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create user message
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_user`,
        content: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
        language,
        messageType: 'text'
      };
      
      // Get conversation history for context
      const session = await this.getSession(sessionId);
      const conversationHistory = session?.messages
        .slice(-10) // Last 10 messages for context
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        })) || [];
      
      let botResponse: ChatMessage;
      
      try {
        // Try to get response from Gemini AI
        const geminiResponse = await GeminiAPIService.generateFarmingAdvice(
          message, 
          language, 
          conversationHistory
        );
        
        botResponse = {
          id: `msg_${Date.now()}_bot`,
          content: geminiResponse.message,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          language,
          messageType: 'text',
          metadata: {
            confidence: geminiResponse.confidence,
            topic: geminiResponse.topic,
            suggestions: geminiResponse.suggestions,
            relatedActions: geminiResponse.relatedActions,
            source: 'gemini-ai'
          }
        };
      } catch (error) {
        console.warn('Gemini AI failed, falling back to mock response:', error);
        
        // Fallback to mock response if Gemini fails
        const mockResponse = generateMockResponse(message, language);
        botResponse = {
          id: `msg_${Date.now()}_bot`,
          content: mockResponse.message,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          language,
          messageType: 'text',
          metadata: {
            confidence: mockResponse.confidence,
            topic: mockResponse.topic,
            suggestions: mockResponse.suggestions,
            relatedActions: mockResponse.relatedActions,
            source: 'fallback'
          }
        };
      }
      
      // Save messages to session
      await this.addMessagesToSession(sessionId, [userMessage, botResponse]);
      
      // Update analytics
      this.updateAnalytics('message_sent');
      
      return { userMessage, botResponse: botResponse };
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message to chatbot');
    }
  }

  /**
   * Start voice input simulation
   */
  static async startVoiceInput(language: string = 'en'): Promise<VoiceInputSimulation> {
    // TODO: Replace with real voice recognition API
    // Example: const recognition = new SpeechRecognition(); recognition.lang = language;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        isListening: true,
        transcript: '',
        confidence: 0,
        language
      };
    } catch (error) {
      console.error('Error starting voice input:', error);
      throw new Error('Failed to start voice input');
    }
  }

  /**
   * Simulate voice input transcription
   */
  static async simulateVoiceTranscription(duration: number = 3000): Promise<string> {
    // TODO: Replace with real voice transcription
    // Example: return await speechToText(audioBlob);
    
    try {
      const transcript = await simulateVoiceInput(duration);
      return transcript;
    } catch (error) {
      console.error('Error transcribing voice:', error);
      throw new Error('Failed to transcribe voice input');
    }
  }

  /**
   * Create new chat session
   */
  static async createSession(language: string = 'en'): Promise<ChatSession> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/chatbot/sessions', { method: 'POST', body: JSON.stringify({ language }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const sessionId = `session_${Date.now()}`;
      const welcomeMessage = languageResponses[language]?.welcome || languageResponses.en.welcome;
      
      const session: ChatSession = {
        id: sessionId,
        title: "New Chat",
        messages: [{
          id: `msg_${Date.now()}`,
          content: welcomeMessage,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          language,
          messageType: 'text'
        }],
        createdAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString(),
        language,
        messageCount: 1
      };
      
      // Save session
      const sessions = await this.getSessions();
      sessions.unshift(session);
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions.slice(0, 50))); // Keep last 50
      localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
      
      return session;
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Failed to create chat session');
    }
  }

  /**
   * Get chat session by ID
   */
  static async getSession(sessionId: string): Promise<ChatSession | null> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/chatbot/sessions/${sessionId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const sessions = await this.getSessions();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  /**
   * Get all chat sessions
   */
  static async getSessions(): Promise<ChatSession[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/chatbot/sessions');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const sessions = localStorage.getItem(this.SESSIONS_KEY);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  }

  /**
   * Delete chat session (alias for better UX)
   */
  static async deleteRecentChat(chatId: string): Promise<void> {
    return this.deleteSession(chatId);
  }

  /**
   * Delete multiple chat sessions
   */
  static async deleteMultipleSessions(sessionIds: string[]): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/chatbot/sessions/batch-delete', { method: 'DELETE', body: JSON.stringify({ sessionIds }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const sessions = await this.getSessions();
      const updatedSessions = sessions.filter(session => !sessionIds.includes(session.id));
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(updatedSessions));
      
      // Clear current session if it was deleted
      const currentSessionId = localStorage.getItem(this.CURRENT_SESSION_KEY);
      if (currentSessionId && sessionIds.includes(currentSessionId)) {
        localStorage.removeItem(this.CURRENT_SESSION_KEY);
      }
    } catch (error) {
      console.error('Error deleting multiple sessions:', error);
      throw new Error('Failed to delete multiple sessions');
    }
  }

  /**
   * Delete chat session
   */
  static async deleteSession(sessionId: string): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch(`/api/chatbot/sessions/${sessionId}`, { method: 'DELETE' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const sessions = await this.getSessions();
      const updatedSessions = sessions.filter(session => session.id !== sessionId);
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(updatedSessions));
      
      // Clear current session if it was deleted
      const currentSessionId = localStorage.getItem(this.CURRENT_SESSION_KEY);
      if (currentSessionId === sessionId) {
        localStorage.removeItem(this.CURRENT_SESSION_KEY);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      throw new Error('Failed to delete session');
    }
  }

  /**
   * Get quick replies for current language
   */
  static async getQuickReplies(language: string = 'en'): Promise<any[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/chatbot/quick-replies?lang=${language}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return quickReplies[language] || quickReplies.en;
    } catch (error) {
      console.error('Error getting quick replies:', error);
      return quickReplies.en;
    }
  }

  /**
   * Get chatbot settings
   */
  static async getSettings(): Promise<ChatBotSettings> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/chatbot/settings');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const settings = localStorage.getItem(this.SETTINGS_KEY);
      return settings ? JSON.parse(settings) : {
        language: 'en',
        voiceEnabled: true,
        autoSuggestions: true,
        responseDelay: 1000,
        maxHistoryDays: 30
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        language: 'en',
        voiceEnabled: true,
        autoSuggestions: true,
        responseDelay: 1000,
        maxHistoryDays: 30
      };
    }
  }

  /**
   * Update chatbot settings
   */
  static async updateSettings(settings: Partial<ChatBotSettings>): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/chatbot/settings', { method: 'PUT', body: JSON.stringify(settings) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const currentSettings = await this.getSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error updating settings:', error);
      throw new Error('Failed to update settings');
    }
  }

  /**
   * Get chatbot analytics
   */
  static async getAnalytics(): Promise<ChatBotAnalytics> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/chatbot/analytics');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const analytics = localStorage.getItem(this.ANALYTICS_KEY);
      return analytics ? JSON.parse(analytics) : {
        totalMessages: 0,
        sessionsToday: 0,
        topTopics: [],
        averageResponseTime: 1500,
        userSatisfaction: 4.2
      };
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {
        totalMessages: 0,
        sessionsToday: 0,
        topTopics: [],
        averageResponseTime: 1500,
        userSatisfaction: 4.2
      };
    }
  }

  /**
   * Get current session ID
   */
  static getCurrentSessionId(): string | null {
    return localStorage.getItem(this.CURRENT_SESSION_KEY);
  }

  /**
   * Set current session ID
   */
  static setCurrentSessionId(sessionId: string): void {
    localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
  }

  // Private helper methods

  private static generateTopicTitle(message: string): string {
    // Extract meaningful topic from user's first message
    const lowerMessage = message.toLowerCase();
    
    // Crop-related topics
    if (lowerMessage.includes('rice') || lowerMessage.includes('paddy')) return 'Rice Farming';
    if (lowerMessage.includes('wheat')) return 'Wheat Cultivation';
    if (lowerMessage.includes('corn') || lowerMessage.includes('maize')) return 'Corn/Maize Farming';
    if (lowerMessage.includes('cotton')) return 'Cotton Farming';
    if (lowerMessage.includes('sugarcane')) return 'Sugarcane Cultivation';
    if (lowerMessage.includes('tomato')) return 'Tomato Growing';
    if (lowerMessage.includes('potato')) return 'Potato Farming';
    if (lowerMessage.includes('onion')) return 'Onion Cultivation';
    if (lowerMessage.includes('banana')) return 'Banana Farming';
    if (lowerMessage.includes('mango')) return 'Mango Cultivation';
    
    // Problem-related topics
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect')) return 'Pest Control';
    if (lowerMessage.includes('disease') || lowerMessage.includes('fungus')) return 'Plant Disease';
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrients')) return 'Fertilization';
    if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) return 'Irrigation & Water';
    if (lowerMessage.includes('soil')) return 'Soil Management';
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) return 'Weather Advice';
    if (lowerMessage.includes('seed')) return 'Seeds & Planting';
    if (lowerMessage.includes('harvest')) return 'Harvesting';
    if (lowerMessage.includes('market') || lowerMessage.includes('price')) return 'Market & Pricing';
    
    // General farming topics
    if (lowerMessage.includes('organic')) return 'Organic Farming';
    if (lowerMessage.includes('yield') || lowerMessage.includes('production')) return 'Yield Improvement';
    if (lowerMessage.includes('season')) return 'Seasonal Farming';
    
    // Default to a shortened version of the message
    const words = message.split(' ').slice(0, 3).join(' ');
    return words.length > 20 ? words.substring(0, 20) + '...' : words || 'General Inquiry';
  }

  private static async addMessagesToSession(sessionId: string, messages: ChatMessage[]): Promise<void> {
    try {
      const sessions = await this.getSessions();
      const sessionIndex = sessions.findIndex(session => session.id === sessionId);
      
      if (sessionIndex >= 0) {
        const session = sessions[sessionIndex];
        
        // Check if this is the first user message (session only has welcome message)
        const isFirstUserMessage = session.messages.length === 1 && 
                                  messages.some(msg => msg.sender === 'user');
        
        // Update session title based on first user message
        if (isFirstUserMessage) {
          const firstUserMessage = messages.find(msg => msg.sender === 'user');
          if (firstUserMessage) {
            session.title = this.generateTopicTitle(firstUserMessage.content);
          }
        }
        
        session.messages.push(...messages);
        session.lastMessageAt = new Date().toISOString();
        session.messageCount = session.messages.length;
        
        localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
      }
    } catch (error) {
      console.warn('Failed to add messages to session:', error);
    }
  }

  private static updateAnalytics(action: string): void {
    try {
      const analytics = JSON.parse(localStorage.getItem(this.ANALYTICS_KEY) || '{}');
      
      if (action === 'message_sent') {
        analytics.totalMessages = (analytics.totalMessages || 0) + 1;
      }
      
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(analytics));
    } catch (error) {
      console.warn('Failed to update analytics:', error);
    }
  }

  /**
   * Test Gemini AI connection
   */
  static async testGeminiConnection(): Promise<boolean> {
    try {
      return await GeminiAPIService.testConnection();
    } catch (error) {
      console.error('Error testing Gemini connection:', error);
      return false;
    }
  }

  /**
   * Clear all chatbot data from localStorage (force cleanup)
   */
  static async clearAllData(): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Remove all chatbot-related localStorage keys
      localStorage.removeItem(this.SESSIONS_KEY);
      localStorage.removeItem(this.SETTINGS_KEY);
      localStorage.removeItem(this.ANALYTICS_KEY);
      localStorage.removeItem(this.CURRENT_SESSION_KEY);
      
      // Also clear any orphaned keys that might exist
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('km.chatbot.')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw new Error('Failed to clear all data');
    }
  }

  /**
   * Clear old sessions (cleanup utility)
   */
  static async cleanupOldSessions(maxDays: number = 30): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/chatbot/cleanup', { method: 'POST', body: JSON.stringify({ maxDays }) });
    
    try {
      const sessions = await this.getSessions();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - maxDays);
      
      const activeSessions = sessions.filter(session => 
        new Date(session.lastMessageAt) > cutoffDate
      );
      
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(activeSessions));
    } catch (error) {
      console.warn('Failed to cleanup old sessions:', error);
    }
  }
}