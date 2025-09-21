import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MarketLocation } from '@/types/marketPrices.types';

interface MarketSelectorProps {
  markets: MarketLocation[];
  selectedMarket: string;
  onMarketChange: (marketId: string) => void;
  loading?: boolean;
}

const MarketSelector: React.FC<MarketSelectorProps> = ({
  markets,
  selectedMarket,
  onMarketChange,
  loading = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="market-selector" className="text-sm font-medium text-enhanced text-overlay">
        Select Market
      </Label>
      <Select
        value={selectedMarket}
        onValueChange={onMarketChange}
        disabled={loading}
      >
        <SelectTrigger id="market-selector" className="w-full glass text-enhanced">
          <SelectValue placeholder={loading ? "Loading markets..." : "Choose a market"} />
        </SelectTrigger>
        <SelectContent className="glass">
          {markets.map((market) => (
            <SelectItem key={market.id} value={market.id} className="text-enhanced">
              {market.name}, {market.state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MarketSelector;