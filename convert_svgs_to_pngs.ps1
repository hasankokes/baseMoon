# PowerShell script to convert SVG files to PNG for Base Moon Farcaster Mini App
# This script requires ImageMagick to be installed on your system
# Download ImageMagick from: https://imagemagick.org/script/download.php

Write-Host "Converting SVG files to PNG for Base Moon Farcaster Mini App" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

# Check if ImageMagick is installed
try {
    $magickVersion = magick -version
    Write-Host "ImageMagick found:" -ForegroundColor Cyan
    Write-Host $magickVersion.Split("`n")[0] -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: ImageMagick not found!" -ForegroundColor Red
    Write-Host "Please install ImageMagick from https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    Write-Host "After installation, make sure to add it to your system PATH" -ForegroundColor Yellow
    exit 1
}

# Get the current directory
$currentDir = Get-Location
Write-Host "Working in directory: $currentDir" -ForegroundColor Gray

# Define conversion operations
$conversions = @(
    @{svg="logo.svg"; png="logo.png"; width=192; height=192},
    @{svg="preview.svg"; png="preview.png"; width=400; height=400},
    @{svg="splash.svg"; png="splash.png"; width=400; height=400}
)

Write-Host "`nStarting conversions..." -ForegroundColor Green

foreach ($conv in $conversions) {
    $svgPath = Join-Path $currentDir "public" $conv.svg
    $pngPath = Join-Path $currentDir "public" $conv.png
    
    Write-Host "`nConverting $($conv.svg) to $($conv.png) ($($conv.width)x$($conv.height))..." -ForegroundColor Cyan
    
    # Check if SVG file exists
    if (Test-Path $svgPath) {
        try {
            # Convert SVG to PNG
            magick convert -background none -resize "$($conv.width)x$($conv.height)" $svgPath $pngPath
            
            # Check if conversion was successful
            if (Test-Path $pngPath) {
                $fileSize = (Get-Item $pngPath).Length
                Write-Host "✓ Success: $($conv.png) created ($fileSize bytes)" -ForegroundColor Green
            } else {
                Write-Host "✗ Failed: $($conv.png) was not created" -ForegroundColor Red
            }
        } catch {
            Write-Host "✗ Error converting $($conv.svg): $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ SVG file not found: $svgPath" -ForegroundColor Red
    }
}

Write-Host "`nConversion process completed!" -ForegroundColor Green
Write-Host "Your PNG files should now be viewable in the public directory." -ForegroundColor Yellow
Write-Host "After converting, commit and push the changes to your repository." -ForegroundColor Yellow