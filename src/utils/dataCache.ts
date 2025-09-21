/**
 * Data Cache Manager for Crop Tracker
 * Provides caching functionality to reduce API calls and improve performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class DataCacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Set data in cache with optional TTL
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    console.log(`🔄 Caching data for key: ${key}`, { dataSize: JSON.stringify(data).length, ttl });
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Get data from cache if not expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      console.log(`📭 Cache miss for key: ${key}`);
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      console.log(`⏰ Cache expired for key: ${key}, removing from cache`);
      this.cache.delete(key);
      return null;
    }

    console.log(`✅ Cache hit for key: ${key}`);
    return entry.data as T;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string): void {
    console.log(`🗑️ Invalidating cache for key: ${key}`);
    this.cache.delete(key);
  }

  /**
   * Invalidate all cache entries matching pattern
   */
  invalidatePattern(pattern: string): void {
    console.log(`🗑️ Invalidating cache entries matching pattern: ${pattern}`);
    
    for (const [key] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    console.log(`🧹 Clearing all cache entries`);
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Get or set pattern: fetch data if not cached, otherwise return cached data
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.DEFAULT_TTL
  ): Promise<T> {
    // Try to get from cache first
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Fetch fresh data
    console.log(`🔄 Fetching fresh data for key: ${key}`);
    try {
      const data = await fetcher();
      this.set(key, data, ttl);
      return data;
    } catch (error) {
      console.error(`❌ Failed to fetch data for key: ${key}`, error);
      throw error;
    }
  }
}

// Global cache instance
export const cropTrackerCache = new DataCacheManager();

// Cache key generators
export const CacheKeys = {
  crops: () => 'crops:all',
  crop: (id: string) => `crop:${id}`,
  cropSummary: () => 'crop:summary',
  irrigationLogs: (cropId: string) => `irrigation:${cropId}`,
  cropActivities: (cropId: string) => `activities:${cropId}`,
  lastIrrigation: (cropId: string) => `lastIrrigation:${cropId}`
} as const;

export default DataCacheManager;