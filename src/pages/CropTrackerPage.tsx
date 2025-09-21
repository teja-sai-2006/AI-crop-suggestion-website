import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "@/components/ui/alert-dialog";
import { TrendingUp, Plus, Calendar, MapPin, Droplets, Sprout, RefreshCw, Trash2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddCropModal } from "@/components/AddCropModal";
import { LogIrrigationModal } from "@/components/LogIrrigationModal";
import { AddActivityModal } from "@/components/AddActivityModal";
import { ScheduleTaskModal } from "@/components/ScheduleTaskModal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useCrops } from "@/context/CropsContext";
import { CropTrackerAPIService } from "@/services/cropTracker.api";
import { CropTracker, CropTrackerSummary } from "@/types/cropTracker.types";
import { useToast } from "@/hooks/use-toast";
import { cropTrackerCache } from "@/utils/dataCache";
import { performanceMonitor } from "@/utils/performanceMonitor";



const CropTrackerPage = () => {
  const { crops } = useCrops();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [trackedCrops, setTrackedCrops] = useState<CropTracker[]>([]);
  const [summary, setSummary] = useState<CropTrackerSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingCropId, setRemovingCropId] = useState<string | null>(null);
  
  // Modal states
  const [irrigationModalState, setIrrigationModalState] = useState<{open: boolean, cropId: string, cropName: string}>({open: false, cropId: '', cropName: ''});
  const [activityModalState, setActivityModalState] = useState<{open: boolean, cropId: string, cropName: string}>({open: false, cropId: '', cropName: ''});
  const [scheduleTaskModalOpen, setScheduleTaskModalOpen] = useState(false);
  
  const { toast } = useToast();
  
  useEffect(() => {
    loadCropData();
  }, []);
  
  const loadCropData = async () => {
    const startTime = performance.now();
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting crop data load...', {
        cacheStats: cropTrackerCache.getStats(),
        timestamp: new Date().toISOString()
      });
      
      // Use cache for better performance
      const [cropsData, summaryData] = await Promise.all([
        cropTrackerCache.getOrSet(
          'tracked_crops',
          () => performanceMonitor.monitorAPI('getCrops', () => CropTrackerAPIService.getCrops()),
          2 * 60 * 1000 // 2 minutes cache
        ),
        cropTrackerCache.getOrSet(
          'crop_summary',
          () => performanceMonitor.monitorAPI('getCropSummary', () => CropTrackerAPIService.getCropSummary()),
          5 * 60 * 1000 // 5 minutes cache
        )
      ]);
      
      setTrackedCrops(cropsData);
      setSummary(summaryData);
      
      const endTime = performance.now();
      console.log(`✅ Crop data loaded successfully in ${(endTime - startTime).toFixed(2)}ms`, {
        cropsCount: cropsData.length,
        cacheStats: cropTrackerCache.getStats()
      });
    } catch (err) {
      setError('Failed to load crop data');
      console.error('❌ Error loading crop data:', err);
      toast({
        title: 'Error',
        description: 'Failed to load crop tracking data. Please try refreshing.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      
      console.log('🔄 Manual refresh initiated - clearing cache...');
      // Clear relevant cache entries for fresh data
      cropTrackerCache.invalidate('tracked_crops');
      cropTrackerCache.invalidate('crop_summary');
      
      await loadCropData();
      
      toast({
        title: 'Data refreshed',
        description: 'Crop tracking data has been updated with latest information.',
      });
    } catch (err) {
      console.error('❌ Refresh failed:', err);
      toast({
        title: 'Error',
        description: 'Failed to refresh data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  };
  
  // Handle crop removal
  const handleRemoveCrop = async (cropId: string, cropName: string) => {
    setRemovingCropId(cropId);
    
    try {
      console.log(`🗑️ Removing crop: ${cropName} (${cropId})`);
      
      await performanceMonitor.monitorAPI('deleteCrop', 
        () => CropTrackerAPIService.deleteCrop(cropId),
        { cropId, cropName }
      );
      
      // Clear cache after successful removal
      cropTrackerCache.invalidatePattern('crop');
      cropTrackerCache.invalidate('tracked_crops');
      cropTrackerCache.invalidate('crop_summary');
      
      // Reload data to reflect changes
      await loadCropData();
      
      console.log(`✅ Crop removed successfully: ${cropName}`);
      toast({
        title: "Crop Removed",
        description: `${cropName} has been successfully removed from your tracker.`,
        variant: "default"
      });
    } catch (error) {
      console.error(`❌ Failed to remove crop ${cropName}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove crop.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setRemovingCropId(null);
    }
  };
  
  // Handle marking task as done
  const handleMarkTaskDone = async (taskName: string, cropId?: string) => {
    try {
      console.log(`✅ Marking task as done: ${taskName}`, { cropId });
      
      if (cropId) {
        // Find the crop and mark the specific activity as completed
        const crops = await CropTrackerAPIService.getCrops();
        const crop = crops.find(c => c.id === cropId);
        
        if (crop) {
          // Find pending activity that matches the task name
          const activity = crop.activities.find(act => 
            act.activity.includes(taskName.split(' - ')[0]) && act.status === 'pending'
          );
          
          if (activity) {
            await CropTrackerAPIService.updateActivityStatus(cropId, activity.id, 'completed');
            console.log(`✅ Activity ${activity.id} marked as completed`);
          }
        }
      }
      
      toast({
        title: "Task Completed",
        description: `"${taskName}" has been marked as completed.`,
        variant: "default"
      });
      
      // Reload data to reflect changes
      await loadCropData();
    } catch (error) {
      console.error(`❌ Failed to mark task as done:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to mark task as done.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-harvest text-foreground shadow-card mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-3xl" />
              <div>
                <h1 className="text-3xl font-bold">Crop Tracker</h1>
                <p className="text-muted-foreground">Monitor your crops from seed to harvest</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="bg-background hover:bg-muted"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Crop
              </Button>
            </div>
          </div>
        </div>
      </header>

     <main className="container mx-auto px-6 py-8 pt-20">
        <div className="space-y-8">
          {/* Overview Stats */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Fields</p>
                      <p className="text-2xl font-bold">{summary?.totalCrops || 0}</p>
                    </div>
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Area</p>
                      <p className="text-2xl font-bold">{summary?.totalArea.toFixed(1) || 0} acres</p>
                    </div>
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Crops</p>
                      <p className="text-2xl font-bold">{summary?.activeCrops || 0}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Tasks</p>
                      <p className="text-2xl font-bold">{summary?.pendingActivities || 0}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Crop Cards */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">My Crops</h2>
            <div className="space-y-6">
              {trackedCrops.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Sprout className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No crops tracked yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start tracking your crops to monitor their progress from seed to harvest
                    </p>
                    <Button onClick={() => setIsAddOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Crop
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                trackedCrops.map((crop) => (
                <Card key={crop.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Sprout className="h-5 w-5" />
                          {crop.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {crop.variety} • {crop.area} • Day {crop.daysFromSowing}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getHealthColor(crop.health) as any}>
                          {crop.health}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Harvest: {new Date(crop.expectedHarvest).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Growth Progress</span>
                          <span>{crop.progress}%</span>
                        </div>
                        <Progress value={crop.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Current Stage: {crop.stage}
                        </p>
                      </div>
                      
                      {/* Activities Timeline */}
                      <div>
                        <h4 className="font-medium mb-3">Activity Timeline</h4>
                        <div className="space-y-2">
                          {crop.activities.slice(-4).map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                              <div className="flex items-center gap-3">
                                <Badge variant={getStatusColor(activity.status) as any} className="text-xs">
                                  {activity.status}
                                </Badge>
                                <span className="text-sm">{activity.activity}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2 flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIrrigationModalState({open: true, cropId: crop.id, cropName: crop.name})}
                        >
                          <Droplets className="h-4 w-4 mr-2" />
                          Log Irrigation
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActivityModalState({open: true, cropId: crop.id, cropName: crop.name})}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Add Activity
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/crop/${crop.id}`)}
                        >
                          View Details
                        </Button>
                        
                        {/* Remove Crop Button with Confirmation */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={removingCropId === crop.id}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
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
                                onClick={() => handleRemoveCrop(crop.id, crop.name)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {removingCropId === crop.id ? (
                                  <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Removing...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove Crop
                                  </>
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
              )}
            </div>
          </section>

          {/* Upcoming Tasks */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Tasks
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setScheduleTaskModalOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Task
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Dynamic upcoming tasks from crops */}
                  {trackedCrops.length > 0 && trackedCrops
                    .flatMap(crop => 
                      crop.activities
                        .filter(activity => activity.status === 'pending' && new Date(activity.date) >= new Date())
                        .map(activity => ({
                          ...activity,
                          cropName: crop.name,
                          cropId: crop.id,
                          isOverdue: new Date(activity.date) < new Date()
                        }))
                    )
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 5)
                    .map((task) => (
                      <div key={task.id} className={`flex items-center justify-between p-3 rounded-md ${
                        task.isOverdue 
                          ? 'bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-900/30'
                          : 'bg-warning/10 border border-warning/20'
                      }`}>
                        <div>
                          <div className="font-medium">{task.activity} - {task.cropName}</div>
                          <div className="text-sm text-muted-foreground">
                            Due: {new Date(task.date).toLocaleDateString()}
                            {task.isOverdue && (
                              <span className="text-red-600 font-medium ml-2">• Overdue</span>
                            )}
                          </div>
                          {task.description && (
                            <div className="text-xs text-muted-foreground mt-1">{task.description}</div>
                          )}
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleMarkTaskDone(task.activity, task.cropId)}
                          variant={task.isOverdue ? "destructive" : "default"}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Done
                        </Button>
                      </div>
                    ))
                  }
                  
                  {/* Static upcoming tasks for demo */}
                  <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-md">
                    <div>
                      <div className="font-medium">Second Irrigation - Wheat Field A</div>
                      <div className="text-sm text-muted-foreground">Due: April 1, 2024</div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleMarkTaskDone("Second Irrigation - Wheat Field A", "crop_1")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Done
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div>
                      <div className="font-medium">Harvesting - Mustard Field B</div>
                      <div className="text-sm text-muted-foreground">Scheduled: April 10, 2024</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setScheduleTaskModalOpen(true)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
                  </div>
                  
                  {trackedCrops.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">No upcoming tasks scheduled</p>
                      <Button onClick={() => setScheduleTaskModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Your First Task
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      {/* Modals */}
      <ErrorBoundary>
        <AddCropModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LogIrrigationModal
          open={irrigationModalState.open}
          onOpenChange={(open) => setIrrigationModalState(prev => ({...prev, open}))}
          cropId={irrigationModalState.cropId}
          cropName={irrigationModalState.cropName}
          onSuccess={loadCropData}
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <AddActivityModal
          open={activityModalState.open}
          onOpenChange={(open) => setActivityModalState(prev => ({...prev, open}))}
          cropId={activityModalState.cropId}
          cropName={activityModalState.cropName}
          onSuccess={loadCropData}
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ScheduleTaskModal
          open={scheduleTaskModalOpen}
          onOpenChange={setScheduleTaskModalOpen}
          crops={trackedCrops.map(crop => ({ id: crop.id, name: crop.name, variety: crop.variety }))}
          onSuccess={loadCropData}
        />
      </ErrorBoundary>
    </div>
  );
};

export default CropTrackerPage;