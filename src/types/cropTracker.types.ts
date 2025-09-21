/**
 * Crop Tracker Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface CropTracker {
  id: string;
  name: string;
  variety: string;
  area: string;
  location: string;
  sowingDate: string;
  stage: string;
  progress: number;
  health: 'excellent' | 'good' | 'average' | 'poor';
  daysFromSowing: number;
  expectedHarvest: string;
  activities: CropActivity[];
  notes?: string;
  lastUpdated: string;
  userId: string;
}

export interface CropActivity {
  id: string;
  date: string;
  activity: string;
  activityType: 'irrigation' | 'fertilizing' | 'pesticide' | 'pruning' | 'weeding' | 'harvesting' | 'sowing' | 'monitoring' | 'other';
  status: 'completed' | 'pending' | 'upcoming' | 'cancelled';
  description?: string;
  cost?: number;
  notes?: string;
  waterAmount?: number; // For irrigation activities (in liters)
  reminderDate?: string; // For scheduling reminders
}

export interface CropTrackerSummary {
  totalCrops: number;
  totalArea: number;
  activeCrops: number;
  pendingActivities: number;
  harvestingThisMonth: number;
  avgProgress: number;
  healthDistribution: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

export interface CropTrackerInput {
  name: string;
  variety: string;
  area: string;
  location: string;
  sowingDate: string;
  expectedHarvest: string;
  notes?: string;
}

export interface CropActivityInput {
  cropId: string;
  activity: string;
  activityType: 'irrigation' | 'fertilizing' | 'pesticide' | 'pruning' | 'weeding' | 'harvesting' | 'sowing' | 'monitoring' | 'other';
  date: string;
  description?: string;
  cost?: number;
  notes?: string;
  waterAmount?: number; // For irrigation activities (in liters)
  reminderDate?: string; // For scheduling reminders
}

export interface IrrigationLog {
  id: string;
  cropId: string;
  date: string;
  waterAmount: number; // in liters
  method?: 'sprinkler' | 'drip' | 'flood' | 'manual' | 'other';
  duration?: number; // in minutes
  notes?: string;
  weather?: string; // Weather conditions during irrigation
}

export interface IrrigationInput {
  cropId: string;
  date: string;
  waterAmount: number;
  method?: 'sprinkler' | 'drip' | 'flood' | 'manual' | 'other';
  duration?: number;
  notes?: string;
  weather?: string;
}

export interface CropTrackerFilter {
  stage?: string;
  health?: CropTracker['health'];
  location?: string;
  activityType?: CropActivity['activityType'];
  status?: CropActivity['status'];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface CropTrackerError {
  code: string;
  message: string;
  details?: any;
}