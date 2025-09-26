// Simple debugging - let's check if there's a compatibility issue
console.log('🧪 Debugging Gemini API Response Issue\n');

console.log('🔍 POTENTIAL ISSUES TO CHECK:');
console.log('1. Response.text() might be async and needs await');
console.log('2. Response might be wrapped in additional structure');  
console.log('3. Error might be thrown but caught incorrectly');
console.log('4. Text extraction might be failing silently\n');

console.log('🛠️ FIXES TO IMPLEMENT:');
console.log('1. Add await to response.text() call');
console.log('2. Check response structure before text extraction');
console.log('3. Add more detailed error catching');
console.log('4. Verify response is not undefined\n');

console.log('✅ Adding fixes to the API service now...');