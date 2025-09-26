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
import LoginPage from "./pages/LoginPage";
import { CropsProvider } from "./context/CropsContext";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import WeatherDayPage from "./pages/WeatherDayPage";
import TemperatureDetails from "./pages/metrics/TemperatureDetails";
import HumidityDetails from "./pages/metrics/HumidityDetails";
import WindDetails from "./pages/metrics/WindDetails";
import UVDetails from "./pages/metrics/UVDetails";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, User } from 'lucide-react';

const queryClient = new QueryClient();

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen">
      {/* User Info Header */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white/95"
          >
            <User className="w-4 h-4 mr-2" />
            {user.name}
          </Button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.phoneNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                }}
                className="w-full justify-start px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

function AppRoutes() {
  return (
    <ProtectedRoute>
      <LocationProvider>
        <CropsProvider>
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
        </CropsProvider>
      </LocationProvider>
    </ProtectedRoute>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
