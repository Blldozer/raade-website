/**
 * Video Optimization Script
 * 
 * This script converts the hero background video from MP4 to WebM format
 * for better performance and smaller file sizes.
 * 
 * Benefits:
 * - Smaller file sizes (typically 30-40% smaller than MP4)
 * - Better compression efficiency
 * - Open source format with broad browser support
 * - Particularly efficient for web streaming
 * 
 * Requirements:
 * - FFmpeg must be installed on your system
 * - Run 'npm install fluent-ffmpeg' before running this script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

// Convert exec to Promise-based
const execPromise = promisify(exec);

// Get the directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicFolder = path.join(projectRoot, 'public');

// FFmpeg executable path for Windows
const FFMPEG_PATH = 'C:\\Users\\ifeol\\Downloads\\ffmpeg\\bin\\ffmpeg.exe';

// Source and output files
const sourceFile = path.join(publicFolder, 'hero-background.mp4');
const outputFile = path.join(publicFolder, 'hero-background.webm');

// Video conversion settings
const VIDEO_SETTINGS = {
  // Video codec (VP9 offers better compression than VP8)
  codec: 'libvpx-vp9',
  // Constant Rate Factor (0-63) - lower means better quality (15-35 is good range)
  crf: 31,
  // Bitrate control
  bitrate: '1M',
  // Speed/quality tradeoff (0-5) - higher means faster encoding but lower quality
  speed: 1,
  // Preserve original video resolution
  scale: false
};

/**
 * Check if FFmpeg is installed
 */
async function checkFFmpeg() {
  try {
    await execPromise(`"${FFMPEG_PATH}" -version`);
    console.log('✅ FFmpeg is installed and accessible');
    return true;
  } catch (error) {
    console.error('❌ FFmpeg is not accessible at path:', FFMPEG_PATH);
    return false;
  }
}

/**
 * Get video information using FFmpeg
 */
async function getVideoInfo(filePath) {
  try {
    const { stdout } = await execPromise(`"${FFMPEG_PATH}" -i "${filePath}" 2>&1`);
    console.log('Video information:', stdout);
    return stdout;
  } catch (error) {
    // FFmpeg outputs to stderr even for successful info queries
    return error.stderr;
  }
}

/**
 * Convert video to WebM format
 */
async function convertVideo() {
  console.log(`\n🎬 Converting video: ${path.basename(sourceFile)} to WebM format...`);
  
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Source file does not exist: ${sourceFile}`);
    return false;
  }
  
  try {
    // Get the original file size for comparison
    const originalSize = fs.statSync(sourceFile).size;
    console.log(`📊 Original size: ${formatBytes(originalSize)}`);
    
    // Build the FFmpeg command
    const ffmpegCmd = 
      `"${FFMPEG_PATH}" -i "${sourceFile}" -c:v ${VIDEO_SETTINGS.codec} ` +
      `-b:v ${VIDEO_SETTINGS.bitrate} -crf ${VIDEO_SETTINGS.crf} ` +
      `-deadline good -cpu-used ${VIDEO_SETTINGS.speed} ` +
      // If audio exists, include it, otherwise just video
      `-an "${outputFile}" -y`;
    
    console.log(`🔄 Running: ${ffmpegCmd}`);
    
    // Execute the command
    const { stdout, stderr } = await execPromise(ffmpegCmd);
    if (stderr) console.log(stderr);
    
    // Check if conversion was successful
    if (fs.existsSync(outputFile)) {
      const newSize = fs.statSync(outputFile).size;
      const savings = originalSize - newSize;
      const percentSaved = ((savings / originalSize) * 100).toFixed(2);
      
      console.log(`✅ Conversion complete!`);
      console.log(`📊 New size: ${formatBytes(newSize)}`);
      console.log(`💰 Space saved: ${formatBytes(savings)} (${percentSaved}% smaller)`);
      
      // Update video component to use WebM version
      await updateVideoComponent();
      
      return true;
    } else {
      console.error('❌ Conversion failed: Output file was not created');
      return false;
    }
  } catch (error) {
    console.error('❌ Error during conversion:', error.message);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

/**
 * Update the VideoBackground component to use WebM video with MP4 fallback
 */
async function updateVideoComponent() {
  console.log('\n🔄 Updating VideoBackground component with WebM source...');
  
  const videoComponentPath = path.join(
    projectRoot, 
    'src', 
    'components', 
    'hero', 
    'components', 
    'VideoBackground.tsx'
  );
  
  if (!fs.existsSync(videoComponentPath)) {
    console.error(`❌ VideoBackground component not found at: ${videoComponentPath}`);
    return false;
  }
  
  try {
    // Read the current component file
    let content = fs.readFileSync(videoComponentPath, 'utf8');
    
    // Check if the file already has WebM support
    if (content.includes('/hero-background.webm')) {
      console.log('ℹ️ VideoBackground already has WebM support');
      return true;
    }
    
    // Replace the video source with WebM + MP4 fallback
    const oldVideoTag = /<source src="\/hero-background\.mp4" type="video\/mp4" \/>/;
    const newVideoTag = 
      `<source src="/hero-background.webm" type="video/webm" />\n` +
      `        <source src="/hero-background.mp4" type="video/mp4" />`;
    
    // Replace the content
    const newContent = content.replace(oldVideoTag, newVideoTag);
    
    // Write back to file
    fs.writeFileSync(videoComponentPath, newContent, 'utf8');
    console.log('✅ VideoBackground component updated with WebM source + MP4 fallback!');
    
    return true;
  } catch (error) {
    console.error('❌ Error updating VideoBackground component:', error.message);
    return false;
  }
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Main function
 */
async function main() {
  console.log('🎥 Video Conversion Script - MP4 to WebM');
  console.log('=========================================');
  
  // Check if FFmpeg is installed
  const ffmpegInstalled = await checkFFmpeg();
  if (!ffmpegInstalled) {
    return;
  }
  
  // Convert video
  await convertVideo();
  
  console.log('\n✅ Video conversion process complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Install fluent-ffmpeg if you want to enhance this script: npm install fluent-ffmpeg');
  console.log('2. Test the website to ensure the video plays correctly with WebM format');
  console.log('3. If there are any issues, the MP4 fallback will be used automatically');
}

// Run the script
main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
