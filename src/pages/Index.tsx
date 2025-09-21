import { Header } from "@/components/Header";
import { StatsOverview } from "@/components/StatsOverview";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CropCard } from "@/components/CropCard";
import ChatBot from "@/components/ChatBot";
import { QuickActions } from "@/components/QuickActions";
import heroImage from "@/assets/hero-farmland.jpg";

const mockCrops = [
  {
    name: "Wheat",
    variety: "HD-2967 (High Yield)",
    stage: "Flowering",
    daysPlanted: 85,
    expectedHarvest: "March 15, 2024",
    confidence: 78,
    health: "good" as const,
    recommendations: [
      "Apply potash fertilizer (50kg/acre)",
      "Monitor for rust disease symptoms",
      "Ensure 2-3 irrigations during grain filling"
    ],
  },
  {
    name: "Mustard",
    variety: "Pusa Bold",
    stage: "Pod Formation",
    daysPlanted: 95,
    expectedHarvest: "February 28, 2024",
    confidence: 92,
    health: "excellent" as const,
    recommendations: [
      "Stop irrigation in 10 days",
      "Apply preventive fungicide spray",
      "Prepare for harvesting equipment"
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[28rem] bg-gradient-field overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">
              Welcome to Smart Farming
            </h2>
            <p className="text-lg opacity-90 mb-4">
              Get AI-powered crop recommendations, weather insights, and expert farming advice - all in your local language.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1 text-sm">
                📱 Works Offline
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1 text-sm">
                🗣 Voice Enabled
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-1 text-sm">
                🌍 7 Languages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8 mt-6 md:mt-10">
        <div className="space-y-8">
          {/* Stats Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Farm Overview</h3>
            <StatsOverview />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Weather & Quick Actions */}
            <div className="space-y-6">
              <WeatherWidget />
              <QuickActions />
            </div>

            {/* Middle Column - Crop Cards */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">My Crops</h3>
                <div className="space-y-4">
                  {mockCrops.map((crop, index) => (
                    <CropCard key={index} crop={crop} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - ChatBot */}
            <div>
              <ChatBot />
            </div>
          </div>

          {/* AI Insights Section */}
          <section className="bg-gradient-earth rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">🤖 AI-Powered Insights</h3>
            <p className="text-muted-foreground mb-4">
              KrishiMitra analyzes your farm data to provide personalized recommendations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 rounded-md p-3">
                <div className="font-medium text-success">Optimal Planting</div>
                <div className="text-muted-foreground">Based on soil & weather data</div>
              </div>
              <div className="bg-white/50 rounded-md p-3">
                <div className="font-medium text-primary">Disease Prevention</div>
                <div className="text-muted-foreground">Early warning system</div>
              </div>
              <div className="bg-white/50 rounded-md p-3">
                <div className="font-medium text-accent">Yield Prediction</div>
                <div className="text-muted-foreground">ML-based forecasting</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-muted-foreground">
            <p className="text-sm mb-2">
              🌾 KrishiMitra - Empowering farmers with AI-driven agriculture
            </p>
            <p className="text-xs">
              Supporting Hindi, Bengali, Marathi, Tamil, Telugu, Malayalam & English
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
