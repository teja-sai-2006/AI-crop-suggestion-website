import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Phone, User, Lock, CheckCircle, Eye, Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onAuthSuccess?: () => void;
}

// Demo component to display current OTP from localStorage
const DemoOTPDisplay: React.FC = () => {
  const [currentOTP, setCurrentOTP] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkForOTP = () => {
      try {
        const otpData = localStorage.getItem('km.auth.pendingOTP');
        if (otpData) {
          const parsed = JSON.parse(otpData);
          const expiresAt = new Date(parsed.expiresAt);
          const now = new Date();
          
          if (now < expiresAt) {
            setCurrentOTP(parsed.otp);
          } else {
            setCurrentOTP('');
          }
        }
      } catch (error) {
        console.error('Error reading OTP:', error);
      }
    };

    checkForOTP();
    const interval = setInterval(checkForOTP, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyOTP = () => {
    if (currentOTP) {
      navigator.clipboard.writeText(currentOTP);
    }
  };

  if (!currentOTP) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-green-800">🎯 DEMO MODE - Your OTP:</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          className="h-6 px-2"
        >
          <Eye className="h-3 w-3" />
        </Button>
      </div>
      {isVisible && (
        <div className="flex items-center justify-between bg-white rounded p-2 border">
          <span className="font-mono text-lg font-bold text-green-700 tracking-widest">
            {currentOTP}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyOTP}
            className="h-6 px-2"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      )}
      <p className="text-xs text-green-600">
        Click the eye icon to reveal, then copy the code above
      </p>
    </div>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess }) => {
  const { login, register, verifyOTP, state, clearError } = useAuth();
  
  // Form states
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    name: '',
    otp: ''
  });
  
  // UI states
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Clear error when switching tabs only (not steps)
  useEffect(() => {
    setSuccessMessage('');
    setErrorMessage('');
  }, [activeTab]);

  // Handle successful auth
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      setSuccessMessage(`Welcome ${state.user.name}! Redirecting...`);
      setTimeout(() => {
        onAuthSuccess?.();
      }, 1500);
    }
  }, [state.isAuthenticated, state.user, onAuthSuccess]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear local error messages when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters and check length
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrorMessage('Please enter a valid phone number (10-15 digits)');
      return;
    }

    if (activeTab === 'register' && !formData.name.trim()) {
      setErrorMessage('Name is required for registration');
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // Clear previous errors
    
    try {
      let response;
      
      if (activeTab === 'register') {
        response = await register({
          phoneNumber: formData.phoneNumber,
          name: formData.name.trim()
        });
      } else {
        response = await login({
          phoneNumber: formData.phoneNumber
        });
      }
      
      if (response.success) {
        setSuccessMessage(response.message);
        setStep('otp');
        setOtpSent(true);
      } else {
        // Show error message for better user feedback
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.otp.length !== 6) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await verifyOTP({
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
        type: activeTab
      });
      
      if (response.success) {
        setSuccessMessage(response.message);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setStep('form');
    setOtpSent(false);
    setFormData(prev => ({ ...prev, otp: '' }));
    clearError();
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    
    try {
      let response;
      
      if (activeTab === 'register') {
        response = await register({
          phoneNumber: formData.phoneNumber,
          name: formData.name.trim()
        });
      } else {
        response = await login({
          phoneNumber: formData.phoneNumber
        });
      }
      
      if (response.success) {
        setSuccessMessage('New OTP sent! Check the terminal.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-ultra">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold text-green-800">Welcome Back!</h2>
              <p className="text-green-600">You are successfully logged in as {state.user?.name}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Beautiful Farming Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-emerald-600"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      
      {/* Floating Agriculture Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-pulse text-white/30 text-4xl">
          🌾
        </div>
        <div className="absolute top-40 right-20 animate-bounce text-white/30 text-4xl">
          🚜
        </div>
        <div className="absolute bottom-20 left-32 animate-pulse text-white/30 text-4xl">
          🌱
        </div>
        <div className="absolute top-60 right-40 animate-bounce text-white/30 text-4xl">
          🌽
        </div>
        <div className="absolute bottom-40 right-20 animate-pulse text-white/30 text-4xl">
          ☀️
        </div>
        <div className="absolute top-32 left-1/2 animate-pulse text-white/30 text-4xl">
          🌿
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce text-white/30 text-4xl">
          🥕
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/favicon.svg" alt="KrishiMitra" className="h-12 w-12" />
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">KrishiMitra</h1>
          </div>
          <p className="text-lg text-white/90 drop-shadow">
            Your AI-powered farming companion
          </p>
          <p className="text-sm text-white/80 drop-shadow">
            {step === 'form' ? 'Sign in to access personalized farming advice' : 'Enter the verification code'}
          </p>
        </div>

        {/* Main Card */}
        <Card className="glass-ultra">
          <CardHeader>
            <CardTitle className="text-center">
              {step === 'form' ? (activeTab === 'login' ? 'Welcome Back' : 'Create Account') : 'Verify Your Number'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'form' 
                ? (activeTab === 'login' ? 'Enter your details to sign in' : 'Join thousands of smart farmers')
                : `We sent a 6-digit code to ${formData.phoneNumber}`
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {step === 'form' ? (
              /* Form Step */
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-4">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !formData.phoneNumber}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send OTP
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4 mt-4">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !formData.phoneNumber || !formData.name}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              /* OTP Step */
              <form onSubmit={handleOTPSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={formData.otp}
                      onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="pl-10 text-center text-lg tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 text-center">
                      💻 Demo Mode: OTP displayed below for testing
                    </p>
                    {/* Demo OTP Display */}
                    <DemoOTPDisplay />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || formData.otp.length !== 6}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify & {activeTab === 'register' ? 'Create Account' : 'Sign In'}
                </Button>

                <div className="flex justify-between text-sm">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleBackToForm}
                    disabled={isLoading}
                  >
                    ← Back
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleResendOTP}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            )}

            {/* Success Message */}
            {successMessage && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription className="text-red-700">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}
            
            {/* Auth Context Error (separate) */}
            {!errorMessage && state.error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription className="text-red-700">
                  {state.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;