import React, { useEffect, useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketPrice } from '@/types/marketPrices.types';
import { MarketPricesAPIService } from '@/services/marketPrices.api';

interface PriceTrendChartProps {
  data?: MarketPrice[];
  crop?: string;
  locationId?: string;
  loading?: boolean;
  title?: string;
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
  data = [],
  crop,
  locationId,
  loading = false,
  title = "Price Trend (Last 30 Days)",
}) => {
  const [priceData, setPriceData] = useState<MarketPrice[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [dataStable, setDataStable] = useState(false);

  // Handle external data changes
  useEffect(() => {
    if (data && data.length > 0) {
      console.log(`📦 External data provided: ${data.length} records`);
      setPriceData(data);
      setIsLoading(false);
      setDataStable(true);
    }
  }, [data]);

  // Fetch data when crop or locationId changes and no external data is provided
  // Fetch data when crop or locationId changes and no external data is provided
  useEffect(() => {
    const fetchPriceHistory = async () => {
      console.log(`🔄 PriceTrendChart useEffect triggered:`, { 
        crop, 
        locationId, 
        dataLength: data.length,
        currentPriceDataLength: priceData.length 
      });

      // If external data is provided and not empty, don't fetch
      if (data && data.length > 0) {
        console.log(`📦 Skipping fetch - external data available: ${data.length} records`);
        return;
      }

      // If no crop selected, clear data
      if (!crop) {
        console.log(`❌ No crop selected, clearing data`);
        setPriceData([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log(`📊 Fetching price history for ${crop} in location: ${locationId || 'all locations'}`);
        
        const priceHistory = await MarketPricesAPIService.getCropPriceHistory(crop, locationId, 30);
        console.log(`📈 Retrieved ${priceHistory.trends.length} price points for chart`);
        
        if (priceHistory.trends.length === 0) {
          console.log(`⚠️ No price trends returned from API`);
          setPriceData([]);
          setIsLoading(false);
          return;
        }
        
        // Convert trends to MarketPrice format for the chart
        const priceDataForChart: MarketPrice[] = priceHistory.trends.map((trend, index) => ({
          id: `trend_${index}`,
          crop: crop,
          location: priceHistory.location,
          locationId: locationId || 'all',
          price: trend.price,
          unit: 'kg',
          date: trend.date,
          marketName: priceHistory.location,
          previousPrice: index > 0 ? priceHistory.trends[index - 1].price : trend.price,
          trend: index > 0 
            ? (trend.price > priceHistory.trends[index - 1].price ? 'up' 
               : trend.price < priceHistory.trends[index - 1].price ? 'down' 
               : 'stable')
            : 'stable',
          changePercentage: index > 0 
            ? ((trend.price - priceHistory.trends[index - 1].price) / priceHistory.trends[index - 1].price) * 100
            : 0,
          quality: 'standard',
          minPrice: trend.price * 0.9,
          maxPrice: trend.price * 1.1,
          avgPrice: trend.price,
          createdAt: new Date(trend.date).toISOString(),
          updatedAt: new Date(trend.date).toISOString()
        }));
        
        console.log(`✅ Chart data prepared: ${priceDataForChart.length} records`);
        
        // Add a small delay to prevent flashing
        setTimeout(() => {
          setPriceData(priceDataForChart);
          setDataStable(true);
        }, 100);
      } catch (error) {
        console.error('Error fetching price history for chart:', error);
        setPriceData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceHistory();
  }, [crop, locationId]); // Removed 'data' from dependency array to prevent loops

  if (isLoading || !dataStable) {
    return (
      <Card className="glass-medium">
        <CardHeader>
          <CardTitle className="text-strong">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="text-enhanced">Loading price trends...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!priceData || priceData.length === 0) {
    return (
      <Card className="glass-medium">
        <CardHeader>
          <CardTitle className="text-strong">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <p className="text-enhanced">No trend data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort data by date and format for chart
  const chartData = priceData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      }),
      price: item.price,
      fullDate: item.date,
    }));

  console.log(`📊 Chart rendering with ${chartData.length} data points:`, chartData.slice(0, 3));

  const formatTooltip = (value: number, name: string) => {
    if (name === 'price') {
      return [`₹${value.toLocaleString()}`, 'Price'];
    }
    return [value, name];
  };

  const formatYAxis = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  const minPrice = Math.min(...chartData.map(d => d.price));
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const padding = (maxPrice - minPrice) * 0.1;

  return (
    <Card className="glass-medium">
      <CardHeader>
        <CardTitle className="text-strong">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-xs text-enhanced"
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                className="text-xs text-enhanced"
                domain={[minPrice - padding, maxPrice + padding]}
              />
              <Tooltip
                formatter={formatTooltip}
                labelClassName="text-sm font-medium text-strong"
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#4ade80', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-xs text-enhanced">
          <div className="flex justify-between">
            <span>Min: ₹{minPrice.toLocaleString()}</span>
            <span>Max: ₹{maxPrice.toLocaleString()}</span>
            <span>Avg: ₹{Math.round(chartData.reduce((sum, d) => sum + d.price, 0) / chartData.length).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTrendChart;