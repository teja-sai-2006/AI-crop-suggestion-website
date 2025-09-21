import { useState, useEffect, createElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Navigation, Loader2 } from "lucide-react";
import { useLocation as useLocationContext } from "@/context/LocationContext";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Indian cities/villages for autocomplete
const MOCK_LOCATIONS = [
  "Mumbai, Maharashtra", "Delhi, Delhi", "Bangalore, Karnataka", "Hyderabad, Telangana",
  "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Pune, Maharashtra", "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan", "Surat, Gujarat", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra", "Indore, Madhya Pradesh", "Thane, Maharashtra", "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh", "Pimpri-Chinchwad, Maharashtra", "Patna, Bihar", "Vadodara, Gujarat",
  "Ghaziabad, Uttar Pradesh", "Ludhiana, Punjab", "Agra, Uttar Pradesh", "Nashik, Maharashtra",
  "Faridabad, Haryana", "Meerut, Uttar Pradesh", "Rajkot, Gujarat", "Kalyan-Dombivali, Maharashtra",
  "Vasai-Virar, Maharashtra", "Varanasi, Uttar Pradesh", "Srinagar, Jammu and Kashmir", "Aurangabad, Maharashtra",
  "Navi Mumbai, Maharashtra", "Solapur, Maharashtra", "Vijayawada, Andhra Pradesh", "Kolhapur, Maharashtra",
  "Amritsar, Punjab", "Noida, Uttar Pradesh", "Ranchi, Jharkhand", "Howrah, West Bengal",
  "Coimbatore, Tamil Nadu", "Raipur, Chhattisgarh", "Jabalpur, Madhya Pradesh", "Gwalior, Madhya Pradesh",
  "Chandigarh, Chandigarh", "Tiruchirappalli, Tamil Nadu", "Mysore, Karnataka", "Bhubaneswar, Odisha",
  "Kochi, Kerala", "Bhavnagar, Gujarat", "Salem, Tamil Nadu", "Warangal, Telangana",
  "Guntur, Andhra Pradesh", "Bhiwandi, Maharashtra", "Amravati, Maharashtra", "Nanded, Maharashtra",
  "Kolhapur, Maharashtra", "Sangli, Maharashtra", "Malegaon, Maharashtra", "Ulhasnagar, Maharashtra",
  "Jalgaon, Maharashtra", "Latur, Maharashtra", "Ahmadnagar, Maharashtra", "Dhule, Maharashtra",
  "Ichalkaranji, Maharashtra", "Parbhani, Maharashtra", "Jalna, Maharashtra", "Bhusawal, Maharashtra",
  "Panvel, Maharashtra", "Satara, Maharashtra", "Beed, Maharashtra", "Yavatmal, Maharashtra",
  "Kamptee, Maharashtra", "Gondia, Maharashtra", "Barshi, Maharashtra", "Achalpur, Maharashtra",
  "Osmanabad, Maharashtra", "Nandurbar, Maharashtra", "Wardha, Maharashtra", "Udgir, Maharashtra",
  "Aurangabad, Maharashtra", "Amalner, Maharashtra", "Akot, Maharashtra", "Pandharpur, Maharashtra",
  "Shirpur-Warwade, Maharashtra", "Shirur, Maharashtra", "Malkapur, Maharashtra", "Wani, Maharashtra",
  "Lonavla, Maharashtra", "Talegaon Dabhade, Maharashtra", "Anjangaon, Maharashtra", "Umred, Maharashtra",
  "Palghar, Maharashtra", "Shegaon, Maharashtra", "Ozar, Maharashtra", "Phaltan, Maharashtra",
  "Yevla, Maharashtra", "Shahada, Maharashtra", "Vita, Maharashtra", "Umarkhed, Maharashtra",
  "Achalpur, Maharashtra", "Barshi, Maharashtra", "Washim, Maharashtra", "Mangrulpir, Maharashtra",
  "Sangamner, Maharashtra", "Shirur, Maharashtra", "Malkapur, Maharashtra", "Wani, Maharashtra"
];

type Location = {
  name: string;
  lat: number;
  lon: number;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: Location) => void;
  currentLocation?: Location;
};

export const LocationSelector = ({ open, onOpenChange, onLocationSelect, currentLocation }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedCoords, setSelectedCoords] = useState<{lat: number, lon: number} | null>(null);
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'gps' | 'map'>('search');
  const { setLocation } = useLocationContext();

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = MOCK_LOCATIONS.filter(loc => 
        loc.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10);
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [searchTerm]);

  const handleLocationSelect = (locationName: string) => {
    // TODO: Replace with real geocoding API
    const mockCoords = {
      lat: 19.0760 + (Math.random() - 0.5) * 0.1, // Mock around Mumbai
      lon: 72.8777 + (Math.random() - 0.5) * 0.1
    };
    const location = { name: locationName, ...mockCoords };
    setLocation(location);  // Update global location context
    onLocationSelect(location);  // Notify parent component
    onOpenChange(false);
  };

  const handleGPSLocation = () => {
    setIsLoadingGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // TODO: Replace with reverse geocoding API
          const mockName = `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          const location = { name: mockName, lat: latitude, lon: longitude };
          setLocation(location);  // Update global location context
          onLocationSelect(location);
          setIsLoadingGPS(false);
          onOpenChange(false);
        },
        (error) => {
          console.error('GPS Error:', error);
          setIsLoadingGPS(false);
          // TODO: Show error toast
        }
      );
    } else {
      setIsLoadingGPS(false);
      // TODO: Show error toast - GPS not supported
    }
  };

  const handleMapClick = (lat: number, lon: number) => {
    setSelectedCoords({ lat, lon });
  };

  // Map click handler component
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        handleMapClick(lat, lng);
      },
    });
    return null;
  };

  const confirmMapSelection = () => {
    if (selectedCoords) {
      // TODO: Add reverse geocoding to get location name from coordinates
      const mockName = `Map Location (${selectedCoords.lat.toFixed(4)}, ${selectedCoords.lon.toFixed(4)})`;
      const location = { name: mockName, ...selectedCoords };
      
      setLocation(location);  // Update global location context (this handles localStorage)
      onLocationSelect(location);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
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
              variant={activeTab === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('map')}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div className="space-y-3">
              <div>
                <Input
                  placeholder="Type city or village name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {filteredLocations.length > 0 && (
                <Card>
                  <CardContent className="p-2">
                    <div className="space-y-1">
                      {filteredLocations.map((location, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          {location}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* GPS Tab */}
          {activeTab === 'gps' && (
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                Use your device's GPS to get current location
              </div>
              <Button
                onClick={handleGPSLocation}
                disabled={isLoadingGPS}
                className="w-full"
              >
                {isLoadingGPS ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Use My Location
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Map Tab */}
          {activeTab === 'map' && (
            <div className="space-y-4">
              <div className="text-muted-foreground text-sm">
                Click on the map to select a location
              </div>
              <div className="h-80 rounded-lg overflow-hidden border relative">
                {/* @ts-ignore */}
                {createElement(MapContainer as any, {
                  center: [20.5937, 78.9629],
                  zoom: 5,
                  style: { height: '100%', width: '100%' },
                  className: "rounded-lg"
                }, [
                  /* @ts-ignore */
                  createElement(TileLayer as any, {
                    key: 'tile',
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  }),
                  createElement(MapClickHandler, { key: 'handler' }),
                  selectedCoords ? createElement(Marker as any, {
                    key: 'marker',
                    position: [selectedCoords.lat, selectedCoords.lon]
                  }) : null
                ])}
                {/* Coordinate display overlay */}
                {selectedCoords && (
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-md p-2 text-xs shadow-md z-[1000]">
                    📍 Selected: {selectedCoords.lat.toFixed(4)}, {selectedCoords.lon.toFixed(4)}
                  </div>
                )}
              </div>
              {selectedCoords && (
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Selected coordinates: {selectedCoords.lat.toFixed(6)}, {selectedCoords.lon.toFixed(6)}
                    {/* TODO: Add reverse geocoding to get location name from coordinates */}
                  </div>
                  <Button onClick={confirmMapSelection}>
                    Confirm Selection
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Current Location Display */}
          {currentLocation && (
            <div className="border-t pt-4">
              <div className="text-sm text-muted-foreground">Current Location:</div>
              <div className="font-medium">{currentLocation.name}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
