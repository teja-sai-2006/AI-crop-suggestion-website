import { Navigation } from "@/components/Navigation";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Info, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, Legend } from "recharts";
import { LocationSelector } from "@/components/LocationSelector";
import { useLocation } from "@/context/LocationContext";
import { WeatherAPIService } from "@/services/weather.api";
import { WeatherData, WeatherForecast, LocationData } from "@/types/weather.types";



const WeatherPage = () => {
  const navigate = useNavigate();
  const { currentLocation, isLocationSet, clearLocation } = useLocation();
  const [showCompare, setShowCompare] = useState<boolean>(() => {
    try { return localStorage.getItem('wx.compare') === '1'; } catch { return false; }
  });
  const [series, setSeries] = useState<{temp:boolean; hum:boolean; wind:boolean; uv:boolean}>(() => {
    try { return JSON.parse(localStorage.getItem('wx.series')||'{}') || {temp:true, hum:true, wind:false, uv:false}; } catch { return {temp:true, hum:true, wind:false, uv:false}; }
  });
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
      
      // Generate agricultural advisory from the live weather data
      const locationData: LocationData = {
        id: `${currentLocation.lat}_${currentLocation.lon}`,
        name: currentLocation.name,
        lat: currentLocation.lat,
        lon: currentLocation.lon,
        country: 'IN',
        region: 'Unknown',
        timezone: 'Asia/Kolkata'
      };
      
      const advisory = await WeatherAPIService.getAgriculturalAdvisory(locationData);
      
      // Transform data for page format
      const transformedData = {
        current: {
          temperature: current.temperature,
          feelsLike: current.feelsLike,
          humidity: current.humidity,
          windSpeed: current.windSpeed,
          uvIndex: current.uvIndex,
          windDirection: current.windDirection
        },
        forecast: forecast.map((day, index) => ({
          day: index === 0 ? "Today" : index === 1 ? "Tomorrow" : day.day,
          icon: getWeatherIcon(day.condition),
          high: day.high,
          low: day.low,
          desc: day.description
        })),
        compareData: Array.from({length: 24}).map((_, h) => ({
          t: `${h}:00`,
          temp: current.temperature + Math.round(Math.sin(h/24*Math.PI*2)*6),
          hum: current.humidity + Math.round(Math.cos(h/24*Math.PI*2)*15),
          wind: current.windSpeed + Math.round(Math.abs(Math.sin(h/3))*6),
          uv: Math.max(0, Math.round(Math.sin((h-6)/12*Math.PI)*current.uvIndex)),
        })),
        advisory: {
          irrigation: advisory.irrigation,
          alert: advisory.alerts[0] || "Favorable weather conditions for agricultural activities."
        },
        lastUpdated: new Date(),
        nextUpdate: new Date(Date.now() + 15 * 60 * 1000)
      };
      
      setWeatherData(transformedData);
      setLastUpdateTime(new Date());
      console.log('✅ Weather data (live):', { current, forecast });
      console.log('WeatherPage: Weather data loaded for:', currentLocation.name);
    } catch (err) {
      setError('Failed to load weather data');
      console.error('WeatherPage: Error loading weather data:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };
  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'cloudy': case 'partly_cloudy': return Cloud;
      case 'rainy': case 'heavy_rain': return CloudRain;
      default: return Cloud;
    }
  };

  useEffect(() => {
    try { localStorage.setItem('wx.compare', showCompare ? '1' : '0'); } catch {}
  }, [showCompare]);
  useEffect(() => {
    try { localStorage.setItem('wx.series', JSON.stringify(series)); } catch {}
  }, [series]);

  const handleLocationSelect = (location: { name: string; lat: number; lon: number }) => {
    // Location is now handled by the global context automatically
  };

  // Helper function to get humidity level description
  const getHumidityLevel = (humidity: number) => {
    if (humidity < 40) return "Low";
    if (humidity < 70) return "Moderate";
    return "High";
  };

  // Helper function to get UV risk level
  const getUVRisk = (uvIndex: number) => {
    if (uvIndex <= 2) return "Low";
    if (uvIndex <= 5) return "Moderate";
    if (uvIndex <= 7) return "High";
    if (uvIndex <= 10) return "Very High";
    return "Extreme";
  };

  // Helper function to format time difference
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    return `${diffHours} hours ago`;
  };

  // Show loading state when no location or loading
  if (!isLocationSet || loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        {/* Header */}
        <header className="glass text-foreground shadow-card mt-16">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="text-3xl" />
                <div className="text-overlay">
                  <h1 className="text-3xl font-bold text-enhanced">Weather Forecast</h1>
                  <p className="text-muted-foreground text-enhanced">
                    {loading ? 'Loading weather data...' : 'Select location to view weather'}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsLocationSelectorOpen(true)}
                className="glass text-enhanced border-white/20 hover:bg-white/20"
                disabled={loading}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Select Location
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 pt-20">
          {loading ? (
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="h-8 glass rounded w-64 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass rounded-lg h-24"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2 text-enhanced text-overlay">Select Your Location</h3>
              <p className="text-muted-foreground mb-6 text-enhanced text-overlay">
                Choose your location to get accurate weather forecasts and agricultural advisories
              </p>
              <Button onClick={() => setIsLocationSelectorOpen(true)} className="glass text-enhanced">
                <MapPin className="h-4 w-4 mr-2" />
                Select Location
              </Button>
            </div>
          )}
        </main>
        
        <LocationSelector
          open={isLocationSelectorOpen}
          onOpenChange={setIsLocationSelectorOpen}
          onLocationSelect={handleLocationSelect}
        />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        {/* Header */}
        <header className="bg-gradient-sky text-foreground shadow-card mt-16">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="text-3xl" />
                <div>
                  <h1 className="text-3xl font-bold">Weather Forecast</h1>
                  <p className="text-muted-foreground">Error loading weather data</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={loadWeatherData}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Try Again
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 pt-20">
          <div className="text-center py-12">
            <Cloud className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Unable to load weather data</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={loadWeatherData}>
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Show no data state
  if (!weatherData) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        {/* Header */}
        <header className="bg-gradient-sky text-foreground shadow-card mt-16">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="text-3xl" />
                <div>
                  <h1 className="text-3xl font-bold">Weather Forecast</h1>
                  <p className="text-muted-foreground">No weather data available</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={loadWeatherData}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Refresh
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 pt-20">
          <div className="text-center py-12">
            <Cloud className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No weather data available</h3>
            <p className="text-muted-foreground mb-6">Unable to fetch weather information</p>
            <Button onClick={loadWeatherData}>
              Refresh Data
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <header className="glass text-foreground shadow-card mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="text-3xl" />
              <div className="text-overlay">
                <h1 className="text-3xl font-bold text-enhanced">Weather Forecast</h1>
                <p className="text-muted-foreground text-enhanced">
                  Weather for: {currentLocation?.name}
                  <span className="text-xs ml-2 opacity-75">
                    • {isRefreshing ? (
                      <span className="inline-flex items-center">
                        <span className="animate-spin inline-block w-3 h-3 border border-white border-t-transparent rounded-full mr-1"></span>
                        Updating...
                      </span>
                    ) : (
                      `Updated ${getTimeAgo(lastUpdateTime)}`
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsLocationSelectorOpen(true)}
                className="glass text-enhanced border-white/20 hover:bg-white/20"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Change Location
              </Button>
              <Button 
                variant="outline" 
                onClick={clearLocation}
                className="glass text-enhanced border-red-500/20 hover:bg-red-500/20"
                size="sm"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pt-20">
        <div className="space-y-8">
          {/* Current Weather */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-enhanced text-overlay">Current Conditions</h2>
            <WeatherWidget />
          </section>

          {/* Detailed Weather Metrics */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-enhanced text-overlay">Detailed Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card onClick={() => navigate('/weather/temperature')} className="glass-ultra cursor-pointer hover:shadow-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-enhanced">Temperature
                    <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-muted-foreground" onClick={(e)=>e.stopPropagation()} /></TooltipTrigger><TooltipContent>Current air temperature. Feels like considers humidity and wind.</TooltipContent></Tooltip></TooltipProvider>
                  </CardTitle>
                  <Thermometer className="h-4 w-4 text-weather-sunny" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-enhanced">{isLocationSet ? `${weatherData.current.temperature}°C` : '--°C'}</div>
                  <p className="text-xs text-muted-foreground text-enhanced">{isLocationSet ? `Feels like ${weatherData.current.feelsLike}°C` : 'Select location'}</p>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/weather/humidity')} className="glass-ultra cursor-pointer hover:shadow-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-enhanced">Humidity
                    <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-muted-foreground" onClick={(e)=>e.stopPropagation()} /></TooltipTrigger><TooltipContent>Moisture in the air. High humidity slows drying of crops.</TooltipContent></Tooltip></TooltipProvider>
                  </CardTitle>
                  <Droplets className="h-4 w-4 text-weather-rainy" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-enhanced">{isLocationSet ? `${weatherData.current.humidity}%` : '--%'}</div>
                  <p className="text-xs text-muted-foreground text-enhanced">{isLocationSet ? getHumidityLevel(weatherData.current.humidity) : 'Select location'}</p>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/weather/wind')} className="glass-ultra cursor-pointer hover:shadow-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-enhanced">Wind Speed
                    <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-muted-foreground" onClick={(e)=>e.stopPropagation()} /></TooltipTrigger><TooltipContent>Wind affects spraying and lodging risk. Shown in km/h.</TooltipContent></Tooltip></TooltipProvider>
                  </CardTitle>
                  <Wind className="h-4 w-4 text-weather-cloudy" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-enhanced">{isLocationSet ? `${weatherData.current.windSpeed} km/h` : '-- km/h'}</div>
                  <p className="text-xs text-muted-foreground text-enhanced">{isLocationSet ? weatherData.current.windDirection : 'Select location'}</p>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/weather/uv-index')} className="glass-ultra cursor-pointer hover:shadow-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-enhanced">UV Index
                    <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-muted-foreground" onClick={(e)=>e.stopPropagation()} /></TooltipTrigger><TooltipContent>Sun strength. Use hat and sunscreen during high UV.</TooltipContent></Tooltip></TooltipProvider>
                  </CardTitle>
                  <Sun className="h-4 w-4 text-weather-sunny" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-enhanced">{isLocationSet ? weatherData.current.uvIndex : '--'}</div>
                  <p className="text-xs text-muted-foreground text-enhanced">{isLocationSet ? getUVRisk(weatherData.current.uvIndex) : 'Select location'}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Compare Metrics */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-enhanced text-overlay">Compare Metrics</h2>
              <Button variant={showCompare ? 'default' : 'outline'} size="sm" onClick={() => setShowCompare(!showCompare)} className="glass text-enhanced">
                {showCompare ? 'Hide' : 'Show'} Compare
              </Button>
            </div>
            {showCompare && (
              <UICard className="glass-ultra p-4">
                <div className="flex flex-wrap items-center gap-4 mb-2 text-sm">
                  <label className="flex items-center gap-2 text-enhanced"><Checkbox checked={!!series.temp} onCheckedChange={() => setSeries(s=>({...s, temp: !s.temp}))} /> Temperature</label>
                  <label className="flex items-center gap-2 text-enhanced"><Checkbox checked={!!series.hum} onCheckedChange={() => setSeries(s=>({...s, hum: !s.hum}))} /> Humidity</label>
                  <label className="flex items-center gap-2 text-enhanced"><Checkbox checked={!!series.wind} onCheckedChange={() => setSeries(s=>({...s, wind: !s.wind}))} /> Wind</label>
                  <label className="flex items-center gap-2 text-enhanced"><Checkbox checked={!!series.uv} onCheckedChange={() => setSeries(s=>({...s, uv: !s.uv}))} /> UV</label>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weatherData.compareData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="t" />
                      <YAxis />
                      <RTooltip />
                      <Legend />
                      {series.temp && <Line type="monotone" name="Temp (°C)" dataKey="temp" stroke="#ef4444" dot={false} />}
                      {series.hum && <Line type="monotone" name="Humidity (%)" dataKey="hum" stroke="#06b6d4" dot={false} />}
                      {series.wind && <Line type="monotone" name="Wind (km/h)" dataKey="wind" stroke="#16a34a" dot={false} />}
                      {series.uv && <Line type="monotone" name="UV" dataKey="uv" stroke="#f59e0b" dot={false} />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </UICard>
            )}
          </section>

          {/* Extended Forecast */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-enhanced text-overlay">7-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weatherData.forecast.map((forecast, index) => {
                const Icon = forecast.icon;
                return (
                  <Card key={index} className="glass-ultra text-center cursor-pointer hover:shadow-glow" onClick={() => navigate(`/weather/${forecast.day.toLowerCase()}`)}>
                    <CardContent className="p-4">
                      <div className="font-medium text-sm mb-2 text-enhanced">{forecast.day}</div>
                      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-xs text-muted-foreground mb-1 text-enhanced">{forecast.desc}</div>
                      <div className="text-sm text-enhanced">
                        <span className="font-semibold">{forecast.high}°</span>
                        <span className="text-muted-foreground ml-1">{forecast.low}°</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Agricultural Advisory */}
          <section className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-enhanced">🌾 Agricultural Advisory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-medium rounded-md p-4">
                <h3 className="font-medium text-success mb-2 text-enhanced">Irrigation Recommendation</h3>
                <p className="text-sm text-muted-foreground text-enhanced">
                  {isLocationSet ? weatherData.advisory.irrigation : "Select a location to view irrigation recommendations."}
                </p>
              </div>
              <div className="glass-medium rounded-md p-4">
                <h3 className="font-medium text-warning mb-2 text-enhanced">Weather Alert</h3>
                <p className="text-sm text-muted-foreground text-enhanced">
                  {isLocationSet ? weatherData.advisory.alert : "Select a location to view weather alerts."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

        <LocationSelector
          open={isLocationSelectorOpen}
          onOpenChange={setIsLocationSelectorOpen}
          onLocationSelect={handleLocationSelect}
          currentLocation={currentLocation || undefined}
        />
    </div>
  );
};

export default WeatherPage;