/**
 * Mock Farm Records Data
 * Frontend-first implementation for KM farming assistant
 */

import { FarmRecord, FarmActivity, FarmExpense, FarmYield } from '../types/farmRecords.types';

export const mockFarmActivities: FarmActivity[] = [
  {
    id: 'activity_001',
    type: 'activity',
    title: 'Rice Field Planting',
    description: 'Planted rice seedlings in the main field',
    date: '2024-01-15',
    activityType: 'planting',
    duration: 8,
    laborCount: 4,
    equipmentUsed: ['tractor', 'planting_machine'],
    cropType: 'rice',
    fieldLocation: 'Main Field A',
    notes: 'Weather conditions were favorable',
    createdAt: '2024-01-15T08:00:00.000Z',
    updatedAt: '2024-01-15T08:00:00.000Z'
  },
  {
    id: 'activity_002',
    type: 'activity',
    title: 'Wheat Field Irrigation',
    description: 'Irrigated wheat fields using sprinkler system',
    date: '2024-01-20',
    activityType: 'irrigation',
    duration: 3,
    laborCount: 2,
    equipmentUsed: ['sprinkler_system', 'water_pump'],
    cropType: 'wheat',
    fieldLocation: 'Field B',
    notes: 'Soil moisture was at 40% before irrigation',
    createdAt: '2024-01-20T06:00:00.000Z',
    updatedAt: '2024-01-20T06:00:00.000Z'
  },
  {
    id: 'activity_003',
    type: 'activity',
    title: 'Tomato Field Weeding',
    description: 'Manual weeding of tomato plants',
    date: '2024-01-25',
    activityType: 'weeding',
    duration: 6,
    laborCount: 3,
    equipmentUsed: ['hand_tools'],
    cropType: 'tomato',
    fieldLocation: 'Greenhouse 1',
    notes: 'Removed grass weeds and applied mulch',
    createdAt: '2024-01-25T07:00:00.000Z',
    updatedAt: '2024-01-25T07:00:00.000Z'
  }
];

export const mockFarmExpenses: FarmExpense[] = [
  {
    id: 'expense_001',
    type: 'expense',
    title: 'Rice Seeds Purchase',
    description: 'High-yield rice seeds for main season',
    date: '2024-01-10',
    amount: 15000,
    expenseCategory: 'seeds',
    vendor: 'Agricultural Seeds Co.',
    paymentMethod: 'bank_transfer',
    cropType: 'rice',
    quantity: 50,
    unit: 'kg',
    notes: 'Premium variety seeds with 95% germination rate',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z'
  },
  {
    id: 'expense_002',
    type: 'expense',
    title: 'NPK Fertilizer',
    description: 'Nitrogen-Phosphorus-Potassium fertilizer',
    date: '2024-01-18',
    amount: 8500,
    expenseCategory: 'fertilizer',
    vendor: 'FarmFertilizers Ltd.',
    paymentMethod: 'cash',
    quantity: 100,
    unit: 'kg',
    notes: '10-26-26 NPK ratio for wheat crop',
    createdAt: '2024-01-18T09:00:00.000Z',
    updatedAt: '2024-01-18T09:00:00.000Z'
  },
  {
    id: 'expense_003',
    type: 'expense',
    title: 'Diesel Fuel',
    description: 'Fuel for tractor and irrigation pump',
    date: '2024-01-22',
    amount: 3200,
    expenseCategory: 'fuel',
    vendor: 'Local Fuel Station',
    paymentMethod: 'card',
    quantity: 80,
    unit: 'liters',
    notes: 'Fuel for January operations',
    createdAt: '2024-01-22T14:00:00.000Z',
    updatedAt: '2024-01-22T14:00:00.000Z'
  },
  {
    id: 'expense_004',
    type: 'expense',
    title: 'Labor Wages',
    description: 'Monthly wages for farm workers',
    date: '2024-01-31',
    amount: 25000,
    expenseCategory: 'labor',
    paymentMethod: 'cash',
    notes: 'Wages for 5 workers for January',
    createdAt: '2024-01-31T18:00:00.000Z',
    updatedAt: '2024-01-31T18:00:00.000Z'
  }
];

export const mockFarmYields: FarmYield[] = [
  {
    id: 'yield_001',
    type: 'yield',
    title: 'Tomato Harvest - Batch 1',
    description: 'First harvest of tomatoes from greenhouse',
    date: '2024-01-28',
    cropType: 'tomato',
    quantity: 500,
    unit: 'kg',
    quality: 'premium',
    marketPrice: 40,
    totalValue: 20000,
    storageLocation: 'Cold Storage A',
    harvestDate: '2024-01-28',
    fieldLocation: 'Greenhouse 1',
    notes: 'Excellent quality tomatoes, good market demand',
    createdAt: '2024-01-28T16:00:00.000Z',
    updatedAt: '2024-01-28T16:00:00.000Z'
  },
  {
    id: 'yield_002',
    type: 'yield',
    title: 'Wheat Harvest - Field B',
    description: 'Main wheat harvest from winter crop',
    date: '2024-02-15',
    cropType: 'wheat',
    quantity: 2500,
    unit: 'kg',
    quality: 'standard',
    marketPrice: 25,
    totalValue: 62500,
    storageLocation: 'Grain Storage',
    harvestDate: '2024-02-15',
    fieldLocation: 'Field B',
    notes: 'Good yield despite late rains',
    createdAt: '2024-02-15T12:00:00.000Z',
    updatedAt: '2024-02-15T12:00:00.000Z'
  }
];

// Combined mock data for general use
export const mockFarmRecords: FarmRecord[] = [
  ...mockFarmActivities,
  ...mockFarmExpenses,
  ...mockFarmYields
];

// Mock categories for filtering
export const mockActivityTypes = [
  'planting',
  'irrigation',
  'fertilizing',
  'pesticide',
  'harvesting',
  'weeding',
  'other'
];

export const mockExpenseCategories = [
  'seeds',
  'fertilizer',
  'pesticide',
  'equipment',
  'labor',
  'fuel',
  'maintenance',
  'other'
];

export const mockCropTypes = [
  'rice',
  'wheat',
  'tomato',
  'corn',
  'cotton',
  'sugarcane',
  'potato',
  'onion',
  'banana',
  'mango'
];

export const mockUnits = [
  'kg',
  'tons',
  'liters',
  'pieces',
  'bags',
  'acres',
  'hours'
];

// Helper function to generate mock record ID
export const generateMockRecordId = (type: string): string => {
  return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to get mock data by type
export const getMockRecordsByType = (type: 'activity' | 'expense' | 'yield'): FarmRecord[] => {
  switch (type) {
    case 'activity':
      return mockFarmActivities;
    case 'expense':
      return mockFarmExpenses;
    case 'yield':
      return mockFarmYields;
    default:
      return mockFarmRecords;
  }
};