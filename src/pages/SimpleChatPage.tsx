import React from 'react';
import SimpleChatBot from '../components/SimpleChatBot';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SimpleChatBot />
    </div>
  );
};

export default ChatPage;