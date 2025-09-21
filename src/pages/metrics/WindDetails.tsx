import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";

// Generate location-based wind mock data
const generateWindData = (location: { name: string; lat: number; lon: number } | null) => {
  if (!location) {
    return {
      hourly: [],
      next3: [],
      past7: [],
      months12: [],
      years3: [],
      current: { wind: 0, gust: 0, direction: "N/A" }
    };
  }
  
  // Base wind influenced by coordinates
  const baseWind = 8 + Math.abs(Math.sin(location.lat + location.lon)) * 8;
  
  return {
    hourly: Array.from({ length: 24 }).map((_, h) => ({ 
      time: `${h}:00`, 
      wind: Math.round(baseWind + Math.abs(Math.sin(h/3)) * 4), 
      gust: Math.round(baseWind + Math.abs(Math.cos(h/2)) * 8)
    })),
    next3: [
      { day: "Today", wind: Math.round(baseWind) },
      { day: "Tomorrow", wind: Math.round(baseWind - 2) },
      { day: "Day 3", wind: Math.round(baseWind + 1) },
    ],
    past7: Array.from({ length: 7 }).map((_, i) => ({ 
      day: `D-${6 - i}`, 
      wind: Math.round(baseWind + i % 4) 
    })),
    months12: ["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => ({ 
      m, 
      avg: Math.round(baseWind + (i % 6)) 
    })),
    years3: [
      { y: "2023", avg: Math.round(baseWind) },
      { y: "2024", avg: Math.round(baseWind + 1) },
      { y: "2025", avg: Math.round(baseWind + 2) },
    ],
    current: {
      wind: Math.round(baseWind),
      gust: Math.round(baseWind + 10),
      direction: "SW"
    }
  };
};

const WindDetails = () => {
  const navigate = useNavigate();
  const { currentLocation, isLocationSet } = useLocation();
  const [tab, setTab] = useState<string>(() => {
    try { return localStorage.getItem('wx.tab.wind') || 'daily'; } catch { return 'daily'; }
  });
  
  const data = generateWindData(currentLocation);
  
  useEffect(() => { try { localStorage.setItem('wx.tab.wind', tab); } catch {} }, [tab]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-8 pt-24">
        <Button variant="ghost" onClick={() => navigate('/weather')} className="mb-4">← Back</Button>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Wind Speed Details
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
                Please select a location from the Weather page to view wind details.
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
                  <div>Current: {data.current.wind} km/h • Direction: {data.current.direction}</div>
                  <div>Gusts up to {data.current.gust} km/h</div>
                  <div className="text-muted-foreground">Mock values based on {currentLocation?.name}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Hourly Wind</CardTitle></CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.hourly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" hide />
                      <YAxis unit=" km/h" />
                      <Tooltip />
                      <Line type="monotone" dataKey="wind" stroke="#16a34a" strokeWidth={2} dot={false} name="Wind" />
                      <Line type="monotone" dataKey="gust" stroke="#ec4899" strokeWidth={1} dot={false} name="Gust" />
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
                    <YAxis unit=" km/h" />
                    <Tooltip />
                    <Bar dataKey="wind" fill="#16a34a" name="Wind" />
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
                        <YAxis unit=" km/h" />
                        <Tooltip />
                        <Line type="monotone" dataKey="wind" stroke="#16a34a" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.months12}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="m" />
                        <YAxis unit=" km/h" />
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
                        <YAxis unit=" km/h" />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#16a34a" />
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

export default WindDetails;


