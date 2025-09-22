// Quick verification of marketplace data
console.log('🔍 DEBUGGING MARKETPLACE DATA:');

// Check if data is being generated
import { mockMarketPrices } from './src/data/mockMarketPrices';
console.log(`📊 Total market prices: ${mockMarketPrices.length}`);

if (mockMarketPrices.length > 0) {
  const samplePrice = mockMarketPrices[0];
  console.log('📝 Sample price record:', samplePrice);
  
  // Check date range
  const dates = mockMarketPrices.map(p => p.date).sort();
  console.log(`📅 Date range: ${dates[0]} to ${dates[dates.length - 1]}`);
  
  // Check crops
  const uniqueCrops = [...new Set(mockMarketPrices.map(p => p.crop))];
  console.log(`🌾 Unique crops: ${uniqueCrops.length}`, uniqueCrops.slice(0, 5));
  
  // Check locations
  const uniqueLocations = [...new Set(mockMarketPrices.map(p => p.locationId))];
  console.log(`🏪 Unique locations: ${uniqueLocations.length}`, uniqueLocations.slice(0, 5));
} else {
  console.log('❌ No market prices generated!');
}