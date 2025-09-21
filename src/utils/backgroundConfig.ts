// Background image configuration for transparent design
export const backgroundImages = {
  // Updated rotating backgrounds with available images
  default: [
    '/src/assets/backgrounds/hero-farmland.jpg',
    '/src/assets/backgrounds/farm-field-sunset.jpg',
    '/src/assets/backgrounds/wheat-field.jpg',
    '/src/assets/backgrounds/rolling-hills.jpg',
    '/src/assets/backgrounds/sunflower-field.jpg',
    '/src/assets/backgrounds/mountain-valley.jpg',
    '/src/assets/backgrounds/corn-field.jpg',
    '/src/assets/backgrounds/barley-field.jpg',
    '/src/assets/backgrounds/tea-plantation.jpg',
    '/src/assets/backgrounds/vineyard.jpg',
    '/src/assets/backgrounds/cool-farming-ybreiif7eiumpdky.jpg',
    '/src/assets/backgrounds/nature-landscape.jpg',
  ],
  
  // Page-specific backgrounds
  landing: '/src/assets/backgrounds/hero-farmland.jpg',
  home: '/src/assets/backgrounds/farm-field-sunset.jpg',
  weather: '/src/assets/backgrounds/rolling-hills.jpg',
  crops: '/src/assets/backgrounds/wheat-field.jpg',
  tracker: '/src/assets/backgrounds/corn-field.jpg',
  disease: '/src/assets/backgrounds/sunflower-field.jpg',
  market: '/src/assets/backgrounds/barley-field.jpg',
  recommendation: '/src/assets/backgrounds/tea-plantation.jpg',
  chat: '/src/assets/backgrounds/vineyard.jpg',
  records: '/src/assets/backgrounds/cool-farming-ybreiif7eiumpdky.jpg',
  expert: '/src/assets/backgrounds/mountain-valley.jpg',
  
  // Fallback gradient
  fallback: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)'
};

// Background rotation intervals (in seconds)
export const backgroundRotationInterval = 30;

// Function to get a random background image
export const getRandomBackground = () => {
  const images = backgroundImages.default;
  return images[Math.floor(Math.random() * images.length)];
};

// Function to set page-specific background
export const setPageBackground = (page: keyof typeof backgroundImages) => {
  if (page === 'default') return;
  
  const image = backgroundImages[page];
  if (image && typeof document !== 'undefined') {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${image}')`;
  }
};

// CSS class helpers for different transparency levels
export const transparencyClasses = {
  ultraLight: 'glass-ultra',    // Most transparent - 5% opacity
  light: 'glass',               // Light transparent - 8% opacity
  medium: 'glass-medium',       // Medium transparent - 12% opacity
  textOverlay: 'text-overlay',  // For text readability
  textEnhanced: 'text-enhanced' // Enhanced text with shadow
};