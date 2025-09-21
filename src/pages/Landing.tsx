import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-farmland.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-field flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="text-8xl mb-6">🌾</div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
          KrishiMitra
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-medium">
          Your AI-Powered Smart Farming Assistant
        </p>
        
        <p className="text-lg text-primary-foreground/80 mb-12 max-w-xl mx-auto">
          Get personalized crop recommendations, weather insights, and expert farming advice in your local language
        </p>
        
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="text-lg px-12 py-6 h-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow transform transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-primary-foreground">
            📱 Works Offline
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-primary-foreground">
            🗣 Voice Enabled
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-4 py-2 text-primary-foreground">
            🌍 7 Languages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;