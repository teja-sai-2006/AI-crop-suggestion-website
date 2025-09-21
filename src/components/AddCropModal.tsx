import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCrops } from "@/context/CropsContext";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  presetCropName?: string;
};

export const AddCropModal = ({ open, onOpenChange, presetCropName }: Props) => {
  const { addCrop } = useCrops();
  const [name, setName] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [expectedHarvestDate, setExpectedHarvestDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; sowingDate?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (presetCropName) setName(presetCropName);
  }, [presetCropName]);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Crop name is required";
    if (!sowingDate) e.sowingDate = "Sowing date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    // Mock submission
    setTimeout(() => {
      addCrop({
        id: Date.now().toString(),
        name: name.trim(),
        sowingDate,
        expectedHarvestDate: expectedHarvestDate || undefined,
        location: location || undefined,
        notes: notes || undefined,
      });
      setSubmitting(false);
      onOpenChange(false);
      // Reset form
      setName("");
      setSowingDate("");
      setExpectedHarvestDate("");
      setLocation("");
      setNotes("");
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Crop</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cropName">Crop name</Label>
            <Input id="cropName" placeholder="e.g., Wheat" value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="sowing">Sowing date</Label>
            <Input id="sowing" type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} />
            {errors.sowingDate && <p className="text-destructive text-xs mt-1">{errors.sowingDate}</p>}
          </div>
          <div>
            <Label htmlFor="harvest">Expected harvest date (optional)</Label>
            <Input id="harvest" type="date" value={expectedHarvestDate} onChange={e => setExpectedHarvestDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="location">Location (optional)</Label>
            <Input id="location" placeholder="e.g., Pune, MH" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input id="notes" placeholder="Any notes" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting}>{submitting ? "Saving..." : "Add Crop"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


