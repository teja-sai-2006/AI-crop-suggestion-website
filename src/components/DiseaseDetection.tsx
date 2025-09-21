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
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Bug className="h-8 w-8 text-red-600" />
          Plant Disease Detection
        </h1>
        <p className="text-lg text-gray-600">
          AI-powered disease diagnosis with treatment recommendations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload Plant Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected plant parts for accurate diagnosis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Label>Plant Image</Label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <div className="space-y-2">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="max-h-48 mx-auto rounded-lg"
                          />
                          <p className="text-sm text-gray-500">{selectedFile?.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-12 w-12 mx-auto text-gray-400" />
                          <div>
                            <p className="text-gray-600">Click to upload image</p>
                            <p className="text-sm text-gray-500">JPG, PNG, WebP up to 10MB</p>
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
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleAnalyze} 
                  className="w-full" 
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Take photos in good natural lighting</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Focus on affected plant parts (leaves, stems, fruits)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Keep the camera steady and close enough to see details</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Include both affected and healthy parts for comparison</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Avoid blurry or dark images</span>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    Disease Diagnosis
                  </CardTitle>
                  <CardDescription>
                    Analysis confidence: {result.confidence}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{result.primaryDiagnosis.diseaseName}</h3>
                        <p className="text-sm text-gray-600 italic">{result.primaryDiagnosis.scientificName}</p>
                      </div>
                      <Badge variant={getSeverityBadgeVariant(result.primaryDiagnosis.severity)}>
                        {result.primaryDiagnosis.severity} severity
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Confidence:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={result.primaryDiagnosis.confidence} className="flex-1" />
                          <span className="text-sm">{result.primaryDiagnosis.confidence}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium">Category:</span>
                        <span className="ml-2 capitalize">{result.primaryDiagnosis.category}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium">Affected Parts:</span>
                        <span className="ml-2">{result.primaryDiagnosis.affectedParts.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {result.alternativeDiagnoses.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Alternative Diagnoses</h4>
                      <div className="space-y-2">
                        {result.alternativeDiagnoses.map((diagnosis, index) => (
                          <div key={index} className="border rounded p-3 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">{diagnosis.diseaseName}</span>
                              <span className="text-gray-600">{diagnosis.confidence}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Treatment Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Treatment Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.treatments.slice(0, 3).map((treatment, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{treatment.name}</h4>
                          <Badge variant="outline" className="capitalize">
                            {treatment.type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Dosage:</span>
                            <p className="font-medium">{treatment.dosage}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Method:</span>
                            <p className="font-medium">{treatment.applicationMethod}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Frequency:</span>
                            <p className="font-medium">{treatment.frequency}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Cost:</span>
                            <p className="font-medium">₹{treatment.cost.min}-{treatment.cost.max}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Effectiveness:</span>
                            <Progress value={treatment.effectiveness} className="flex-1" />
                            <span className="text-sm">{treatment.effectiveness}%</span>
                          </div>
                        </div>
                        
                        {treatment.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">{treatment.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Upload and analyze an image to see disease diagnosis results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Analysis History
              </CardTitle>
              <CardDescription>
                Your previous disease detection analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No analysis history yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{item.diseaseName}</h4>
                            <Badge variant={getSeverityBadgeVariant(item.severity)}>
                              {item.confidence}% confidence
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span>Crop: </span>
                              <span className="font-medium capitalize">{item.cropType}</span>
                            </div>
                            <div>
                              <span>Date: </span>
                              <span className="font-medium">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span>Image: </span>
                              <span className="font-medium">{item.imageFileName}</span>
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
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteHistory(item.id)}
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