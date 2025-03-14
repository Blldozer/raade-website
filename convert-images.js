// Simple script to convert specific images to WebP format
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Images to convert
const imagesToConvert = [
  'RAADE-Innovation-Studio-1.jpg',
  'RAADE-Design-Sprint-Edith-Ibeke.jpg'
];

// Path to public directory
const publicDir = path.join(__dirname, 'public');

async function convertImages() {
  console.log('Converting images to WebP format...');
  
  for (const imageName of imagesToConvert) {
    const imagePath = path.join(publicDir, imageName);
    const outputPath = path.join(publicDir, imageName.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    // Check if source image exists
    if (!fs.existsSync(imagePath)) {
      console.log(`Source image not found: ${imageName}`);
      continue;
    }
    
    try {
      await sharp(imagePath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`Successfully converted: ${imageName} → ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`Error converting ${imageName}: ${error.message}`);
    }
  }
  
  console.log('Conversion complete!');
}

convertImages().catch(err => {
  console.error('Error:', err);
});
