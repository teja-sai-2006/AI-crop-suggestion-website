// Test Gemini API key directly
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGeminiAPI() {
    try {
        // Your API key from .env file
        const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY;
        
        if (!apiKey) {
            console.error('❌ No API key found');
            return false;
        }

        console.log('🚀 Testing Gemini API with key:', apiKey.substring(0, 10) + '...');
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
        
        console.log('📡 Sending test message to Gemini...');
        const result = await model.generateContent('Hello, can you respond with just "API Working"?');
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ Gemini API Response:', text);
        console.log('✅ API Key is working correctly!');
        return true;
        
    } catch (error) {
        console.error('❌ Gemini API Error:', error);
        
        // Check specific error types
        if (error.message?.includes('API_KEY_INVALID')) {
            console.error('🔑 Invalid API Key - check your VITE_GOOGLE_GEMINI_API_KEY');
        } else if (error.message?.includes('PERMISSION_DENIED')) {
            console.error('🚫 Permission denied - API key may not have proper permissions');
        } else if (error.message?.includes('QUOTA_EXCEEDED')) {
            console.error('📊 Quota exceeded - check your API usage limits');
        } else if (error.message?.includes('BILLING_NOT_ACTIVE')) {
            console.error('💳 Billing not active - enable billing in Google Cloud Console');
        }
        
        return false;
    }
}

// Run the test
testGeminiAPI().then(result => {
    console.log('Test completed:', result ? 'SUCCESS' : 'FAILED');
});