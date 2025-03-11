import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

/**
 * This component helps visualize and debug touch interactions
 * It can be temporarily added to pages to test mobile responsiveness
 */
const TouchDebugger: React.FC = () => {
  const {
    deviceType,
    orientation,
    hasPrecisePointer,
    hasHoverCapability,
    hasCoarsePointer,
    performanceLevel,
    touchCapability,
    preferReducedMotion,
    width,
    height,
    breakpoint
  } = useResponsive();
  
  const [touchPoints, setTouchPoints] = React.useState<Array<{id: number, x: number, y: number}>>([]);
  const [lastTap, setLastTap] = React.useState<{x: number, y: number} | null>(null);
  
  React.useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const newPoints = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      }));
      setTouchPoints(newPoints);
      setLastTap(newPoints.length > 0 ? {x: newPoints[0].x, y: newPoints[0].y} : null);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const newPoints = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      }));
      setTouchPoints(newPoints);
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      setTouchPoints([]);
    };
    
    window.addEventListener('touchstart', handleTouchStart, {passive: false});
    window.addEventListener('touchmove', handleTouchMove, {passive: false});
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-4 z-50 max-h-[50vh] overflow-auto">
      <h3 className="fluid-h4 mb-2">Touch & Responsive Debug</h3>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Device: <span className="font-bold">{deviceType}</span></div>
        <div>Orientation: <span className="font-bold">{orientation}</span></div>
        <div>Pointer: <span className="font-bold">{hasPrecisePointer ? 'Precise' : 'Imprecise'}</span></div>
        <div>Hover: <span className="font-bold">{hasHoverCapability ? 'Yes' : 'No'}</span></div>
        <div>Touch: <span className="font-bold">{hasCoarsePointer ? 'Yes' : 'No'}</span></div>
        <div>Performance: <span className="font-bold">{performanceLevel}</span></div>
        <div>Touch capability: <span className="font-bold">{touchCapability}</span></div>
        <div>Reduced motion: <span className="font-bold">{preferReducedMotion ? 'Yes' : 'No'}</span></div>
        <div>Size: <span className="font-bold">{width}×{height}</span></div>
        <div>Breakpoint: <span className="font-bold">{breakpoint}</span></div>
      </div>
      
      {lastTap && (
        <div className="mt-2">
          <div>Last tap: ({lastTap.x.toFixed(0)}, {lastTap.y.toFixed(0)})</div>
          <div className="relative w-full h-10 mt-1 bg-gray-800 rounded">
            <div 
              className="absolute top-0 bottom-0 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" 
              style={{
                left: `${(lastTap.x / width) * 100}%`,
                top: '50%'
              }}
            />
          </div>
        </div>
      )}
      
      <div className="flex justify-end mt-2">
        <button 
          className="bg-white text-black text-xs py-1 px-2 rounded touch-feedback"
          onClick={() => document.querySelector('.touch-debug')?.remove()}
        >
          Close
        </button>
      </div>
      
      {touchPoints.length > 0 && touchPoints.map(point => (
        <div 
          key={point.id}
          className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: point.x,
            top: point.y
          }}
        >
          <div className="w-8 h-8 bg-white/20 rounded-full animate-ping" />
          <div className="absolute inset-0 w-4 h-4 m-auto bg-white rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default TouchDebugger;
