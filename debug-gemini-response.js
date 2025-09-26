// Debug test for Gemini API response issue
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyCUH0EVYuqmSyRqAabFU3JsYPex40qeNn8';

async function testGeminiResponse() {
  console.log('🧪 Testing Gemini API Response Handling\n');
  
  try {
    console.log('1. Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    console.log('2. Sending test message...');
    const result = await model.generateContent('Say hello');
    
    console.log('3. Getting response object...');
    const response = await result.response;
    
    console.log('4. Response object structure:', Object.keys(response));
    
    console.log('5. Extracting text...');
    const text = response.text();
    
    console.log('6. Response details:');
    console.log('   - Text length:', text?.length || 0);
    console.log('   - Text content:', text || 'NO TEXT');
    console.log('   - Text type:', typeof text);
    
    if (text) {
      console.log('✅ SUCCESS: Got valid response from Gemini');
    } else {
      console.log('❌ PROBLEM: Response is empty or undefined');
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('   Stack:', error.stack);
  }
}

// Run the test
testGeminiResponse();