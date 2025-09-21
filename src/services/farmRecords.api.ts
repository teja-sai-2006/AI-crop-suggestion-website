/**
 * Farm Records API Service
 * Frontend-first implementation for KM farming assistant
 */

import { 
  FarmRecord, 
  FarmActivity, 
  FarmExpense, 
  FarmYield,
  FarmRecordsFilter,
  FarmRecordsSummary,
  FarmRecordsAnalytics
} from '../types/farmRecords.types';
import { mockFarmRecords, generateMockRecordId } from '../data/mockFarmRecords';

export class FarmRecordsAPIService {
  private static readonly RECORDS_KEY = 'km_farm_records';
  private static readonly ANALYTICS_KEY = 'km_farm_records_analytics';

  /**
   * Add a new farm record
   */
  static async addRecord(record: Omit<FarmRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<FarmRecord> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch('/api/farm-records', { method: 'POST', body: JSON.stringify(record) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newRecord: FarmRecord = {
        ...record,
        id: generateMockRecordId(record.type),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage
      const records = await this.getRecords();
      records.unshift(newRecord);
      localStorage.setItem(this.RECORDS_KEY, JSON.stringify(records.slice(0, 1000))); // Keep last 1000 records
      
      // Update analytics
      this.updateAnalytics('record_added', newRecord);
      
      return newRecord;
    } catch (error) {
      console.error('Error adding farm record:', error);
      throw new Error('Failed to add farm record');
    }
  }

  /**
   * Get all farm records with optional filtering
   */
  static async getRecords(filter?: FarmRecordsFilter): Promise<FarmRecord[]> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/farm-records?${new URLSearchParams(filter)}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      let records = this.getStoredRecords();
      
      // Apply filters if provided
      if (filter) {
        records = this.applyFilters(records, filter);
      }
      
      // Sort by date (newest first)
      records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      return records;
    } catch (error) {
      console.error('Error getting farm records:', error);
      throw new Error('Failed to get farm records');
    }
  }

  /**
   * Get a single farm record by ID
   */
  static async getRecord(id: string): Promise<FarmRecord | null> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/farm-records/${id}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const records = this.getStoredRecords();
      return records.find(record => record.id === id) || null;
    } catch (error) {
      console.error('Error getting farm record:', error);
      return null;
    }
  }

  /**
   * Update an existing farm record
   */
  static async updateRecord(id: string, updates: Partial<FarmRecord>): Promise<FarmRecord | null> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/farm-records/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const records = this.getStoredRecords();
      const recordIndex = records.findIndex(record => record.id === id);
      
      if (recordIndex >= 0) {
        const updatedRecord = {
          ...records[recordIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        records[recordIndex] = updatedRecord;
        localStorage.setItem(this.RECORDS_KEY, JSON.stringify(records));
        
        // Update analytics
        this.updateAnalytics('record_updated', updatedRecord);
        
        return updatedRecord;
      }
      
      return null;
    } catch (error) {
      console.error('Error updating farm record:', error);
      throw new Error('Failed to update farm record');
    }
  }

  /**
   * Delete a farm record
   */
  static async deleteRecord(id: string): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch(`/api/farm-records/${id}`, { method: 'DELETE' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const records = this.getStoredRecords();
      const updatedRecords = records.filter(record => record.id !== id);
      localStorage.setItem(this.RECORDS_KEY, JSON.stringify(updatedRecords));
      
      // Update analytics
      this.updateAnalytics('record_deleted');
    } catch (error) {
      console.error('Error deleting farm record:', error);
      throw new Error('Failed to delete farm record');
    }
  }

  /**
   * Delete multiple farm records
   */
  static async deleteMultipleRecords(ids: string[]): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/farm-records/batch-delete', { method: 'DELETE', body: JSON.stringify({ ids }) });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const records = this.getStoredRecords();
      const updatedRecords = records.filter(record => !ids.includes(record.id));
      localStorage.setItem(this.RECORDS_KEY, JSON.stringify(updatedRecords));
      
      // Update analytics
      this.updateAnalytics('records_deleted', null, ids.length);
    } catch (error) {
      console.error('Error deleting multiple farm records:', error);
      throw new Error('Failed to delete multiple farm records');
    }
  }

  /**
   * Get farm records summary and analytics
   */
  static async getRecordsSummary(startDate?: string, endDate?: string): Promise<FarmRecordsSummary> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/farm-records/summary?startDate=${startDate}&endDate=${endDate}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const records = this.getStoredRecords();
      const filteredRecords = this.filterByDateRange(records, startDate, endDate);
      
      const activities = filteredRecords.filter(r => r.type === 'activity');
      const expenses = filteredRecords.filter(r => r.type === 'expense') as FarmExpense[];
      const yields = filteredRecords.filter(r => r.type === 'yield') as FarmYield[];
      
      const totalExpenseAmount = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
      const totalYieldValue = yields.reduce((sum, yld) => sum + (yld.totalValue || 0), 0);
      
      // Calculate top crops by value
      const cropValues: Record<string, number> = {};
      yields.forEach(yld => {
        if (yld.cropType && yld.totalValue) {
          cropValues[yld.cropType] = (cropValues[yld.cropType] || 0) + yld.totalValue;
        }
      });
      
      const topCrops = Object.entries(cropValues)
        .map(([crop, value]) => ({
          crop,
          quantity: yields.filter(y => y.cropType === crop).reduce((sum, y) => sum + (y.quantity || 0), 0),
          value
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      
      // Calculate monthly expenses
      const monthlyExpenses = this.calculateMonthlyTrends(expenses, 'amount');
      
      return {
        totalActivities: activities.length,
        totalExpenses: expenses.length,
        totalYields: yields.length,
        totalExpenseAmount,
        totalYieldValue,
        netProfit: totalYieldValue - totalExpenseAmount,
        topCrops,
        monthlyExpenses,
        recentRecords: filteredRecords.slice(0, 10)
      };
    } catch (error) {
      console.error('Error getting farm records summary:', error);
      throw new Error('Failed to get farm records summary');
    }
  }

  /**
   * Get detailed analytics for farm records
   */
  static async getAnalytics(startDate?: string, endDate?: string): Promise<FarmRecordsAnalytics> {
    // TODO: Replace with real backend API call
    // Example: const response = await fetch(`/api/farm-records/analytics?startDate=${startDate}&endDate=${endDate}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const records = this.getStoredRecords();
      const filteredRecords = this.filterByDateRange(records, startDate, endDate);
      
      const activities = filteredRecords.filter(r => r.type === 'activity') as FarmActivity[];
      const expenses = filteredRecords.filter(r => r.type === 'expense') as FarmExpense[];
      const yields = filteredRecords.filter(r => r.type === 'yield') as FarmYield[];
      
      // Calculate expenses by category
      const expensesByCategory: Record<string, number> = {};
      expenses.forEach(exp => {
        const category = exp.expenseCategory || 'other';
        expensesByCategory[category] = (expensesByCategory[category] || 0) + (exp.amount || 0);
      });
      
      // Calculate yields by crop
      const yieldsByCrop: Record<string, number> = {};
      yields.forEach(yld => {
        const crop = yld.cropType || 'unknown';
        yieldsByCrop[crop] = (yieldsByCrop[crop] || 0) + (yld.quantity || 0);
      });
      
      // Calculate activities by type
      const activitiesByType: Record<string, number> = {};
      activities.forEach(act => {
        const type = act.activityType || 'other';
        activitiesByType[type] = (activitiesByType[type] || 0) + 1;
      });
      
      // Calculate average yield per crop
      const averageYieldPerCrop: Record<string, number> = {};
      Object.keys(yieldsByCrop).forEach(crop => {
        const cropYields = yields.filter(y => y.cropType === crop);
        averageYieldPerCrop[crop] = cropYields.length > 0 
          ? yieldsByCrop[crop] / cropYields.length 
          : 0;
      });
      
      // Calculate labor efficiency
      const totalHours = activities.reduce((sum, act) => sum + (act.duration || 0), 0);
      const laborCosts = expenses.filter(exp => exp.expenseCategory === 'labor')
        .reduce((sum, exp) => sum + (exp.amount || 0), 0);
      
      return {
        expensesByCategory,
        yieldsByCrop,
        activitiesByType,
        monthlyTrends: this.calculateMonthlyAnalytics(filteredRecords),
        averageYieldPerCrop,
        laborEfficiency: {
          totalHours,
          averageHoursPerActivity: activities.length > 0 ? totalHours / activities.length : 0,
          costPerHour: totalHours > 0 ? laborCosts / totalHours : 0
        }
      };
    } catch (error) {
      console.error('Error getting farm records analytics:', error);
      throw new Error('Failed to get farm records analytics');
    }
  }

  /**
   * Clear all farm records data
   */
  static async clearAllData(): Promise<void> {
    // TODO: Replace with real backend API call
    // Example: await fetch('/api/farm-records/clear-all', { method: 'DELETE' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem(this.RECORDS_KEY);
      localStorage.removeItem(this.ANALYTICS_KEY);
    } catch (error) {
      console.error('Error clearing farm records data:', error);
      throw new Error('Failed to clear farm records data');
    }
  }

  // Private helper methods

  private static getStoredRecords(): FarmRecord[] {
    try {
      const stored = localStorage.getItem(this.RECORDS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Initialize with mock data if no stored data
      localStorage.setItem(this.RECORDS_KEY, JSON.stringify(mockFarmRecords));
      return [...mockFarmRecords];
    } catch (error) {
      console.warn('Failed to get stored records, using mock data:', error);
      return [...mockFarmRecords];
    }
  }

  private static applyFilters(records: FarmRecord[], filter: FarmRecordsFilter): FarmRecord[] {
    return records.filter(record => {
      // Filter by type
      if (filter.type && record.type !== filter.type) {
        return false;
      }
      
      // Filter by date range
      if (filter.startDate && record.date < filter.startDate) {
        return false;
      }
      if (filter.endDate && record.date > filter.endDate) {
        return false;
      }
      
      // Filter by crop type
      if (filter.cropType && record.cropType !== filter.cropType) {
        return false;
      }
      
      // Filter by category (for activities and expenses)
      if (filter.category) {
        const activity = record as FarmActivity;
        const expense = record as FarmExpense;
        if (record.type === 'activity' && activity.activityType !== filter.category) {
          return false;
        }
        if (record.type === 'expense' && expense.expenseCategory !== filter.category) {
          return false;
        }
      }
      
      // Filter by amount range (for expenses and yields)
      if (filter.minAmount !== undefined) {
        const amount = (record as FarmExpense).amount || (record as FarmYield).totalValue || 0;
        if (amount < filter.minAmount) {
          return false;
        }
      }
      if (filter.maxAmount !== undefined) {
        const amount = (record as FarmExpense).amount || (record as FarmYield).totalValue || 0;
        if (amount > filter.maxAmount) {
          return false;
        }
      }
      
      return true;
    });
  }

  private static filterByDateRange(records: FarmRecord[], startDate?: string, endDate?: string): FarmRecord[] {
    return records.filter(record => {
      if (startDate && record.date < startDate) return false;
      if (endDate && record.date > endDate) return false;
      return true;
    });
  }

  private static calculateMonthlyTrends(records: FarmRecord[], field: keyof FarmRecord): Array<{ month: string; amount: number }> {
    const monthlyData: Record<string, number> = {};
    
    records.forEach(record => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const value = (record as any)[field] || 0;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + value;
    });
    
    return Object.entries(monthlyData)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  private static calculateMonthlyAnalytics(records: FarmRecord[]): Array<{
    month: string;
    expenses: number;
    yields: number;
    activities: number;
  }> {
    const monthlyData: Record<string, { expenses: number; yields: number; activities: number }> = {};
    
    records.forEach(record => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { expenses: 0, yields: 0, activities: 0 };
      }
      
      if (record.type === 'expense') {
        monthlyData[monthKey].expenses += (record as FarmExpense).amount || 0;
      } else if (record.type === 'yield') {
        monthlyData[monthKey].yields += (record as FarmYield).totalValue || 0;
      } else if (record.type === 'activity') {
        monthlyData[monthKey].activities += 1;
      }
    });
    
    return Object.entries(monthlyData)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  private static updateAnalytics(action: string, record?: FarmRecord, count?: number): void {
    try {
      const analytics = JSON.parse(localStorage.getItem(this.ANALYTICS_KEY) || '{}');
      
      // Update counters
      if (action === 'record_added') {
        analytics.totalRecords = (analytics.totalRecords || 0) + 1;
        analytics.recordsToday = (analytics.recordsToday || 0) + 1;
      } else if (action === 'record_deleted') {
        analytics.totalRecords = Math.max(0, (analytics.totalRecords || 0) - 1);
      } else if (action === 'records_deleted' && count) {
        analytics.totalRecords = Math.max(0, (analytics.totalRecords || 0) - count);
      }
      
      // Update last action
      analytics.lastAction = {
        type: action,
        timestamp: new Date().toISOString(),
        recordType: record?.type
      };
      
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(analytics));
    } catch (error) {
      console.warn('Failed to update analytics:', error);
    }
  }
}