# Farcaster Miniapp Assets Instructions

This document provides instructions for converting the SVG assets to PNG format for your Farcaster miniapp.

## Assets Created

1. `public/logo.svg` - Logo asset (convert to 192x192 PNG)
2. `public/splash.svg` - Splash screen asset (convert to 400x400 PNG)

## Conversion Instructions

### Option 1: Using Online Converters
1. Visit https://svgtopng.com/ or https://cloudconvert.com/svg-to-png
2. Upload the SVG files
3. Set the following dimensions:
   - logo.svg: 192x192 pixels
   - splash.svg: 400x400 pixels
4. Convert and download the PNG files
5. Replace the placeholder PNG files in the `public` directory

### Option 2: Using Command Line (ImageMagick)
If you have ImageMagick installed:

```bash
# Convert logo.svg to PNG
magick convert -background none -resize 192x192 public/logo.svg public/logo.png

# Convert splash.svg to PNG
magick convert -background none -resize 400x400 public/splash.svg public/splash.png
```

### Option 3: Using Design Software
1. Open the SVG files in design software like Adobe Illustrator, Figma, or Inkscape
2. Export as PNG with the specified dimensions
3. Replace the placeholder files

## Farcaster Requirements

- `logo.png`: 192x192 pixels (required)
- `splash.png`: 400x400 pixels (required)
- Both files should be in the `public` directory
- The farcaster.json file has been updated to reference these files at:
  - https://asd.com/logo.png
  - https://asd.com/splash.png

## Verification

After converting the assets, verify that:
1. The PNG files are in the `public` directory
2. The files have the correct dimensions
3. The farcaster.json file points to the correct URLs