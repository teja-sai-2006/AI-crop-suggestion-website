import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropDetailsSkeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Sprout,
  Calendar,
  MapPin,
  Droplets,
  TrendingUp,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2
} from 'lucide-react';
import { CropTrackerAPIService } from '@/services/cropTracker.api';
import { CropTracker, IrrigationLog } from '@/types/cropTracker.types';
import { useToast } from '@/hooks/use-toast';
import { LogIrrigationModal } from '@/components/LogIrrigationModal';
import { AddActivityModal } from '@/components/AddActivityModal';
import { cropTrackerCache, CacheKeys } from '@/utils/dataCache';

export const CropDetailsPage: React.FC = () => {
  const { id: cropId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [crop, setCrop] = useState<CropTracker | null>(null);
  const [irrigationLogs, setIrrigationLogs] = useState<IrrigationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [irrigationLoading, setIrrigationLoading] = useState(false);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [removingCropId, setRemovingCropId] = useState<string | null>(null);
  
  // Modal states
  const [isIrrigationModalOpen, setIsIrrigationModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  
  // Performance tracking
  const [loadStartTime] = useState(Date.now());

  useEffect(() => {
    if (cropId) {
      console.log('🚀 CropDetailsPage loaded, starting data fetch...', { cropId, loadStartTime });
      loadCropDetails();
    }
  }, [cropId]);

  // Optimized crop details loading with caching
  const loadCropDetails = useCallback(async () => {
    if (!cropId) return;
    
    console.log('📊 Loading crop details with cache optimization...', { cropId });
    
    try {
      setLoading(true);
      
      // Use cache for faster loading
      const cropData = await cropTrackerCache.getOrSet(
        CacheKeys.crop(cropId),
        () => CropTrackerAPIService.getCropById(cropId),
        2 * 60 * 1000 // 2 minutes cache
      );
      
      if (!cropData) {
        console.warn('⚠️ Crop not found:', cropId);
        toast({
          title: 'Crop Not Found',
          description: 'The requested crop could not be found.',
          variant: 'destructive'
        });
        navigate('/tracker');
        return;
      }
      
      console.log('✅ Crop details loaded successfully:', cropData);
      setCrop(cropData);
      
      // Performance logging
      const loadTime = Date.now() - loadStartTime;
      console.log(`⚡ Page load performance: ${loadTime}ms`);
      
    } catch (error) {
      console.error('❌ Error loading crop details:', error);
      toast({
        title: 'Loading Error',
        description: 'Failed to load crop details. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [cropId, navigate, toast, loadStartTime]);

  // Lazy load irrigation logs only when irrigation tab is accessed
  const loadIrrigationLogs = useCallback(async () => {
    if (!cropId || irrigationLoading) return;
    
    console.log('💧 Lazy loading irrigation logs...', { cropId });
    
    try {
      setIrrigationLoading(true);
      
      const logs = await cropTrackerCache.getOrSet(
        CacheKeys.irrigationLogs(cropId),
        () => CropTrackerAPIService.getIrrigationLogs(cropId),
        1 * 60 * 1000 // 1 minute cache
      );
      
      console.log('✅ Irrigation logs loaded:', { count: logs.length });
      setIrrigationLogs(logs);
    } catch (error) {
      console.error('❌ Error loading irrigation logs:', error);
      toast({
        title: 'Loading Error',
        description: 'Failed to load irrigation logs.',
        variant: 'destructive'
      });
    } finally {
      setIrrigationLoading(false);
    }
  }, [cropId, irrigationLoading, toast]);

  const handleRemoveCrop = async () => {
    if (!crop) return;
    
    console.log('📋 Removing crop from tracker...', { cropId: crop.id, cropName: crop.name });
    
    setRemovingCropId(crop.id);
    
    try {
      await CropTrackerAPIService.deleteCrop(crop.id);
      
      // Invalidate cache for this crop and related data
      cropTrackerCache.invalidate(CacheKeys.crop(crop.id));
      cropTrackerCache.invalidate(CacheKeys.crops());
      cropTrackerCache.invalidate(CacheKeys.cropSummary());
      cropTrackerCache.invalidatePattern(crop.id);
      
      console.log('✅ Crop removed successfully and cache invalidated');
      
      toast({
        title: 'Crop Removed Successfully',
        description: `${crop.name} has been removed from your tracker.`,
        variant: 'default'
      });
      
      navigate('/tracker');
    } catch (error) {
      console.error('❌ Failed to remove crop:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove crop. Please try again.';
      toast({
        title: 'Removal Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setRemovingCropId(null);
    }
  };

  const handleMarkActivityComplete = async (activityId: string) => {
    if (!crop) return;
    
    console.log('📋 Marking activity as complete...', { cropId: crop.id, activityId });
    
    try {
      await CropTrackerAPIService.updateActivityStatus(crop.id, activityId, 'completed');
      
      // Invalidate cache to force refresh
      cropTrackerCache.invalidate(CacheKeys.crop(crop.id));
      
      await loadCropDetails(); // Reload to show updated status
      
      console.log('✅ Activity marked as complete successfully');
      
      toast({
        title: 'Activity Completed',
        description: 'Activity has been marked as completed.',
        variant: 'default'
      });
    } catch (error) {
      console.error('❌ Failed to update activity status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update activity status. Please try again.';
      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'excellent': return 'success';
      case 'good': return 'default';
      case 'average': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'upcoming': return 'secondary';
      default: return 'secondary';
    }
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'irrigation': return <Droplets className="h-4 w-4" />;
      case 'fertilizing': return <Sprout className="h-4 w-4" />;
      case 'harvesting': return <TrendingUp className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8 pt-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading crop details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Crop Not Found</h1>
            <Button onClick={() => navigate('/tracker')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Crop Tracker
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-harvest text-foreground shadow-card mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/tracker')}
                className="bg-background/10 hover:bg-background/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <Sprout className="text-3xl" />
                <div>
                  <h1 className="text-3xl font-bold">{crop.name}</h1>
                  <p className="text-muted-foreground">{crop.variety} • {crop.area} acres • Day {crop.daysFromSowing}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getHealthColor(crop.health) as any} className="text-sm px-3 py-1">
                {crop.health}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Progress</p>
                    <p className="text-2xl font-bold">{crop.progress}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <Progress value={crop.progress} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Stage</p>
                    <p className="text-xl font-bold">{crop.stage}</p>
                  </div>
                  <Sprout className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Harvest</p>
                    <p className="text-lg font-bold">{new Date(crop.expectedHarvest).toLocaleDateString()}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-bold">{crop.location}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button onClick={() => setIsIrrigationModalOpen(true)}>
              <Droplets className="h-4 w-4 mr-2" />
              Log Irrigation
            </Button>
            <Button variant="outline" onClick={() => setIsActivityModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
            
            {/* Remove Crop Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
                  disabled={removingCropId === crop.id}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Crop
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Crop from Tracker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove <strong>{crop.name}</strong> ({crop.variety}) from your crop tracker? 
                    This action cannot be undone and will permanently delete all associated activities and progress data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRemoveCrop}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Crop
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activities">Activities & Timeline</TabsTrigger>
              <TabsTrigger value="irrigation">Irrigation Logs</TabsTrigger>
              <TabsTrigger value="details">Crop Details</TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  {crop.activities.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No activities recorded yet</p>
                      <Button onClick={() => setIsActivityModalOpen(true)} className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Activity
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {crop.activities
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getActivityIcon(activity.activityType)}
                              <Badge variant={getStatusColor(activity.status) as any}>
                                {activity.status}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-medium">{activity.activity}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()} • {activity.activityType}
                              </p>
                              {activity.description && (
                                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                              )}
                              {activity.notes && (
                                <p className="text-xs text-muted-foreground mt-1">Note: {activity.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {activity.cost && (
                              <span className="text-sm font-medium">₹{activity.cost}</span>
                            )}
                            {activity.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleMarkActivityComplete(activity.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Done
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="irrigation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Irrigation History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {irrigationLogs.length === 0 ? (
                    <div className="text-center py-8">
                      <Droplets className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No irrigation logs recorded yet</p>
                      <Button onClick={() => setIsIrrigationModalOpen(true)} className="mt-4">
                        <Droplets className="h-4 w-4 mr-2" />
                        Log First Irrigation
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {irrigationLogs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{log.waterAmount}L - {log.method || 'Manual'}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(log.date).toLocaleDateString()}
                                {log.duration && ` • ${log.duration} minutes`}
                                {log.weather && ` • ${log.weather}`}
                              </p>
                              {log.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{log.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Variety</Label>
                      <p className="text-lg">{crop.variety}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Area</Label>
                      <p className="text-lg">{crop.area} acres</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Sowing Date</Label>
                      <p className="text-lg">{new Date(crop.sowingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Expected Harvest</Label>
                      <p className="text-lg">{new Date(crop.expectedHarvest).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                      <p className="text-lg">{crop.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Health Status</Label>
                      <Badge variant={getHealthColor(crop.health) as any}>{crop.health}</Badge>
                    </div>
                  </div>
                  
                  {crop.notes && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                      <p className="text-sm bg-muted/30 p-3 rounded-md mt-1">{crop.notes}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
                    <p className="text-sm">{new Date(crop.lastUpdated).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modals */}
      <LogIrrigationModal
        open={isIrrigationModalOpen}
        onOpenChange={setIsIrrigationModalOpen}
        cropId={crop.id}
        cropName={crop.name}
        onSuccess={() => {
          loadCropDetails();
          loadIrrigationLogs();
        }}
      />
      
      <AddActivityModal
        open={isActivityModalOpen}
        onOpenChange={setIsActivityModalOpen}
        cropId={crop.id}
        cropName={crop.name}
        onSuccess={loadCropDetails}
      />
    </div>
  );
};

export default CropDetailsPage;