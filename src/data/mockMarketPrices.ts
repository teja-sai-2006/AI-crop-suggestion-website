/**
 * Mock Market Prices Data
 * Frontend-first implementation for KM farming assistant
 */

import { MarketPrice } from '../types/marketPrices.types';
import { mockMarketLocations } from './mockMarketLocations';

const crops = [
  'Wheat', 'Rice', 'Tomato', 'Onion', 'Potato', 'Cotton', 'Sugarcane',
  'Soybean', 'Mustard', 'Gram', 'Barley', 'Maize', 'Millets', 'Coconut',
  'Coffee', 'Tea', 'Spices', 'Grapes', 'Jute', 'Peas'
];

const qualities: Array<'premium' | 'standard' | 'low'> = ['premium', 'standard', 'low'];

// Base prices per kg in INR
const basePrices: Record<string, number> = {
  'Wheat': 25,
  'Rice': 35,
  'Tomato': 40,
  'Onion': 30,
  'Potato': 25,
  'Cotton': 60,
  'Sugarcane': 3,
  'Soybean': 45,
  'Mustard': 55,
  'Gram': 65,
  'Barley': 22,
  'Maize': 20,
  'Millets': 35,
  'Coconut': 25,
  'Coffee': 350,
  'Tea': 180,
  'Spices': 250,
  'Grapes': 80,
  'Jute': 42,
  'Peas': 55
};

function generateRandomId(): string {
  return 'price_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function getRandomTrend(): 'up' | 'down' | 'stable' {
  const trends: Array<'up' | 'down' | 'stable'> = ['up', 'down', 'stable', 'stable']; // stable is more common
  return trends[Math.floor(Math.random() * trends.length)];
}

function calculatePriceWithTrend(basePrice: number, trend: 'up' | 'down' | 'stable', quality: string): number {
  let price = basePrice;
  
  // Adjust for quality
  if (quality === 'premium') {
    price *= 1.2;
  } else if (quality === 'low') {
    price *= 0.8;
  }
  
  // Apply trend variation
  const variation = 0.05 + Math.random() * 0.15; // 5-20% variation
  
  if (trend === 'up') {
    price *= (1 + variation);
  } else if (trend === 'down') {
    price *= (1 - variation);
  } else {
    price *= (1 + (Math.random() - 0.5) * 0.1); // Small random variation for stable
  }
  
  return Math.round(price * 100) / 100;
}

function generatePriceHistory(crop: string, location: string, days: number = 30): MarketPrice[] {
  const prices: MarketPrice[] = [];
  const basePrice = basePrices[crop] || 30;
  const marketLocation = mockMarketLocations.find(loc => loc.id === location);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    qualities.forEach(quality => {
      const trend = getRandomTrend();
      const price = calculatePriceWithTrend(basePrice, trend, quality);
      const previousPrice = i < days - 1 ? prices[prices.length - qualities.length]?.price || price : price * 0.95;
      const changePercentage = ((price - previousPrice) / previousPrice) * 100;
      
      prices.push({
        id: generateRandomId(),
        crop,
        location: marketLocation?.name || 'Unknown Market',
        locationId: location,
        price,
        unit: 'kg',
        date: date.toISOString().split('T')[0],
        marketName: marketLocation?.name || 'Unknown Market',
        previousPrice,
        trend,
        changePercentage: Math.round(changePercentage * 100) / 100,
        quality,
        minPrice: price * 0.9,
        maxPrice: price * 1.1,
        avgPrice: price,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString()
      });
    });
  }
  
  return prices;
}

// Generate comprehensive mock data
const generateComprehensiveMarketData = (): MarketPrice[] => {
  const allData: MarketPrice[] = [];
  console.log(`🎪 PRESENTATION DATA GENERATION: Creating comprehensive data for ${crops.length} crops × ${mockMarketLocations.length} locations`);
  
  crops.forEach(crop => {
    mockMarketLocations.forEach(location => {
      const priceHistory = generatePriceHistory(crop, location.id);
      allData.push(...priceHistory);
    });
  });
  
  console.log(`✅ Generated ${allData.length} price records for presentation!`);
  return allData;
};

export const mockMarketPrices: MarketPrice[] = generateComprehensiveMarketData();

// Export helper functions
export const getAvailableCrops = (): string[] => {
  return [...new Set(mockMarketPrices.map(price => price.crop))];
};

export const getPricesByCrop = (crop: string): MarketPrice[] => {
  return mockMarketPrices.filter(price => price.crop === crop);
};

export const getPricesByLocation = (locationId: string): MarketPrice[] => {
  return mockMarketPrices.filter(price => price.locationId === locationId);
};

export const getLatestPrices = (): MarketPrice[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockMarketPrices.filter(price => price.date === today);
};

export const getTrendingCrops = (limit: number = 5): Array<{
  crop: string;
  avgChangePercentage: number;
  latestPrice: number;
}> => {
  const cropTrends: Record<string, { totalChange: number; count: number; latestPrice: number }> = {};
  
  mockMarketPrices.forEach(price => {
    if (!cropTrends[price.crop]) {
      cropTrends[price.crop] = { totalChange: 0, count: 0, latestPrice: price.price };
    }
    cropTrends[price.crop].totalChange += price.changePercentage;
    cropTrends[price.crop].count += 1;
    if (price.date > cropTrends[price.crop].latestPrice.toString()) {
      cropTrends[price.crop].latestPrice = price.price;
    }
  });
  
  return Object.entries(cropTrends)
    .map(([crop, data]) => ({
      crop,
      avgChangePercentage: Math.round((data.totalChange / data.count) * 100) / 100,
      latestPrice: data.latestPrice
    }))
    .sort((a, b) => Math.abs(b.avgChangePercentage) - Math.abs(a.avgChangePercentage))
    .slice(0, limit);
};

export const generateMockPriceId = (crop: string, location: string): string => {
  return `price_${crop.toLowerCase()}_${location}_${Date.now()}`;
};