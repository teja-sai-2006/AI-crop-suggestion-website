import { LocationData, WeatherData, WeatherForecast, AgriculturalAdvisory, HistoricalWeatherData } from '../types/weather.types';

/**
 * Mock Weather Data for Frontend-First Development
 * This file contains realistic mock data for testing and development
 */

export const mockLocations: LocationData[] = [
  {
    id: 'loc_mumbai',
    name: 'Mumbai, Maharashtra',
    lat: 19.0760,
    lon: 72.8777,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_pune',
    name: 'Pune, Maharashtra',
    lat: 18.5204,
    lon: 73.8567,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_nashik',
    name: 'Nashik, Maharashtra',
    lat: 19.9975,
    lon: 73.7898,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_aurangabad',
    name: 'Aurangabad, Maharashtra',
    lat: 19.8762,
    lon: 75.3433,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_satara',
    name: 'Satara, Maharashtra',
    lat: 17.6599,
    lon: 74.0124,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_solapur',
    name: 'Solapur, Maharashtra',
    lat: 17.6599,
    lon: 75.9064,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_kolhapur',
    name: 'Kolhapur, Maharashtra',
    lat: 16.7050,
    lon: 74.2433,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 'loc_sangli',
    name: 'Sangli, Maharashtra',
    lat: 16.8524,
    lon: 74.5815,
    country: 'India',
    region: 'Maharashtra',
    timezone: 'Asia/Kolkata'
  }
];

export const mockCurrentWeather: WeatherData = {
  location: mockLocations[0],
  current: {
    temperature: 28,
    feelsLike: 32,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'SW',
    uvIndex: 6,
    pressure: 1013,
    visibility: 10,
    condition: 'partly_cloudy',
    description: 'Partly cloudy with light winds'
  },
  timestamp: new Date().toISOString(),
  source: 'mock_api'
};

export const mockForecastData: WeatherForecast[] = [
  {
    date: new Date().toISOString().split('T')[0],
    day: 'Today',
    high: 30,
    low: 22,
    condition: 'sunny',
    description: 'Clear skies with sunshine',
    humidity: 60,
    windSpeed: 10,
    precipitationChance: 10,
    uvIndex: 7
  },
  {
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day: 'Tomorrow',
    high: 28,
    low: 20,
    condition: 'partly_cloudy',
    description: 'Partly cloudy throughout the day',
    humidity: 70,
    windSpeed: 8,
    precipitationChance: 20,
    uvIndex: 6
  },
  {
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day: 'Thu',
    high: 25,
    low: 18,
    condition: 'rainy',
    description: 'Light rain expected',
    humidity: 85,
    windSpeed: 15,
    precipitationChance: 80,
    uvIndex: 3
  },
  {
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day: 'Fri',
    high: 27,
    low: 19,
    condition: 'cloudy',
    description: 'Overcast conditions',
    humidity: 75,
    windSpeed: 12,
    precipitationChance: 40,
    uvIndex: 4
  },
  {
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day: 'Sat',
    high: 31,
    low: 23,
    condition: 'sunny',
    description: 'Bright and sunny',
    humidity: 55,
    windSpeed: 8,
    precipitationChance: 5,
    uvIndex: 8
  },
  {
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day: 'Sun',
    high: 33,
    low: 25,
    condition: 'sunny',
    description: 'Hot and sunny conditions',
    humidity: 50,
    windSpeed: 6,
    precipitationChance: 0,
    uvIndex: 9
  },
  {
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day: 'Mon',
    high: 29,
    low: 21,
    condition: 'partly_cloudy',
    description: 'Mix of sun and clouds',
    humidity: 65,
    windSpeed: 10,
    precipitationChance: 25,
    uvIndex: 6
  }
];

export const mockAdvisoryData: AgriculturalAdvisory = {
  irrigation: 'Recommended: Moderate humidity levels. Check soil moisture and irrigate if necessary.',
  spraying: 'Suitable: Good conditions for spraying operations with light winds.',
  harvesting: 'Suitable: Weather conditions are favorable for harvesting activities.',
  fieldWork: 'Normal: Comfortable conditions for field work throughout the day.',
  generalAdvice: [
    'Current weather conditions are favorable for most agricultural activities.',
    'Monitor soil moisture levels regularly due to moderate humidity.',
    'UV levels are moderate - use sun protection during peak hours.'
  ],
  alerts: [
    'No severe weather alerts at this time.'
  ],
  lastUpdated: new Date().toISOString()
};

export const mockHistoricalData: HistoricalWeatherData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
  return {
    date: date.toISOString().split('T')[0],
    temperature: 25 + Math.sin(i * 0.2) * 8 + Math.random() * 4,
    humidity: 60 + Math.cos(i * 0.3) * 20 + Math.random() * 10,
    windSpeed: 8 + Math.sin(i * 0.1) * 6 + Math.random() * 4,
    precipitation: Math.abs(Math.sin(i * 0.4)) * 20 + Math.random() * 5
  };
});

// Aggregated mock data export
export const mockWeatherData = {
  locations: mockLocations,
  current: mockCurrentWeather,
  forecast: mockForecastData,
  advisory: mockAdvisoryData,
  historical: mockHistoricalData
};

// Helper functions for generating dynamic mock data
export const generateMockWeatherForLocation = (location: LocationData): WeatherData => {
  const baseTemp = 25 + Math.sin(location.lat * 0.1) * 8;
  const baseHumidity = 55 + Math.cos(location.lon * 0.1) * 15;
  const baseWind = 8 + Math.abs(Math.sin(location.lat + location.lon)) * 8;
  
  return {
    location,
    current: {
      temperature: Math.round(baseTemp + (Math.random() - 0.5) * 4),
      feelsLike: Math.round(baseTemp + 3 + (Math.random() - 0.5) * 2),
      humidity: Math.round(Math.max(40, Math.min(90, baseHumidity + (Math.random() - 0.5) * 10))),
      windSpeed: Math.round(baseWind + (Math.random() - 0.5) * 4),
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      uvIndex: Math.max(1, Math.min(11, Math.round(6 + (Math.random() - 0.5) * 4))),
      pressure: Math.round(1013 + (Math.random() - 0.5) * 20),
      visibility: Math.round(10 + (Math.random() - 0.5) * 6),
      condition: ['sunny', 'partly_cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)] as any,
      description: 'Variable conditions with seasonal variations'
    },
    timestamp: new Date().toISOString(),
    source: 'mock_api'
  };
};

export const generateMockForecastForLocation = (location: LocationData): WeatherForecast[] => {
  const baseTemp = 25 + Math.sin(location.lat * 0.1) * 8;
  const forecast: WeatherForecast[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    const tempVariation = Math.sin(i * 0.5) * 5;
    const conditions = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'thunderstorm'] as const;
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en', { weekday: 'short' }),
      high: Math.round(baseTemp + tempVariation + 2 + (Math.random() - 0.5) * 3),
      low: Math.round(baseTemp + tempVariation - 6 + (Math.random() - 0.5) * 3),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      description: 'Seasonal weather patterns',
      humidity: Math.round(60 + (Math.random() - 0.5) * 30),
      windSpeed: Math.round(10 + (Math.random() - 0.5) * 8),
      precipitationChance: Math.round(Math.random() * 100),
      uvIndex: Math.max(1, Math.min(11, Math.round(6 + (Math.random() - 0.5) * 4)))
    });
  }
  
  return forecast;
};