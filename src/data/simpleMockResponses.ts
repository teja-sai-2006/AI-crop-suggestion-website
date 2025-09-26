/**
 * Simple ChatBot Responses - Minimal fallback only
 */

import { ChatBotResponse } from '../types/chatbot.types';

/**
 * Simple fallback response when API is unavailable
 */
export function generateMockResponse(userMessage: string, language: string = 'en'): ChatBotResponse {
  return {
    message: "I'm having trouble connecting to the AI service right now. Please try again in a moment.",
    confidence: 50,
    topic: 'connection_error',
    suggestions: ['Try again', 'Check connection'],
    relatedActions: ['Retry message']
  };
}