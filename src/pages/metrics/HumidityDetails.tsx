import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";

// Generate location-based humidity mock data
const generateHumidityData = (location: { name: string; lat: number; lon: number } | null) => {
  if (!location) {
    return {
      hourly: [],
      next3: [],
      past7: [],
      months12: [],
      years3: [],
      current: { hum: 0 }
    };
  }
  
  // Base humidity influenced by coordinates
  const baseHum = 55 + Math.cos(location.lon * 0.1) * 15;
  
  return {
    hourly: Array.from({ length: 24 }).map((_, h) => ({ 
      time: `${h}:00`, 
      hum: Math.round(Math.max(30, Math.min(85, baseHum + Math.sin(h / 24 * Math.PI * 2) * 20)))
    })),
    next3: [
      { day: "Today", hum: Math.round(baseHum) },
      { day: "Tomorrow", hum: Math.round(baseHum + 5) },
      { day: "Day 3", hum: Math.round(baseHum - 3) },
    ],
    past7: Array.from({ length: 7 }).map((_, i) => ({ 
      day: `D-${6 - i}`, 
      hum: Math.round(baseHum + i) 
    })),
    months12: ["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => ({ 
      m, 
      avg: Math.round(baseHum + (i % 6)) 
    })),
    years3: [
      { y: "2023", avg: Math.round(baseHum) },
      { y: "2024", avg: Math.round(baseHum + 2) },
      { y: "2025", avg: Math.round(baseHum + 1) },
    ],
    current: {
      hum: Math.round(baseHum)
    }
  };
};

const HumidityDetails = () => {
  const navigate = useNavigate();
  const { currentLocation, isLocationSet } = useLocation();
  const [tab, setTab] = useState<string>(() => {
    try { return localStorage.getItem('wx.tab.hum') || 'daily'; } catch { return 'daily'; }
  });
  
  const data = generateHumidityData(currentLocation);
  
  useEffect(() => { try { localStorage.setItem('wx.tab.hum', tab); } catch {} }, [tab]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-8 pt-24">
        <Button variant="ghost" onClick={() => navigate('/weather')} className="mb-4">← Back</Button>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Humidity Details
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
                Please select a location from the Weather page to view humidity details.
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
                  <div>Current: {data.current.hum}%</div>
                  <div>Optimal range for most crops: 40%–70%</div>
                  <div className="text-muted-foreground">Mock values based on {currentLocation?.name}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Hourly Humidity</CardTitle></CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.hourly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" hide />
                      <YAxis unit="%" />
                      <Tooltip />
                      <Line type="monotone" dataKey="hum" stroke="#06b6d4" strokeWidth={2} dot={false} />
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
                    <YAxis unit="%" />
                    <Tooltip />
                    <Bar dataKey="hum" fill="#06b6d4" name="Humidity" />
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
                        <YAxis unit="%" />
                        <Tooltip />
                        <Line type="monotone" dataKey="hum" stroke="#06b6d4" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.months12}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="m" />
                        <YAxis unit="%" />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="yearly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.years3}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="y" />
                        <YAxis unit="%" />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#06b6d4" />
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

export default HumidityDetails;


