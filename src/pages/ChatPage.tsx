import { Navigation } from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";

const ChatPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <ChatBot />
      </div>
    </div>
  );
};

export default ChatPage;