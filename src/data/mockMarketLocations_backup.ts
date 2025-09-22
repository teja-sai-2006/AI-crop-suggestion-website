/**
 * Mock Market Locations Data - Backup
 * Frontend-first implementation for KM farming assistant
 */

import { MarketLocation } from '../types/marketPrices.types';

// Import comprehensive locations and export them as the main export
export { 
  comprehensiveMarketLocations as mockMarketLocations,
  getCropsByRegion,
  getLocationsByState,
  getAvailableStates,
  getAvailableRegions,
  getLocationsByRegion,
  getLocationsByMarketType
} from './mockMarketLocationsExpanded';