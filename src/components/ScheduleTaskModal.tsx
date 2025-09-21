import React, { useState } from 'react';
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
import { Loader2, Calendar, Clock } from 'lucide-react';
import { CropTrackerAPIService } from '@/services/cropTracker.api';
import { CropActivityInput } from '@/types/cropTracker.types';
import { useToast } from '@/hooks/use-toast';

interface ScheduleTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crops: Array<{ id: string; name: string; variety: string }>;
  onSuccess?: () => void;
}

const taskTypes = [
  { value: 'irrigation', label: 'Irrigation', description: 'Water the crops' },
  { value: 'fertilizing', label: 'Fertilizing', description: 'Apply fertilizers or nutrients' },
  { value: 'pesticide', label: 'Pesticide Application', description: 'Apply pesticides or insecticides' },
  { value: 'pruning', label: 'Pruning', description: 'Trim or prune plants' },
  { value: 'weeding', label: 'Weeding', description: 'Remove weeds from the field' },
  { value: 'monitoring', label: 'Field Monitoring', description: 'Regular field inspection' },
  { value: 'harvesting', label: 'Harvesting', description: 'Harvest mature crops' },
  { value: 'sowing', label: 'Sowing/Planting', description: 'Plant seeds or seedlings' },
] as const;

export const ScheduleTaskModal: React.FC<ScheduleTaskModalProps> = ({
  open,
  onOpenChange,
  crops,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropId: '',
    activity: '',
    activityType: 'irrigation' as const,
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    description: '',
    notes: '',
    reminderDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cropId) {
      toast({
        title: 'Invalid Input',
        description: 'Please select a crop.',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.activity.trim()) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a task name.',
        variant: 'destructive'
      });
      return;
    }

    console.log('📅 Starting task scheduling process...', {
      cropId: formData.cropId,
      activity: formData.activity,
      scheduledDate: formData.scheduledDate
    });

    setIsLoading(true);
    
    try {
      const selectedCrop = crops.find(crop => crop.id === formData.cropId);
      
      const activityInput: CropActivityInput = {
        cropId: formData.cropId,
        activity: formData.activity,
        activityType: formData.activityType,
        date: formData.scheduledDate,
        description: formData.description || `Scheduled ${formData.activityType} for ${selectedCrop?.name}`,
        notes: formData.notes,
        reminderDate: formData.reminderDate || formData.scheduledDate
      };
      
      console.log('📅 Calling CropTrackerAPIService.addActivity...', activityInput);
      const result = await CropTrackerAPIService.addActivity(activityInput);
      console.log('📅 Task scheduled successfully:', result);
      
      toast({
        title: 'Task Scheduled Successfully',
        description: `"${formData.activity}" has been scheduled for ${selectedCrop?.name} on ${new Date(formData.scheduledDate).toLocaleDateString()}.`,
        variant: 'default'
      });
      
      // Reset form
      setFormData({
        cropId: '',
        activity: '',
        activityType: 'irrigation',
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: '',
        notes: '',
        reminderDate: ''
      });
      
      console.log('📅 Closing modal and triggering data refresh...');
      onOpenChange(false);
      
      // Trigger immediate UI update
      if (onSuccess) {
        console.log('📅 Calling onSuccess callback for UI refresh...');
        await onSuccess();
      }
    } catch (error) {
      console.error('📅 Failed to schedule task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to schedule task. Please try again.';
      toast({
        title: 'Task Scheduling Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      console.log('📅 Task scheduling process completed.');
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedTaskType = taskTypes.find(type => type.value === formData.activityType);
  const selectedCrop = crops.find(crop => crop.id === formData.cropId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Schedule New Task
          </DialogTitle>
          <DialogDescription>
            Schedule a farming task for one of your crops. This will be added to your upcoming tasks list.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cropId">Select Crop</Label>
            <Select value={formData.cropId} onValueChange={(value) => handleInputChange('cropId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a crop field" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{crop.name}</span>
                      <span className="text-xs text-muted-foreground">{crop.variety}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityType">Task Type</Label>
            <Select value={formData.activityType} onValueChange={(value) => handleInputChange('activityType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTaskType && (
              <p className="text-xs text-muted-foreground">{selectedTaskType.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Task Name</Label>
            <Input
              id="activity"
              placeholder="e.g., Second Irrigation, Weekly Inspection, Fertilizer Application"
              value={formData.activity}
              onChange={(e) => handleInputChange('activity', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
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
                max={formData.scheduledDate}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe the task details..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes or reminders..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={2}
            />
          </div>

          {selectedCrop && (
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-sm font-medium">Scheduling for:</p>
              <p className="text-sm text-muted-foreground">{selectedCrop.name} ({selectedCrop.variety})</p>
            </div>
          )}

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
                  Scheduling...
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Task
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};