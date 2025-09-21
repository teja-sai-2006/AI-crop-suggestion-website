import { createContext, useContext, useMemo, useState } from "react";

export type TrackedCrop = {
  id: string;
  name: string;
  sowingDate: string;
  expectedHarvestDate?: string;
  location?: string;
  notes?: string;
};

type CropsContextValue = {
  crops: TrackedCrop[];
  addCrop: (crop: TrackedCrop) => void;
};

const CropsContext = createContext<CropsContextValue | undefined>(undefined);

export const CropsProvider = ({ children }: { children: any }) => {
  const [crops, setCrops] = useState<TrackedCrop[]>([]);

  const addCrop = (crop: TrackedCrop) => {
    // TODO: Replace with API call to backend
    setCrops(prev => [crop, ...prev]);
    // console.log("Mock addCrop submitted", crop);
  };

  const value = useMemo(() => ({ crops, addCrop }), [crops]);
  return <CropsContext.Provider value={value}>{children}</CropsContext.Provider>;
};

export const useCrops = () => {
  const ctx = useContext(CropsContext);
  if (!ctx) throw new Error("useCrops must be used within CropsProvider");
  return ctx;
};


