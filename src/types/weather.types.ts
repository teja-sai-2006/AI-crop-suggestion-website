/**
 * Weather System Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface LocationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  region: string;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  pressure: number;
  visibility: number;
  condition: WeatherCondition;
  description: string;
}

export interface WeatherData {
  location: LocationData;
  current: CurrentWeather;
  timestamp: string;
  source: string;
}

export interface WeatherForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  precipitationChance: number;
  uvIndex: number;
}

export interface AgriculturalAdvisory {
  irrigation: string;
  spraying: string;
  harvesting: string;
  fieldWork: string;
  generalAdvice: string[];
  alerts: string[];
  cropSpecific?: string;
  lastUpdated: string;
}

export type WeatherCondition = 
  | 'sunny' 
  | 'partly_cloudy' 
  | 'cloudy' 
  | 'overcast' 
  | 'rainy' 
  | 'heavy_rain' 
  | 'thunderstorm' 
  | 'snow' 
  | 'fog' 
  | 'windy';

export interface WeatherError {
  code: string;
  message: string;
  details?: any;
}

export interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: WeatherForecast[];
  advisory: AgriculturalAdvisory | null;
  loading: boolean;
  error: WeatherError | null;
  selectedLocation: LocationData | null;
  setLocation: (location: LocationData) => void;
  refreshWeather: () => Promise<void>;
  clearError: () => void;
}

// Historical weather data for charts
export interface HistoricalWeatherData {
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

// Weather alerts
export interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  areas: string[];
}