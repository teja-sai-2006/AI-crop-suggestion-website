/**
 * Market Prices Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface MarketPrice {
  id: string;
  crop: string;
  location: string;
  locationId: string;
  price: number; // Price per kg in INR
  unit: string;
  date: string;
  marketName: string;
  previousPrice?: number;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  quality: 'premium' | 'standard' | 'low';
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface MarketLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  marketType: 'mandi' | 'wholesale' | 'retail';
  isActive: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PriceTrend {
  date: string;
  price: number;
  volume?: number;
}

export interface MarketPricesFilter {
  crop?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  quality?: 'premium' | 'standard' | 'low';
  marketType?: 'mandi' | 'wholesale' | 'retail';
}

export interface MarketPricesSummary {
  totalCrops: number;
  totalMarkets: number;
  avgPriceChange: number;
  topGainers: Array<{
    crop: string;
    location: string;
    changePercentage: number;
    currentPrice: number;
  }>;
  topLosers: Array<{
    crop: string;
    location: string;
    changePercentage: number;
    currentPrice: number;
  }>;
  recentUpdates: MarketPrice[];
}

export interface CropPriceHistory {
  crop: string;
  location: string;
  trends: PriceTrend[];
  currentPrice: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  volatility: number;
}