/**
 * Color utility functions for determining background color characteristics
 */

/**
 * Determines if a color is "light" based on luminance calculation
 * 
 * Uses the perceptual luminance formula that gives different weights to
 * RGB components based on human perception:
 * - Red contributes 30%
 * - Green contributes 59% 
 * - Blue contributes 11%
 * 
 * @param backgroundColor - CSS color value (rgb, rgba, or hex)
 * @returns boolean - true if the color is considered "light"
 */
export function isLightColor(backgroundColor: string): boolean {
  // Handle RGB/RGBA format
  let rgb = backgroundColor.match(/\d+/g);
  
  // Handle hex format (#RRGGBB or #RGB)
  if (!rgb && backgroundColor.startsWith('#')) {
    const hex = backgroundColor.substring(1);
    
    // Convert shorthand hex (#RGB) to full form (#RRGGBB)
    const fullHex = hex.length === 3 
      ? hex.split('').map(c => c + c).join('')
      : hex;
      
    if (fullHex.length === 6) {
      rgb = [
        parseInt(fullHex.substring(0, 2), 16).toString(),
        parseInt(fullHex.substring(2, 4), 16).toString(),
        parseInt(fullHex.substring(4, 6), 16).toString()
      ];
    }
  }
  
  // If we couldn't parse the color, assume it's dark
  if (!rgb) return false;
  
  // Calculate perceived brightness using the formula:
  // (R * 299 + G * 587 + B * 114) / 1000
  const brightness = (
    parseInt(rgb[0]) * 299 + 
    parseInt(rgb[1]) * 587 + 
    parseInt(rgb[2]) * 114
  ) / 1000;
  
  // Colors with brightness > 128 are considered "light"
  return brightness > 128;
}

/**
 * Gets the computed background color of an HTML element
 * 
 * @param element - HTML element to analyze
 * @returns string - Computed background color in rgb format
 */
export function getElementBackgroundColor(element: HTMLElement): string {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.backgroundColor;
}
