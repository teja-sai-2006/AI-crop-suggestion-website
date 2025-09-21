import React from 'react';
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
  if (loading) {
    return (
      <Card className="glass-medium">
        <CardHeader>
          <CardTitle className="text-strong">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 animate-pulse">
            <div className="h-full glass-ultra rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
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
  const chartData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      }),
      price: item.price,
      fullDate: item.date,
    }));

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