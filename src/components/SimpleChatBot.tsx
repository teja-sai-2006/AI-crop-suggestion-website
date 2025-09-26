import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SimpleGeminiAPI } from '../services/simple-gemini.api';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SimpleChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Test connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const connected = await SimpleGeminiAPI.testConnection();
        setIsConnected(connected);
      } catch (error) {
        setIsConnected(false);
      }
    };
    
    testConnection();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message function
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      console.log('💬 Sending message to API:', currentInput);
      
      // Direct API call to Gemini - no modifications
      const response = await SimpleGeminiAPI.sendMessage(currentInput);
      
      console.log('✅ Got response from API:', response?.substring(0, 100));
      
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      console.log('✅ Bot message added to chat');
    } catch (error: any) {
      console.error('❌ Chat error occurred:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      });
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: `Error: ${error.message || 'Unknown error occurred'}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              AI Chat Assistant
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected === null ? 'bg-gray-400' : 
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-600">
                {isConnected === null ? 'Checking...' : 
                 isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 py-2" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation with AI</p>
                  <p className="text-sm">Ask me anything!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.sender === 'user' ? (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.sender === 'bot' ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading || !isConnected}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage} 
                disabled={isLoading || !input.trim() || !isConnected}
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            {!isConnected && (
              <p className="text-sm text-red-500 mt-2">
                Unable to connect to AI service. Please check your connection.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleChatBot;