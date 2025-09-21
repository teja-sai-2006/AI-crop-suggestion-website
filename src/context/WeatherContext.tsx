import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherContextType, LocationData, WeatherData, WeatherForecast, AgriculturalAdvisory, WeatherError } from '../types/weather.types';
import { WeatherAPIService } from '../services/weather.api';

/**
 * WeatherContext - Real-time Weather Data Integration
 * 
 * This context now provides live weather data from OpenWeatherMap API
 * with automatic fallback to mock data if the API is unavailable.
 * 
 * Features:
 * - Live current weather data from OpenWeatherMap
 * - Automatic location-based data loading
 * - 15-minute caching for performance
 * - Graceful fallback to mock data on API failures
 * - Loading states and error handling
 */

const WeatherContext = createContext<WeatherContextType | null>(null);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [advisory, setAdvisory] = useState<AgriculturalAdvisory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);
  const [selectedLocation, setSelectedLocationState] = useState<LocationData | null>(() => {
    // Load saved location from localStorage
    try {
      const saved = localStorage.getItem('km.weather.selectedLocation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // REAL API INTEGRATION: Auto-load live weather data when location changes
  useEffect(() => {
    if (selectedLocation) {
      console.log('Location changed, loading live weather data for:', selectedLocation.name);
      loadWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  const setLocation = async (location: LocationData) => {
    try {
      // Save location to localStorage
      localStorage.setItem('km.weather.selectedLocation', JSON.stringify(location));
      setSelectedLocationState(location);
      setError(null);
    } catch (error) {
      console.error('Failed to save location:', error);
      setError({
        code: 'STORAGE_ERROR',
        message: 'Failed to save location preferences'
      });
    }
  };

  const loadWeatherData = async (location: LocationData) => {
    setLoading(true);
    setError(null);

    try {
      // REAL API INTEGRATION: Load unified weather data from OpenWeatherMap One Call API 3.0
      // This single call provides both current weather and 7-day forecast with enhanced data
      const { current, forecast, ...weatherData } = await WeatherAPIService.getWeatherData(location.name);
      
      // Generate agricultural advisory from the live weather data
      const advisoryData = await WeatherAPIService.getAgriculturalAdvisory(location);

      // Update state with live weather data
      setCurrentWeather({
        ...weatherData,
        location,
        current,
        timestamp: weatherData.timestamp,
        source: weatherData.source
      });
      setForecast(forecast);
      setAdvisory(advisoryData);

      // Log successful data source for debugging
      console.log('✅ Weather data (live):', { current, forecast, source: weatherData.source });
      console.log(`Weather data loaded successfully from: ${weatherData.source}`);
    } catch (err) {
      console.error('Failed to load weather data:', err);
      
      // Enhanced error handling for API integration
      const errorMessage = err instanceof Error ? err.message : 'Failed to load weather data';
      
      setError({
        code: 'FETCH_ERROR',
        message: errorMessage,
        details: err
      });
      
      // Even on error, the service layer should have returned fallback data
      // Log this for debugging purposes
      console.warn('Weather context error - service should have provided fallback data');
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    if (selectedLocation) {
      // REAL API INTEGRATION: Force refresh from live weather API
      console.log('Refreshing weather data from live API for:', selectedLocation.name);
      await loadWeatherData(selectedLocation);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: WeatherContextType = {
    currentWeather,
    forecast,
    advisory,
    loading,
    error,
    selectedLocation,
    setLocation,
    refreshWeather,
    clearError
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};