import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sprout, TrendingUp, Calendar, Droplets, Thermometer, AlertTriangle, Lightbulb, CheckCircle, Plus } from 'lucide-react';
import { CropRecommendationAPIService } from '../services/cropRecommendation.api';
import { CropTrackerAPIService } from '../services/cropTracker.api';
import { 
  CropRecommendationInput, 
  CropRecommendationResult, 
  CropSuggestion 
} from '../types/cropRecommendation.types';
import { LocationData } from '../types/locationData.types';
import { useToast } from '@/hooks/use-toast';
import CropLocationSelector from './CropLocationSelector';

const CropRecommendation: React.FC = () => {
  const { toast } = useToast();
  
  // Form state - Updated with selectedLocationKey
  const [formData, setFormData] = useState<CropRecommendationInput & { season?: string; soilType?: string }>({
    soil: {
      ph: 6.5,
      nitrogen: 80,
      phosphorus: 45,
      potassium: 40
    },
    climate: {
      temperature: 25,
      humidity: 80,
      rainfall: 250,
      location: {
        name: 'Mumbai, Maharashtra',
        lat: 19.0760,
        lon: 72.8777
      }
    },
    farmSize: 2.0,
    experience: 'intermediate',
    season: 'kharif',
    soilType: 'alluvial'
  });

  // Location state
  const [selectedLocationKey, setSelectedLocationKey] = useState<string>('');

  // Component state
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropSuggestion | null>(null);
  
  // Integration state
  const [addingToTracker, setAddingToTracker] = useState<string | null>(null);
  const [trackedCrops, setTrackedCrops] = useState<Set<string>>(new Set());

  // Load last result from localStorage on component mount
  useEffect(() => {
    const lastResult = localStorage.getItem('km.cropRecommendation.lastResult');
    if (lastResult) {
      try {
        const parsedResult = JSON.parse(lastResult);
        setResult(parsedResult);
        // Check which crops are already tracked
        checkTrackedStatus(parsedResult.recommendations);
      } catch (err) {
        console.warn('Failed to load last result:', err);
      }
    } else {
      // Auto-load recommendations with default values for better UX
      const autoLoad = async () => {
        try {
          setIsLoading(true);
          const recommendation = await CropRecommendationAPIService.getCropRecommendations(formData);
          setResult(recommendation);
          localStorage.setItem('km.cropRecommendation.lastResult', JSON.stringify(recommendation));
          checkTrackedStatus(recommendation.recommendations);
        } catch (err) {
          console.warn('Auto-load failed:', err);
        } finally {
          setIsLoading(false);
        }
      };
      autoLoad();
    }
  }, []);

  // Check if recommendations are already tracked
  const checkTrackedStatus = async (recommendations: CropSuggestion[]) => {
    try {
      const trackedSet = new Set<string>();
      for (const crop of recommendations) {
        const isTracked = await CropTrackerAPIService.isRecommendationTracked(crop);
        if (isTracked) {
          trackedSet.add(crop.id);
        }
      }
      setTrackedCrops(trackedSet);
    } catch (error) {
      console.warn('Failed to check tracked status:', error);
    }
  };

  // Handle adding crop to tracker
  const handleAddToTracker = async (cropSuggestion: CropSuggestion) => {
    setAddingToTracker(cropSuggestion.id);
    
    try {
      await CropTrackerAPIService.addCropToTracker(cropSuggestion);
      
      // Update tracked crops state
      setTrackedCrops(prev => new Set([...prev, cropSuggestion.id]));
      
      toast({
        title: "Success!",
        description: `${cropSuggestion.variety} added to your Crop Tracker!`,
        variant: "default"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong while adding to tracker.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setAddingToTracker(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (category: 'soil' | 'climate', field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
      }
    }));
  };

  const handleGeneralInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (value: string) => {
    const locations = {
      'mumbai': { name: 'Mumbai, Maharashtra', lat: 19.0760, lon: 72.8777 },
      'delhi': { name: 'Delhi, Delhi', lat: 28.6139, lon: 77.2090 },
      'bangalore': { name: 'Bangalore, Karnataka', lat: 12.9716, lon: 77.5946 },
      'chennai': { name: 'Chennai, Tamil Nadu', lat: 13.0827, lon: 80.2707 },
      'kolkata': { name: 'Kolkata, West Bengal', lat: 22.5726, lon: 88.3639 },
      'pune': { name: 'Pune, Maharashtra', lat: 18.5204, lon: 73.8567 }
    };

    const location = locations[value as keyof typeof locations];
    if (location) {
      setFormData(prev => ({
        ...prev,
        climate: {
          ...prev.climate,
          location
        }
      }));
    }
  };

  // Handle location change from CSV data
  const handleCropLocationChange = (locationData: LocationData | null) => {
    if (locationData) {
      setSelectedLocationKey(locationData.locationKey);
      
      // Auto-populate form fields with location data
      setFormData(prev => ({
        ...prev,
        soil: {
          ph: locationData.soilData.ph,
          nitrogen: locationData.soilData.nitrogen,
          phosphorus: locationData.soilData.phosphorus,
          potassium: locationData.soilData.potassium
        },
        climate: {
          temperature: locationData.climateData.temperature,
          humidity: locationData.climateData.humidity,
          rainfall: locationData.climateData.rainfall,
          location: {
            name: locationData.displayName,
            lat: 0, // We don't have lat/lon in CSV, using defaults
            lon: 0
          }
        }
      }));

      // Show toast notification about auto-population
      toast({
        title: "Location Updated!",
        description: `Soil and climate parameters have been updated for ${locationData.displayName}`,
        variant: "default"
      });
    } else {
      setSelectedLocationKey('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const recommendation = await CropRecommendationAPIService.getCropRecommendations(formData);
      setResult(recommendation);
      setSelectedCrop(recommendation.recommendations[0] || null);
      
      // Check tracked status for new recommendations
      await checkTrackedStatus(recommendation.recommendations);
      
      // Save to localStorage
      localStorage.setItem('km.cropRecommendation.lastResult', JSON.stringify(recommendation));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 80) return 'default';
    if (confidence >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-enhanced flex items-center justify-center gap-2 text-overlay">
          <Sprout className="h-8 w-8 text-green-600" />
          Crop Recommendation System
        </h1>
        <p className="text-lg text-enhanced text-overlay">
          Get AI-powered crop suggestions based on your soil and climate parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="glass-ultra">
          <CardHeader>
            <CardTitle className="text-enhanced">Soil & Climate Parameters</CardTitle>
            <CardDescription className="text-enhanced">
              Enter your soil test results and climate information to get personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Soil Parameters */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-enhanced">Soil Parameters</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="soilType" className="text-enhanced">Soil Type</Label>
                    <Select
                      value={formData.soilType || 'loamy'}
                      onValueChange={(value) => handleGeneralInputChange('soilType', value)}
                    >
                      <SelectTrigger className="glass text-enhanced">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="red">Red Soil</SelectItem>
                        <SelectItem value="black">Black Soil</SelectItem>
                        <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                        <SelectItem value="sandy">Sandy Soil</SelectItem>
                        <SelectItem value="loamy">Loamy Soil</SelectItem>
                        <SelectItem value="laterite">Laterite Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ph" className="text-enhanced">pH Level</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      min="4.0"
                      max="10.0"
                      value={formData.soil.ph}
                      onChange={(e) => handleInputChange('soil', 'ph', e.target.value)}
                      placeholder="6.5"
                      className="glass text-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nitrogen" className="text-enhanced">Nitrogen (kg/ha)</Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      min="0"
                      max="200"
                      value={formData.soil.nitrogen}
                      onChange={(e) => handleInputChange('soil', 'nitrogen', e.target.value)}
                      placeholder="50"
                      className="glass text-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phosphorus" className="text-enhanced">Phosphorus (kg/ha)</Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.soil.phosphorus}
                      onChange={(e) => handleInputChange('soil', 'phosphorus', e.target.value)}
                      placeholder="30"
                      className="glass text-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="potassium" className="text-enhanced">Potassium (kg/ha)</Label>
                    <Input
                      id="potassium"
                      type="number"
                      min="0"
                      max="150"
                      value={formData.soil.potassium}
                      onChange={(e) => handleInputChange('soil', 'potassium', e.target.value)}
                      placeholder="40"
                      className="glass text-enhanced"
                    />
                  </div>
                </div>
              </div>

              {/* Climate Parameters */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-enhanced">Climate Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature" className="text-enhanced">Average Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      min="10"
                      max="50"
                      value={formData.climate.temperature}
                      onChange={(e) => handleInputChange('climate', 'temperature', e.target.value)}
                      placeholder="25"
                      className="glass text-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rainfall" className="text-enhanced">Annual Rainfall (mm)</Label>
                    <Input
                      id="rainfall"
                      type="number"
                      min="100"
                      max="3000"
                      value={formData.climate.rainfall}
                      onChange={(e) => handleInputChange('climate', 'rainfall', e.target.value)}
                      placeholder="800"
                      className="glass text-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="humidity" className="text-enhanced">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      min="30"
                      max="100"
                      value={formData.climate.humidity}
                      onChange={(e) => handleInputChange('climate', 'humidity', e.target.value)}
                      placeholder="65"
                      className="glass text-enhanced"
                    />
                  </div>
                  <div>
                    <Label htmlFor="season" className="text-enhanced">Season</Label>
                    <Select
                      value={formData.season || 'kharif'}
                      onValueChange={(value) => handleGeneralInputChange('season', value)}
                    >
                      <SelectTrigger className="glass text-enhanced">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Farm Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-enhanced">Farm Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* New Location Selector */}
                  <CropLocationSelector
                    value={selectedLocationKey}
                    onLocationChange={handleCropLocationChange}
                    placeholder="Select your state and district..."
                  />
                  
                  <div>
                    <Label htmlFor="farmSize" className="text-enhanced">Farm Size (acres)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="1000"
                      value={formData.farmSize}
                      onChange={(e) => handleGeneralInputChange('farmSize', parseFloat(e.target.value) || 0)}
                      placeholder="2.0"
                      className="glass text-enhanced"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience" className="text-enhanced">Experience Level</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleGeneralInputChange('experience', value)}
                    >
                      <SelectTrigger className="glass text-enhanced">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Crop Recommendations'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive" className="glass-ultra">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-enhanced">{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass">
                <TabsTrigger value="recommendations" className="text-enhanced">Crops</TabsTrigger>
                <TabsTrigger value="analysis" className="text-enhanced">Analysis</TabsTrigger>
                <TabsTrigger value="warnings" className="text-enhanced">Warnings</TabsTrigger>
                <TabsTrigger value="tips" className="text-enhanced">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-4">
                <Card className="glass-ultra">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-enhanced">
                      <Sprout className="h-5 w-5" />
                      Recommended Crops
                    </CardTitle>
                    <CardDescription className="text-enhanced">
                      Based on your soil and climate parameters (Confidence: {result.confidence}%) - Showing {result.recommendations.length} diverse crops
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[800px] overflow-y-auto">
                      {result.recommendations.map((crop, index) => (
                        <Card key={crop.variety} className={`cursor-pointer transition-all glass ${
                          selectedCrop?.variety === crop.variety ? 'ring-2 ring-blue-500' : ''
                        }`} onClick={() => setSelectedCrop(crop)}>
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-base text-enhanced">{crop.variety}</h4>
                                <p className="text-xs text-enhanced text-overlay">{crop.name}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <Badge variant={getConfidenceBadgeVariant(crop.confidence)} className="glass text-xs">
                                  {crop.confidence}% match
                                </Badge>
                                {index === 0 && (
                                  <Badge variant="secondary" className="glass text-xs">
                                    Top Pick
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-500" />
                                <span className="text-enhanced">{crop.growthDuration.min}-{crop.growthDuration.max} {crop.growthDuration.unit}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-enhanced">{crop.profitability.roi}% ROI</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Droplets className="h-3 w-3 text-blue-500" />
                                <span className="text-enhanced">{crop.season} season</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-green-600 font-medium text-xs">₹{crop.profitability.profit.toLocaleString()}</span>
                                <span className="text-xs text-enhanced text-overlay">profit</span>
                              </div>
                            </div>
                            
                            {/* Add to Crop Tracker Button */}
                            <div className="mt-3 pt-2 border-t">
                              {trackedCrops.has(crop.id) ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full text-xs h-7" 
                                  disabled
                                >
                                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                  Added to Tracker
                                </Button>
                              ) : (
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="w-full text-xs h-7" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToTracker(crop);
                                  }}
                                  disabled={addingToTracker === crop.id}
                                >
                                  {addingToTracker === crop.id ? (
                                    <>
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Adding...
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add to Tracker
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedCrop && (
                  <Card className="glass-ultra">
                    <CardHeader>
                      <CardTitle className="text-enhanced">{selectedCrop.variety} - Detailed Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-enhanced">Crop Analysis</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-enhanced">Confidence</span>
                              <div className="flex items-center gap-2">
                                <Progress value={selectedCrop.confidence} className="w-20" />
                                <span className="text-sm text-enhanced">{selectedCrop.confidence}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-enhanced">Suitability</span>
                              <span className="capitalize font-semibold text-enhanced">{selectedCrop.suitability}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2 text-enhanced">Market Information</h5>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-enhanced text-overlay">Price Range:</span>
                              <span className="ml-2 font-semibold text-enhanced">₹{selectedCrop.marketPrice.min}-{selectedCrop.marketPrice.max}/{selectedCrop.marketPrice.currency}</span>
                            </div>
                            <div>
                              <span className="text-enhanced text-overlay">Expected Yield:</span>
                              <span className="ml-2 font-semibold text-enhanced">{selectedCrop.expectedYield.value} {selectedCrop.expectedYield.unit}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2 text-enhanced">Growing Information</h5>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-enhanced text-overlay">Season:</span>
                              <span className="ml-2 capitalize text-enhanced">{selectedCrop.season}</span>
                            </div>
                            <div>
                              <span className="text-enhanced text-overlay">Growth Duration:</span>
                              <span className="ml-2 text-enhanced">{selectedCrop.growthDuration.min}-{selectedCrop.growthDuration.max} {selectedCrop.growthDuration.unit}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Add to Crop Tracker Button in Detailed View */}
                        <div className="pt-4 border-t">
                          {trackedCrops.has(selectedCrop.id) ? (
                            <Button 
                              variant="outline" 
                              size="default" 
                              className="w-full" 
                              disabled
                            >
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Already Added to Tracker
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              size="default" 
                              className="w-full" 
                              onClick={() => handleAddToTracker(selectedCrop)}
                              disabled={addingToTracker === selectedCrop.id}
                            >
                              {addingToTracker === selectedCrop.id ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Adding to Crop Tracker...
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add to Crop Tracker
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="analysis">
                <Card className="glass-ultra">
                  <CardHeader>
                    <CardTitle className="text-enhanced">Suitability Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(result.factors).map(([factor, score]) => (
                        <div key={factor} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="capitalize font-medium text-enhanced">{factor}</span>
                            <span className={`font-semibold ${getConfidenceColor(score as number)} text-enhanced`}>
                              {score}%
                            </span>
                          </div>
                          <Progress value={score as number} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="warnings">
                <Card className="glass-ultra">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-enhanced">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Important Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.warnings.map((warning, index) => (
                        <Alert key={index} className="glass">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-enhanced">{warning}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips">
                <Card className="glass-ultra">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-enhanced">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Farming Tips & Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-enhanced">General Tips</h5>
                        <div className="space-y-2">
                          {result.tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-enhanced">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-3 text-enhanced">Next Steps</h5>
                        <div className="space-y-2">
                          {result.nextSteps.map((step, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-enhanced">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {!result && !isLoading && (
            <Card className="glass-ultra">
              <CardContent className="p-6 text-center">
                <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-enhanced text-overlay">
                  Fill in your soil and climate parameters to get personalized crop recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;