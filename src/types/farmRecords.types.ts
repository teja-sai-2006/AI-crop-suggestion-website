/**
 * Farm Records Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface FarmRecord {
  id: string;
  type: 'activity' | 'expense' | 'yield';
  title: string;
  description?: string;
  date: string;
  amount?: number; // For expenses and yield value
  quantity?: number; // For yield quantity
  unit?: string; // kg, tons, liters, etc.
  category?: string;
  cropType?: string;
  fieldLocation?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FarmActivity extends FarmRecord {
  type: 'activity';
  activityType: 'planting' | 'irrigation' | 'fertilizing' | 'pesticide' | 'harvesting' | 'weeding' | 'other';
  duration?: number; // in hours
  laborCount?: number;
  equipmentUsed?: string[];
}

export interface FarmExpense extends FarmRecord {
  type: 'expense';
  expenseCategory: 'seeds' | 'fertilizer' | 'pesticide' | 'equipment' | 'labor' | 'fuel' | 'maintenance' | 'other';
  amount: number;
  vendor?: string;
  paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'credit';
  receipt?: string; // file path or URL
}

export interface FarmYield extends FarmRecord {
  type: 'yield';
  cropType: string;
  quantity: number;
  unit: string;
  quality?: 'premium' | 'standard' | 'below_standard';
  marketPrice?: number;
  totalValue?: number;
  storageLocation?: string;
  harvestDate: string;
}

export interface FarmRecordsFilter {
  type?: 'activity' | 'expense' | 'yield';
  startDate?: string;
  endDate?: string;
  cropType?: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface FarmRecordsSummary {
  totalActivities: number;
  totalExpenses: number;
  totalYields: number;
  totalExpenseAmount: number;
  totalYieldValue: number;
  netProfit: number;
  topCrops: Array<{
    crop: string;
    quantity: number;
    value: number;
  }>;
  monthlyExpenses: Array<{
    month: string;
    amount: number;
  }>;
  recentRecords: FarmRecord[];
}

export interface FarmRecordsAnalytics {
  expensesByCategory: Record<string, number>;
  yieldsByCrop: Record<string, number>;
  activitiesByType: Record<string, number>;
  monthlyTrends: Array<{
    month: string;
    expenses: number;
    yields: number;
    activities: number;
  }>;
  averageYieldPerCrop: Record<string, number>;
  laborEfficiency: {
    totalHours: number;
    averageHoursPerActivity: number;
    costPerHour: number;
  };
}