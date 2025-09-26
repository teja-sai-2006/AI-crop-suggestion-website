import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  OTPVerificationRequest, 
  AuthResponse, 
  OTPResponse,
  UserData 
} from '../types/auth.types';

/**
 * Authentication Service - Handles user registration, login, and OTP verification
 * Uses localStorage for demo purposes with OTP displayed in VS Code terminal
 */
export class AuthService {
  private static readonly USERS_KEY = 'km.users.database';
  private static readonly CURRENT_USER_KEY = 'km.auth.currentUser';
  private static readonly PENDING_OTP_KEY = 'km.auth.pendingOTP';
  private static readonly USER_DATA_PREFIX = 'km.userData';

  /**
   * Generate 6-digit OTP and display in VS Code terminal
   */
  private static generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 🚨 DEMO: Display OTP in VS Code terminal for development
    // This will appear in the terminal where the dev server is running
    console.log('\n' + '='.repeat(60));
    console.log('🔐 OTP GENERATED FOR PHONE VERIFICATION');
    console.log('='.repeat(60));
    console.log(`📱 YOUR OTP CODE: ${otp}`);
    console.log('⏰ Valid for 5 minutes');
    console.log('🎯 Copy this code and enter it in the app');
    console.log('='.repeat(60) + '\n');
    
    // Also log a simpler version that's easier to copy
    console.log(`🔥 OTP: ${otp}`);
    
    return otp;
  }

  /**
   * Store OTP temporarily for verification
   */
  private static storeOTP(phoneNumber: string, otp: string, type: 'register' | 'login'): void {
    const otpData = {
      phoneNumber,
      otp,
      type,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
    };
    
    localStorage.setItem(this.PENDING_OTP_KEY, JSON.stringify(otpData));
  }

  /**
   * Get all users from localStorage
   */
  private static getUsers(): User[] {
    try {
      const users = localStorage.getItem(this.USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  /**
   * Save users to localStorage
   */
  private static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  /**
   * Find user by phone number
   */
  private static findUserByPhone(phoneNumber: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.phoneNumber === phoneNumber) || null;
  }

  /**
   * Generate unique user ID
   */
  private static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize empty user data structure
   */
  private static initializeUserData(userId: string): void {
    const emptyUserData: UserData = {
      // Chat related data
      chatSessions: [],
      chatSettings: {
        language: 'en',
        voiceEnabled: true,
        autoSuggestions: true,
        responseDelay: 1000,
        maxHistoryDays: 30
      },
      chatAnalytics: {
        totalMessages: 0,
        sessionsToday: 0,
        topTopics: [],
        averageSessionLength: 0,
        preferredLanguages: ['en']
      },
      
      // Farming related data  
      cropRecommendations: [],
      cropTracker: [],
      farmRecords: [],
      diseaseDetections: [],
      marketPrices: [],
      expertConsultations: [],
      
      // App settings
      appSettings: {
        theme: 'light',
        notifications: true,
        dataSync: true
      },
      locationData: {
        defaultLocation: null,
        favoriteLocations: []
      },
      weatherPreferences: {
        units: 'metric',
        alertsEnabled: true
      }
    };

    const userDataKey = `${this.USER_DATA_PREFIX}.${userId}`;
    localStorage.setItem(userDataKey, JSON.stringify(emptyUserData));
  }

  /**
   * Initiate user registration process
   */
  static async initiateRegistration(request: RegisterRequest): Promise<AuthResponse> {
    try {
      // Validate phone number format
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
      if (!phoneRegex.test(request.phoneNumber)) {
        return { success: false, message: 'Invalid phone number format' };
      }

      // Check if user already exists
      const existingUser = this.findUserByPhone(request.phoneNumber);
      if (existingUser) {
        return { success: false, message: 'User already registered with this phone number' };
      }

      // Generate and store OTP
      const otp = this.generateOTP();
      this.storeOTP(request.phoneNumber, otp, 'register');

      // Store pending user data temporarily
      localStorage.setItem('km.auth.pendingUserData', JSON.stringify(request));

      return { 
        success: true, 
        message: 'OTP sent successfully. Please check the VS Code terminal for your verification code.',
        requiresOTP: true 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

  /**
   * Initiate user login process
   */
  static async initiateLogin(request: LoginRequest): Promise<AuthResponse> {
    try {
      // Check if user exists
      const existingUser = this.findUserByPhone(request.phoneNumber);
      if (!existingUser) {
        return { success: false, message: 'This phone number is not registered. Please create a new account first.' };
      }

      // Generate and store OTP
      const otp = this.generateOTP();
      this.storeOTP(request.phoneNumber, otp, 'login');

      return { 
        success: true, 
        message: 'OTP sent successfully. Please check the VS Code terminal for your verification code.',
        requiresOTP: true 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  /**
   * Verify OTP and complete authentication
   */
  static async verifyOTP(request: OTPVerificationRequest): Promise<AuthResponse> {
    try {
      // Get pending OTP
      const otpData = localStorage.getItem(this.PENDING_OTP_KEY);
      if (!otpData) {
        return { success: false, message: 'No pending OTP found. Please request a new one.' };
      }

      const parsedOTP = JSON.parse(otpData);
      
      // Check if OTP has expired
      const expiresAt = new Date(parsedOTP.expiresAt);
      const now = new Date();
      if (now > expiresAt) {
        localStorage.removeItem(this.PENDING_OTP_KEY);
        return { success: false, message: 'OTP has expired. Please request a new one.' };
      }

      // Verify OTP
      if (parsedOTP.otp !== request.otp || parsedOTP.phoneNumber !== request.phoneNumber) {
        return { success: false, message: 'Invalid OTP. Please try again.' };
      }

      // Remove used OTP
      localStorage.removeItem(this.PENDING_OTP_KEY);

      if (parsedOTP.type === 'register') {
        // Complete registration
        const pendingUserData = localStorage.getItem('km.auth.pendingUserData');
        if (!pendingUserData) {
          return { success: false, message: 'Registration data not found. Please try again.' };
        }

        const userData = JSON.parse(pendingUserData);
        const userId = this.generateUserId();
        
        const newUser: User = {
          id: userId,
          phoneNumber: userData.phoneNumber,
          name: userData.name,
          isVerified: true,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };

        // Save user to database
        const users = this.getUsers();
        users.push(newUser);
        this.saveUsers(users);

        // Initialize user data
        this.initializeUserData(userId);

        // Set current user
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));

        // Clean up temporary data
        localStorage.removeItem('km.auth.pendingUserData');

        return { 
          success: true, 
          message: 'Registration completed successfully!',
          user: newUser 
        };
      } else {
        // Complete login
        const user = this.findUserByPhone(request.phoneNumber);
        if (!user) {
          return { success: false, message: 'User not found.' };
        }

        // Update last login
        user.lastLoginAt = new Date().toISOString();
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = user;
          this.saveUsers(users);
        }

        // Set current user
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

        return { 
          success: true, 
          message: 'Login successful!',
          user 
        };
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, message: 'OTP verification failed. Please try again.' };
    }
  }

  /**
   * Get current authenticated user
   */
  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(this.CURRENT_USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.PENDING_OTP_KEY);
    localStorage.removeItem('km.auth.pendingUserData');
  }

  /**
   * Get user-specific data
   */
  static getUserData(userId: string): UserData | null {
    try {
      const userDataKey = `${this.USER_DATA_PREFIX}.${userId}`;
      const data = localStorage.getItem(userDataKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Save user-specific data
   */
  static saveUserData(userId: string, data: UserData): void {
    try {
      const userDataKey = `${this.USER_DATA_PREFIX}.${userId}`;
      localStorage.setItem(userDataKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  /**
   * Check if user has valid session
   */
  static hasValidSession(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.isVerified;
  }

  /**
   * Resend OTP for pending verification
   */
  static async resendOTP(phoneNumber: string): Promise<OTPResponse> {
    try {
      // Check if there's a pending operation
      const otpData = localStorage.getItem(this.PENDING_OTP_KEY);
      if (!otpData) {
        return { 
          success: false, 
          message: 'No pending verification found.',
          otp: '',
          expiresAt: ''
        };
      }

      const parsedOTP = JSON.parse(otpData);
      if (parsedOTP.phoneNumber !== phoneNumber) {
        return { 
          success: false, 
          message: 'Phone number mismatch.',
          otp: '',
          expiresAt: ''
        };
      }

      // Generate new OTP
      const newOtp = this.generateOTP();
      this.storeOTP(phoneNumber, newOtp, parsedOTP.type);

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

      return { 
        success: true, 
        message: 'New OTP sent successfully. Check the VS Code terminal for your verification code.',
        otp: newOtp,
        expiresAt
      };
    } catch (error) {
      console.error('Resend OTP error:', error);
      return { 
        success: false, 
        message: 'Failed to resend OTP. Please try again.',
        otp: '',
        expiresAt: ''
      };
    }
  }
}