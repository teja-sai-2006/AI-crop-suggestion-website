import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";

// Generate location-based mock data
const generateLocationBasedData = (location: { name: string; lat: number; lon: number } | null) => {
  if (!location) {
    return {
      hourly: [],
      next3: [],
      past7: [],
      months12: [],
      years3: [],
      current: { temp: 0, feelsLike: 0, min: 0, max: 0 }
    };
  }
  
  // Base temperature influenced by latitude
  const baseTemp = 25 + Math.sin(location.lat * 0.1) * 8;
  
  return {
    hourly: Array.from({ length: 24 }).map((_, h) => ({ 
      time: `${h}:00`, 
      temp: Math.round(baseTemp + Math.sin(h / 24 * Math.PI * 2) * 6)
    })),
    next3: [
      { day: "Today", min: Math.round(baseTemp - 4), max: Math.round(baseTemp + 6) },
      { day: "Tomorrow", min: Math.round(baseTemp - 6), max: Math.round(baseTemp + 4) },
      { day: "Day 3", min: Math.round(baseTemp - 5), max: Math.round(baseTemp + 5) },
    ],
    past7: Array.from({ length: 7 }).map((_, i) => ({ 
      day: `D-${6 - i}`, 
      min: Math.round(baseTemp - 4 + (i % 2)), 
      max: Math.round(baseTemp + 4 + (i % 3)) 
    })),
    months12: ["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => ({ 
      m, 
      avg: Math.round(baseTemp + (i % 6) + (i > 5 ? 2 : 0)) 
    })),
    years3: [
      { y: "2023", high: Math.round(baseTemp + 6), low: Math.round(baseTemp - 6) },
      { y: "2024", high: Math.round(baseTemp + 7), low: Math.round(baseTemp - 5) },
      { y: "2025", high: Math.round(baseTemp + 8), low: Math.round(baseTemp - 4) },
    ],
    current: {
      temp: Math.round(baseTemp),
      feelsLike: Math.round(baseTemp + 3),
      min: Math.round(baseTemp - 4),
      max: Math.round(baseTemp + 6)
    }
  };
};

const TemperatureDetails = () => {
  const navigate = useNavigate();
  const { currentLocation, isLocationSet } = useLocation();
  const [tab, setTab] = useState<string>(() => {
    try { return localStorage.getItem('wx.tab.temp') || 'daily'; } catch { return 'daily'; }
  });
  
  const data = generateLocationBasedData(currentLocation);
  
  useEffect(() => { try { localStorage.setItem('wx.tab.temp', tab); } catch {} }, [tab]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-8 pt-24">
        <Button variant="ghost" onClick={() => navigate('/weather')} className="mb-4">← Back</Button>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Temperature Details
          {isLocationSet && (
            <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {currentLocation?.name}
            </span>
          )}
        </h1>

        {!isLocationSet ? (
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Location Selected</h3>
              <p className="text-muted-foreground mb-4">
                Please select a location from the Weather page to view temperature details.
              </p>
              <Button onClick={() => navigate('/weather')}>
                Go to Weather Page
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Today</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-1">
                  <div>Current: {data.current.temp}°C (feels like {data.current.feelsLike}°C)</div>
                  <div>Min: {data.current.min}°C • Max: {data.current.max}°C</div>
                  <div className="text-muted-foreground">Mock values based on {currentLocation?.name}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Hourly Temperature</CardTitle></CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.hourly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" hide />
                      <YAxis unit="°C" />
                      <Tooltip />
                      <Line type="monotone" dataKey="temp" stroke="#16a34a" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader><CardTitle>3-Day Forecast Preview</CardTitle></CardHeader>
              <CardContent className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.next3}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <Bar dataKey="min" fill="#60a5fa" name="Min" />
                    <Bar dataKey="max" fill="#f59e0b" name="Max" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader><CardTitle>Historical Data</CardTitle></CardHeader>
              <CardContent>
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList>
                    <TabsTrigger value="daily">Past 7 days</TabsTrigger>
                    <TabsTrigger value="monthly">Last 12 months</TabsTrigger>
                    <TabsTrigger value="yearly">Last 3 years</TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.past7}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis unit="°C" />
                        <Tooltip />
                        <Line type="monotone" dataKey="min" stroke="#60a5fa" />
                        <Line type="monotone" dataKey="max" stroke="#f59e0b" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.months12}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="m" />
                        <YAxis unit="°C" />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#16a34a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="yearly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.years3}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="y" />
                        <YAxis unit="°C" />
                        <Tooltip />
                        <Bar dataKey="low" fill="#60a5fa" />
                        <Bar dataKey="high" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default TemperatureDetails;


