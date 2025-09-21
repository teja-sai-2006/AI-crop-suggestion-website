import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, TrendingUp, TrendingDown, BarChart3, MapPin } from 'lucide-react';
import { MarketPrice, MarketLocation, MarketPricesSummary } from '@/types/marketPrices.types';
import { MarketPricesAPIService } from '@/services/marketPrices.api';
import CropSelector from './CropSelector';
import MarketSelector from './MarketSelector';
import LatestPriceCard from './LatestPriceCard';
import PriceTrendChart from './PriceTrendChart';
import NoData from './NoData';
import { useToast } from '@/hooks/use-toast';

const MarketPrices: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [availableCrops, setAvailableCrops] = useState<string[]>([]);
  const [availableMarkets, setAvailableMarkets] = useState<MarketLocation[]>([]);
  const [latestPrices, setLatestPrices] = useState<MarketPrice[]>([]);
  const [summary, setSummary] = useState<MarketPricesSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCrop) {
      loadLatestPrices();
      // Save preferences
      if (selectedLocation) {
        MarketPricesAPIService.savePreferences(selectedCrop, selectedLocation);
      }
    }
  }, [selectedCrop, selectedLocation]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load basic data in parallel
      const [crops, markets, summaryData, preferences] = await Promise.all([
        MarketPricesAPIService.getAvailableCrops(),
        MarketPricesAPIService.getAvailableMarkets(),
        MarketPricesAPIService.getPricesSummary(),
        MarketPricesAPIService.getPreferences()
      ]);

      setAvailableCrops(crops);
      setAvailableMarkets(markets);
      setSummary(summaryData);

      // Set saved preferences or defaults
      if (preferences) {
        setSelectedCrop(preferences.lastSelectedCrop || crops[0] || '');
        setSelectedLocation(preferences.lastSelectedLocation || markets[0]?.id || '');
      } else {
        setSelectedCrop(crops[0] || '');
        setSelectedLocation(markets[0]?.id || '');
      }
    } catch (err) {
      setError('Failed to load market data. Please try again.');
      console.error('Error loading initial data:', err);
      toast({
        title: 'Error',
        description: 'Failed to load market data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadLatestPrices = async () => {
    if (!selectedCrop) return;

    try {
      const prices = await MarketPricesAPIService.getLatestPrice(
        selectedCrop,
        selectedLocation || undefined
      );
      setLatestPrices(prices);
    } catch (err) {
      console.error('Error loading latest prices:', err);
      toast({
        title: 'Error',
        description: 'Failed to load latest prices',
        variant: 'destructive',
      });
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadInitialData();
      if (selectedCrop) {
        await loadLatestPrices();
      }
      toast({
        title: 'Data refreshed',
        description: 'Market prices have been updated',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to refresh data',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  };

  const selectedMarket = availableMarkets.find(market => market.id === selectedLocation);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
          
          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Chart skeleton */}
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error && !summary) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Unable to load market data</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={loadInitialData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-strong text-overlay flex items-center gap-3">
              <div className="p-2 glass rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              Market Prices
            </h1>
            <p className="text-enhanced text-overlay">
              Real-time crop prices across Indian markets
            </p>
          </div>
          
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="glass hover:glass-medium text-enhanced"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-enhanced text-overlay">Total Crops</p>
                    <p className="text-2xl font-bold text-strong">{summary.totalCrops}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-enhanced text-overlay">Markets</p>
                    <p className="text-2xl font-bold text-strong">{summary.totalMarkets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {summary.avgPriceChange >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm text-enhanced text-overlay">
                      Avg Change
                    </p>
                    <p className={`text-2xl font-bold text-strong ${summary.avgPriceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {summary.avgPriceChange >= 0 ? '+' : ''}{summary.avgPriceChange.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-ultra">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-enhanced text-overlay">Last Updated</p>
                    <p className="text-sm font-bold text-enhanced">Just now</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CropSelector
          crops={availableCrops}
          selectedCrop={selectedCrop}
          onCropChange={setSelectedCrop}
        />
        
        <MarketSelector
          markets={availableMarkets}
          selectedMarket={selectedLocation}
          onMarketChange={setSelectedLocation}
        />
      </div>

      {/* Main Content */}
      {selectedCrop ? (
        <div className="space-y-6">
          {/* Latest Price Cards */}
          {latestPrices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {latestPrices.map((price) => (
                <LatestPriceCard
                  key={price.id}
                  price={price}
                  market={selectedMarket}
                />
              ))}
            </div>
          ) : (
            <NoData
              title="No price data available"
              description={`No recent prices found for ${selectedCrop}${selectedMarket ? ` in ${selectedMarket.name}` : ''}.`}
              onRefresh={handleRefresh}
            />
          )}

          {/* Price Trend Chart */}
          <PriceTrendChart
            crop={selectedCrop}
            locationId={selectedLocation}
          />

          {/* Top Gainers and Losers */}
          {summary && (summary.topGainers.length > 0 || summary.topLosers.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Gainers */}
              {summary.topGainers.length > 0 && (
                <Card className="glass-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400 text-strong">
                      <TrendingUp className="h-5 w-5" />
                      Top Gainers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {summary.topGainers.map((gainer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                          <div>
                            <div className="font-medium text-strong">{gainer.crop}</div>
                            <div className="text-sm text-enhanced">{gainer.location}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-400 text-strong">
                              +{gainer.changePercentage.toFixed(1)}%
                            </div>
                            <div className="text-sm text-enhanced">₹{gainer.currentPrice}/kg</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Top Losers */}
              {summary.topLosers.length > 0 && (
                <Card className="glass-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-400 text-strong">
                      <TrendingDown className="h-5 w-5" />
                      Top Losers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {summary.topLosers.map((loser, index) => (
                        <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                          <div>
                            <div className="font-medium text-strong">{loser.crop}</div>
                            <div className="text-sm text-enhanced">{loser.location}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-red-400 text-strong">
                              {loser.changePercentage.toFixed(1)}%
                            </div>
                            <div className="text-sm text-enhanced">₹{loser.currentPrice}/kg</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      ) : (
        <NoData
          title="Select a crop to view prices"
          description="Choose a crop from the dropdown above to see current market prices and trends."
        />
      )}
    </div>
  );
};

export default MarketPrices;