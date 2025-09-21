# Transparent Design with Background Images 🌾

This KrishiMitra website now features a beautiful transparent design with high-quality nature and farming background images that rotate automatically.

## Features

### ✨ Ultra-Transparent Design
- All components are now transparent with glassmorphism effects
- Background images are clearly visible through all elements
- Text is enhanced with shadows for perfect readability
- Smooth backdrop blur effects for aesthetic appeal

### 🖼️ Background Images
The website includes 5 high-quality HD images:
1. **Nature Landscape** - Beautiful natural scenery
2. **Farm Field Sunset** - Golden sunset over farmland
3. **Wheat Field** - Golden wheat ready for harvest
4. **Rice Field** - Terraced rice fields
5. **Hero Farmland** - Original hero image

### 🔄 Auto-Rotating Backgrounds
- Backgrounds automatically rotate every 30 seconds
- Smooth CSS animations between transitions
- Fixed attachment for parallax effect

## Transparency Levels

The design uses three levels of transparency:

1. **`.glass-ultra`** - 5% opacity - Maximum transparency for main containers
2. **`.glass`** - 8% opacity - Standard transparent elements
3. **`.glass-medium`** - 12% opacity - Slightly more visible for important elements

## Text Enhancement

All text is enhanced for readability:
- **`.text-enhanced`** - Text shadow for better visibility
- **`.text-overlay`** - Background overlay for critical text areas

## How to Add Your Own Images

### Option 1: Replace Existing Images
1. Navigate to `/src/assets/backgrounds/`
2. Replace any of the existing images with your own
3. Keep the same filenames for automatic integration

### Option 2: Add New Images
1. Add your images to `/src/assets/backgrounds/`
2. Update `/src/utils/backgroundConfig.ts`
3. Add your image paths to the `default` array

### Option 3: Set Page-Specific Backgrounds
1. Edit `/src/utils/backgroundConfig.ts`
2. Update the page-specific background mappings
3. Import and use `setPageBackground('pageName')` in your components

## Background Image Requirements

- **Format**: JPG, PNG, WebP
- **Size**: Minimum 1920x1080 (Full HD)
- **Quality**: High resolution for crisp display
- **Aspect Ratio**: 16:9 recommended
- **File Size**: Optimize for web (aim for < 500KB per image)

## Customization Examples

### Change Rotation Interval
```typescript
// In backgroundConfig.ts
export const backgroundRotationInterval = 45; // 45 seconds
```

### Use Single Background
```css
/* In index.css */
body {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url('/src/assets/backgrounds/your-image.jpg');
  animation: none; /* Disable rotation */
}
```

### Adjust Transparency
```css
/* Make elements more visible */
.glass-ultra {
  background: rgba(255, 255, 255, 0.15); /* Increased opacity */
}
```

## Tips for Best Results

1. **Image Selection**: Choose images with varied light/dark areas to ensure text is always readable
2. **Color Harmony**: Select images that complement your brand colors
3. **Performance**: Compress images appropriately for web use
4. **Accessibility**: Ensure sufficient contrast between text and background
5. **Testing**: Test on different screen sizes and devices

## Troubleshooting

### Text Not Visible?
- Increase text shadow in `.text-enhanced`
- Add more background opacity to `.text-overlay`
- Consider using darker overlay gradients

### Images Not Loading?
- Check file paths in `backgroundConfig.ts`
- Ensure images are in the correct directory
- Verify image formats are supported

### Performance Issues?
- Optimize image file sizes
- Consider using WebP format
- Implement lazy loading for background images

---

**Enjoy your beautiful transparent farming website! 🌱**