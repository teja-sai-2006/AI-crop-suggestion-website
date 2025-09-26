// Test script to verify language switching and response quality
import { generateMockResponse } from './src/data/mockChatResponses.js';

console.log('🧪 Testing Language Support and Response Quality\n');

// Test messages in different categories
const testMessages = [
  'I need help with growing crops',
  'What about weather conditions?', 
  'My plants have some disease',
  'Tell me about market prices'
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'kn', name: 'Kannada' }
];

console.log('🌐 Testing all language combinations:\n');

languages.forEach(lang => {
  console.log(`\n📋 === ${lang.name.toUpperCase()} (${lang.code}) RESPONSES ===\n`);
  
  testMessages.forEach((message, index) => {
    try {
      const response = generateMockResponse(message, lang.code);
      
      console.log(`${index + 1}. Question: "${message}"`);
      console.log(`   Language: ${lang.name}`);
      console.log(`   Response Length: ${response.message.length} characters`);
      console.log(`   Confidence: ${response.confidence}%`);
      console.log(`   Topic: ${response.topic}`);
      console.log(`   Sample: ${response.message.substring(0, 100)}...`);
      
      // Check for proper language content
      if (lang.code === 'hi' && response.message.includes('स्वागत')) {
        console.log(`   ✅ Hindi content detected`);
      } else if (lang.code === 'kn' && response.message.includes('ಸ್ವಾಗತ')) {
        console.log(`   ✅ Kannada content detected`);
      } else if (lang.code === 'en' && response.message.includes('Welcome')) {
        console.log(`   ✅ English content detected`);
      } else {
        console.log(`   ⚠️  Checking language content...`);
      }
      
      console.log('   ---');
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  });
});

console.log('\n✅ Language testing completed!');
console.log('\n📊 Expected Results:');
console.log('• English: Long, detailed responses in English');
console.log('• Hindi: Long, detailed responses in Devanagari script');
console.log('• Kannada: Long, detailed responses in Kannada script');
console.log('• All responses should be 1000+ characters for comprehensive advice');