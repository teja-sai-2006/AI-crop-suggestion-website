// Quick verification script to check our marketplace data
const fs = require('fs');
const path = require('path');

// Read the generated market prices file
const marketPricesPath = path.join(__dirname, 'src/data/mockMarketPrices.ts');
const content = fs.readFileSync(marketPricesPath, 'utf8');

// Extract the array content (simplified parsing)
const arrayStart = content.indexOf('const mockMarketPrices: MarketPrice[] = [');
const arrayEnd = content.indexOf('];', arrayStart);

if (arrayStart !== -1 && arrayEnd !== -1) {
  console.log('📊 MARKETPLACE DATA VERIFICATION:');
  
  // Count lines in the array to estimate records
  const arrayContent = content.substring(arrayStart, arrayEnd + 2);
  const lines = arrayContent.split('\n');
  
  // Count opening braces to estimate objects
  const objectCount = (arrayContent.match(/{/g) || []).length;
  
  console.log(`✅ Estimated price records: ${objectCount.toLocaleString()}`);
  console.log(`✅ Array content lines: ${lines.length.toLocaleString()}`);
  
  // Expected: 76 crops × 91 locations × 30 days = 207,240 records
  const expectedRecords = 76 * 91 * 30;
  console.log(`🎯 Expected records: ${expectedRecords.toLocaleString()}`);
  
  const coverage = (objectCount / expectedRecords * 100).toFixed(1);
  console.log(`📈 Coverage: ${coverage}%`);
  
  if (objectCount >= expectedRecords * 0.95) {
    console.log('🎉 PRESENTATION READY: Complete data coverage achieved!');
  } else if (objectCount >= 50000) {
    console.log('✅ GOOD: Substantial data available for demo');
  } else {
    console.log('⚠️ WARNING: Limited data - may need more generation');
  }
} else {
  console.log('❌ Could not parse market prices array');
}

console.log('\n🔍 File size check:');
const stats = fs.statSync(marketPricesPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`📁 mockMarketPrices.ts size: ${fileSizeMB} MB`);

if (stats.size > 10 * 1024 * 1024) { // > 10MB
  console.log('🚀 EXCELLENT: Large comprehensive dataset generated!');
} else if (stats.size > 1 * 1024 * 1024) { // > 1MB  
  console.log('✅ GOOD: Substantial dataset for presentation');
} else {
  console.log('⚠️ Small dataset - consider expanding for full demo');
}