import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import WeatherPage from "./pages/WeatherPage";
import CropRecommendationPage from "./pages/CropRecommendationPage";
import CropTrackerPage from "./pages/CropTrackerPage";
import DiseaseDetectionPage from "./pages/DiseaseDetectionPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import FarmRecordsPage from "./pages/FarmRecordsPage";
import ExpertCallPage from "./pages/ExpertCallPage";
import MarketPricesPage from "./pages/MarketPricesPage";
import CropDetailsPage from "./pages/CropDetailsPage";
import { CropsProvider } from "./context/CropsContext";
import { LocationProvider } from "./context/LocationContext";
import WeatherDayPage from "./pages/WeatherDayPage";
import TemperatureDetails from "./pages/metrics/TemperatureDetails";
import HumidityDetails from "./pages/metrics/HumidityDetails";
import WindDetails from "./pages/metrics/WindDetails";
import UVDetails from "./pages/metrics/UVDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationProvider>
      <CropsProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/weather/:day" element={<WeatherDayPage />} />
          <Route path="/weather/temperature" element={<TemperatureDetails />} />
          <Route path="/weather/humidity" element={<HumidityDetails />} />
          <Route path="/weather/wind" element={<WindDetails />} />
          <Route path="/weather/uv-index" element={<UVDetails />} />
          <Route path="/recommendation" element={<CropRecommendationPage />} />
          <Route path="/tracker" element={<CropTrackerPage />} />
          <Route path="/disease" element={<DiseaseDetectionPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/records" element={<FarmRecordsPage />} />
          <Route path="/expert" element={<ExpertCallPage />} />
          <Route path="/market" element={<MarketPricesPage />} />
          <Route path="/crop/:id" element={<CropDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CropsProvider>
  </LocationProvider>
  </QueryClientProvider>
);

export default App;
