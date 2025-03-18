
import React, { useEffect, useState } from 'react';
import { useResponsive } from "@/hooks/useResponsive";

/**
 * TouchDebugger Component
 * 
 * A diagnostic tool for mobile debugging that displays:
 * - Device type and orientation
 * - Pointer/touch capabilities
 * - Screen dimensions and breakpoints
 * - Real-time touch event tracking
 * 
 * Designed to be temporarily included in pages for mobile testing
 */
const TouchDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [touchPoints, setTouchPoints] = useState<{ id: number; x: number; y: number }[]>([]);
  const [lastEvent, setLastEvent] = useState<string>('None');
  const { isMobile, isTablet, isDesktop, width, height } = useResponsive();
  const [performance, setPerformance] = useState({
    fps: 0,
    memory: 'Unknown'
  });
  
  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const newPoints = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      }));
      setTouchPoints(newPoints);
      setLastEvent('touchstart');
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const newPoints = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      }));
      setTouchPoints(newPoints);
      setLastEvent('touchmove');
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setTouchPoints(prev => prev.filter(p => 
        !Array.from(e.changedTouches).some(t => t.identifier === p.id)
      ));
      setLastEvent('touchend');
    };
    
    // Attach event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    // Track performance
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      const now = performance.now();
      const elapsed = now - lastTime;
      
      if (elapsed >= 1000) {
        setPerformance(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / elapsed),
          memory: (window as any).performance?.memory?.usedJSHeapSize 
            ? `${Math.round((window as any).performance.memory.usedJSHeapSize / (1024 * 1024))}MB` 
            : 'Unknown'
        }));
        frameCount = 0;
        lastTime = now;
      }
      
      frameCount++;
      requestAnimationFrame(measureFPS);
    };
    
    const animationId = requestAnimationFrame(measureFPS);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  if (!isVisible) {
    return (
      <button 
        className="fixed bottom-4 right-4 z-[10000] bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsVisible(true)}
      >
        Debug
      </button>
    );
  }
  
  return (
    <>
      {/* Touch point indicators */}
      {touchPoints.map(point => (
        <div
          key={point.id}
          className="fixed w-8 h-8 rounded-full border-2 border-red-500 bg-red-200 bg-opacity-50 z-[9999]"
          style={{
            left: point.x - 16,
            top: point.y - 16,
            transform: 'translate(0, 0)',
            pointerEvents: 'none'
          }}
        />
      ))}
      
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4 font-mono text-xs z-[10000] max-h-64 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Touch Debugger</h3>
          <button 
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => setIsVisible(false)}
          >
            Close
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Device:</strong> {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </div>
          <div>
            <strong>Viewport:</strong> {width}×{height}
          </div>
          <div>
            <strong>Touch:</strong> {('ontouchstart' in window) ? 'Supported' : 'Not supported'}
          </div>
          <div>
            <strong>Pointer:</strong> {window.matchMedia('(pointer: fine)').matches ? 'Fine' : 'Coarse'}
          </div>
          <div>
            <strong>Last event:</strong> {lastEvent}
          </div>
          <div>
            <strong>Touch points:</strong> {touchPoints.length}
          </div>
          <div>
            <strong>FPS:</strong> {performance.fps}
          </div>
          <div>
            <strong>Memory:</strong> {performance.memory}
          </div>
        </div>
        
        <div className="mt-2">
          <strong>Touch coordinates:</strong> 
          <div className="text-xs">
            {touchPoints.map(point => `(${point.x}, ${point.y})`).join(', ')}
          </div>
        </div>
        
        <div className="text-center mt-2 text-xs text-gray-400">
          Tap and interact with the page to see touch events in real-time
        </div>
      </div>
    </>
  );
};

export default TouchDebugger;
