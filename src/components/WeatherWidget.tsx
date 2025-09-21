import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind, MapPin } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { useState, useEffect } from "react";
import { LocationSelector } from "@/components/LocationSelector";
import { WeatherAPIService } from "@/services/weather.api";
import { WeatherData, LocationData } from "@/types/weather.types";



const WeatherIcon = ({ condition, size = "h-6 w-6" }: { condition: string; size?: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className={`${size} text-weather-sunny`} />;
    case "cloudy":
      return <Cloud className={`${size} text-weather-cloudy`} />;
    case "rainy":
      return <CloudRain className={`${size} text-weather-rainy`} />;
    default:
      return <Cloud className={`${size} text-weather-cloudy`} />;
  }
};

export const WeatherWidget = () => {
  const navigate = useNavigate();
  const { currentLocation, isLocationSet } = useLocation();
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load weather data when location changes
  useEffect(() => {
    if (currentLocation) {
      loadWeatherData();
    } else {
      setWeatherData(null);
    }
  }, [currentLocation]);
  
  const loadWeatherData = async () => {
    if (!currentLocation) return;
    
    try {
      setLoading(true);
      setIsRefreshing(true);
      setError(null);
      
      // REAL API INTEGRATION: Use unified getWeatherData() method for live One Call API 3.0 data
      const { current, forecast } = await WeatherAPIService.getWeatherData(`${currentLocation.name}, ${currentLocation.lat.toFixed(4)}, ${currentLocation.lon.toFixed(4)}`);
      
      // Transform data for widget format
      const transformedData = {
        current: {
          temperature: current.temperature,
          humidity: current.humidity,
          windSpeed: current.windSpeed,
          condition: current.condition,
          description: current.description,
          location: currentLocation.name
        },
        forecast: forecast.slice(0, 4).map((day, index) => ({
          day: index === 0 ? "Today" : index === 1 ? "Tomorrow" : day.day,
          high: day.high,
          low: day.low,
          condition: day.condition,
          rain: day.precipitationChance
        }))
      };
      
      setWeatherData(transformedData);
      setLastUpdateTime(new Date());
      console.log('✅ Weather data (live):', { current, forecast });
      console.log('WeatherWidget: Weather data loaded for:', currentLocation.name);
    } catch (err) {
      setError('Failed to load weather data');
      console.error('WeatherWidget: Error loading weather data:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };
  
  // Helper function to get time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    return "Recently";
  };
  
  // Handle location selection
  const handleLocationSelect = (location: { name: string; lat: number; lon: number }) => {
    // Location will be handled by the LocationContext
  };
  
  // If no location is selected, show the select location prompt
  if (!isLocationSet) {
    return (
      <Card className="shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Weather Forecast</span>
            <Badge variant="outline" className="text-muted-foreground">
              📍 No location set
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gradient-sky rounded-lg p-6 text-white text-center">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-semibold mb-2">Select Your Location</h3>
            <p className="text-sm opacity-90 mb-4">
              Choose your location to get accurate weather forecasts
            </p>
            <Button 
              variant="secondary" 
              onClick={() => setIsLocationSelectorOpen(true)}
              className="bg-white/20 hover:bg-white/30 border-white/30"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Select Location
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Set your location to view weather data
          </div>
        </CardContent>
        
        <LocationSelector
          open={isLocationSelectorOpen}
          onOpenChange={setIsLocationSelectorOpen}
          onLocationSelect={handleLocationSelect}
        />
      </Card>
    );
  }
  
  // Show loading state
  if (loading) {
    return (
      <Card className="shadow-card hover:shadow-glow transition-all duration-300 border-border/60 bg-gradient-to-br from-card to-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl">🌤️</div>
              <span className="text-lg font-semibold">Weather Forecast</span>
            </div>
            <Badge variant="outline" className="text-muted-foreground animate-pulse">
              Loading...
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-sky rounded-xl p-6 relative overflow-hidden">
            <div className="animate-pulse space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-white/20 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-6 w-16 bg-white/20 rounded"></div>
                    <div className="h-4 w-24 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-white/20 rounded"></div>
                  <div className="h-4 w-12 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-3 rounded-lg bg-muted/50 animate-pulse">
                <div className="space-y-2">
                  <div className="h-3 w-6 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-5 w-5 bg-gray-200 rounded-full mx-auto"></div>
                  <div className="h-4 w-8 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-3 w-6 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <Card className="shadow-card hover:shadow-glow transition-all duration-300 border-border/60 bg-gradient-to-br from-card to-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl">🌤️</div>
              <span className="text-lg font-semibold">Weather Forecast</span>
            </div>
            <Badge variant="destructive" className="text-white shadow-soft">
              Error
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8 space-y-4">
            <div className="text-4xl opacity-60">⚠️</div>
            <div className="space-y-2">
              <p className="text-muted-foreground">{error}</p>
              <p className="text-sm text-muted-foreground">Please check your connection and try again</p>
            </div>
            <Button onClick={loadWeatherData} variant="outline" className="transition-all duration-200 hover:scale-105 hover:shadow-soft">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Show no data state
  if (!weatherData) {
    return (
      <Card className="shadow-card hover:shadow-glow transition-all duration-300 border-border/60 bg-gradient-to-br from-card to-card/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl">🌤️</div>
              <span className="text-lg font-semibold">Weather Forecast</span>
            </div>
            <Badge variant="outline" className="text-muted-foreground bg-muted/30">
              📍 No location set
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8 space-y-4">
            <div className="text-4xl opacity-60">📍</div>
            <div className="space-y-2">
              <h4 className="font-medium">Select Your Location</h4>
              <p className="text-muted-foreground">Choose your location to get accurate weather forecasts</p>
            </div>
            <Button 
              onClick={() => setIsLocationSelectorOpen(true)} 
              variant="outline" 
              className="transition-all duration-200 hover:scale-105 hover:shadow-soft"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Select Location
            </Button>
          </div>
          <div className="text-xs text-muted-foreground text-center pt-3 border-t border-border/30">
            Set your location to view weather data
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Return normal weather widget with data
  return (
    <Card className="
      shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group
      hover:scale-[1.02] border-border/60 bg-gradient-to-br from-card to-card/80
    " onClick={() => navigate('/weather')}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xl transition-transform duration-200 group-hover:scale-110">🌤️</div>
            <span className="text-lg font-semibold group-hover:text-primary transition-colors">Weather Forecast</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground bg-muted/30 border-border/60">
              📍 {weatherData.current.location}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsLocationSelectorOpen(true);
              }}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-110"
              title="Change Location"
            >
              <MapPin className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="bg-gradient-sky rounded-xl p-5 text-white relative overflow-hidden shadow-soft">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="transition-transform duration-200 group-hover:scale-110">
                <WeatherIcon condition={weatherData.current.condition} size="h-10 w-10" />
              </div>
              <div>
                <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
                <div className="text-sm opacity-90 font-medium">{weatherData.current.description}</div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center space-x-2 text-sm bg-white/10 rounded-lg px-2 py-1">
                <Droplets className="h-3 w-3" />
                <span className="font-medium">{weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 rounded-lg px-2 py-1">
                <Wind className="h-3 w-3" />
                <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
        </div>

        {/* 4-Day Forecast */}
        <div className="grid grid-cols-4 gap-3">
          {weatherData.forecast.map((day, index) => (
            <div 
              key={index} 
              className="
                text-center p-3 rounded-xl bg-muted/30 border border-border/30
                transition-all duration-200 hover:shadow-soft hover:scale-105 group/forecast
              "
            >
              <div className="text-xs font-semibold text-muted-foreground mb-2 group-hover/forecast:text-foreground transition-colors">
                {day.day}
              </div>
              <div className="transition-transform duration-200 group-hover/forecast:scale-110">
                <WeatherIcon condition={day.condition} size="h-6 w-6 mx-auto mb-2" />
              </div>
              <div className="text-sm font-bold">{day.high}°</div>
              <div className="text-xs text-muted-foreground">{day.low}°</div>
              {day.rain > 0 && (
                <div className="text-xs text-weather-rainy mt-1 font-medium">{day.rain}%</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-3 border-t border-border/30">
          {isRefreshing ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-spin inline-block w-3 h-3 border border-muted-foreground border-t-transparent rounded-full"></span>
              Updating weather data...
            </span>
          ) : (
            <span className="group-hover:text-foreground transition-colors">
              Last updated: {getTimeAgo(lastUpdateTime)} • Next update in 15 min
            </span>
          )}
        </div>
      </CardContent>
      
      <LocationSelector
        open={isLocationSelectorOpen}
        onOpenChange={setIsLocationSelectorOpen}
        onLocationSelect={handleLocationSelect}
        currentLocation={currentLocation || undefined}
      />
    </Card>
  );
};