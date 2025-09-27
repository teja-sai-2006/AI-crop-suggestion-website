import React, { useState, useEffect, useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin } from 'lucide-react';
import { LocationDataService } from '../services/locationData.service';
import { LocationData, LocationOption, GroupedLocationOptions } from '../types/locationData.types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CropLocationSelectorProps {
  value?: string;
  onLocationChange: (locationData: LocationData | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CropLocationSelector: React.FC<CropLocationSelectorProps> = ({
  value,
  onLocationChange,
  placeholder = "Select location...",
  disabled = false
}) => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState(value || '');

  // Load location data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await LocationDataService.getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Failed to load locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) {
      return locations;
    }

    const query = searchQuery.toLowerCase();
    return locations.filter(location =>
      location.state.toLowerCase().includes(query) ||
      location.district.toLowerCase().includes(query) ||
      location.displayName.toLowerCase().includes(query)
    );
  }, [locations, searchQuery]);

  // Group locations by state
  const groupedLocations = useMemo(() => {
    const grouped: GroupedLocationOptions = {};
    
    filteredLocations.forEach(location => {
      if (!grouped[location.state]) {
        grouped[location.state] = [];
      }
      
      grouped[location.state].push({
        value: location.locationKey,
        label: location.displayName,
        state: location.state,
        district: location.district
      });
    });

    // Sort states alphabetically and districts within each state
    Object.keys(grouped).forEach(state => {
      grouped[state].sort((a, b) => a.district.localeCompare(b.district));
    });

    return grouped;
  }, [filteredLocations]);

  // Handle location selection
  const handleLocationSelect = (locationKey: string) => {
    const selectedLocation = locations.find(loc => loc.locationKey === locationKey);
    
    if (selectedLocation) {
      setSelectedValue(locationKey);
      onLocationChange(selectedLocation);
    } else {
      setSelectedValue('');
      onLocationChange(null);
    }
    
    setIsOpen(false);
    setSearchQuery('');
  };

  // Get display value for selected location
  const getDisplayValue = () => {
    if (!selectedValue) return placeholder;
    
    const location = locations.find(loc => loc.locationKey === selectedValue);
    return location ? location.displayName : placeholder;
  };

  // Update selected value when prop changes
  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value || '');
    }
  }, [value]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label htmlFor="location" className="text-enhanced flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Location
        </Label>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="location" className="text-enhanced flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Location
      </Label>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between glass text-enhanced"
            disabled={disabled}
          >
            <span className="truncate">{getDisplayValue()}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 glass" align="start">
          <Command className="glass">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search states or districts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <ScrollArea className="h-72">
              <div className="p-1">
                {Object.keys(groupedLocations).length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {searchQuery ? 'No locations found.' : 'No data available.'}
                  </div>
                ) : (
                  Object.entries(groupedLocations)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([state, stateLocations]) => (
                      <div key={state}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground bg-muted/50 rounded-sm">
                          {state} ({stateLocations.length})
                        </div>
                        
                        {stateLocations.map((location) => (
                          <div
                            key={location.value}
                            className={cn(
                              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors",
                              selectedValue === location.value && "bg-accent text-accent-foreground"
                            )}
                            onClick={() => handleLocationSelect(location.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-primary",
                                selectedValue === location.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col flex-1">
                              <span className="font-medium">{location.district}</span>
                              <span className="text-xs text-muted-foreground">{location.state}</span>
                            </div>
                          </div>
                        ))}
                        
                        <Separator className="my-1" />
                      </div>
                    ))
                )}
              </div>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      
      {selectedValue && (
        <div className="text-xs text-muted-foreground mt-1">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {getDisplayValue()}
          </span>
        </div>
      )}
    </div>
  );
};

export default CropLocationSelector;