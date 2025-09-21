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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header - Ultra transparent with enhanced text */}
      <header className="glass-ultra text-primary-foreground shadow-card mt-16">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold">🌾</div>
            <div className="text-overlay">
              <h1 className="text-2xl font-bold text-enhanced">KrishiMitra</h1>
              <p className="text-sm opacity-90 text-enhanced">Smart Farming Assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
     <main className="container mx-auto px-6 py-8 pt-20">
        <div className="space-y-8">
          {/* Stats Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-enhanced text-overlay">Farm Overview</h3>
            <StatsOverview />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Weather & Quick Actions (sticky) */}
            <div className="space-y-6 lg:sticky lg:top-6 self-start">
              <WeatherWidget />
              <QuickActions />
            </div>

            {/* Right Column - Crop Cards */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-enhanced text-overlay">
                  <button className="hover:underline" onClick={() => navigate('/tracker')}>My Crops</button>
                </h3>
                <div className="space-y-4">
                  {loading ? (
                    <Card className="glass-ultra">
                      <CardContent className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-muted-foreground text-enhanced">Loading crops...</p>
                      </CardContent>
                    </Card>
                  ) : crops.length === 0 ? (
                    <Card className="glass-ultra">
                      <CardContent className="p-6 text-center">
                        <Sprout className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h4 className="font-medium mb-2 text-enhanced">No crops tracked yet</h4>
                        <p className="text-muted-foreground mb-4 text-enhanced">Start tracking your crops to see them here</p>
                        <Button onClick={() => navigate('/tracker')} className="glass text-enhanced">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Crop
                        </Button>
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
          <section className="glass-ultra rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-3 text-enhanced">🤖 AI-Powered Insights</h3>
            <p className="text-muted-foreground mb-4 text-enhanced">
              KrishiMitra analyzes your farm data to provide personalized recommendations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="glass rounded-md p-3">
                <div className="font-medium text-success text-enhanced">Optimal Planting</div>
                <div className="text-muted-foreground text-enhanced">Based on soil & weather data</div>
              </div>
              <div className="glass rounded-md p-3">
                <div className="font-medium text-primary text-enhanced">Disease Prevention</div>
                <div className="text-muted-foreground text-enhanced">Early warning system</div>
              </div>
              <div className="glass rounded-md p-3">
                <div className="font-medium text-accent text-enhanced">Yield Prediction</div>
                <div className="text-muted-foreground text-enhanced">ML-based forecasting</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;