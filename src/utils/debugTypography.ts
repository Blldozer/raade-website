
/**
 * Debug Typography - Helper function to visualize responsive text scaling
 * 
 * This utility adds a display showing current viewport dimensions and 
 * toggles a visual grid to help with typography alignment.
 */

export const initDebugTypography = () => {
  // Only run in development
  if (process.env.NODE_ENV !== 'development') return;
  
  // Create debugging element
  const debugElement = document.createElement('div');
  debugElement.className = 'debug-typography';
  debugElement.setAttribute('title', 'Click to toggle typography grid');
  
  // Set initial viewport data
  updateDebugInfo(debugElement);
  
  // Add to DOM
  document.body.appendChild(debugElement);
  
  // Setup resize listener
  window.addEventListener('resize', () => updateDebugInfo(debugElement));
  
  // Toggle grid on click
  let gridVisible = false;
  debugElement.addEventListener('click', () => {
    gridVisible = !gridVisible;
    toggleTypographyGrid(gridVisible);
  });
  
  // Keyboard shortcut (Alt+Shift+G) to toggle grid
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.key === 'G') {
      gridVisible = !gridVisible;
      toggleTypographyGrid(gridVisible);
    }
  });
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', () => updateDebugInfo(debugElement));
    document.removeEventListener('keydown', (e) => {
      // Cleanup keydown event
    });
    if (document.body.contains(debugElement)) {
      document.body.removeChild(debugElement);
    }
    const grid = document.getElementById('typography-debug-grid');
    if (grid) document.body.removeChild(grid);
  };
};

// Update the debug info display
const updateDebugInfo = (element: HTMLElement) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
  // Determine current breakpoint
  let breakpoint = 'xs';
  if (width >= 1400) breakpoint = '2xl';
  else if (width >= 1280) breakpoint = 'xl';
  else if (width >= 1024) breakpoint = 'lg';
  else if (width >= 768) breakpoint = 'md';
  else if (width >= 640) breakpoint = 'sm';
  
  // Calculate characters per line for body text
  const bodyTextSize = parseFloat(getComputedStyle(document.body).fontSize);
  const estCharsPerLine = Math.floor(width / (bodyTextSize * 0.5)); // Approximation
  
  element.innerHTML = `
    <div>Width: ${width}px | Height: ${height}px</div>
    <div>Breakpoint: ${breakpoint} | Base Font: ${baseFontSize.toFixed(2)}px</div>
    <div>~${estCharsPerLine} chars/line | Click to toggle grid</div>
  `;
};

// Toggle the typography grid for visual debugging
const toggleTypographyGrid = (show: boolean) => {
  let grid = document.getElementById('typography-debug-grid');
  
  if (show) {
    if (!grid) {
      grid = document.createElement('div');
      grid.id = 'typography-debug-grid';
      grid.style.position = 'fixed';
      grid.style.top = '0';
      grid.style.left = '0';
      grid.style.right = '0';
      grid.style.bottom = '0';
      grid.style.zIndex = '9998';
      grid.style.pointerEvents = 'none';
      grid.style.backgroundImage = `
        linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px),
        linear-gradient(to right, rgba(0,0,255,0.1) 1px, transparent 1px)
      `;
      grid.style.backgroundSize = `auto calc(var(--line-height-normal) * var(--font-size-normal)), var(--content-width-optimal) auto`;
      grid.style.backgroundPosition = 'center center';
      
      document.body.appendChild(grid);
    }
  } else if (grid) {
    document.body.removeChild(grid);
  }
};
