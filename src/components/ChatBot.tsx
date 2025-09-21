import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Send, 
  Mic, 
  MicOff, 
  MessageSquare, 
  Clock, 
  Settings, 
  Trash2,
  Bot,
  User,
  Loader2,
  Volume2,
  Languages,
  Lightbulb,
  Plus
} from 'lucide-react';
import { ChatBotAPIService } from '../services/chatbot.api';
import { 
  ChatMessage, 
  ChatSession, 
  ChatBotSettings 
} from '../types/chatbot.types';

const ChatBot: React.FC = () => {
  // Component state
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [settings, setSettings] = useState<ChatBotSettings>({
    language: 'en',
    voiceEnabled: true,
    autoSuggestions: true,
    responseDelay: 1000,
    maxHistoryDays: 30
  });
  const [quickReplies, setQuickReplies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const loadInitialData = async () => {
    try {
      // Load settings
      const userSettings = await ChatBotAPIService.getSettings();
      setSettings(userSettings);

      // Load sessions
      const allSessions = await ChatBotAPIService.getSessions();
      setSessions(allSessions);

      // Load or create current session
      const currentSessionId = ChatBotAPIService.getCurrentSessionId();
      if (currentSessionId) {
        const session = await ChatBotAPIService.getSession(currentSessionId);
        if (session) {
          setCurrentSession(session);
        } else {
          await createNewSession();
        }
      } else {
        await createNewSession();
      }

      // Load quick replies
      const replies = await ChatBotAPIService.getQuickReplies(userSettings.language);
      setQuickReplies(replies);
    } catch (err) {
      console.error('Failed to load initial data:', err);
      setError('Failed to load chat data');
    }
  };

  const createNewSession = async () => {
    try {
      const newSession = await ChatBotAPIService.createSession(settings.language);
      setCurrentSession(newSession);
      setSessions(prev => [newSession, ...prev]);
      ChatBotAPIService.setCurrentSessionId(newSession.id);
    } catch (err) {
      setError('Failed to create new chat session');
    }
  };

  const sendMessage = async (messageText: string = message) => {
    if (!messageText.trim() || !currentSession || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const { userMessage, botResponse } = await ChatBotAPIService.sendMessage(
        messageText.trim(),
        currentSession.id,
        settings.language
      );

      // Reload the updated session from the API (includes updated title if it was the first message)
      const updatedSession = await ChatBotAPIService.getSession(currentSession.id);
      if (updatedSession) {
        setCurrentSession(updatedSession);
        
        // Update sessions list with the updated session
        setSessions(prev => prev.map(session => 
          session.id === currentSession.id ? updatedSession : session
        ));
      }

      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = async () => {
    if (!settings.voiceEnabled) return;

    setIsListening(true);
    setError(null);

    try {
      // Simulate voice input
      const transcript = await ChatBotAPIService.simulateVoiceTranscription(3000);
      setMessage(transcript);
      setIsListening(false);
      
      // Auto-send voice message
      if (transcript.trim()) {
        await sendMessage(transcript);
      }
    } catch (err) {
      setError('Voice input failed. Please try typing instead.');
      setIsListening(false);
    }
  };

  const handleQuickReply = async (replyText: string) => {
    await sendMessage(replyText);
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await ChatBotAPIService.updateSettings({ language: newLanguage as any });
      setSettings(prev => ({ ...prev, language: newLanguage as any }));
      
      // Load quick replies for new language
      const replies = await ChatBotAPIService.getQuickReplies(newLanguage);
      setQuickReplies(replies);
    } catch (err) {
      setError('Failed to change language');
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await ChatBotAPIService.deleteSession(sessionId);
      setSessions(prev => prev.filter(session => session.id !== sessionId));
      
      if (currentSession?.id === sessionId) {
        await createNewSession();
      }
    } catch (err) {
      setError('Failed to delete session');
    }
  };

  const clearAllSessions = async () => {
    try {
      const allSessionIds = sessions.map(session => session.id);
      await ChatBotAPIService.deleteMultipleSessions(allSessionIds);
      setSessions([]);
      await createNewSession();
    } catch (err) {
      setError('Failed to clear all sessions');
    }
  };

  const clearAllHistory = async () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      return;
    }
    
    try {
      // Use the API service to clear all data
      await ChatBotAPIService.clearAllData();
      
      // Reset state
      setSessions([]);
      setCurrentSession(null);
      setShowClearConfirm(false);
      
      // Create a fresh session
      await createNewSession();
    } catch (err) {
      setError('Failed to clear all history');
      setShowClearConfirm(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageIcon = (sender: 'user' | 'bot') => {
    return sender === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <img src="/favicon.svg" alt="KrishiMitra" className="h-6 w-6 lg:h-8 lg:w-8" />
          KrishiMitra
        </h1>
        <p className="text-base lg:text-lg text-gray-600">
          Get instant farming advice with voice and text support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Chat History Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Chat History</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={createNewSession}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  {sessions.length > 0 && (
                    <Button 
                      size="sm" 
                      variant={showClearConfirm ? "destructive" : "outline"} 
                      onClick={clearAllHistory}
                      onBlur={() => setShowClearConfirm(false)}
                      title={showClearConfirm ? "Click again to confirm" : "Clear all chat history"}
                    >
                      <Trash2 className="h-3 w-3" />
                      {showClearConfirm && <span className="ml-1 text-xs">Confirm?</span>}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {sessions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No chat history</p>
                      <p className="text-xs text-gray-400">Start a conversation to create history</p>
                    </div>
                  ) : (
                    sessions.map((session) => (
                      <div 
                        key={session.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentSession?.id === session.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentSession(session)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{session.title}</p>
                            <p className="text-xs text-gray-500">
                              {session.messageCount} messages
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(session.lastMessageAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.id);
                            }}
                            title="Delete this chat"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium">Language</label>
                <Select value={settings.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Voice Input</span>
                <Button
                  size="sm"
                  variant={settings.voiceEnabled ? "default" : "outline"}
                  onClick={() => {
                    const newVoiceEnabled = !settings.voiceEnabled;
                    setSettings(prev => ({ ...prev, voiceEnabled: newVoiceEnabled }));
                    ChatBotAPIService.updateSettings({ voiceEnabled: newVoiceEnabled });
                  }}
                >
                  {settings.voiceEnabled ? <Volume2 className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[500px] lg:h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="KrishiMitra" className="h-5 w-5" />
                    {currentSession?.title || 'KrishiMitra'}
                  </CardTitle>
                  <CardDescription>
                    Ask me anything about farming, crops, weather, or diseases
                  </CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Languages className="h-3 w-3" />
                  {settings.language.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4 h-[350px] max-h-[350px] overflow-y-auto">
                <div className="space-y-4">
                  {currentSession?.messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      
                      <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : ''}`}>
                        <div 
                          className={`rounded-lg p-3 ${
                            msg.sender === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          {msg.metadata?.confidence && (
                            <div className="mt-2 text-xs opacity-75">
                              Confidence: {msg.metadata.confidence}%
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(msg.timestamp)}
                          </span>
                          {msg.metadata?.topic && (
                            <Badge variant="secondary" className="text-xs">
                              {msg.metadata.topic}
                            </Badge>
                          )}
                        </div>

                        {/* Suggestions */}
                        {msg.sender === 'bot' && msg.metadata?.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {msg.metadata.suggestions.slice(0, 3).map((suggestion, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                className="text-xs h-6"
                                onClick={() => handleQuickReply(suggestion)}
                              >
                                <Lightbulb className="h-3 w-3 mr-1" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center order-3">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              {quickReplies.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-600 mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.slice(0, 4).map((reply) => (
                      <Button
                        key={reply.id}
                        size="sm"
                        variant="outline"
                        className="text-xs h-6"
                        onClick={() => handleQuickReply(reply.text)}
                      >
                        {reply.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="mt-4 flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about crops, weather, diseases, or farming tips..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={isLoading || isListening}
                    className="pr-12"
                  />
                  {isListening && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-red-600">Listening...</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => sendMessage()}
                  disabled={!message.trim() || isLoading || isListening}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
                
                {settings.voiceEnabled && (
                  <Button
                    onClick={startVoiceInput}
                    disabled={isLoading || isListening}
                    size="sm"
                    variant={isListening ? "destructive" : "outline"}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;