import React from 'react';
import { Navigation } from '@/components/Navigation';
import MarketPrices from '@/components/MarketPrices/MarketPrices';

const MarketPricesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <MarketPrices />
      </div>
    </div>
  );
};

export default MarketPricesPage;


