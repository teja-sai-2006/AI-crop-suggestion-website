import { LocationData } from '../types/locationData.types.ts';

export class LocationDataService {
  private static locationData: LocationData[] = [];
  private static isLoaded = false;

  /**
   * Load location data from CSV file
   */
  static async loadLocationData(): Promise<LocationData[]> {
    if (this.isLoaded && this.locationData.length > 0) {
      return this.locationData;
    }

    try {
      // Import the CSV file as text
      const response = await fetch('/soil_data_csv_file4.csv');
      if (!response.ok) {
        throw new Error(`Failed to load CSV: ${response.statusText}`);
      }
      
      const csvText = await response.text();
      this.locationData = this.parseCSV(csvText);
      this.isLoaded = true;
      
      return this.locationData;
    } catch (error) {
      console.error('Error loading location data:', error);
      throw new Error('Failed to load location data');
    }
  }

  /**
   * Parse CSV content into LocationData array
   */
  private static parseCSV(csvText: string): LocationData[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data: LocationData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      
      if (values.length >= 8) {
        const locationData: LocationData = {
          state: values[0]?.trim() || '',
          district: values[1]?.trim() || '',
          soilData: {
            ph: this.parseNumber(values[2]),
            nitrogen: this.parseNumber(values[3]),
            phosphorus: this.parseNumber(values[4]),
            potassium: this.parseNumber(values[5])
          },
          climateData: {
            temperature: this.parseNumber(values[6]),
            rainfall: this.parseNumber(values[7]),
            humidity: this.parseNumber(values[8])
          },
          displayName: `${values[1]?.trim()}, ${values[0]?.trim()}`,
          locationKey: `${values[0]?.trim().toLowerCase()}-${values[1]?.trim().toLowerCase()}`
        };
        
        data.push(locationData);
      }
    }

    return data;
  }

  /**
   * Parse a CSV line handling quoted values
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  /**
   * Parse number from string, handling various formats
   */
  private static parseNumber(value: string): number {
    if (!value) return 0;
    
    // Remove any non-numeric characters except decimal point and minus
    const cleanValue = value.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(cleanValue);
    
    return isNaN(parsed) ? 0 : parsed;
  }

  /**
   * Get all available locations
   */
  static async getLocations(): Promise<LocationData[]> {
    return await this.loadLocationData();
  }

  /**
   * Get location data by key
   */
  static async getLocationByKey(locationKey: string): Promise<LocationData | null> {
    const locations = await this.loadLocationData();
    return locations.find(loc => loc.locationKey === locationKey) || null;
  }

  /**
   * Search locations by query
   */
  static async searchLocations(query: string): Promise<LocationData[]> {
    const locations = await this.loadLocationData();
    
    if (!query.trim()) {
      return locations;
    }
    
    const searchTerm = query.toLowerCase();
    return locations.filter(loc => 
      loc.state.toLowerCase().includes(searchTerm) ||
      loc.district.toLowerCase().includes(searchTerm) ||
      loc.displayName.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get unique states
   */
  static async getStates(): Promise<string[]> {
    const locations = await this.loadLocationData();
    const states = [...new Set(locations.map(loc => loc.state))];
    return states.sort();
  }

  /**
   * Get districts by state
   */
  static async getDistrictsByState(state: string): Promise<string[]> {
    const locations = await this.loadLocationData();
    const districts = locations
      .filter(loc => loc.state.toLowerCase() === state.toLowerCase())
      .map(loc => loc.district);
    return [...new Set(districts)].sort();
  }
}