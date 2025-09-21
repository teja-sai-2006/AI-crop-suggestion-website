/**
 * Market Prices API Service
 * Frontend-first implementation for KM farming assistant
 */

import { 
  MarketPrice, 
  MarketLocation, 
  MarketPricesFilter,
  MarketPricesSummary,
  CropPriceHistory,
  PriceTrend
} from '../types/marketPrices.types';
import { mockMarketPrices, getAvailableCrops, getTrendingCrops } from '../data/mockMarketPrices';
import { mockMarketLocations } from '../data/mockMarketLocations';

export class MarketPricesAPIService {
  private static readonly PRICES_KEY = 'km_market_prices';
  private static readonly PREFERENCES_KEY = 'km_market_preferences';

  /**
   * Get market prices with optional filtering
   */
  static async getMarketPrices(filter?: MarketPricesFilter): Promise<MarketPrice[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/market-prices?${new URLSearchParams(filter)}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      let prices = this.getStoredPrices();
      
      // Apply filters if provided
      if (filter) {
        prices = this.applyFilters(prices, filter);
      }
      
      // Sort by date (newest first)
      prices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      return prices;
    } catch (error) {
      console.error('Error getting market prices:', error);
      throw new Error('Failed to get market prices');
    }
  }

  /**
   * Get available market locations
   */
  static async getAvailableMarkets(): Promise<MarketLocation[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/market-locations');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return mockMarketLocations.filter(location => location.isActive);
    } catch (error) {
      console.error('Error getting market locations:', error);
      throw new Error('Failed to get market locations');
    }
  }

  /**
   * Get available crops
   */
  static async getAvailableCrops(): Promise<string[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/crops');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return getAvailableCrops();
    } catch (error) {
      console.error('Error getting available crops:', error);
      throw new Error('Failed to get available crops');
    }
  }

  /**
   * Get latest prices for a specific crop and location
   */
  static async getLatestPrice(crop: string, locationId?: string): Promise<MarketPrice[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/market-prices/latest?crop=${crop}&location=${locationId}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const prices = this.getStoredPrices();
      const today = new Date().toISOString().split('T')[0];
      
      let filteredPrices = prices.filter(price => 
        price.crop === crop && price.date === today
      );
      
      if (locationId) {
        filteredPrices = filteredPrices.filter(price => price.locationId === locationId);
      }
      
      return filteredPrices;
    } catch (error) {
      console.error('Error getting latest prices:', error);
      throw new Error('Failed to get latest prices');
    }
  }

  /**
   * Get price history for a crop
   */
  static async getCropPriceHistory(crop: string, locationId?: string, days: number = 30): Promise<CropPriceHistory> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/market-prices/history?crop=${crop}&location=${locationId}&days=${days}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const prices = this.getStoredPrices();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      let filteredPrices = prices.filter(price => 
        price.crop === crop && 
        new Date(price.date) >= cutoffDate &&
        price.quality === 'standard' // Use standard quality for history
      );
      
      if (locationId) {
        filteredPrices = filteredPrices.filter(price => price.locationId === locationId);
      }
      
      // Group prices by date and calculate average
      const pricesByDate: Record<string, number[]> = {};
      filteredPrices.forEach(price => {
        if (!pricesByDate[price.date]) {
          pricesByDate[price.date] = [];
        }
        pricesByDate[price.date].push(price.price);
      });
      
      const trends: PriceTrend[] = Object.entries(pricesByDate)
        .map(([date, prices]) => ({
          date,
          price: Math.round((prices.reduce((sum, price) => sum + price, 0) / prices.length) * 100) / 100
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
      
      const allPrices = trends.map(t => t.price);
      const currentPrice = allPrices[allPrices.length - 1] || 0;
      const avgPrice = Math.round((allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length) * 100) / 100;
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      
      // Calculate volatility (standard deviation)
      const volatility = Math.sqrt(
        allPrices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / allPrices.length
      );
      
      const location = mockMarketLocations.find(loc => loc.id === locationId);
      
      return {
        crop,
        location: location?.name || 'All Markets',
        trends,
        currentPrice,
        avgPrice,
        minPrice,
        maxPrice,
        volatility: Math.round(volatility * 100) / 100
      };
    } catch (error) {
      console.error('Error getting crop price history:', error);
      throw new Error('Failed to get crop price history');
    }
  }

  /**
   * Get market prices summary and analytics
   */
  static async getPricesSummary(): Promise<MarketPricesSummary> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/market-prices/summary');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      
      const prices = this.getStoredPrices();
      const today = new Date().toISOString().split('T')[0];
      const todayPrices = prices.filter(price => price.date === today);
      
      const uniqueCrops = new Set(prices.map(p => p.crop));
      const uniqueMarkets = new Set(prices.map(p => p.locationId));
      
      // Calculate average price change
      const avgPriceChange = todayPrices.reduce((sum, price) => sum + price.changePercentage, 0) / todayPrices.length;
      
      // Get trending crops
      const trendingCrops = getTrendingCrops(10);
      
      const topGainers = trendingCrops
        .filter(crop => crop.avgChangePercentage > 0)
        .slice(0, 5)
        .map(crop => {
          const latestPrice = todayPrices.find(p => p.crop === crop.crop && p.quality === 'standard');
          return {
            crop: crop.crop,
            location: latestPrice?.location || 'Multiple Markets',
            changePercentage: crop.avgChangePercentage,
            currentPrice: latestPrice?.price || crop.latestPrice
          };
        });
      
      const topLosers = trendingCrops
        .filter(crop => crop.avgChangePercentage < 0)
        .slice(0, 5)
        .map(crop => {
          const latestPrice = todayPrices.find(p => p.crop === crop.crop && p.quality === 'standard');
          return {
            crop: crop.crop,
            location: latestPrice?.location || 'Multiple Markets',
            changePercentage: crop.avgChangePercentage,
            currentPrice: latestPrice?.price || crop.latestPrice
          };
        });
      
      return {
        totalCrops: uniqueCrops.size,
        totalMarkets: uniqueMarkets.size,
        avgPriceChange: Math.round(avgPriceChange * 100) / 100,
        topGainers,
        topLosers,
        recentUpdates: todayPrices.slice(0, 10)
      };
    } catch (error) {
      console.error('Error getting prices summary:', error);
      throw new Error('Failed to get prices summary');
    }
  }

  /**
   * Save user preferences (last selected crop/location)
   */
  static async savePreferences(crop: string, locationId: string): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/user/preferences', { method: 'POST', body: JSON.stringify({ crop, location: locationId }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const preferences = {
        lastSelectedCrop: crop,
        lastSelectedLocation: locationId,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw new Error('Failed to save preferences');
    }
  }

  /**
   * Get user preferences
   */
  static async getPreferences(): Promise<{ lastSelectedCrop?: string; lastSelectedLocation?: string } | null> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/user/preferences');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const stored = localStorage.getItem(this.PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error getting preferences:', error);
      return null;
    }
  }

  // Private helper methods

  private static getStoredPrices(): MarketPrice[] {
    try {
      const stored = localStorage.getItem(this.PRICES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Initialize with mock data if no stored data
      localStorage.setItem(this.PRICES_KEY, JSON.stringify(mockMarketPrices));
      return [...mockMarketPrices];
    } catch (error) {
      console.warn('Failed to get stored prices, using mock data:', error);
      return [...mockMarketPrices];
    }
  }

  private static applyFilters(prices: MarketPrice[], filter: MarketPricesFilter): MarketPrice[] {
    return prices.filter(price => {
      // Filter by crop
      if (filter.crop && price.crop !== filter.crop) {
        return false;
      }
      
      // Filter by location
      if (filter.location && price.locationId !== filter.location) {
        return false;
      }
      
      // Filter by date range
      if (filter.startDate && price.date < filter.startDate) {
        return false;
      }
      if (filter.endDate && price.date > filter.endDate) {
        return false;
      }
      
      // Filter by quality
      if (filter.quality && price.quality !== filter.quality) {
        return false;
      }
      
      // Filter by market type
      if (filter.marketType) {
        const location = mockMarketLocations.find(loc => loc.id === price.locationId);
        if (!location || location.marketType !== filter.marketType) {
          return false;
        }
      }
      
      return true;
    });
  }
}