import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, Navigation, Loader2 } from 'lucide-react';
import { LocationData } from '../types/weather.types';
import { WeatherAPIService } from '../services/weather.api';

interface EnhancedLocationSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: LocationData) => void;
  currentLocation?: LocationData;
}

export const EnhancedLocationSelector: React.FC<EnhancedLocationSelectorProps> = ({
  open,
  onOpenChange,
  onLocationSelect,
  currentLocation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'gps' | 'recent'>('search');
  const [recentLocations, setRecentLocations] = useState<LocationData[]>([]);

  // Load recent locations from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('km.weather.recentLocations');
      if (saved) {
        setRecentLocations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load recent locations:', error);
    }
  }, []);

  // Search locations as user types
  useEffect(() => {
    const searchLocations = async () => {
      if (searchTerm.length > 2) {
        setIsSearching(true);
        try {
          const results = await WeatherAPIService.searchLocations(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const timeoutId = setTimeout(searchLocations, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLocationSelect = (location: LocationData) => {
    // Save to recent locations
    saveToRecentLocations(location);
    
    // Notify parent
    onLocationSelect(location);
    onOpenChange(false);
    
    // Clear search
    setSearchTerm('');
    setSearchResults([]);
  };

  const saveToRecentLocations = (location: LocationData) => {
    try {
      const updated = [
        location,
        ...recentLocations.filter(loc => loc.id !== location.id)
      ].slice(0, 5); // Keep only 5 recent locations
      
      setRecentLocations(updated);
      localStorage.setItem('km.weather.recentLocations', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent location:', error);
    }
  };

  const handleGPSLocation = async () => {
    setIsLoadingGPS(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Get location details from coordinates
      const locationData = await WeatherAPIService.getLocationFromCoordinates(latitude, longitude);
      
      handleLocationSelect(locationData);
    } catch (error) {
      console.error('GPS Error:', error);
      // TODO: Show error toast
    } finally {
      setIsLoadingGPS(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Choose your location to get accurate weather data and agricultural advisory
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === 'search' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('search')}
              className="flex-1"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              variant={activeTab === 'gps' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('gps')}
              className="flex-1"
            >
              <Navigation className="h-4 w-4 mr-2" />
              GPS
            </Button>
            <Button
              variant={activeTab === 'recent' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('recent')}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Recent
            </Button>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div className="space-y-3">
              <div className="relative">
                <Input
                  placeholder="Search for city, district, or village..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                {isSearching && (
                  <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                )}
              </div>
              
              {searchResults.length > 0 && (
                <Card className="max-h-60 overflow-y-auto">
                  <CardContent className="p-2">
                    <div className="space-y-1">
                      {searchResults.map((location) => (
                        <Button
                          key={location.id}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <MapPin className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
                          <div className="text-left">
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {location.region}, {location.country}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {searchTerm.length > 2 && !isSearching && searchResults.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No locations found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
            </div>
          )}

          {/* GPS Tab */}
          {activeTab === 'gps' && (
            <div className="text-center space-y-4 py-8">
              <div className="text-muted-foreground">
                <Navigation className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="mb-2">Use your device's GPS to automatically detect your location</p>
                <p className="text-sm">This will provide the most accurate weather data for your area</p>
              </div>
              <Button
                onClick={handleGPSLocation}
                disabled={isLoadingGPS}
                className="w-full"
                size="lg"
              >
                {isLoadingGPS ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Getting Your Location...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Use My Current Location
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Recent Locations Tab */}
          {activeTab === 'recent' && (
            <div className="space-y-3">
              {recentLocations.length > 0 ? (
                <Card className="max-h-60 overflow-y-auto">
                  <CardContent className="p-2">
                    <div className="space-y-1">
                      {recentLocations.map((location) => (
                        <Button
                          key={location.id}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <MapPin className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
                          <div className="text-left">
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {location.region}, {location.country}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recent locations</p>
                  <p className="text-sm">Search for a location to get started</p>
                </div>
              )}
            </div>
          )}

          {/* Current Location Display */}
          {currentLocation && (
            <div className="border-t pt-4">
              <div className="text-sm text-muted-foreground mb-2">Current Location:</div>
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{currentLocation.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentLocation.region}, {currentLocation.country}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};