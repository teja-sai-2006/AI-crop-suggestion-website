/**
 * Mock Market Locations Data
 * Frontend-first implementation for KM farming assistant
 */

import { MarketLocation } from '../types/marketPrices.types';

export const mockMarketLocations: MarketLocation[] = [
  {
    id: 'loc_mumbai_apmc',
    name: 'APMC Market Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'loc_pune_hadapsar',
    name: 'Hadapsar Market Pune',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: 'loc_nagpur_cotton',
    name: 'Cotton Market Nagpur',
    city: 'Nagpur',
    state: 'Maharashtra',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 21.1458, lng: 79.0882 }
  },
  {
    id: 'loc_hyderabad_begum',
    name: 'Begum Bazaar Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 'loc_chennai_koyambedu',
    name: 'Koyambedu Market Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'loc_bengaluru_yeswanthpur',
    name: 'Yeswanthpur Market Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 13.0285, lng: 77.5540 }
  },
  {
    id: 'loc_delhi_azadpur',
    name: 'Azadpur Mandi Delhi',
    city: 'Delhi',
    state: 'Delhi',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: 'loc_kolkata_sealdah',
    name: 'Sealdah Market Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    id: 'loc_ahmedabad_jamalpur',
    name: 'Jamalpur Market Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: 'loc_jaipur_chomu',
    name: 'Chomu Mandi Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 'loc_lucknow_aminabad',
    name: 'Aminabad Market Lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 26.8467, lng: 80.9462 }
  },
  {
    id: 'loc_bhopal_chowk',
    name: 'Chowk Bazaar Bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.2599, lng: 77.4126 }
  }
];

export const getCropsByRegion = (region: string): string[] => {
  const regionCrops: Record<string, string[]> = {
    'Western India': ['Cotton', 'Sugarcane', 'Onion', 'Grapes', 'Wheat', 'Soybean'],
    'North India': ['Wheat', 'Rice', 'Potato', 'Mustard', 'Barley', 'Peas'],
    'South India': ['Rice', 'Coconut', 'Coffee', 'Spices', 'Millets', 'Sugarcane'],
    'East India': ['Rice', 'Jute', 'Tea', 'Potato', 'Wheat', 'Maize'],
    'Central India': ['Cotton', 'Soybean', 'Wheat', 'Gram', 'Mustard', 'Rice']
  };
  
  return regionCrops[region] || [];
};

export const getLocationsByState = (state: string): MarketLocation[] => {
  return mockMarketLocations.filter(location => location.state === state);
};

export const getAvailableStates = (): string[] => {
  return [...new Set(mockMarketLocations.map(location => location.state))];
};

export const getAvailableRegions = (): string[] => {
  return [...new Set(mockMarketLocations.map(location => location.region))];
};