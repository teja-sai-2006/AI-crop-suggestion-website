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
      <Card className="glass-ultra shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg text-enhanced">Weather Forecast</span>
            <Badge variant="outline" className="text-muted-foreground glass">
              📍 No location set
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="glass rounded-lg p-6 text-white text-center">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-semibold mb-2 text-enhanced">Select Your Location</h3>
            <p className="text-sm opacity-90 mb-4 text-enhanced">
              Choose your location to get accurate weather forecasts
            </p>
            <Button 
              variant="secondary" 
              onClick={() => setIsLocationSelectorOpen(true)}
              className="glass text-enhanced border-white/30"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Select Location
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center pt-2 border-t text-enhanced">
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
      <Card className="shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Weather Forecast</span>
            <Badge variant="outline" className="text-muted-foreground">
              Loading...
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-sky rounded-lg p-4 animate-pulse">
            <div className="h-20 bg-white/20 rounded"></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-2 rounded-md bg-muted/50 animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
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
      <Card className="shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Weather Forecast</span>
            <Badge variant="destructive" className="text-white">
              Error
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={loadWeatherData} variant="outline">
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
      <Card className="shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Weather Forecast</span>
            <Badge variant="outline" className="text-muted-foreground">
              No Data
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">Weather data not available</p>
            <Button onClick={loadWeatherData} variant="outline">
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Return normal weather widget with data
  return (
    <Card className="glass-ultra shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer" onClick={() => navigate('/weather')}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg text-enhanced">Weather Forecast</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground glass">
              📍 {weatherData.current.location}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsLocationSelectorOpen(true);
              }}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground glass"
              title="Change Location"
            >
              <MapPin className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="glass rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <WeatherIcon condition={weatherData.current.condition} size="h-8 w-8" />
              <div>
                <div className="text-2xl font-bold text-enhanced">{weatherData.current.temperature}°C</div>
                <div className="text-sm opacity-90 text-enhanced">{weatherData.current.description}</div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center space-x-1 text-sm text-enhanced">
                <Droplets className="h-3 w-3" />
                <span>{weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-enhanced">
                <Wind className="h-3 w-3" />
                <span>{weatherData.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Day Forecast */}
        <div className="grid grid-cols-4 gap-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="text-center p-2 rounded-md glass">
              <div className="text-xs font-medium text-muted-foreground mb-1 text-enhanced">{day.day}</div>
              <WeatherIcon condition={day.condition} size="h-5 w-5 mx-auto mb-1" />
              <div className="text-sm font-semibold text-enhanced">{day.high}°</div>
              <div className="text-xs text-muted-foreground text-enhanced">{day.low}°</div>
              {day.rain > 0 && (
                <div className="text-xs text-weather-rainy mt-1 text-enhanced">{day.rain}%</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t text-enhanced">
          {isRefreshing ? (
            <span className="inline-flex items-center">
              <span className="animate-spin inline-block w-3 h-3 border border-muted-foreground border-t-transparent rounded-full mr-1"></span>
              Updating weather data...
            </span>
          ) : (
            `Last updated: ${getTimeAgo(lastUpdateTime)} • Next update in 15 min`
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