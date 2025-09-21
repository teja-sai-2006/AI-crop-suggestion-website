import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CropSelectorProps {
  crops: string[];
  selectedCrop: string;
  onCropChange: (crop: string) => void;
  loading?: boolean;
}

const CropSelector: React.FC<CropSelectorProps> = ({
  crops,
  selectedCrop,
  onCropChange,
  loading = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="crop-selector" className="text-sm font-medium">
        Select Crop
      </Label>
      <Select
        value={selectedCrop}
        onValueChange={onCropChange}
        disabled={loading}
      >
        <SelectTrigger id="crop-selector" className="w-full">
          <SelectValue placeholder={loading ? "Loading crops..." : "Choose a crop"} />
        </SelectTrigger>
        <SelectContent>
          {crops.map((crop) => (
            <SelectItem key={crop} value={crop}>
              {crop}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CropSelector;