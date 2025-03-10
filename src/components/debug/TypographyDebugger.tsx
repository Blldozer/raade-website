
import { useEffect, useState } from 'react';

interface TypographyDebuggerProps {
  enabled?: boolean;
}

const TypographyDebugger = ({ enabled = false }: TypographyDebuggerProps) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Set initial width
    setWidth(window.innerWidth);
    document.body.classList.add('type-debug');
    document.body.setAttribute('data-width', window.innerWidth.toString());
    
    // Update on resize
    const handleResize = () => {
      setWidth(window.innerWidth);
      document.body.setAttribute('data-width', window.innerWidth.toString());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('type-debug');
      document.body.removeAttribute('data-width');
    };
  }, [enabled]);
  
  // This component doesn't render anything visible
  return null;
};

export default TypographyDebugger;
