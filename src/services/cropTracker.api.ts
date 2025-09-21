import { 
  CropTracker, 
  CropActivity, 
  CropTrackerSummary, 
  CropTrackerInput, 
  CropActivityInput,
  IrrigationLog,
  IrrigationInput,
  CropTrackerFilter
} from '../types/cropTracker.types';
import { CropSuggestion } from '../types/cropRecommendation.types';
import { performanceMonitor } from '../utils/performanceMonitor';
import { cropTrackerCache, CacheKeys } from '../utils/dataCache';

/**
 * Crop Tracker API Service
 * Frontend-first implementation for KM farming assistant
 * Enhanced with performance optimization, caching, and error handling
 */
export class CropTrackerAPIService {
  private static readonly STORAGE_KEY = 'km_crop_tracker';
  private static readonly ACTIVITIES_KEY = 'km_crop_activities';
  private static readonly IRRIGATION_KEY = 'km_irrigation_logs';
  private static readonly API_DELAY = 150; // Reduced delay for better performance

  /**
   * Get all crop tracker entries for the current user
   * Enhanced with caching and performance monitoring
   */
  static async getCrops(filter?: CropTrackerFilter): Promise<CropTracker[]> {
    return performanceMonitor.measure('getCrops', async () => {
      console.log('🌾 API: Getting crops...', { filter, timestamp: new Date().toISOString() });
      
      try {
        // Use cache if no filter is applied
        if (!filter) {
          const cached = cropTrackerCache.get<CropTracker[]>(CacheKeys.crops());
          if (cached) {
            console.log('✅ Cache hit: crops data');
            return cached;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, this.API_DELAY));
        
        let crops = this.getStoredCrops();
        
        // Apply filters if provided
        if (filter) {
          crops = this.applyFilters(crops, filter);
          console.log('🔍 Filters applied:', { originalCount: this.getStoredCrops().length, filteredCount: crops.length });
        } else {
          // Cache unfiltered results
          cropTrackerCache.set(CacheKeys.crops(), crops, 2 * 60 * 1000); // 2 minutes
        }
        
        // Optimize data structure - only include essential fields for list view
        const optimizedCrops = crops.map(crop => ({
          ...crop,
          activities: crop.activities.slice(-5), // Only keep last 5 activities for performance
        }));
        
        console.log('✅ Crops retrieved successfully:', { count: optimizedCrops.length });
        return optimizedCrops;
      } catch (error) {
        console.error('❌ Error getting crops:', error);
        throw new Error('Failed to get crops');
      }
    }, { filter: !!filter });
  }

  /**
   * Get a specific crop by ID with full details
   * Also supports lookup by crop name for backward compatibility
   */
  static async getCropById(cropId: string): Promise<CropTracker | null> {
    return performanceMonitor.measure('getCropById', async () => {
      console.log('🌾 API: Getting crop by ID/name:', cropId);
      
      try {
        // Check cache first
        const cached = cropTrackerCache.get<CropTracker>(CacheKeys.crop(cropId));
        if (cached) {
          console.log('✅ Cache hit: crop data for', cropId);
          return cached;
        }
        
        await new Promise(resolve => setTimeout(resolve, this.API_DELAY));
        
        const crops = this.getStoredCrops();
        
        // First try to find by ID (preferred)
        let crop = crops.find(crop => crop.id === cropId);
        
        // If not found by ID, try to find by name (for backward compatibility)
        if (!crop) {
          const searchName = cropId.toLowerCase().replace(/\s+/g, ' ').trim();
          crop = crops.find(c => 
            c.name.toLowerCase().replace(/\s+/g, ' ').trim() === searchName ||
            c.name.toLowerCase().replace(/\s+/g, '').includes(searchName.replace(/\s+/g, ''))
          ) || null;
          
          if (crop) {
            console.log(`✅ Crop found by name fallback: "${cropId}" -> "${crop.name}" (ID: ${crop.id})`);
          }
        }
        
        if (crop) {
          // Cache the individual crop using the actual crop ID
          cropTrackerCache.set(CacheKeys.crop(crop.id), crop, 5 * 60 * 1000); // 5 minutes
          // Also cache with the search term for faster future lookups
          if (cropId !== crop.id) {
            cropTrackerCache.set(CacheKeys.crop(cropId), crop, 2 * 60 * 1000); // 2 minutes for name-based cache
          }
          console.log('✅ Crop retrieved and cached:', crop.id);
        } else {
          console.log('⚠️ Crop not found:', cropId);
        }
        
        return crop;
      } catch (error) {
        console.error('❌ Error getting crop by ID:', error);
        throw new Error('Failed to get crop');
      }
    }, { cropId });
  }

  /**
   * Add recommended crop to tracker from crop recommendation
   */
  static async addCropToTracker(cropSuggestion: CropSuggestion, additionalData?: Partial<CropTrackerInput>): Promise<CropTracker> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/crop-tracker/from-recommendation', { method: 'POST', body: JSON.stringify({ cropSuggestion, additionalData }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const crops = this.getStoredCrops();
      
      // Check if this crop variety is already being tracked
      const existingCrop = crops.find(crop => 
        crop.name.toLowerCase().includes(cropSuggestion.name.toLowerCase()) &&
        crop.variety === cropSuggestion.variety
      );
      
      if (existingCrop) {
        throw new Error('This crop variety is already being tracked');
      }
      
      // Calculate sowing and harvest dates based on current season
      const now = new Date();
      const sowingDate = additionalData?.sowingDate || now.toISOString().split('T')[0];
      
      // Calculate expected harvest date based on growth duration
      const avgGrowthDays = Math.round((cropSuggestion.growthDuration.min + cropSuggestion.growthDuration.max) / 2);
      const harvestDate = new Date(now.getTime() + (avgGrowthDays * 24 * 60 * 60 * 1000));
      const expectedHarvest = additionalData?.expectedHarvest || harvestDate.toISOString().split('T')[0];
      
      const newCrop: CropTracker = {
        id: `crop_rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: additionalData?.name || `${cropSuggestion.name} (Recommended)`,
        variety: cropSuggestion.variety,
        area: additionalData?.area || '1.0',
        location: additionalData?.location || 'Main Field',
        sowingDate,
        stage: 'Planning',
        progress: 5,
        health: 'good',
        daysFromSowing: this.calculateDaysFromSowing(sowingDate),
        expectedHarvest,
        activities: [
          {
            id: `activity_${Date.now()}_1`,
            date: sowingDate,
            activity: 'Sowing Planned',
            activityType: 'sowing',
            status: 'pending',
            description: `Plant ${cropSuggestion.variety} variety`,
            notes: `Expected yield: ${cropSuggestion.expectedYield.value} ${cropSuggestion.expectedYield.unit}, Season: ${cropSuggestion.season}`
          }
        ],
        notes: additionalData?.notes || `Added from crop recommendation. Confidence: ${cropSuggestion.confidence}%, Season: ${cropSuggestion.season}`,
        lastUpdated: new Date().toISOString(),
        userId: 'current_user' // TODO: Get from auth context
      };
      
      crops.push(newCrop);
      this.storeCrops(crops);
      
      return newCrop;
    } catch (error) {
      console.error('Error adding crop to tracker:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to add crop to tracker');
    }
  }

  /**
   * Check if a crop recommendation is already being tracked
   */
  static async isRecommendationTracked(cropSuggestion: CropSuggestion): Promise<boolean> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/check-recommendation/${cropSuggestion.id}`);
    
    try {
      const crops = this.getStoredCrops();
      
      return crops.some(crop => 
        crop.name.toLowerCase().includes(cropSuggestion.name.toLowerCase()) &&
        crop.variety === cropSuggestion.variety
      );
    } catch (error) {
      console.error('Error checking if recommendation is tracked:', error);
      return false;
    }
  }

  /**
   * Add a new crop to tracker
   */
  static async addCrop(cropInput: CropTrackerInput): Promise<CropTracker> {
    return performanceMonitor.measure('addCrop', async () => {
      console.log('🌱 API: Adding new crop...', { cropName: cropInput.name, variety: cropInput.variety });
      
      try {
        await new Promise(resolve => setTimeout(resolve, this.API_DELAY));
        
        const crops = this.getStoredCrops();
        const newCrop: CropTracker = {
          id: `crop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...cropInput,
          stage: 'Germination',
          progress: 10,
          health: 'good',
          daysFromSowing: this.calculateDaysFromSowing(cropInput.sowingDate),
          activities: [{
            id: `activity_${Date.now()}_1`,
            date: cropInput.sowingDate,
            activity: 'Crop Added to Tracker',
            activityType: 'monitoring',
            status: 'completed',
            description: `${cropInput.variety} variety planted in ${cropInput.area} area`,
            notes: cropInput.notes || 'Initial crop tracking setup'
          }],
          lastUpdated: new Date().toISOString(),
          userId: 'current_user'
        };
        
        crops.push(newCrop);
        this.storeCrops(crops);
        
        // Invalidate cache
        this.invalidateRelevantCache();
        
        console.log('✅ Crop added successfully:', newCrop.id);
        return newCrop;
      } catch (error) {
        console.error('❌ Error adding crop:', error);
        throw new Error('Failed to add crop');
      }
    }, { cropName: cropInput.name });
  }

  /**
   * Update an existing crop
   */
  static async updateCrop(cropId: string, updates: Partial<CropTrackerInput>): Promise<CropTracker> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/${cropId}`, { method: 'PUT', body: JSON.stringify(updates) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const crops = this.getStoredCrops();
      const cropIndex = crops.findIndex(crop => crop.id === cropId);
      
      if (cropIndex === -1) {
        throw new Error('Crop not found');
      }
      
      crops[cropIndex] = {
        ...crops[cropIndex],
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      
      this.storeCrops(crops);
      return crops[cropIndex];
    } catch (error) {
      console.error('Error updating crop:', error);
      throw new Error('Failed to update crop');
    }
  }

  /**
   * Delete a crop from tracker
   */
  static async deleteCrop(cropId: string): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/${cropId}`, { method: 'DELETE' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const crops = this.getStoredCrops();
      const filteredCrops = crops.filter(crop => crop.id !== cropId);
      
      this.storeCrops(filteredCrops);
    } catch (error) {
      console.error('Error deleting crop:', error);
      throw new Error('Failed to delete crop');
    }
  }

  /**
   * Remove a crop from tracker (alias for deleteCrop)
   */
  static async removeCrop(cropId: string): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/${cropId}`, { method: 'DELETE' });
    
    return this.deleteCrop(cropId);
  }

  /**
   * Log irrigation for a specific crop
   */
  static async logIrrigation(irrigationInput: IrrigationInput): Promise<IrrigationLog> {
    return performanceMonitor.measure('logIrrigation', async () => {
      console.log('💧 API: Logging irrigation...', { 
        cropId: irrigationInput.cropId, 
        waterAmount: irrigationInput.waterAmount,
        date: irrigationInput.date
      });
      
      try {
        await new Promise(resolve => setTimeout(resolve, this.API_DELAY));
        
        const irrigationLog: IrrigationLog = {
          id: `irrigation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...irrigationInput
        };
        
        // Batch operations for better performance
        const [logs, activityResult] = await Promise.all([
          // Store irrigation log
          (async () => {
            const logs = this.getStoredIrrigationLogs();
            logs.push(irrigationLog);
            this.storeIrrigationLogs(logs);
            return logs;
          })(),
          // Add as activity to the crop
          (async () => {
            const activityInput: CropActivityInput = {
              cropId: irrigationInput.cropId,
              activity: `Irrigation - ${irrigationInput.waterAmount}L`,
              activityType: 'irrigation',
              date: irrigationInput.date,
              description: `Irrigated with ${irrigationInput.waterAmount} liters${irrigationInput.method ? ` using ${irrigationInput.method}` : ''}`,
              notes: irrigationInput.notes,
              waterAmount: irrigationInput.waterAmount
            };
            return this.addActivityDirectly(activityInput); // Internal method to avoid recursion
          })()
        ]);
        
        // Invalidate relevant cache
        cropTrackerCache.invalidate(CacheKeys.irrigationLogs(irrigationInput.cropId));
        cropTrackerCache.invalidate(CacheKeys.lastIrrigation(irrigationInput.cropId));
        cropTrackerCache.invalidate(CacheKeys.crop(irrigationInput.cropId));
        cropTrackerCache.invalidate(CacheKeys.crops());
        
        console.log('✅ Irrigation logged successfully:', irrigationLog.id);
        return irrigationLog;
      } catch (error) {
        console.error('❌ Error logging irrigation:', error);
        throw new Error('Failed to log irrigation');
      }
    }, { cropId: irrigationInput.cropId, waterAmount: irrigationInput.waterAmount });
  }

  /**
   * Get irrigation logs for a specific crop
   */
  static async getIrrigationLogs(cropId: string): Promise<IrrigationLog[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/${cropId}/irrigation`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const logs = this.getStoredIrrigationLogs();
      return logs.filter(log => log.cropId === cropId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error getting irrigation logs:', error);
      throw new Error('Failed to get irrigation logs');
    }
  }

  /**
   * Get the last irrigation date for a crop
   */
  static async getLastIrrigationDate(cropId: string): Promise<string | null> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/${cropId}/last-irrigation`);
    
    try {
      const logs = await this.getIrrigationLogs(cropId);
      return logs.length > 0 ? logs[0].date : null;
    } catch (error) {
      console.error('Error getting last irrigation date:', error);
      return null;
    }
  }

  /**
   * Add activity to a crop
   */
  static async addActivity(activityInput: CropActivityInput): Promise<CropActivity> {
    return performanceMonitor.measure('addActivity', async () => {
      console.log('📝 API: Adding activity...', { 
        cropId: activityInput.cropId, 
        activity: activityInput.activity,
        type: activityInput.activityType
      });
      
      return this.addActivityDirectly(activityInput);
    }, { activityType: activityInput.activityType });
  }
  
  /**
   * Internal method to add activity without performance wrapper (to avoid nested monitoring)
   */
  private static async addActivityDirectly(activityInput: CropActivityInput): Promise<CropActivity> {
    try {
      await new Promise(resolve => setTimeout(resolve, this.API_DELAY));
      
      const crops = this.getStoredCrops();
      const cropIndex = crops.findIndex(crop => crop.id === activityInput.cropId);
      
      if (cropIndex === -1) {
        throw new Error('Crop not found');
      }
      
      const newActivity: CropActivity = {
        id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date: activityInput.date,
        activity: activityInput.activity,
        activityType: activityInput.activityType,
        status: 'completed', // Mark irrigation and manual activities as completed by default
        description: activityInput.description,
        cost: activityInput.cost,
        notes: activityInput.notes,
        waterAmount: activityInput.waterAmount,
        reminderDate: activityInput.reminderDate
      };
      
      crops[cropIndex].activities.push(newActivity);
      crops[cropIndex].lastUpdated = new Date().toISOString();
      
      this.storeCrops(crops);
      
      // Invalidate relevant cache
      this.invalidateCropCache(activityInput.cropId);
      
      console.log('✅ Activity added successfully:', newActivity.id);
      return newActivity;
    } catch (error) {
      console.error('❌ Error adding activity:', error);
      throw new Error('Failed to add activity');
    }
  }

  /**
   * Update activity status
   */
  static async updateActivityStatus(cropId: string, activityId: string, status: CropActivity['status']): Promise<CropActivity> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/crop-tracker/activities/${activityId}`, { method: 'PUT', body: JSON.stringify({ status }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const crops = this.getStoredCrops();
      const cropIndex = crops.findIndex(crop => crop.id === cropId);
      
      if (cropIndex === -1) {
        throw new Error('Crop not found');
      }
      
      const activityIndex = crops[cropIndex].activities.findIndex(activity => activity.id === activityId);
      
      if (activityIndex === -1) {
        throw new Error('Activity not found');
      }
      
      crops[cropIndex].activities[activityIndex].status = status;
      crops[cropIndex].lastUpdated = new Date().toISOString();
      
      this.storeCrops(crops);
      return crops[cropIndex].activities[activityIndex];
    } catch (error) {
      console.error('Error updating activity status:', error);
      throw new Error('Failed to update activity status');
    }
  }

  /**
   * Get crop tracker summary/statistics
   */
  static async getCropSummary(): Promise<CropTrackerSummary> {
    return performanceMonitor.measure('getCropSummary', async () => {
      console.log('📊 API: Getting crop summary...');
      
      try {
        // Check cache first
        const cached = cropTrackerCache.get<CropTrackerSummary>(CacheKeys.cropSummary());
        if (cached) {
          console.log('✅ Cache hit: crop summary');
          return cached;
        }
        
        await new Promise(resolve => setTimeout(resolve, this.API_DELAY));
        
        const crops = this.getStoredCrops();
        
        // Optimize calculations
        const summary = crops.reduce(
          (acc, crop) => {
            acc.totalCrops++;
            acc.totalArea += parseFloat(crop.area);
            
            if (crop.stage !== 'Harvested') {
              acc.activeCrops++;
            }
            
            acc.pendingActivities += crop.activities.filter(activity => activity.status === 'pending').length;
            acc.progressSum += crop.progress;
            acc.healthDistribution[crop.health]++;
            
            return acc;
          },
          {
            totalCrops: 0,
            totalArea: 0,
            activeCrops: 0,
            pendingActivities: 0,
            progressSum: 0,
            healthDistribution: { excellent: 0, good: 0, average: 0, poor: 0 }
          }
        );
        
        const currentMonth = new Date().getMonth();
        const harvestingThisMonth = crops.filter(crop => {
          const harvestDate = new Date(crop.expectedHarvest);
          return harvestDate.getMonth() === currentMonth;
        }).length;
        
        const result: CropTrackerSummary = {
          totalCrops: summary.totalCrops,
          totalArea: summary.totalArea,
          activeCrops: summary.activeCrops,
          pendingActivities: summary.pendingActivities,
          harvestingThisMonth,
          avgProgress: summary.totalCrops > 0 ? Math.round(summary.progressSum / summary.totalCrops) : 0,
          healthDistribution: summary.healthDistribution
        };
        
        // Cache the result
        cropTrackerCache.set(CacheKeys.cropSummary(), result, 3 * 60 * 1000); // 3 minutes
        
        console.log('✅ Crop summary calculated and cached:', result);
        return result;
      } catch (error) {
        console.error('❌ Error getting crop summary:', error);
        throw new Error('Failed to get crop summary');
      }
    });
  }

  // Private helper methods

  /**
   * Invalidate cache for a specific crop
   */
  private static invalidateCropCache(cropId: string): void {
    cropTrackerCache.invalidate(CacheKeys.crop(cropId));
    cropTrackerCache.invalidate(CacheKeys.crops());
    cropTrackerCache.invalidate(CacheKeys.cropSummary());
  }
  
  /**
   * Invalidate all relevant cache entries
   */
  private static invalidateRelevantCache(): void {
    cropTrackerCache.invalidate(CacheKeys.crops());
    cropTrackerCache.invalidate(CacheKeys.cropSummary());
  }

  private static getStoredCrops(): CropTracker[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : this.getMockCrops();
    } catch {
      return this.getMockCrops();
    }
  }

  private static storeCrops(crops: CropTracker[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(crops));
    } catch (error) {
      console.error('Error storing crops:', error);
    }
  }

  private static applyFilters(crops: CropTracker[], filter: CropTrackerFilter): CropTracker[] {
    let filtered = [...crops];
    
    if (filter.stage) {
      filtered = filtered.filter(crop => crop.stage === filter.stage);
    }
    
    if (filter.health) {
      filtered = filtered.filter(crop => crop.health === filter.health);
    }
    
    if (filter.location) {
      filtered = filtered.filter(crop => 
        crop.location.toLowerCase().includes(filter.location!.toLowerCase())
      );
    }
    
    if (filter.dateRange) {
      filtered = filtered.filter(crop => {
        const sowingDate = new Date(crop.sowingDate);
        const start = new Date(filter.dateRange!.start);
        const end = new Date(filter.dateRange!.end);
        return sowingDate >= start && sowingDate <= end;
      });
    }
    
    return filtered;
  }

  private static calculateDaysFromSowing(sowingDate: string): number {
    const sowing = new Date(sowingDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - sowing.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private static getStoredIrrigationLogs(): IrrigationLog[] {
    try {
      const stored = localStorage.getItem(this.IRRIGATION_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private static storeIrrigationLogs(logs: IrrigationLog[]): void {
    try {
      localStorage.setItem(this.IRRIGATION_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error('Error storing irrigation logs:', error);
    }
  }

  private static getMockCrops(): CropTracker[] {
    const now = new Date();
    return [
      {
        id: 'crop_1',
        name: 'Wheat Field A',
        variety: 'HD-2967',
        area: '2.5',
        location: 'North Field',
        sowingDate: '2024-01-15',
        stage: 'Flowering',
        progress: 75,
        health: 'excellent',
        daysFromSowing: this.calculateDaysFromSowing('2024-01-15'),
        expectedHarvest: '2024-04-20',
        activities: [
          { id: 'act_1', date: '2024-01-15', activity: 'Sowing', activityType: 'sowing', status: 'completed' },
          { id: 'act_2', date: '2024-02-10', activity: 'First Irrigation', activityType: 'irrigation', status: 'completed' },
          { id: 'act_3', date: '2024-04-01', activity: 'Second Irrigation', activityType: 'irrigation', status: 'pending' },
        ],
        lastUpdated: now.toISOString(),
        userId: 'current_user'
      },
      {
        id: 'crop_2',
        name: 'Mustard Field B',
        variety: 'Pusa Bold',
        area: '1.8',
        location: 'South Field',
        sowingDate: '2024-01-10',
        stage: 'Pod Formation',
        progress: 90,
        health: 'good',
        daysFromSowing: this.calculateDaysFromSowing('2024-01-10'),
        expectedHarvest: '2024-04-10',
        activities: [
          { id: 'act_4', date: '2024-01-10', activity: 'Sowing', activityType: 'sowing', status: 'completed' },
          { id: 'act_5', date: '2024-02-05', activity: 'First Irrigation', activityType: 'irrigation', status: 'completed' },
          { id: 'act_6', date: '2024-04-10', activity: 'Harvesting', activityType: 'harvesting', status: 'upcoming' },
        ],
        lastUpdated: now.toISOString(),
        userId: 'current_user'
      }
    ];
  }
}