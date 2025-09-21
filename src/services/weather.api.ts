import { WeatherData, WeatherForecast, LocationData, AgriculturalAdvisory, WeatherCondition } from '../types/weather.types';
import { mockWeatherData, mockForecastData, mockAdvisoryData } from '../data/mockWeather';

/**
 * Weather API Service - Frontend-first implementation with mock data
 * All functions are structured as async API calls for easy backend replacement
 */

export class WeatherAPIService {
  private static CACHE_KEY = 'km.weather.cache';
  private static CACHE_DURATION = 15 * 60 * 1000; // 15 minutes



  /**
   * Get agricultural advisory based on weather conditions
   */
  static async getAgriculturalAdvisory(location: LocationData, cropType?: string): Promise<AgriculturalAdvisory> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/weather/advisory?lat=${location.lat}&lon=${location.lon}&crop=${cropType}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Use the unified getWeatherData method to get current weather
      const { current, location: weatherLocation, ...weatherData } = await this.getWeatherData(location.name);
      const currentWeather: WeatherData = {
        location,
        current,
        timestamp: weatherData.timestamp,
        source: weatherData.source
      };
      const advisory = this.generateAdvisory(currentWeather, cropType);
      
      return advisory;
    } catch (error) {
      console.error('Error fetching agricultural advisory:', error);
      throw new Error('Failed to fetch agricultural advisory');
    }
  }

  /**
   * Search locations for weather data
   */
  static async searchLocations(query: string): Promise<LocationData[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/locations/search?q=${encodeURIComponent(query)}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock location search
      const mockLocations = mockWeatherData.locations.filter(loc =>
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
      
      return mockLocations.slice(0, 10);
    } catch (error) {
      console.error('Error searching locations:', error);
      throw new Error('Failed to search locations');
    }
  }

  /**
   * Get location from coordinates (reverse geocoding)
   */
  static async getLocationFromCoordinates(lat: number, lon: number): Promise<LocationData> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/locations/reverse?lat=${lat}&lon=${lon}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock reverse geocoding
      return {
        id: `loc_${Date.now()}`,
        name: `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
        lat,
        lon,
        country: 'India',
        region: 'Maharashtra', // Mock region
        timezone: 'Asia/Kolkata'
      };
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      throw new Error('Failed to get location from coordinates');
    }
  }

  /**
   * Get comprehensive weather data using OpenWeatherMap free-tier Current Weather API
   * Uses current weather from /data/2.5/weather and generates forecast data locally
   * 
   * @param location - Either a location name ("Mumbai, India") or GPS coordinates ("17.4227, 78.5318")
   */
  static async getWeatherData(location: string): Promise<WeatherData & { forecast: WeatherForecast[] }> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    if (!apiKey) {
      console.error('VITE_WEATHER_API_KEY is missing');
      throw new Error('Weather API key is required but not found in environment variables');
    }

    try {
      // Step 1: Determine if input is coordinates or location name and get coordinates
      const locationData = await this.parseLocationInput(location, apiKey);
      
      // Step 2: Check cache for recent data
      const cacheKey = `current_${locationData.lat.toFixed(6)}_${locationData.lon.toFixed(6)}`;
      const cached = this.getCachedCurrentWeatherData(cacheKey);
      if (cached) {
        console.log('Returning cached weather data');
        return cached;
      }

      // Step 3: Fetch current weather data from free-tier Current Weather API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Current Weather API error: ${response.status} ${response.statusText}`);
      }

      const apiData = await response.json();
      
      // Step 4: Map API response to our data format
      const weatherData = this.mapCurrentWeatherResponse(apiData, locationData);
      
      // Step 5: Generate forecast data (since free API doesn't provide forecast)
      const forecast = this.generateLocationForecast(locationData);
      
      const result = {
        ...weatherData,
        forecast
      };
      
      // Step 6: Cache the data
      this.cacheCurrentWeatherData(cacheKey, result);
      
      console.log('Weather data fetched successfully from Current Weather API (free tier)');
      return result;
      
    } catch (error) {
      console.error('Error fetching weather data from Current Weather API:', error);
      
      // Fallback to mock data on error
      console.warn('Falling back to mock weather data with forecast');
      return this.generateMockWeatherDataWithForecast(location);
    }
  }

  // Private helper methods for API data mapping and mock data generation

  /**
   * Geocode location string to coordinates using OpenWeatherMap Geocoding API
   */
  private static async geocodeLocation(location: string, apiKey: string): Promise<LocationData> {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error(`Location '${location}' not found`);
    }

    const result = data[0];
    return {
      id: `geo_${Date.now()}`,
      name: `${result.name}, ${result.country}`,
      lat: result.lat,
      lon: result.lon,
      country: result.country || 'Unknown',
      region: result.state || 'Unknown',
      timezone: 'UTC' // One Call API provides timezone info
    };
  }

  /**
   * Reverse geocode coordinates to location name using OpenWeatherMap Reverse Geocoding API
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate  
   * @param apiKey - OpenWeatherMap API key
   */
  private static async reverseGeocodeLocation(lat: number, lon: number, apiKey: string): Promise<LocationData> {
    // TODO: Add reverse geocoding to get location name from coordinates
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error(`No location found for coordinates: ${lat}, ${lon}`);
    }

    const result = data[0];
    return {
      id: `reverse_geo_${Date.now()}`,
      name: `${result.name}${result.state ? ', ' + result.state : ''}${result.country ? ', ' + result.country : ''}`,
      lat,
      lon,
      country: result.country || 'Unknown',
      region: result.state || 'Unknown',
      timezone: 'UTC'
    };
  }

  /**
   * Parse location input and determine if it's coordinates or a location name
   * If coordinates, parse them directly and optionally get location name via reverse geocoding.
   * If location name, use direct geocoding API.
   * 
   * @param location - Either "lat, lon" format or location name
   * @param apiKey - OpenWeatherMap API key
   */
  private static async parseLocationInput(location: string, apiKey: string): Promise<LocationData> {
    // Regex to match coordinates format: "latitude, longitude"
    // Supports formats like "17.4227, 78.5318" or "17.4227,78.5318" or "-40.123, 174.456"
    const coordinatesRegex = /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/;
    
    // Also handle formats like "Map Location (-80.6906, 52.7081), -80.6906, 52.7081"
    // Extract just the coordinates part
    const coordinatesInStringRegex = /(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)(?:\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?))?/;
    
    let match = location.trim().match(coordinatesRegex);
    
    // If simple format doesn't match, try extracting from complex string
    if (!match) {
      const complexMatch = location.match(coordinatesInStringRegex);
      if (complexMatch) {
        // Use the last pair of coordinates if multiple pairs exist
        const lat = complexMatch[3] ? parseFloat(complexMatch[3]) : parseFloat(complexMatch[1]);
        const lon = complexMatch[4] ? parseFloat(complexMatch[4]) : parseFloat(complexMatch[2]);
        match = [location, lat.toString(), lon.toString()];
      }
    }
    
    if (match) {
      // Input contains coordinates
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      
      // Validate coordinate ranges
      if (lat < -90 || lat > 90) {
        throw new Error(`Invalid latitude: ${lat}. Must be between -90 and 90.`);
      }
      if (lon < -180 || lon > 180) {
        throw new Error(`Invalid longitude: ${lon}. Must be between -180 and 180.`);
      }
      
      console.log(`Detected coordinates input: ${lat}, ${lon}`);
      
      // Try to get proper location name using reverse geocoding
      try {
        const reverseGeocodedLocation = await this.reverseGeocodeLocation(lat, lon, apiKey);
        console.log(`Reverse geocoding successful: ${reverseGeocodedLocation.name}`);
        return reverseGeocodedLocation;
      } catch (error) {
        console.warn('Reverse geocoding failed, using coordinates as name:', error);
        // Fallback: Create LocationData with coordinates as name
        return {
          id: `coords_${Date.now()}`,
          name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
          lat,
          lon,
          country: 'Unknown',
          region: 'Unknown',
          timezone: 'UTC'
        };
      }
    } else {
      // Input is a location name, use direct geocoding API
      console.log(`Detected location name input: ${location}`);
      return await this.geocodeLocation(location, apiKey);
    }
  }

  /**
   * Map Current Weather API response to our data format
   */
  private static mapCurrentWeatherResponse(apiData: any, locationData: LocationData): WeatherData {
    // Map current weather from /data/2.5/weather API response
    const weatherData: WeatherData = {
      location: locationData,
      current: {
        temperature: Math.round(apiData.main?.temp || 0),
        feelsLike: Math.round(apiData.main?.feels_like || apiData.main?.temp || 0),
        humidity: apiData.main?.humidity || 0,
        windSpeed: Math.round((apiData.wind?.speed || 0) * 3.6), // Convert m/s to km/h
        windDirection: this.degreesToDirection(apiData.wind?.deg || 0),
        uvIndex: 0, // UV index not available in free API - set default
        pressure: apiData.main?.pressure || 1013,
        visibility: Math.round((apiData.visibility || 10000) / 1000), // Convert meters to km
        condition: this.mapOpenWeatherCondition(apiData.weather?.[0]?.main || 'Clear'),
        description: apiData.weather?.[0]?.description || 'Clear skies'
      },
      timestamp: new Date((apiData.dt || Date.now() / 1000) * 1000).toISOString(),
      source: 'openweathermap_current'
    };

    return weatherData;
  }

  /**
   * Get cached current weather data
   */
  private static getCachedCurrentWeatherData(cacheKey: string): (WeatherData & { forecast: WeatherForecast[] }) | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_current_${cacheKey}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < this.CACHE_DURATION) {
        return data;
      }
      
      // Clear expired cache
      localStorage.removeItem(`${this.CACHE_KEY}_current_${cacheKey}`);
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Cache current weather data
   */
  private static cacheCurrentWeatherData(cacheKey: string, data: WeatherData & { forecast: WeatherForecast[] }): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${this.CACHE_KEY}_current_${cacheKey}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache current weather data:', error);
    }
  }

  /**
   * Get cached One Call API data
   */
  private static getCachedOneCallData(cacheKey: string): (WeatherData & { forecast: WeatherForecast[] }) | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_onecall_${cacheKey}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < this.CACHE_DURATION) {
        return data;
      }
      
      // Clear expired cache
      localStorage.removeItem(`${this.CACHE_KEY}_onecall_${cacheKey}`);
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Cache One Call API data
   */
  private static cacheOneCallData(cacheKey: string, data: WeatherData & { forecast: WeatherForecast[] }): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${this.CACHE_KEY}_onecall_${cacheKey}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache One Call API data:', error);
    }
  }

  /**
   * Generate mock weather data with forecast for fallback
   */
  private static generateMockWeatherDataWithForecast(location: string): WeatherData & { forecast: WeatherForecast[] } {
    // Create a mock location based on the location string
    const mockLocation: LocationData = {
      id: `mock_${Date.now()}`,
      name: location,
      lat: 19.0760 + (Math.random() - 0.5) * 0.1, // Around Mumbai with slight variation
      lon: 72.8777 + (Math.random() - 0.5) * 0.1,
      country: 'India',
      region: 'Maharashtra',
      timezone: 'Asia/Kolkata'
    };

    const weatherData = this.generateLocationWeather(mockLocation);
    const forecast = this.generateLocationForecast(mockLocation);

    return {
      ...weatherData,
      forecast
    };
  }

  /**
   * Map OpenWeatherMap weather conditions to our internal condition types
   */
  private static mapOpenWeatherCondition(condition: string): WeatherCondition {
    const conditionMap: Record<string, WeatherCondition> = {
      'Clear': 'sunny',
      'Clouds': 'cloudy',
      'Rain': 'rainy',
      'Drizzle': 'rainy',
      'Thunderstorm': 'thunderstorm',
      'Snow': 'snow',
      'Mist': 'fog',
      'Fog': 'fog',
      'Haze': 'fog',
      'Dust': 'windy',
      'Sand': 'windy',
      'Ash': 'windy',
      'Squall': 'windy',
      'Tornado': 'windy'
    };
    
    return conditionMap[condition] || 'partly_cloudy';
  }

  /**
   * Convert wind direction degrees to compass direction
   */
  private static degreesToDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((degrees % 360) / 22.5) % 16;
    return directions[index];
  }

  private static generateLocationWeather(location: LocationData): WeatherData {
    const baseTemp = 25 + Math.sin(location.lat * 0.1) * 8;
    const baseHumidity = 55 + Math.cos(location.lon * 0.1) * 15;
    const baseWind = 8 + Math.abs(Math.sin(location.lat + location.lon)) * 8;
    const baseUV = Math.max(1, Math.round(8 - Math.abs(location.lat - 20) * 0.1));

    return {
      location,
      current: {
        temperature: Math.round(baseTemp),
        feelsLike: Math.round(baseTemp + 3),
        humidity: Math.round(Math.max(40, Math.min(85, baseHumidity))),
        windSpeed: Math.round(baseWind),
        windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.abs(location.lat + location.lon) % 8)],
        uvIndex: baseUV,
        pressure: 1013 + Math.round(Math.sin(location.lat) * 10),
        visibility: 10 + Math.round(Math.cos(location.lon) * 5),
        condition: 'partly_cloudy',
        description: 'Partly cloudy with light winds'
      },
      timestamp: new Date().toISOString(),
      source: 'mock_api'
    };
  }

  private static generateLocationForecast(location: LocationData): WeatherForecast[] {
    const baseTemp = 25 + Math.sin(location.lat * 0.1) * 8;
    const forecast: WeatherForecast[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const tempVariation = Math.sin(i * 0.5) * 5;
      const conditions: WeatherCondition[] = ['sunny', 'partly_cloudy', 'cloudy', 'rainy', 'thunderstorm'];
      const condition = conditions[Math.floor(Math.abs(Math.sin(location.lat + i)) * conditions.length)] as WeatherCondition;
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en', { weekday: 'short' }),
        high: Math.round(baseTemp + tempVariation + 2),
        low: Math.round(baseTemp + tempVariation - 6),
        condition,
        description: `${condition.replace('_', ' ')} conditions`,
        humidity: Math.round(55 + Math.cos(i) * 15),
        windSpeed: Math.round(8 + Math.sin(i) * 5),
        precipitationChance: Math.round(Math.abs(Math.sin(i * 0.8)) * 100),
        uvIndex: Math.max(1, Math.round(8 - i * 0.5))
      });
    }
    
    return forecast;
  }

  private static generateAdvisory(weather: WeatherData, cropType?: string): AgriculturalAdvisory {
    const { current } = weather;
    const advisories: string[] = [];
    const alerts: string[] = [];
    
    // Temperature-based advice
    if (current.temperature > 35) {
      advisories.push('High temperature detected. Provide shade for crops and increase irrigation frequency.');
      alerts.push('Heat stress alert: Avoid field work during 11 AM - 3 PM');
    } else if (current.temperature < 10) {
      advisories.push('Low temperature alert. Protect sensitive crops from cold damage.');
      alerts.push('Frost warning: Cover young plants overnight');
    }
    
    // Humidity-based advice
    if (current.humidity < 40) {
      advisories.push(`Low humidity (${current.humidity}%). Consider irrigation to maintain soil moisture.`);
    } else if (current.humidity > 80) {
      advisories.push(`High humidity (${current.humidity}%). Monitor for fungal diseases and improve ventilation.`);
    }
    
    // Wind-based advice
    if (current.windSpeed > 20) {
      advisories.push(`High wind speed (${current.windSpeed} km/h). Postpone spraying operations.`);
      alerts.push('Strong wind alert: Secure farm equipment and structures');
    }
    
    // UV-based advice
    if (current.uvIndex > 7) {
      alerts.push(`High UV index (${current.uvIndex}). Use protective clothing during field work.`);
    }
    
    // Default advice if no specific conditions
    if (advisories.length === 0) {
      advisories.push('Weather conditions are favorable for normal agricultural activities.');
    }
    
    return {
      irrigation: current.humidity < 50 
        ? 'Recommended: Soil moisture may be low due to low humidity. Check irrigation needs.'
        : 'Monitor: Current humidity levels are adequate. Check soil moisture regularly.',
      spraying: current.windSpeed > 15 
        ? 'Not recommended: High wind speed may affect spray effectiveness and drift.'
        : current.humidity > 85
        ? 'Caution: High humidity may reduce spray effectiveness.'
        : 'Suitable: Good conditions for spraying operations.',
      harvesting: current.humidity > 80 
        ? 'Delay: High humidity may affect crop drying and storage quality.'
        : 'Suitable: Good conditions for harvesting operations.',
      fieldWork: current.temperature > 35 || current.uvIndex > 7
        ? 'Limit to early morning and evening hours to avoid heat stress.'
        : 'Normal: Suitable conditions for field work throughout the day.',
      generalAdvice: advisories,
      alerts: alerts.length > 0 ? alerts : ['No weather alerts at this time'],
      cropSpecific: cropType ? this.getCropSpecificAdvice(weather, cropType) : undefined,
      lastUpdated: new Date().toISOString()
    };
  }

  private static getCropSpecificAdvice(weather: WeatherData, cropType: string): string {
    const { current } = weather;
    
    switch (cropType.toLowerCase()) {
      case 'wheat':
        if (current.temperature > 30) return 'Wheat: High temperature may affect grain filling. Ensure adequate irrigation.';
        if (current.humidity > 80) return 'Wheat: Monitor for rust and blight diseases in high humidity.';
        return 'Wheat: Current conditions are suitable for normal growth.';
      
      case 'rice':
        if (current.humidity < 60) return 'Rice: Increase water levels in fields to maintain humidity for optimal growth.';
        return 'Rice: Maintain consistent water levels and monitor for pest activity.';
      
      case 'cotton':
        if (current.temperature > 35) return 'Cotton: High temperature stress. Increase irrigation and provide shade if possible.';
        if (current.windSpeed > 20) return 'Cotton: Strong winds may damage plants. Provide windbreaks if necessary.';
        return 'Cotton: Monitor for bollworm activity and maintain regular irrigation.';
      
      default:
        return `${cropType}: Monitor crop condition regularly and adjust practices based on weather changes.`;
    }
  }

  private static getCachedWeather(location: LocationData): WeatherData | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${location.lat}_${location.lon}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < this.CACHE_DURATION) {
        return data;
      }
      
      // Clear expired cache
      localStorage.removeItem(`${this.CACHE_KEY}_${location.lat}_${location.lon}`);
      return null;
    } catch {
      return null;
    }
  }

  private static cacheWeatherData(location: LocationData, data: WeatherData): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${this.CACHE_KEY}_${location.lat}_${location.lon}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache weather data:', error);
    }
  }
}