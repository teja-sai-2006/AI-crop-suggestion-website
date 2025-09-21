import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye, 
  Gauge,
  MapPin,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { LocationData, WeatherCondition } from '../types/weather.types';
import { EnhancedLocationSelector } from './EnhancedLocationSelector';

// Weather condition icons mapping
const getWeatherIcon = (condition: WeatherCondition) => {
  const iconMap = {
    sunny: Sun,
    partly_cloudy: Cloud,
    cloudy: Cloud,
    overcast: Cloud,
    rainy: CloudRain,
    heavy_rain: CloudRain,
    thunderstorm: CloudRain,
    snow: Cloud,
    fog: Cloud,
    windy: Wind
  };
  
  return iconMap[condition] || Cloud;
};

// Weather condition colors
const getConditionColor = (condition: WeatherCondition) => {
  const colorMap = {
    sunny: 'text-yellow-500',
    partly_cloudy: 'text-blue-400',
    cloudy: 'text-gray-500',
    overcast: 'text-gray-600',
    rainy: 'text-blue-600',
    heavy_rain: 'text-blue-700',
    thunderstorm: 'text-purple-600',
    snow: 'text-blue-200',
    fog: 'text-gray-400',
    windy: 'text-green-500'
  };
  
  return colorMap[condition] || 'text-gray-500';
};

// Simple Weather Chart Component to avoid import issues
const SimpleWeatherChart: React.FC<{ forecast: any[] }> = ({ forecast }) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Weather Trends</h3>
          <div className="grid grid-cols-7 gap-2 text-xs">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-2 bg-muted/50 rounded">
                <div className="font-medium">{day.day}</div>
                <div className="text-lg font-bold text-blue-600">{day.high}°</div>
                <div className="text-sm text-muted-foreground">{day.low}°</div>
                <div className="text-xs">{day.humidity}%</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Interactive charts coming soon! 📊
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface WeatherDashboardProps {
  className?: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ className }) => {
  const {
    currentWeather,
    forecast,
    advisory,
    loading,
    error,
    selectedLocation,
    setLocation,
    refreshWeather,
    clearError
  } = useWeather();

  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const handleLocationSelect = (location: LocationData) => {
    setLocation(location);
    setShowLocationSelector(false);
  };

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const getUVRiskLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'bg-green-500' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'bg-yellow-500' };
    if (uvIndex <= 7) return { level: 'High', color: 'bg-orange-500' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'bg-red-500' };
    return { level: 'Extreme', color: 'bg-purple-500' };
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Weather Dashboard</h2>
          <p className="text-muted-foreground">
            {selectedLocation ? `Weather for ${selectedLocation.name}` : 'Select a location to view weather'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowLocationSelector(true)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {selectedLocation ? 'Change Location' : 'Select Location'}
          </Button>
          {selectedLocation && (
            <Button
              variant="outline"
              onClick={refreshWeather}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error.message}
            <Button variant="link" onClick={clearError} className="ml-2 p-0 h-auto">
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* No Location Selected */}
      {!selectedLocation && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Location Selected</h3>
            <p className="text-muted-foreground text-center mb-4">
              Please select a location to view weather data and agricultural advisory
            </p>
            <Button onClick={() => setShowLocationSelector(true)}>
              <MapPin className="h-4 w-4 mr-2" />
              Select Location
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Weather */}
      {selectedLocation && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Current Weather
                </CardTitle>
                {currentWeather && (
                  <Badge variant="outline">
                    Updated {formatLastUpdated(currentWeather.timestamp)}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading && !currentWeather ? (
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                </div>
              ) : currentWeather ? (
                <div className="space-y-6">
                  {/* Main Weather Display */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      {React.createElement(getWeatherIcon(currentWeather.current.condition), {
                        className: `h-16 w-16 ${getConditionColor(currentWeather.current.condition)}`
                      })}
                      <div>
                        <div className="text-4xl font-bold">
                          {currentWeather.current.temperature}°C
                        </div>
                        <div className="text-muted-foreground">
                          Feels like {currentWeather.current.feelsLike}°C
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-medium capitalize">
                        {currentWeather.current.condition.replace('_', ' ')}
                      </div>
                      <div className="text-muted-foreground">
                        {currentWeather.current.description}
                      </div>
                    </div>
                  </div>

                  {/* Weather Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Droplets className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Humidity</div>
                        <div className="text-lg font-semibold">{currentWeather.current.humidity}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Wind className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Wind</div>
                        <div className="text-lg font-semibold">
                          {currentWeather.current.windSpeed} km/h {currentWeather.current.windDirection}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">UV Index</div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-semibold">{currentWeather.current.uvIndex}</div>
                          <Badge 
                            className={`text-xs text-white ${getUVRiskLevel(currentWeather.current.uvIndex).color}`}
                          >
                            {getUVRiskLevel(currentWeather.current.uvIndex).level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Eye className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Visibility</div>
                        <div className="text-lg font-semibold">{currentWeather.current.visibility} km</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* 7-Day Forecast */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  7-Day Forecast
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChart(!showChart)}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {showChart ? 'Hide Chart' : 'Show Chart'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading && forecast.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {[...Array(7)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
                    {forecast.map((day, index) => {
                      const WeatherIcon = getWeatherIcon(day.condition);
                      return (
                        <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
                          <div className="font-medium text-sm mb-2">{day.day}</div>
                          <WeatherIcon className={`h-8 w-8 mx-auto mb-2 ${getConditionColor(day.condition)}`} />
                          <div className="text-xs text-muted-foreground mb-2 capitalize">
                            {day.condition.replace('_', ' ')}
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold">{day.high}°</div>
                            <div className="text-sm text-muted-foreground">{day.low}°</div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {day.precipitationChance}% rain
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Simple Weather Chart */}
                  {showChart && forecast.length > 0 && (
                    <SimpleWeatherChart forecast={forecast} />
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Agricultural Advisory */}
          {advisory && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Agricultural Advisory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommendations */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">💧 Irrigation</h4>
                      <p className="text-sm text-blue-800">{advisory.irrigation}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">🚁 Spraying</h4>
                      <p className="text-sm text-green-800">{advisory.spraying}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <h4 className="font-medium text-orange-900 mb-2">🌾 Harvesting</h4>
                      <p className="text-sm text-orange-800">{advisory.harvesting}</p>
                    </div>
                  </div>

                  {/* Alerts and General Advice */}
                  <div className="space-y-4">
                    {advisory.alerts.length > 0 && advisory.alerts[0] !== 'No weather alerts at this time' && (
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">⚠️ Weather Alerts</h4>
                        <div className="space-y-1">
                          {advisory.alerts.map((alert, index) => (
                            <p key={index} className="text-sm text-red-800">{alert}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">💡 General Advice</h4>
                      <div className="space-y-1">
                        {advisory.generalAdvice.map((advice, index) => (
                          <p key={index} className="text-sm text-yellow-800">• {advice}</p>
                        ))}
                      </div>
                    </div>

                    {advisory.cropSpecific && (
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h4 className="font-medium text-purple-900 mb-2">🌱 Crop Specific</h4>
                        <p className="text-sm text-purple-800">{advisory.cropSpecific}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Location Selector Modal */}
      {showLocationSelector && (
        <EnhancedLocationSelector
          open={showLocationSelector}
          onOpenChange={setShowLocationSelector}
          onLocationSelect={handleLocationSelect}
          currentLocation={selectedLocation || undefined}
        />
      )}
    </div>
  );
};