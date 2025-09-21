import React, { useState, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Calendar, Plus } from 'lucide-react';
import { CropTrackerAPIService } from '@/services/cropTracker.api';
import { CropActivityInput } from '@/types/cropTracker.types';
import { useToast } from '@/hooks/use-toast';
import { cropTrackerCache } from '@/utils/dataCache';

interface AddActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cropId: string;
  cropName: string;
  onSuccess?: () => void;
}

// Memoized activity types to prevent recreation on every render
const activityTypes = [
  { value: 'fertilizing', label: 'Fertilizing', description: 'Apply fertilizers or nutrients' },
  { value: 'pesticide', label: 'Pesticide Application', description: 'Apply pesticides or insecticides' },
  { value: 'pruning', label: 'Pruning', description: 'Trim or prune plants' },
  { value: 'weeding', label: 'Weeding', description: 'Remove weeds from the field' },
  { value: 'monitoring', label: 'Field Monitoring', description: 'Regular field inspection' },
  { value: 'harvesting', label: 'Harvesting', description: 'Harvest mature crops' },
  { value: 'sowing', label: 'Sowing/Planting', description: 'Plant seeds or seedlings' },
  { value: 'irrigation', label: 'Irrigation', description: 'Water the crops' },
  { value: 'other', label: 'Other Activity', description: 'Custom farming activity' }
] as const;

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  open,
  onOpenChange,
  cropId,
  cropName,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Memoized initial form data to prevent recreating on every render
  const initialFormData = useMemo(() => ({
    activity: '',
    activityType: 'monitoring' as const,
    date: new Date().toISOString().split('T')[0],
    description: '',
    cost: 0,
    notes: '',
    reminderDate: ''
  }), []);
  
  const [formData, setFormData] = useState<Omit<CropActivityInput, 'cropId'>>(initialFormData);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.activity.trim()) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter an activity name.',
        variant: 'destructive'
      });
      return;
    }

    console.log('🌱 Starting activity addition process...', {
      cropId,
      cropName,
      activityData: formData,
      timestamp: new Date().toISOString()
    });

    const startTime = performance.now();
    setIsLoading(true);
    
    try {
      const activityInput: CropActivityInput = {
        ...formData,
        cropId,
        cost: formData.cost || undefined,
        reminderDate: formData.reminderDate || undefined
      };
      
      console.log('🌱 Calling CropTrackerAPIService.addActivity...', {
        input: activityInput,
        cacheStats: cropTrackerCache.getStats()
      });
      
      const result = await CropTrackerAPIService.addActivity(activityInput);
      console.log('🌱 Activity added successfully:', result);
      
      // Invalidate relevant cache entries
      console.log('🌱 Invalidating cache for crop:', cropId);
      cropTrackerCache.invalidate(`crop_${cropId}`);
      cropTrackerCache.invalidate(`activities_${cropId}`);
      cropTrackerCache.invalidate('tracked_crops');
      
      const endTime = performance.now();
      console.log(`🌱 Activity addition completed in ${(endTime - startTime).toFixed(2)}ms`);
      
      toast({
        title: 'Activity Added Successfully',
        description: `"${formData.activity}" has been added to ${cropName} timeline.`,
        variant: 'default'
      });
      
      // Reset form with initial data
      setFormData(initialFormData);
      
      console.log('🌱 Closing modal and triggering data refresh...');
      onOpenChange(false);
      
      // Trigger immediate UI update
      if (onSuccess) {
        console.log('🌱 Calling onSuccess callback for UI refresh...');
        await onSuccess();
      }
    } catch (error) {
      console.error('🌱 Failed to add activity:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add activity. Please try again.';
      toast({
        title: 'Activity Addition Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      console.log('🌱 Activity addition process completed.');
    }
  }, [formData, cropId, cropName, toast, initialFormData, onOpenChange, onSuccess]);

  const handleInputChange = useCallback((field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Memoized computed values
  const selectedActivityType = useMemo(() => 
    activityTypes.find(type => type.value === formData.activityType),
    [formData.activityType]
  );
  
  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add Activity - {cropName}
          </DialogTitle>
          <DialogDescription>
            Record a farming activity for this crop field. This will be added to the activity timeline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activityType">Activity Type</Label>
            <Select value={formData.activityType} onValueChange={(value) => handleInputChange('activityType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedActivityType && (
              <p className="text-xs text-muted-foreground">{selectedActivityType.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Name</Label>
            <Input
              id="activity"
              placeholder="e.g., Apply NPK fertilizer, Pest control spray, Field inspection"
              value={formData.activity}
              onChange={(e) => handleInputChange('activity', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Activity Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reminderDate">Reminder Date (Optional)</Label>
              <Input
                id="reminderDate"
                type="date"
                value={formData.reminderDate}
                onChange={(e) => handleInputChange('reminderDate', e.target.value)}
                min={todayDate}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe the activity details..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost (₹) (Optional)</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.cost || ''}
              onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes or observations..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};