# Gemini AI Integration Setup

This document explains how to integrate Google Gemini AI with your KrishiMitra chatbot.

## Prerequisites

1. Google AI Studio account
2. Gemini API key

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click on "Get API key" in the sidebar
4. Create a new API key or use an existing one
5. Copy your API key

### 2. Configure Environment Variables

1. Open the `.env` file in your project root
2. Find the line: `VITE_GOOGLE_GEMINI_API_KEY=`
3. Add your API key after the equals sign:
   ```
   VITE_GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Test the Integration

1. Start the development server: `npm run dev`
2. Navigate to the Chat page
3. Look for the AI status indicator in the top-right corner:
   - 🟢 "AI Active" = Gemini AI is working
   - 🟡 "AI Fallback" = Using mock responses (API key might be missing/invalid)

## Features

### AI-Powered Responses
- Real farming advice powered by Google Gemini AI
- Context-aware conversations
- Multi-language support (English, Hindi, Telugu, Tamil, Bengali, Marathi)

### Fallback System
- Automatic fallback to mock responses if Gemini AI is unavailable
- Ensures the chat always works even without internet/API issues

### Smart Context
- Maintains conversation history for better responses
- Understands farming terminology and regional practices
- Provides practical, actionable advice

## API Usage

The Gemini integration includes:
- Specialized farming prompts
- Regional farming knowledge
- Safety guidelines for pesticides and fertilizers
- Seasonal advice
- Cost-effective solutions
- Traditional and modern farming practices

## Troubleshooting

### "AI Fallback" Status
- Check if your API key is correctly set in `.env`
- Verify your internet connection
- Ensure your Gemini API quota isn't exhausted

### Error Messages
- "API key not found" = Add `VITE_GOOGLE_GEMINI_API_KEY` to your `.env` file
- "Failed to send message" = Check network connection or API status

### Development Tips
- Restart the dev server after changing `.env` variables
- Check browser console for detailed error messages
- Test with simple farming questions first

## Example Questions to Test

Try these questions to test the AI integration:
- "What's the best time to plant rice?"
- "How do I control pests in tomato plants?"
- "What fertilizer should I use for wheat?"
- "How much water does corn need?"

## Security Note

Never commit your actual API key to version control. The `.env` file should remain local to your development environment.