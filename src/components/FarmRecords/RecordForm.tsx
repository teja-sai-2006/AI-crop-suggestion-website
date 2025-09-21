import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X, Check, Plus, Minus } from 'lucide-react';
import { FarmRecord, FarmActivity, FarmExpense, FarmYield } from '@/types/farmRecords.types';
import { FarmRecordsAPIService } from '@/services/farmRecords.api';
import { cn } from '@/lib/utils';

interface RecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'activity' | 'expense' | 'yield';
  editingRecord: FarmRecord | null;
  onSuccess: (action: 'created' | 'updated' | 'deleted') => void;
}

const RecordForm: React.FC<RecordFormProps> = ({
  isOpen,
  onClose,
  type,
  editingRecord,
  onSuccess
}) => {
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    date: new Date(),
    cropType: '',
    fieldLocation: '',
    notes: '',
    // Activity specific
    activityType: '',
    duration: '',
    laborCount: '',
    equipmentUsed: [],
    // Expense specific
    expenseCategory: '',
    amount: '',
    vendor: '',
    paymentMethod: '',
    // Yield specific
    quantity: '',
    unit: '',
    quality: '',
    marketPrice: '',
    totalValue: '',
    storageLocation: '',
    harvestDate: new Date()
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [equipmentInput, setEquipmentInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editingRecord) {
        // Populate form with existing record data
        const activity = editingRecord as FarmActivity;
        const expense = editingRecord as FarmExpense;
        const yieldRecord = editingRecord as FarmYield;
        
        setFormData({
          ...editingRecord,
          date: new Date(editingRecord.date),
          harvestDate: type === 'yield' && yieldRecord.harvestDate 
            ? new Date(yieldRecord.harvestDate) 
            : new Date(),
          amount: expense.amount?.toString() || '',
          quantity: yieldRecord.quantity?.toString() || '',
          marketPrice: yieldRecord.marketPrice?.toString() || '',
          totalValue: yieldRecord.totalValue?.toString() || '',
          duration: activity.duration?.toString() || '',
          laborCount: activity.laborCount?.toString() || '',
          equipmentUsed: activity.equipmentUsed || []
        });
      } else {
        // Reset form for new record
        setFormData({
          title: '',
          description: '',
          date: new Date(),
          cropType: '',
          fieldLocation: '',
          notes: '',
          activityType: '',
          duration: '',
          laborCount: '',
          equipmentUsed: [],
          expenseCategory: '',
          amount: '',
          vendor: '',
          paymentMethod: '',
          quantity: '',
          unit: '',
          quality: '',
          marketPrice: '',
          totalValue: '',
          storageLocation: '',
          harvestDate: new Date()
        });
      }
      setError(null);
      setEquipmentInput('');
    }
  }, [isOpen, editingRecord, type]);

  const handleClose = () => {
    setFormData({});
    setError(null);
    setEquipmentInput('');
    onClose();
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.date) return 'Date is required';
    
    if (type === 'expense') {
      if (!formData.expenseCategory) return 'Expense category is required';
      if (!formData.amount || parseFloat(formData.amount) <= 0) return 'Valid amount is required';
    }
    
    if (type === 'yield') {
      if (!formData.cropType.trim()) return 'Crop type is required';
      if (!formData.quantity || parseFloat(formData.quantity) <= 0) return 'Valid quantity is required';
      if (!formData.unit.trim()) return 'Unit is required';
      if (!formData.harvestDate) return 'Harvest date is required';
    }
    
    if (type === 'activity') {
      if (!formData.activityType) return 'Activity type is required';
    }
    
    return null;
  };

  const calculateYieldValue = () => {
    const quantity = parseFloat(formData.quantity) || 0;
    const marketPrice = parseFloat(formData.marketPrice) || 0;
    return quantity * marketPrice;
  };

  useEffect(() => {
    if (type === 'yield' && formData.quantity && formData.marketPrice) {
      const calculatedValue = calculateYieldValue();
      setFormData(prev => ({
        ...prev,
        totalValue: calculatedValue.toString()
      }));
    }
  }, [formData.quantity, formData.marketPrice, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Prepare record data based on type
      let recordData: any = {
        type,
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        date: format(formData.date, 'yyyy-MM-dd'),
        cropType: formData.cropType?.trim() || undefined,
        fieldLocation: formData.fieldLocation?.trim() || undefined,
        notes: formData.notes?.trim() || undefined
      };

      // Add type-specific fields
      if (type === 'activity') {
        recordData = {
          ...recordData,
          activityType: formData.activityType,
          duration: formData.duration ? parseFloat(formData.duration) : undefined,
          laborCount: formData.laborCount ? parseInt(formData.laborCount) : undefined,
          equipmentUsed: formData.equipmentUsed.length > 0 ? formData.equipmentUsed : undefined
        };
      } else if (type === 'expense') {
        recordData = {
          ...recordData,
          expenseCategory: formData.expenseCategory,
          amount: parseFloat(formData.amount),
          vendor: formData.vendor?.trim() || undefined,
          paymentMethod: formData.paymentMethod || undefined
        };
      } else if (type === 'yield') {
        recordData = {
          ...recordData,
          cropType: formData.cropType.trim(),
          quantity: parseFloat(formData.quantity),
          unit: formData.unit.trim(),
          quality: formData.quality || undefined,
          marketPrice: formData.marketPrice ? parseFloat(formData.marketPrice) : undefined,
          totalValue: formData.totalValue ? parseFloat(formData.totalValue) : undefined,
          storageLocation: formData.storageLocation?.trim() || undefined,
          harvestDate: format(formData.harvestDate, 'yyyy-MM-dd')
        };
      }

      if (editingRecord) {
        // Update existing record
        await FarmRecordsAPIService.updateRecord(editingRecord.id, recordData);
        onSuccess('updated');
      } else {
        // Create new record
        await FarmRecordsAPIService.addRecord(recordData);
        onSuccess('created');
      }

      handleClose();
    } catch (err) {
      setError('Failed to save record. Please try again.');
      console.error('Error saving record:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addEquipment = () => {
    if (equipmentInput.trim() && !formData.equipmentUsed.includes(equipmentInput.trim())) {
      setFormData(prev => ({
        ...prev,
        equipmentUsed: [...prev.equipmentUsed, equipmentInput.trim()]
      }));
      setEquipmentInput('');
    }
  };

  const removeEquipment = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentUsed: prev.equipmentUsed.filter((item: string) => item !== equipment)
    }));
  };

  const getActivityTypes = () => [
    'planting', 'irrigation', 'fertilizing', 'pesticide', 'harvesting', 'weeding', 'other'
  ];

  const getExpenseCategories = () => [
    'seeds', 'fertilizer', 'pesticide', 'equipment', 'labor', 'fuel', 'maintenance', 'other'
  ];

  const getPaymentMethods = () => [
    'cash', 'card', 'bank_transfer', 'credit'
  ];

  const getQualityOptions = () => [
    'premium', 'standard', 'below_standard'
  ];

  const getUnits = () => [
    'kg', 'tons', 'quintals', 'liters', 'pieces', 'bundles', 'sacks'
  ];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingRecord ? 'Edit' : 'Add'} {type === 'yield' ? 'Yield' : type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={`Enter ${type} title...`}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={`Describe the ${type}...`}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Input
                  id="cropType"
                  value={formData.cropType}
                  onChange={(e) => setFormData(prev => ({ ...prev, cropType: e.target.value }))}
                  placeholder="e.g., Rice, Wheat, Tomato"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldLocation">Field Location</Label>
              <Input
                id="fieldLocation"
                value={formData.fieldLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, fieldLocation: e.target.value }))}
                placeholder="e.g., North Field, Plot 1A"
              />
            </div>
          </div>

          {/* Type-specific fields */}
          {type === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Activity Details</h3>
              
              <div className="space-y-2">
                <Label>Activity Type *</Label>
                <Select value={formData.activityType} onValueChange={(value) => setFormData(prev => ({ ...prev, activityType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getActivityTypes().map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    step="0.5"
                    min="0"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="laborCount">Number of Workers</Label>
                  <Input
                    id="laborCount"
                    type="number"
                    min="0"
                    value={formData.laborCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, laborCount: e.target.value }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Equipment Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={equipmentInput}
                    onChange={(e) => setEquipmentInput(e.target.value)}
                    placeholder="Enter equipment name..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                  />
                  <Button
                    type="button"
                    onClick={addEquipment}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.equipmentUsed.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.equipmentUsed.map((equipment: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {equipment}
                        <button
                          type="button"
                          onClick={() => removeEquipment(equipment)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {type === 'expense' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Expense Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.expenseCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, expenseCategory: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getExpenseCategories().map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor/Supplier</Label>
                  <Input
                    id="vendor"
                    value={formData.vendor}
                    onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                    placeholder="Vendor name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPaymentMethods().map((method) => (
                        <SelectItem key={method} value={method}>
                          {method.replace('_', ' ').charAt(0).toUpperCase() + method.replace('_', ' ').slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {type === 'yield' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Yield Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {getUnits().map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quality</Label>
                  <Select value={formData.quality} onValueChange={(value) => setFormData(prev => ({ ...prev, quality: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {getQualityOptions().map((quality) => (
                        <SelectItem key={quality} value={quality}>
                          {quality.replace('_', ' ').charAt(0).toUpperCase() + quality.replace('_', ' ').slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketPrice">Market Price (₹ per unit)</Label>
                  <Input
                    id="marketPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.marketPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, marketPrice: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalValue">Total Value (₹)</Label>
                  <Input
                    id="totalValue"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.totalValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalValue: e.target.value }))}
                    placeholder="0.00"
                  />
                  {(formData.quantity && formData.marketPrice) && (
                    <p className="text-xs text-muted-foreground">
                      Auto-calculated: ₹{calculateYieldValue().toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Harvest Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.harvestDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.harvestDate ? format(formData.harvestDate, "PPP") : "Select harvest date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.harvestDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, harvestDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storageLocation">Storage Location</Label>
                  <Input
                    id="storageLocation"
                    value={formData.storageLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, storageLocation: e.target.value }))}
                    placeholder="e.g., Warehouse A, Cold Storage"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes or observations..."
              rows={3}
            />
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (editingRecord ? 'Update' : 'Create')} 
            {type === 'yield' ? 'Yield' : type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecordForm;