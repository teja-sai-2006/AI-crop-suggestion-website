import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Wheat, 
  Cloud, 
  TrendingUp, 
  Bug, 
  MessageCircle, 
  Settings,
  Menu,
  X,
  BarChart3,
  Phone,
  FileText
} from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/recommendation", label: "Crop Recommendation", icon: Wheat },
  { path: "/weather", label: "Weather Forecast", icon: Cloud },
  { path: "/tracker", label: "Crop Tracker", icon: TrendingUp },
  { path: "/disease", label: "Disease Detection", icon: Bug },
  { path: "/market", label: "Market Prices", icon: BarChart3 },
  { path: "/records", label: "Farm Records", icon: FileText },
  { path: "/expert", label: "Expert Call", icon: Phone },
  { path: "/chat", label: "Chatbot", icon: MessageCircle },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <div className="text-xl">🌾</div>
              <span>KrishiMitra</span>
            </div>
            <div className="flex gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center gap-2 px-3"
                    title={item.label}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <div className="text-xl">🌾</div>
              <span>KrishiMitra</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-card/80 backdrop-blur-sm border border-border"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div className="fixed top-16 right-4 bg-card border border-border rounded-lg p-4 shadow-card min-w-[200px]">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full justify-start gap-3"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};