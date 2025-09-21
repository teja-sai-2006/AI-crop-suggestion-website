import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Location = {
  name: string;
  lat: number;
  lon: number;
};

type LocationContextType = {
  currentLocation: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
  isLocationSet: boolean;
};

const LocationContext = createContext<LocationContextType | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(() => {
    try {
      const saved = localStorage.getItem('km.weather.location');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setLocation = (location: Location) => {
    setCurrentLocation(location);
    try {
      localStorage.setItem('km.weather.location', JSON.stringify(location));
    } catch (error) {
      console.error('Failed to save location to localStorage:', error);
    }
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    try {
      localStorage.removeItem('km.weather.location');
    } catch (error) {
      console.error('Failed to clear location from localStorage:', error);
    }
  };

  const isLocationSet = currentLocation !== null;

  return (
    <LocationContext.Provider 
      value={{ 
        currentLocation, 
        setLocation, 
        clearLocation, 
        isLocationSet 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};