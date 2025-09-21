import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";

// Generate location-based UV mock data
const generateUVData = (location: { name: string; lat: number; lon: number } | null) => {
  if (!location) {
    return {
      hourly: [],
      next3: [],
      past7: [],
      months12: [],
      years3: [],
      current: { uv: 0 }
    };
  }
  
  // Base UV influenced by latitude (closer to equator = higher UV)
  const baseUV = Math.max(1, Math.round(8 - Math.abs(location.lat - 20) * 0.1));
  
  return {
    hourly: Array.from({ length: 12 }).map((_, i) => ({ 
      time: `${6 + i}:00`, 
      uv: Math.max(0, Math.round(Math.sin((i/12)*Math.PI) * baseUV))
    })),
    next3: [
      { day: "Today", uv: baseUV },
      { day: "Tomorrow", uv: Math.max(1, baseUV - 1) },
      { day: "Day 3", uv: Math.max(1, baseUV + 1) },
    ],
    past7: Array.from({ length: 7 }).map((_, i) => ({ 
      day: `D-${6 - i}`, 
      uv: Math.max(1, baseUV + (i % 3) - 1) 
    })),
    months12: ["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => ({ 
      m, 
      avg: Math.max(1, baseUV + (i % 6) - 2) 
    })),
    years3: [
      { y: "2023", avg: Math.max(1, baseUV - 1) },
      { y: "2024", avg: baseUV },
      { y: "2025", avg: Math.max(1, baseUV) },
    ],
    current: {
      uv: baseUV
    }
  };
};

const risk = (uv: number) => uv <= 2 ? "Low" : uv <= 5 ? "Moderate" : uv <= 7 ? "High" : uv <= 10 ? "Very High" : "Extreme";

const UVDetails = () => {
  const navigate = useNavigate();
  const { currentLocation, isLocationSet } = useLocation();
  const [tab, setTab] = useState<string>(() => {
    try { return localStorage.getItem('wx.tab.uv') || 'daily'; } catch { return 'daily'; }
  });
  
  const data = generateUVData(currentLocation);
  const current = data.current.uv;
  
  useEffect(() => { try { localStorage.setItem('wx.tab.uv', tab); } catch {} }, [tab]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-8 pt-24">
        <Button variant="ghost" onClick={() => navigate('/weather')} className="mb-4">← Back</Button>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          UV Index Details
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
                Please select a location from the Weather page to view UV index details.
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
                  <div>Current UV: {current} ({risk(current)})</div>
                  <div className="text-muted-foreground">
                    {current <= 2 ? "Low risk. Safe to be outside." :
                     current <= 5 ? "Moderate risk. Seek shade during midday." :
                     current <= 7 ? "High risk. Wear hat, use SPF 30+, avoid 11 AM–3 PM." :
                     "Very High/Extreme risk. Minimize sun exposure."}
                  </div>
                  <div className="text-muted-foreground">Mock values based on {currentLocation?.name}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Hourly UV</CardTitle></CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.hourly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="uv" stroke="#f59e0b" strokeWidth={2} dot={false} />
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
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uv" fill="#f59e0b" name="UV" />
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
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="uv" stroke="#f59e0b" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.months12}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="m" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="yearly" className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.years3}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="y" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#f59e0b" />
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

export default UVDetails;


