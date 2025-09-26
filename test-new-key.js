// Test the new API key with different model names
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testNewApiKey() {
  const apiKey = 'AIzaSyCUH0EVYuqmSyRqAabFU3JsYPex40qeNn8';
  
  console.log('🔑 Testing NEW API Key:', apiKey.substring(0, 20) + '...');
  console.log('─'.repeat(60));
  
  // Test different model variations
  const modelsToTest = [
    'gemini-1.5-pro',
    'gemini-1.5-flash', 
    'gemini-pro',
    'models/gemini-1.5-pro',
    'models/gemini-1.5-flash',
    'models/gemini-pro'
  ];
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`\n🧪 Testing: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent('Hello, this is a test message for farming advice');
      const response = await result.response;
      const text = response.text();
      
      if (text && text.length > 10) {
        console.log(`✅ SUCCESS! "${modelName}" is working!`);
        console.log(`📝 Response: ${text.substring(0, 100)}...`);
        console.log(`🎯 USE THIS MODEL: "${modelName}"`);
        return modelName;
      }
      
    } catch (error) {
      if (error.message.includes('quota')) {
        console.log(`⚠️ "${modelName}" - Quota exceeded (but API key is valid)`);
      } else if (error.message.includes('404') || error.message.includes('not found')) {
        console.log(`❌ "${modelName}" - Model not found/available`);
      } else {
        console.log(`❌ "${modelName}" - Error: ${error.message.split(':')[0]}`);
      }
    }
  }
  
  console.log('\n❌ No working models found. Check API key or try later.');
}

testNewApiKey().catch(console.error);