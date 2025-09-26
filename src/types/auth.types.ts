/**
 * Authentication Type Definitions
 * Complete user authentication system with phone number + OTP
 */

export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  createdAt: string;
  lastLoginAt: string;
  isVerified: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  phoneNumber: string;
}

export interface RegisterRequest {
  phoneNumber: string;
  name: string;
}

export interface OTPVerificationRequest {
  phoneNumber: string;
  otp: string;
  type: 'register' | 'login';
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message: string;
  requiresOTP?: boolean;
}

export interface OTPResponse {
  success: boolean;
  otp: string; // For demo purposes - would not be returned in production
  message: string;
  expiresAt: string;
}

export interface UserData {
  // Chat related data
  chatSessions: any[];
  chatSettings: any;
  chatAnalytics: any;
  
  // Farming related data  
  cropRecommendations: any[];
  cropTracker: any[];
  farmRecords: any[];
  diseaseDetections: any[];
  marketPrices: any[];
  expertConsultations: any[];
  
  // App settings
  appSettings: any;
  locationData: any;
  weatherPreferences: any;
}