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
import { useLanguage } from "@/context/LanguageContext";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navigationItems = [
    { path: "/home", label: t('home'), icon: Home },
    { path: "/recommendation", label: t('cropRecommendation'), icon: Wheat },
    { path: "/weather", label: t('weatherForecast'), icon: Cloud },
    { path: "/tracker", label: t('cropTracker'), icon: TrendingUp },
    { path: "/disease", label: t('diseaseDetection'), icon: Bug },
    { path: "/market", label: t('marketPrices'), icon: BarChart3 },
    { path: "/records", label: t('farmRecords'), icon: FileText },
    { path: "/expert", label: t('expertCall'), icon: Phone },
    { path: "/chat", label: t('chatbot'), icon: MessageCircle },
    { path: "/settings", label: t('settings'), icon: Settings },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg font-semibold text-enhanced">
              <div className="text-xl">🌾</div>
              <span>{t('welcomeTitle')}</span>
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
                    className={`flex items-center gap-2 px-3 text-enhanced ${isActive ? 'glass' : 'glass-ultra'}`}
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
            <div className="flex items-center space-x-2 text-lg font-semibold text-enhanced">
              <div className="text-xl">🌾</div>
              <span>{t('welcomeTitle')}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="glass backdrop-blur-sm border border-border text-enhanced"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div className="fixed top-16 right-4 glass border border-border rounded-lg p-4 shadow-card min-w-[200px]">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full justify-start gap-3 text-enhanced ${isActive ? 'glass' : 'glass-ultra'}`}
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