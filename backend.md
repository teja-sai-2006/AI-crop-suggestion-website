# KrishiMitra Backend Implementation Guide

## Overview
This document outlines the complete backend implementation requirements for the KrishiMitra smart farming assistant. The frontend is currently using mock data and needs to be connected to real APIs and services.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Python 3.9+
- PostgreSQL or MongoDB
- Redis (for caching)
- Docker (optional, for containerization)

### Environment Setup
```bash
# Create .env file
cp .env.example .env

# Required environment variables
WEATHER_API_KEY=your_weather_api_key
OPENAI_API_KEY=your_openai_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
DATABASE_URL=postgresql://user:pass@localhost:5432/krishi_mitra
REDIS_URL=redis://localhost:6379
```

## 🌤️ Weather API Integration

### Recommended Weather APIs

#### 1. OpenWeatherMap (Recommended)
- **Free tier**: 1,000 calls/day
- **Features**: Current weather, 5-day forecast, historical data
- **Setup**: 
  ```bash
  npm install axios
  ```
  ```javascript
  // TODO: Replace mock data in WeatherPage.tsx
  const getWeatherData = async (lat, lon) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  };
  ```

#### 2. Tomorrow.io (Alternative)
- **Free tier**: 100 calls/day
- **Features**: Advanced weather analytics, agricultural insights
- **Better for**: Agricultural-specific weather data

#### 3. WeatherAPI (Backup)
- **Free tier**: 1M calls/month
- **Features**: Historical data, weather alerts

### Weather API Endpoints to Implement

```javascript
// Backend API endpoints needed
GET /api/weather/current?lat={lat}&lon={lon}
GET /api/weather/forecast?lat={lat}&lon={lon}&days={days}
GET /api/weather/historical?lat={lat}&lon={lon}&start={date}&end={date}
GET /api/weather/alerts?lat={lat}&lon={lon}
```

### Frontend Integration Points

**Files to update:**
- `src/pages/WeatherPage.tsx` - Replace mock data with API calls
- `src/pages/metrics/TemperatureDetails.tsx` - Connect to historical data API
- `src/pages/metrics/HumidityDetails.tsx` - Connect to historical data API
- `src/pages/metrics/WindDetails.tsx` - Connect to historical data API
- `src/pages/metrics/UVDetails.tsx` - Connect to historical data API
- `src/components/LocationSelector.tsx` - Add real geocoding API

**TODO Comments to Replace:**
```javascript
// TODO: Replace with real geocoding API
// TODO: Replace with weather API call
// TODO: Replace with historical weather data API
```

## 🗺️ Location Services

### Geocoding APIs

#### 1. Google Maps Geocoding API
```javascript
// TODO: Replace in LocationSelector.tsx
const geocodeLocation = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return response.data.results[0];
};
```

#### 2. OpenCage Geocoding API (Free alternative)
- **Free tier**: 2,500 requests/day
- **No API key required for testing**

### Reverse Geocoding
```javascript
// TODO: Replace in LocationSelector.tsx GPS functionality
const reverseGeocode = async (lat, lon) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.OPENCAGE_API_KEY}`
  );
  return response.data.results[0].formatted;
};
```

## 🤖 AI/Chatbot Integration

### OpenAI Integration
```javascript
// TODO: Replace in ChatBot.tsx
const getChatResponse = async (message, context) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are KrishiMitra, a helpful farming assistant. Provide advice in simple language suitable for farmers."
      },
      {
        role: "user",
        content: message
      }
    ],
    max_tokens: 500,
    temperature: 0.7
  });
  return response.choices[0].message.content;
};
```

### Multilingual Support
```javascript
// TODO: Add language detection and translation
const detectLanguage = async (text) => {
  // Use Google Translate API or Azure Translator
};

const translateText = async (text, targetLang) => {
  // Implement translation service
};
```

## 🌾 Crop Recommendation ML Model

### Model Requirements
- **Input**: Soil NPK, pH, temperature, rainfall, humidity
- **Output**: Recommended crops with confidence scores
- **Training Data**: Indian agricultural datasets

### Implementation Options

#### 1. Custom ML Model (Recommended)
```python
# TODO: Create ML model for crop recommendation
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

def train_crop_model():
    # Load Indian crop data
    df = pd.read_csv('data/indian_crop_data.csv')
    
    features = ['nitrogen', 'phosphorus', 'potassium', 'ph', 'temperature', 'rainfall', 'humidity']
    X = df[features]
    y = df['crop']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    return model
```

#### 2. Pre-trained Models
- **TensorFlow Hub**: Agricultural models
- **Hugging Face**: Crop classification models

### API Endpoint
```javascript
// TODO: Replace in CropRecommendationPage.tsx
POST /api/crops/recommend
{
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "ph": 6.5,
  "temperature": 25,
  "rainfall": 202,
  "humidity": 80
}

Response:
{
  "recommendations": [
    {
      "crop": "Wheat",
      "confidence": 0.92,
      "season": "Rabi",
      "expectedYield": "45 quintals/hectare"
    }
  ]
}
```

## 📊 Crop Tracker Database

### Database Schema
```sql
-- TODO: Create database tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    variety VARCHAR(255),
    sowing_date DATE NOT NULL,
    expected_harvest_date DATE,
    location VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crop_activities (
    id SERIAL PRIMARY KEY,
    crop_id INTEGER REFERENCES crops(id),
    activity_type VARCHAR(100) NOT NULL,
    activity_date DATE NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending'
);
```

### API Endpoints
```javascript
// TODO: Replace in CropTrackerPage.tsx and AddCropModal.tsx
GET /api/crops - Get user's crops
POST /api/crops - Add new crop
PUT /api/crops/:id - Update crop
DELETE /api/crops/:id - Delete crop
GET /api/crops/:id/activities - Get crop activities
POST /api/crops/:id/activities - Add activity
```

## 🦠 Disease Detection

### Image Processing APIs

#### 1. Custom Computer Vision Model
```python
# TODO: Create disease detection model
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0

def create_disease_model():
    base_model = EfficientNetB0(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    return model
```

#### 2. Pre-trained Models
- **PlantNet API**: Plant identification
- **Microsoft Custom Vision**: Custom disease detection

### API Endpoint
```javascript
// TODO: Replace in DiseaseDetectionPage.tsx
POST /api/disease/detect
Content-Type: multipart/form-data

Response:
{
  "disease": "Rust",
  "confidence": 0.85,
  "treatment": "Apply fungicide spray",
  "prevention": "Use resistant varieties"
}
```

## 🗣️ Voice Features (TTS/STT)

### Text-to-Speech
```javascript
// TODO: Add TTS for chatbot responses
const speakText = (text, language = 'hi-IN') => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
};
```

### Speech-to-Text
```javascript
// TODO: Replace in ChatBot.tsx voice input
const startVoiceInput = () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'hi-IN'; // Hindi
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInputValue(transcript);
  };
  recognition.start();
};
```

## 📱 Mobile App Integration

### PWA Features
```javascript
// TODO: Add service worker for offline functionality
// public/sw.js
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/weather')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

## 🔒 Security Best Practices

### API Key Management
```javascript
// TODO: Implement secure API key handling
const secureApiCall = async (endpoint, data) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getSecureToken()}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

### Data Validation
```javascript
// TODO: Add input validation
const validateCropData = (data) => {
  const schema = {
    name: { type: 'string', required: true, minLength: 1 },
    sowingDate: { type: 'date', required: true },
    location: { type: 'string', maxLength: 255 }
  };
  return validate(data, schema);
};
```

## 🚀 Deployment

### Backend Deployment Options

#### 1. Vercel (Recommended for Node.js)
```bash
# TODO: Deploy backend to Vercel
npm install -g vercel
vercel --prod
```

#### 2. Railway
```bash
# TODO: Deploy to Railway
railway login
railway init
railway up
```

#### 3. AWS/GCP/Azure
- Use containerized deployment
- Set up load balancers
- Configure auto-scaling

### Database Deployment
```bash
# TODO: Set up production database
# Option 1: Supabase (PostgreSQL)
# Option 2: MongoDB Atlas
# Option 3: PlanetScale (MySQL)
```

## 📊 Monitoring & Analytics

### Error Tracking
```javascript
// TODO: Add error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### Performance Monitoring
```javascript
// TODO: Add performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 Data Caching Strategy

### Redis Caching
```javascript
// TODO: Implement Redis caching
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

const cacheWeatherData = async (key, data, ttl = 3600) => {
  await client.setex(key, ttl, JSON.stringify(data));
};

const getCachedWeatherData = async (key) => {
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
};
```

### Frontend Caching
```javascript
// TODO: Add service worker caching
// Cache weather data for 1 hour
// Cache crop data for 24 hours
// Cache static assets indefinitely
```

## 📋 Implementation Priority

### Phase 1 (High Priority)
1. ✅ Weather API integration
2. ✅ Location services (geocoding)
3. ✅ Basic crop tracker database
4. ✅ User authentication

### Phase 2 (Medium Priority)
1. ✅ AI chatbot integration
2. ✅ Crop recommendation ML model
3. ✅ Disease detection API
4. ✅ Voice features

### Phase 3 (Low Priority)
1. ✅ Advanced analytics
2. ✅ Mobile app features
3. ✅ Offline functionality
4. ✅ Performance optimization

## 🧪 Testing Strategy

### Unit Tests
```javascript
// TODO: Add unit tests
describe('Weather API', () => {
  test('should fetch weather data', async () => {
    const data = await getWeatherData(19.0760, 72.8777);
    expect(data).toHaveProperty('current');
  });
});
```

### Integration Tests
```javascript
// TODO: Add integration tests
describe('Crop Tracker', () => {
  test('should create and retrieve crops', async () => {
    const crop = await createCrop(mockCropData);
    const retrieved = await getCrop(crop.id);
    expect(retrieved.name).toBe(mockCropData.name);
  });
});
```

## 📚 Additional Resources

### APIs and Services
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Google Maps Platform](https://developers.google.com/maps)
- [OpenAI API](https://platform.openai.com/docs)
- [PlantNet API](https://plantnet.org/)

### ML/AI Resources
- [TensorFlow Hub](https://tfhub.dev/)
- [Hugging Face Models](https://huggingface.co/models)
- [Indian Agricultural Datasets](https://data.gov.in/)

### Development Tools
- [Postman](https://www.postman.com/) - API testing
- [Redis CLI](https://redis.io/docs/manual/cli/) - Cache management
- [pgAdmin](https://www.pgadmin.org/) - Database management

---

## 🎯 Next Steps

1. **Install required packages**: `npm install axios redis ioredis`
2. **Set up environment variables** in `.env`
3. **Choose weather API** and get API key
4. **Set up database** (PostgreSQL recommended)
5. **Start with weather integration** (highest impact)
6. **Add authentication** for user data
7. **Implement crop tracker** database
8. **Add AI chatbot** integration
9. **Deploy to production** environment

Remember to replace all `TODO` comments in the frontend code with actual API calls as you implement each backend service.
