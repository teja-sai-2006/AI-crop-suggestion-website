/**
 * ChatBot Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  language?: string;
  messageType?: 'text' | 'voice' | 'quick_reply';
  metadata?: {
    confidence?: number;
    topic?: string;
    suggestions?: string[];
    relatedActions?: string[];
    source?: 'gemini-ai' | 'fallback';
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  lastMessageAt: string;
  language: string;
  messageCount: number;
}

export interface ChatBotResponse {
  message: string;
  confidence: number;
  topic: string;
  suggestions?: string[];
  relatedActions?: string[];
  followUpQuestions?: string[];
}

export interface VoiceInputSimulation {
  isListening: boolean;
  transcript: string;
  confidence: number;
  language: string;
}

export interface ChatBotSettings {
  language: 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr';
  voiceEnabled: boolean;
  autoSuggestions: boolean;
  responseDelay: number;
  maxHistoryDays: number;
}

export interface QuickReply {
  id: string;
  text: string;
  category: 'greeting' | 'crop' | 'weather' | 'disease' | 'market' | 'general';
  language: string;
}

export interface ChatContext {
  currentTopic?: string;
  userLocation?: string;
  userCrops?: string[];
  conversationHistory: string[];
  lastInteraction: string;
}

export interface ChatBotAnalytics {
  totalMessages: number;
  sessionsToday: number;
  topTopics: string[];
  averageResponseTime: number;
  userSatisfaction: number;
}

export interface ChatBotError {
  code: string;
  message: string;
  details?: any;
}