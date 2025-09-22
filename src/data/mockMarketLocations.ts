/**
 * Mock Market Locations Data
 * Frontend-first implementation for KM farming assistant
 */

import { MarketLocation } from '../types/marketPrices.types';

export const mockMarketLocations: MarketLocation[] = [
  {
    id: 'loc_mumbai_apmc',
    name: 'Agricultural Market Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'loc_pune_hadapsar',
    name: 'Agricultural Market Pune',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: 'loc_delhi_azadpur',
    name: 'Agricultural Market Delhi',
    city: 'Delhi',
    state: 'Delhi',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: 'loc_bangalore_yeshwanthpur',
    name: 'Agricultural Market Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 'loc_chennai_koyambedu',
    name: 'Agricultural Market Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'loc_kolkata_mechua',
    name: 'Agricultural Market Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    id: 'loc_hyderabad_bowenpally',
    name: 'Agricultural Market Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 'loc_ahmedabad_jamalpur',
    name: 'Agricultural Market Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: 'loc_jaipur_muhana',
    name: 'Agricultural Market Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 'loc_solapur_agricultural',
    name: 'Agricultural Market Solapur',
    city: 'Solapur',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 17.6599, lng: 75.9064 }
  },
  {
    id: 'loc_indore_choithram',
    name: 'Agricultural Market Indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 22.7196, lng: 75.8577 }
  },
  {
    id: 'loc_lucknow_alambagh',
    name: 'Agricultural Market Lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 26.8467, lng: 80.9462 }
  },
  {
    id: 'loc_bhopal_hamidia',
    name: 'Agricultural Market Bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.2599, lng: 77.4126 }
  },
  {
    id: 'loc_chandigarh_sector26',
    name: 'Agricultural Market Chandigarh',
    city: 'Chandigarh',
    state: 'Chandigarh',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 30.7333, lng: 76.7794 }
  },
  {
    id: 'loc_nashik_satpur',
    name: 'Agricultural Market Nashik',
    city: 'Nashik',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 19.9975, lng: 73.7898 }
  }
];

// Helper functions for backward compatibility
export const getLocationsByState = (state: string): MarketLocation[] => {
  return mockMarketLocations.filter(location => location.state === state);
};

export const getAvailableStates = (): string[] => {
  const stateSet = new Set(mockMarketLocations.map(location => location.state));
  const uniqueStates = Array.from(stateSet);
  console.log(`🏪 Market Locations: ${uniqueStates.length} states, ${mockMarketLocations.length} total markets`);
  return uniqueStates;
};

export const getAvailableRegions = (): string[] => {
  const regionSet = new Set(mockMarketLocations.map(location => location.region));
  return Array.from(regionSet);
};

export const getLocationsByRegion = (region: string): MarketLocation[] => {
  return mockMarketLocations.filter(location => location.region === region);
};