/**
 * Image Optimization Script
 * 
 * This script converts team photos from JPG to WebP format, resizes them,
 * and optimizes them for web display.
 * 
 * Benefits:
 * - Smaller file sizes (typically 25-35% smaller than JPG)
 * - Better quality-to-size ratio
 * - Support for transparency
 * - Modern format supported by all major browsers
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicFolder = path.join(projectRoot, 'public');

// Source and destination folders
const sourceFolder = path.join(publicFolder, 'raade-individual-e-board-photos');
const outputFolder = path.join(publicFolder, 'raade-individual-e-board-photos-webp');

// Image optimization settings
const IMAGE_WIDTH = 500;  // Target width for images
const QUALITY = 85;       // WebP quality (0-100)

// Create output directory if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
  console.log(`Created output directory: ${outputFolder}`);
}

// Get list of all JPG files in source directory
async function getSourceImages() {
  try {
    const files = fs.readdirSync(sourceFolder);
    return files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') ||
      file.toLowerCase().endsWith('.png')
    );
  } catch (error) {
    console.error(`Error reading source directory: ${error.message}`);
    return [];
  }
}

// Process a single image
async function processImage(filename) {
  const inputPath = path.join(sourceFolder, filename);
  const outputFilename = filename.replace(/\.(jpe?g|png)$/i, '.webp');
  const outputPath = path.join(outputFolder, outputFilename);
  
  try {
    // Skip if WebP version already exists and is newer than source
    if (fs.existsSync(outputPath)) {
      const inputStat = fs.statSync(inputPath);
      const outputStat = fs.statSync(outputPath);
      
      if (outputStat.mtimeMs > inputStat.mtimeMs) {
        console.log(`Skipping ${filename} - WebP version is up to date`);
        return {
          filename,
          status: 'skipped',
          reason: 'up-to-date'
        };
      }
    }
    
    // Process the image
    await sharp(inputPath)
      .resize({
        width: IMAGE_WIDTH,
        withoutEnlargement: true, // Don't enlarge if image is smaller than target width
        fit: 'inside'
      })
      .webp({ 
        quality: QUALITY,
        alphaQuality: 100,
        effort: 6       // Higher value = better compression but slower (0-6)
      })
      .toFile(outputPath);
    
    // Get file sizes for reporting
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
    
    console.log(`✅ Converted: ${filename} → ${outputFilename} (${savings}% smaller)`);
    
    return {
      filename,
      originalSize: inputSize,
      webpSize: outputSize,
      savings: `${savings}%`,
      status: 'converted'
    };
  } catch (error) {
    console.error(`❌ Error processing ${filename}: ${error.message}`);
    return {
      filename,
      status: 'error',
      error: error.message
    };
  }
}

// Main function
async function main() {
  console.log('🖼️ Starting image conversion...');
  console.log(`Source: ${sourceFolder}`);
  console.log(`Output: ${outputFolder}`);
  
  const startTime = Date.now();
  const files = await getSourceImages();
  
  if (files.length === 0) {
    console.error('❌ No image files found in source directory.');
    return;
  }
  
  console.log(`Found ${files.length} image(s) to process.`);
  
  // Process all images
  const results = await Promise.all(files.map(processImage));
  
  // Summarize results
  const successful = results.filter(r => r.status === 'converted').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const failed = results.filter(r => r.status === 'error').length;
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successfully converted: ${successful}`);
  console.log(`⏭️ Skipped (already converted): ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  
  // Calculate total savings
  const convertedResults = results.filter(r => r.status === 'converted');
  if (convertedResults.length > 0) {
    const totalOriginalSize = convertedResults.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebpSize = convertedResults.reduce((sum, r) => sum + r.webpSize, 0);
    const totalSavings = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1);
    
    console.log(`💾 Total space saved: ${formatBytes(totalOriginalSize - totalWebpSize)} (${totalSavings}%)`);
  }
  
  const endTime = Date.now();
  console.log(`⏱️ Total processing time: ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
  
  console.log('\n📝 Next steps:');
  console.log('1. Update your code to use the WebP images');
  console.log('2. For optimal performance, add width and height attributes to <img> tags');
}

// Helper function to format bytes as human-readable
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run the script
main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
