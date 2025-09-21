import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Camera, 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Trash2,
  Eye,
  FileImage,
  Bug,
  Leaf,
  TrendingDown,
  Shield
} from 'lucide-react';
import { DiseaseDetectionAPIService } from '../services/diseaseDetection.api';
import { 
  DiseaseDetectionResult, 
  DiseaseDetectionHistory,
  DiseaseDetectionInput 
} from '../types/diseaseDetection.types';

const DiseaseDetection: React.FC = () => {
  // Component state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState<string>('tomato');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [history, setHistory] = useState<DiseaseDetectionHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history on component mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await DiseaseDetectionAPIService.getAnalysisHistory();
      setHistory(historyData);
    } catch (err) {
      console.warn('Failed to load history:', err);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = DiseaseDetectionAPIService.validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      setSelectedFile(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const input: DiseaseDetectionInput = {
        imageFile: selectedFile,
        cropType,
        location: {
          lat: 19.0760,
          lon: 72.8777,
          name: 'Mumbai, Maharashtra'
        }
      };

      const analysisResult = await DiseaseDetectionAPIService.analyzeImage(input);
      setResult(analysisResult);
      setActiveTab('results');
      
      // Refresh history
      await loadHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteHistory = async (analysisId: string) => {
    try {
      await DiseaseDetectionAPIService.deleteAnalysis(analysisId);
      await loadHistory();
    } catch (err) {
      console.error('Failed to delete analysis:', err);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-enhanced text-overlay flex items-center justify-center gap-2">
          <Bug className="h-8 w-8 text-red-600" />
          Plant Disease Detection
        </h1>
        <p className="text-lg text-enhanced text-overlay">
          AI-powered disease diagnosis with treatment recommendations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="upload" className="text-enhanced">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="results" className="text-enhanced">Results</TabsTrigger>
          <TabsTrigger value="history" className="text-enhanced">History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="glass-ultra">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-enhanced">
                  <Camera className="h-5 w-5" />
                  Upload Plant Image
                </CardTitle>
                <CardDescription className="text-enhanced text-overlay">
                  Take a clear photo of the affected plant parts for accurate diagnosis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cropType" className="text-enhanced">Crop Type</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger className="glass text-enhanced">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="tomato">Tomato</SelectItem>
                        <SelectItem value="potato">Potato</SelectItem>
                        <SelectItem value="cucumber">Cucumber</SelectItem>
                        <SelectItem value="pepper">Pepper</SelectItem>
                        <SelectItem value="beans">Beans</SelectItem>
                        <SelectItem value="brinjal">Brinjal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-enhanced">Plant Image</Label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors glass"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <div className="space-y-2">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="max-h-48 mx-auto rounded-lg"
                          />
                          <p className="text-sm text-enhanced text-overlay">{selectedFile?.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-12 w-12 mx-auto text-gray-400" />
                          <div>
                            <p className="text-enhanced">Click to upload image</p>
                            <p className="text-sm text-enhanced text-overlay">JPG, PNG, WebP up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="glass-ultra">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-enhanced">{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleAnalyze} 
                  className="w-full glass hover:glass-medium text-enhanced" 
                  disabled={!selectedFile || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Bug className="mr-2 h-4 w-4" />
                      Analyze for Diseases
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="glass-ultra">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-enhanced">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-enhanced">Take photos in good natural lighting</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-enhanced">Focus on affected plant parts (leaves, stems, fruits)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-enhanced">Keep the camera steady and close enough to see details</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-enhanced">Include both affected and healthy parts for comparison</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-enhanced">Avoid blurry or dark images</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {result ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagnosis Results */}
              <Card className="glass-ultra">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-enhanced">
                    <Bug className="h-5 w-5" />
                    Disease Diagnosis
                  </CardTitle>
                  <CardDescription className="text-enhanced text-overlay">
                    Analysis confidence: {result.confidence}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 glass">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-enhanced">{result.primaryDiagnosis.diseaseName}</h3>
                        <p className="text-sm text-enhanced text-overlay italic">{result.primaryDiagnosis.scientificName}</p>
                      </div>
                      <Badge variant={getSeverityBadgeVariant(result.primaryDiagnosis.severity)} className="glass">
                        {result.primaryDiagnosis.severity} severity
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-enhanced">Confidence:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={result.primaryDiagnosis.confidence} className="flex-1" />
                          <span className="text-sm text-enhanced">{result.primaryDiagnosis.confidence}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium text-enhanced">Category:</span>
                        <span className="ml-2 capitalize text-enhanced">{result.primaryDiagnosis.category}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-enhanced">Affected Parts:</span>
                        <span className="ml-2 text-enhanced">{result.primaryDiagnosis.affectedParts.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {result.alternativeDiagnoses.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-enhanced">Alternative Diagnoses</h4>
                      <div className="space-y-2">
                        {result.alternativeDiagnoses.map((diagnosis, index) => (
                          <div key={index} className="border rounded p-3 text-sm glass">
                            <div className="flex justify-between">
                              <span className="font-medium text-enhanced">{diagnosis.diseaseName}</span>
                              <span className="text-enhanced text-overlay">{diagnosis.confidence}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Treatment Recommendations */}
              <Card className="glass-ultra">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-enhanced">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Treatment Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.treatments.slice(0, 3).map((treatment, index) => (
                      <div key={index} className="border rounded-lg p-4 glass">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-enhanced">{treatment.name}</h4>
                          <Badge variant="outline" className="capitalize glass">
                            {treatment.type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-enhanced text-overlay">Dosage:</span>
                            <p className="font-medium text-enhanced">{treatment.dosage}</p>
                          </div>
                          <div>
                            <span className="text-enhanced text-overlay">Method:</span>
                            <p className="font-medium text-enhanced">{treatment.applicationMethod}</p>
                          </div>
                          <div>
                            <span className="text-enhanced text-overlay">Frequency:</span>
                            <p className="font-medium text-enhanced">{treatment.frequency}</p>
                          </div>
                          <div>
                            <span className="text-enhanced text-overlay">Cost:</span>
                            <p className="font-medium text-enhanced">₹{treatment.cost.min}-{treatment.cost.max}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-enhanced text-overlay">Effectiveness:</span>
                            <Progress value={treatment.effectiveness} className="flex-1" />
                            <span className="text-sm text-enhanced">{treatment.effectiveness}%</span>
                          </div>
                        </div>
                        
                        {treatment.notes && (
                          <p className="text-sm text-enhanced text-overlay mt-2 italic">{treatment.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="glass-ultra">
              <CardContent className="p-6 text-center">
                <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-enhanced text-overlay">
                  Upload and analyze an image to see disease diagnosis results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="glass-ultra">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-enhanced">
                <Clock className="h-5 w-5" />
                Analysis History
              </CardTitle>
              <CardDescription className="text-enhanced text-overlay">
                Your previous disease detection analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-enhanced text-overlay">No analysis history yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 glass">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-enhanced">{item.diseaseName}</h4>
                            <Badge variant={getSeverityBadgeVariant(item.severity)} className="glass">
                              {item.confidence}% confidence
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-enhanced text-overlay">
                            <div>
                              <span>Crop: </span>
                              <span className="font-medium capitalize text-enhanced">{item.cropType}</span>
                            </div>
                            <div>
                              <span>Date: </span>
                              <span className="font-medium text-enhanced">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span>Image: </span>
                              <span className="font-medium text-enhanced">{item.imageFileName}</span>
                            </div>
                            <div>
                              <span>Status: </span>
                              <span className={`font-medium ${item.treated ? 'text-green-600' : 'text-orange-600'}`}>
                                {item.treated ? 'Treated' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="glass text-enhanced">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteHistory(item.id)}
                            className="glass text-enhanced"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiseaseDetection;