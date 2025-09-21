import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MarketPrice, MarketLocation } from '@/types/marketPrices.types';

interface LatestPriceCardProps {
  price: MarketPrice | null;
  market?: MarketLocation | null;
  loading?: boolean;
}

const LatestPriceCard: React.FC<LatestPriceCardProps> = ({
  price,
  market,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!price) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Price</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No price data available</p>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = () => {
    if (price.trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (price.trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = () => {
    if (price.trend === 'up') return 'bg-green-100 text-green-800';
    if (price.trend === 'down') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Latest Price
          <Badge className={getTrendColor()}>
            {getTrendIcon()}
            <span className="ml-1">
              {price.changePercentage > 0 ? '+' : ''}
              {price.changePercentage.toFixed(1)}%
            </span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-green-600">
            ₹{price.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-600 ml-2">
              per {price.unit}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Crop:</strong> {price.crop}</p>
            <p><strong>Market:</strong> {price.location}</p>
            <p><strong>Quality:</strong> {price.quality}</p>
            <p><strong>Date:</strong> {new Date(price.date).toLocaleDateString()}</p>
          </div>
          {price.trend !== 'stable' && price.previousPrice && (
            <div className="text-xs text-gray-500">
              <p>
                {price.trend === 'up' ? 'Increased' : 'Decreased'} by ₹
                {Math.abs(price.price - price.previousPrice).toFixed(2)} from yesterday
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestPriceCard;