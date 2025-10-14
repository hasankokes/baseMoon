# PNG Creation Instructions for Farcaster Mini App

This document provides detailed instructions for creating proper PNG files for your Farcaster mini app.

## Current Assets

1. `public/logo.svg` - Logo (192x192) with gradient text and moon icon
2. `public/preview.svg` - Preview image (400x400) optimized for social sharing
3. `public/splash.svg` - Splash screen (400x400) with app name and description

## Creating PNG Files

### Option 1: Online SVG to PNG Converter

1. Visit https://svgtopng.com/ or https://cloudconvert.com/svg-to-png
2. Upload each SVG file and convert with the following dimensions:
   - `public/logo.svg`: 192x192 pixels → `public/logo.png`
   - `public/preview.svg`: 400x400 pixels → `public/preview.png`
   - `public/splash.svg`: 400x400 pixels → `public/splash.png`
3. Replace the placeholder PNG files with the converted versions

### Option 2: Using Command Line (ImageMagick)

If you have ImageMagick installed:

```bash
# Convert logo.svg to PNG
magick convert -background none -resize 192x192 public/logo.svg public/logo.png

# Convert preview.svg to PNG
magick convert -background none -resize 400x400 public/preview.svg public/preview.png

# Convert splash.svg to PNG
magick convert -background none -resize 400x400 public/splash.svg public/splash.png
```

### Option 3: Using Design Software

1. Open the SVG files in design software like Adobe Illustrator, Figma, or Inkscape
2. Export as PNG with the specified dimensions:
   - logo.svg: 192x192 pixels
   - preview.svg: 400x400 pixels
   - splash.svg: 400x400 pixels
3. Replace the placeholder files

## Farcaster Requirements

- `logo.png`: 192x192 pixels (required for app icon)
- `preview.png`: 400x400 pixels (required for preview images)
- `splash.png`: 400x400 pixels (required for splash screen)
- All files should be in the `public` directory
- The files are referenced in:
  - `public/.well-known/farcaster.json`
  - `index.html` meta tags
  - `minikit.config.ts`

## Verification

After creating the PNG files, verify that:
1. The PNG files are in the `public` directory
2. The files have the correct dimensions
3. The preview image shows properly when sharing the link

## Recommended Design Elements

For the best Farcaster preview experience, the images should:
1. Have a clear contrast between text and background
2. Use the gradient colors from your app (#43e97b to #38f9d7)
3. Include both "Base" and "Moon" text
4. Have a dark background (#121212) for consistency
5. Be readable at small sizes (192x192 for logo)
6. Preview image should be optimized for social sharing with larger text