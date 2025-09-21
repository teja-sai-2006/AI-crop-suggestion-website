import { StatsOverview } from "@/components/StatsOverview";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CropCard } from "@/components/CropCard";
import { useNavigate } from "react-router-dom";
import { QuickActions } from "@/components/QuickActions";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { CropTrackerAPIService } from "@/services/cropTracker.api";
import { CropTracker } from "@/types/cropTracker.types";
import { Button } from "@/components/ui/button";
import { Plus, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";



const Home = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState<CropTracker[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCrops();
  }, []);
  
  const loadCrops = async () => {
    try {
      setLoading(true);
      // Get actual tracked crops from the API
      const trackedCrops = await CropTrackerAPIService.getCrops();
      
      // Take first 2 crops for display in Home page
      setCrops(trackedCrops.slice(0, 2));
    } catch (error) {
      console.error('Error loading crops for home page:', error);
      // Fallback to empty array if error
      setCrops([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-field text-primary-foreground shadow-card mt-16">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold">🌾</div>
            <div>
              <h1 className="text-2xl font-bold">KrishiMitra</h1>
              <p className="text-sm opacity-90">Smart Farming Assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
     <main className="container mx-auto px-4 sm:px-6 py-8 pt-20">
        <div className="space-y-8 sm:space-y-12">
          {/* Stats Overview */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📊</div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-field bg-clip-text text-transparent">
                Farm Overview
              </h3>
            </div>
            <StatsOverview />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Weather & Quick Actions (sticky) */}
            <div className="space-y-6 lg:sticky lg:top-24 self-start">
              <WeatherWidget />
              <QuickActions />
            </div>

            {/* Right Column - Crop Cards */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">🌱</div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    <button 
                      className="hover:underline hover:text-primary transition-colors duration-200 bg-gradient-field bg-clip-text text-transparent hover:bg-gradient-harvest" 
                      onClick={() => navigate('/tracker')}
                    >
                      My Crops
                    </button>
                  </h3>
                </div>
                <div className="space-y-6">
                  {loading ? (
                    <Card className="border-border/60 bg-gradient-to-br from-card to-card/80">
                      <CardContent className="p-8 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-muted"></div>
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent absolute top-0"></div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg font-medium">Loading your crops...</p>
                            <p className="text-sm text-muted-foreground">Gathering farm data</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : crops.length === 0 ? (
                    <Card className="border-border/60 bg-gradient-to-br from-card to-card/80 hover:shadow-glow transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="flex flex-col items-center space-y-6">
                          <div className="relative">
                            <Sprout className="h-16 w-16 text-muted-foreground/60" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-field rounded-full opacity-60 animate-pulse"></div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold">No crops tracked yet</h4>
                            <p className="text-muted-foreground max-w-sm">
                              Start your farming journey by adding and tracking your first crop
                            </p>
                          </div>
                          <Button 
                            onClick={() => navigate('/tracker')}
                            className="transition-all duration-200 hover:scale-105 hover:shadow-soft"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Crop
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    crops.map((crop) => (
                      <CropCard key={crop.id} crop={{
                        id: crop.id,
                        name: crop.name,
                        variety: crop.variety,
                        stage: crop.stage,
                        daysPlanted: crop.daysFromSowing,
                        expectedHarvest: new Date(crop.expectedHarvest).toLocaleDateString(),
                        confidence: crop.progress,
                        health: crop.health as "excellent" | "good" | "warning" | "poor",
                        recommendations: crop.activities
                          .filter(activity => activity.status === 'pending')
                          .slice(0, 2)
                          .map(activity => activity.activity)
                      }} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Section */}
          <section className="relative overflow-hidden">
            <div className="bg-gradient-earth rounded-2xl p-6 sm:p-8 text-center shadow-glow border border-border/30">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-field opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl animate-pulse">🤖</div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-field bg-clip-text text-transparent">
                    AI-Powered Insights
                  </h3>
                </div>
                
                <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                  KrishiMitra analyzes your farm data to provide personalized recommendations using advanced machine learning
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="group bg-card/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/30 hover:shadow-soft transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <div className="text-2xl">🌱</div>
                      </div>
                    </div>
                    <div className="font-semibold text-success mb-2">Optimal Planting</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Based on soil & weather data
                    </div>
                  </div>
                  
                  <div className="group bg-card/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/30 hover:shadow-soft transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <div className="text-2xl">🛡️</div>
                      </div>
                    </div>
                    <div className="font-semibold text-primary mb-2">Disease Prevention</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Early warning system
                    </div>
                  </div>
                  
                  <div className="group bg-card/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/30 hover:shadow-soft transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <div className="text-2xl">📊</div>
                      </div>
                    </div>
                    <div className="font-semibold text-accent mb-2">Yield Prediction</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      ML-based forecasting
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;