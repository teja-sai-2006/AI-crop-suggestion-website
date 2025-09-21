import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Wind, Droplets, Thermometer, MapPin } from "lucide-react";
import { useLocation } from "@/context/LocationContext";

// Generate location-based mock data for specific day
const generateDayMockData = (location: { name: string; lat: number; lon: number } | null, day: string) => {
  if (!location) {
    return {
      min: 0, max: 0, avg: 0, humidity: 0, rainChance: 0, rainMm: 0, 
      wind: "N/A", sunrise: "N/A", sunset: "N/A", uv: 0, alert: null
    };
  }
  
  // Base temperature influenced by location and day
  const baseTemp = 25 + Math.sin(location.lat * 0.1) * 8;
  const dayOffset = day === 'tomorrow' ? 2 : 0;
  
  return {
    min: Math.round(baseTemp - 6 + dayOffset),
    max: Math.round(baseTemp + 4 + dayOffset),
    avg: Math.round(baseTemp + dayOffset),
    humidity: Math.round(55 + Math.cos(location.lon * 0.1) * 15),
    rainChance: day === 'tomorrow' ? 30 : 10,
    rainMm: day === 'tomorrow' ? 5 : 0,
    wind: `${Math.round(8 + Math.abs(Math.sin(location.lat + location.lon)) * 8)} km/h SW`,
    sunrise: "06:12",
    sunset: "18:32",
    uv: Math.round(5 + Math.sin(location.lat * 0.2) * 3),
    alert: day === 'tomorrow' ? "Light showers expected in evening" : null
  };
};

const WeatherDayPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { currentLocation, isLocationSet } = useLocation();
  
  const d = generateDayMockData(currentLocation, (day || '').toLowerCase());

  if (!isLocationSet) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-6 py-8 pt-24">
          <Button variant="ghost" onClick={() => navigate('/weather')} className="mb-4">← Back to forecast</Button>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Location Selected</h3>
              <p className="text-muted-foreground mb-4">
                Please select a location from the Weather page to view detailed weather information.
              </p>
              <Button onClick={() => navigate('/weather')}>
                Go to Weather Page
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-6 py-8 pt-24">
        <Button variant="ghost" onClick={() => navigate('/weather')} className="mb-4">← Back to forecast</Button>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Detailed Weather - {(day || 'Today').toUpperCase()}
          <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {currentLocation?.name}
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>Temperature</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex items-center gap-2"><Thermometer className="h-4 w-4"/> Min: {d.min}°C</div>
              <div className="flex items-center gap-2"><Thermometer className="h-4 w-4"/> Max: {d.max}°C</div>
              <div className="flex items-center gap-2"><Thermometer className="h-4 w-4"/> Avg: {d.avg}°C</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Humidity & Rain</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex items-center gap-2"><Droplets className="h-4 w-4"/> Humidity: {d.humidity}%</div>
              <div className="flex items-center gap-2"><Sun className="h-4 w-4"/> Rain chance: {d.rainChance}%</div>
              <div className="flex items-center gap-2"><Droplets className="h-4 w-4"/> Precipitation: {d.rainMm} mm</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Wind & Sun</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex items-center gap-2"><Wind className="h-4 w-4"/> Wind: {d.wind}</div>
              <div className="flex items-center gap-2"><Sun className="h-4 w-4"/> Sunrise: {d.sunrise}</div>
              <div className="flex items-center gap-2"><Sun className="h-4 w-4"/> Sunset: {d.sunset}</div>
              <div className="flex items-center gap-2"><Sun className="h-4 w-4"/> UV Index: {d.uv}</div>
            </CardContent>
          </Card>
        </div>
        {d.alert && (
          <div className="mt-6 p-4 rounded-md bg-warning/10 border border-warning/20 text-sm">⚠️ {d.alert}</div>
        )}
      </main>
    </div>
  );
};

export default WeatherDayPage;


