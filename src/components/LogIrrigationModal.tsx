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
import { Loader2, Droplets } from 'lucide-react';
import { CropTrackerAPIService } from '@/services/cropTracker.api';
import { IrrigationInput } from '@/types/cropTracker.types';
import { useToast } from '@/hooks/use-toast';

interface LogIrrigationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cropId: string;
  cropName: string;
  onSuccess?: () => void;
}

export const LogIrrigationModal: React.FC<LogIrrigationModalProps> = ({
  open,
  onOpenChange,
  cropId,
  cropName,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<IrrigationInput, 'cropId'>>({
    date: new Date().toISOString().split('T')[0],
    waterAmount: 100,
    method: 'manual',
    duration: 30,
    notes: '',
    weather: 'not_specified'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced form validation
    if (formData.waterAmount <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Water amount must be greater than 0 liters.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!formData.method) {
      toast({
        title: 'Invalid Input',
        description: 'Please select an irrigation method.',
        variant: 'destructive'
      });
      return;
    }

    console.log('🚿 Starting irrigation logging process...', {
      cropId,
      cropName,
      irrigationData: formData
    });

    setIsLoading(true);
    
    try {
      const irrigationInput: IrrigationInput = {
        ...formData,
        cropId
      };
      
      console.log('🚿 Calling CropTrackerAPIService.logIrrigation...', irrigationInput);
      const result = await CropTrackerAPIService.logIrrigation(irrigationInput);
      console.log('🚿 Irrigation logged successfully:', result);
      
      toast({
        title: 'Irrigation Logged Successfully',
        description: `${formData.waterAmount}L irrigation logged for ${cropName}. Activity timeline updated.`,
        variant: 'default'
      });
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        waterAmount: 100,
        method: 'manual',
        duration: 30,
        notes: '',
        weather: 'not_specified'
      });
      
      console.log('🚿 Closing modal and triggering data refresh...');
      onOpenChange(false);
      
      // Trigger immediate UI update
      if (onSuccess) {
        console.log('🚿 Calling onSuccess callback for UI refresh...');
        await onSuccess();
      }
    } catch (error) {
      console.error('🚿 Failed to log irrigation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to log irrigation. Please try again.';
      toast({
        title: 'Irrigation Logging Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      console.log('🚿 Irrigation logging process completed.');
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Log Irrigation - {cropName}
          </DialogTitle>
          <DialogDescription>
            Record irrigation details for this crop field. This will be added to the activity timeline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="waterAmount">Water Amount (Liters)</Label>
              <Input
                id="waterAmount"
                type="number"
                min="1"
                max="10000"
                value={formData.waterAmount}
                onChange={(e) => handleInputChange('waterAmount', parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method">Irrigation Method</Label>
              <Select value={formData.method} onValueChange={(value) => handleInputChange('method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="flood">Flood Irrigation</SelectItem>
                  <SelectItem value="manual">Manual/Watering Can</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="480"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weather">Weather Conditions (Optional)</Label>
            <Select value={formData.weather || undefined} onValueChange={(value) => handleInputChange('weather', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select weather conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_specified">Not specified</SelectItem>
                <SelectItem value="sunny">Sunny</SelectItem>
                <SelectItem value="cloudy">Cloudy</SelectItem>
                <SelectItem value="overcast">Overcast</SelectItem>
                <SelectItem value="light-rain">Light Rain</SelectItem>
                <SelectItem value="windy">Windy</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="cool">Cool</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this irrigation..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
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
                  Logging...
                </>
              ) : (
                <>
                  <Droplets className="h-4 w-4 mr-2" />
                  Log Irrigation
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};