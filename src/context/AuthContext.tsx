import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, LoginRequest, RegisterRequest, OTPVerificationRequest, AuthResponse } from '../types/auth.types';
import { AuthService } from '../services/auth.service';

// Initial state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload, 
        isLoading: false, 
        error: null 
      };
    case 'AUTH_ERROR':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        isLoading: false, 
        error: action.payload 
      };
    case 'AUTH_LOGOUT':
      return { 
        ...initialAuthState, 
        isLoading: false 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Context type
interface AuthContextType {
  state: AuthState;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (request: LoginRequest) => Promise<AuthResponse>;
  register: (request: RegisterRequest) => Promise<AuthResponse>;
  verifyOTP: (request: OTPVerificationRequest) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
  getCurrentUser: () => User | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Check for existing session on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch({ type: 'AUTH_START' });
      
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          dispatch({ type: 'AUTH_SUCCESS', payload: currentUser });
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: '' });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: '' });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (request: LoginRequest): Promise<AuthResponse> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await AuthService.initiateLogin(request);
      
      if (response.success && !response.requiresOTP) {
        // Direct login success (shouldn't happen with OTP system, but handling)
        dispatch({ type: 'AUTH_SUCCESS', payload: response.user! });
      } else {
        // OTP required - don't change auth state yet
        dispatch({ type: 'CLEAR_ERROR' });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const register = async (request: RegisterRequest): Promise<AuthResponse> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await AuthService.initiateRegistration(request);
      
      if (response.success) {
        // Registration initiated, OTP sent - don't change auth state yet
        dispatch({ type: 'CLEAR_ERROR' });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.message });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const verifyOTP = async (request: OTPVerificationRequest): Promise<AuthResponse> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await AuthService.verifyOTP(request);
      
      if (response.success && response.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.message });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'OTP verification failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    AuthService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getCurrentUser = (): User | null => {
    return state.user;
  };

  const contextValue: AuthContextType = {
    state,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    verifyOTP,
    logout,
    clearError,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;