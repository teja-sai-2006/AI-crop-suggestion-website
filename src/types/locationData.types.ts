/**
 * Interface for soil data parameters from CSV
 */
export interface SoilData {
  ph: number;
  nitrogen: number;  // ppm
  phosphorus: number;  // ppm
  potassium: number;  // ppm
}

/**
 * Interface for climate data parameters from CSV
 */
export interface ClimateData {
  temperature: number;  // °C
  rainfall: number;  // mm
  humidity: number;  // %
}

/**
 * Main interface for location-based agricultural data
 */
export interface LocationData {
  state: string;
  district: string;
  soilData: SoilData;
  climateData: ClimateData;
  displayName: string;  // Format: "District, State"
  locationKey: string;  // Unique identifier: "state-district"
}

/**
 * Interface for location selector options
 */
export interface LocationOption {
  value: string;
  label: string;
  state: string;
  district: string;
}

/**
 * Interface for grouped location options by state
 */
export interface GroupedLocationOptions {
  [state: string]: LocationOption[];
}