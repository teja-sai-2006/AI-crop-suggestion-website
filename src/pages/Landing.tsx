import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-farmland.jpg";
import Lottie from "lottie-react";
import leavesLottie from "@/assets/nature-leaves-lottie.json";
import { useLanguage } from "@/context/LanguageContext";

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Lottie animation overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <Lottie animationData={leavesLottie} loop={true} style={{ width: '80vw', maxWidth: 700, opacity: 0.4 }} />
      </div>
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="text-8xl mb-6">🌾</div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-enhanced mb-4 text-overlay">
          {t('welcomeTitle')}
        </h1>
        
        <p className="text-xl md:text-2xl text-enhanced mb-8 font-medium text-overlay">
          {t('welcomeSubtitle')}
        </p>
        
        <p className="text-lg text-enhanced mb-12 max-w-xl mx-auto text-overlay">
          {t('landingDescription')}
        </p>
        
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="text-lg px-12 py-6 h-auto glass text-enhanced font-semibold shadow-glow transform transition-all duration-300 hover:scale-105"
        >
          {t('getStarted')}
        </Button>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="glass rounded-lg px-4 py-2 text-enhanced">
            📱 Works Offline
          </div>
          <div className="glass rounded-lg px-4 py-2 text-enhanced">
            🗣 Voice Enabled
          </div>
          <div className="glass rounded-lg px-4 py-2 text-enhanced">
            🌍 7 Languages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;