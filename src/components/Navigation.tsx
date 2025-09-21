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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-card">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-3 text-lg font-semibold group cursor-pointer" onClick={() => handleNavigation('/home')}>
              <div className="text-2xl transition-transform duration-200 group-hover:scale-110">🌾</div>
              <span className="bg-gradient-field bg-clip-text text-transparent">KrishiMitra</span>
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
                    className={`
                      flex items-center gap-2 px-3 transition-all duration-200 group
                      ${isActive 
                        ? "shadow-soft" 
                        : "hover:shadow-soft hover:scale-105"
                      }
                    `}
                    title={item.label}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 ${!isActive && "group-hover:scale-110"}`} />
                    <span className="hidden lg:inline font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center space-x-3 text-lg font-semibold">
              <div className="text-2xl">🌾</div>
              <span className="bg-gradient-field bg-clip-text text-transparent">KrishiMitra</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={`
                bg-card/90 backdrop-blur-sm border border-border transition-all duration-200 hover:shadow-soft
                ${isOpen ? "rotate-90" : "hover:scale-105"}
              `}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-200" 
            onClick={() => setIsOpen(false)}
          />
          <div className="md:hidden fixed top-16 right-4 left-4 sm:left-auto sm:min-w-[240px] bg-card/95 backdrop-blur-md border border-border/60 rounded-xl p-4 shadow-glow z-50 animate-in slide-in-from-top-5 duration-200">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full justify-start gap-3 transition-all duration-200 group
                      ${isActive 
                        ? "shadow-soft" 
                        : "hover:shadow-soft hover:translate-x-1"
                      }
                    `}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 ${!isActive && "group-hover:scale-110"}`} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};