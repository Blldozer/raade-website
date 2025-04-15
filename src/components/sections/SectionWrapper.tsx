import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";
import { cn } from '@/lib/utils';

/**
 * SectionWrapper Component - Wraps each section with ErrorBoundary and proper structure
 * 
 * Features:
 * - Provides consistent error handling and fallback UI for all sections
 * - Adds proper data attributes for section-aware navigation
 * - Supports explicit background color specifications for accurate detection
 * - Enhanced with React context error handling to prevent crashes
 * 
 * @param id - Section ID for navigation and scrolling
 * @param background - Light or dark background for proper styling and contrast
 * @param backgroundColor - Optional explicit CSS background color to use (helps with detection)
 * @param className - Additional CSS classes to apply to the section
 * @param children - Section content to render
 */
interface SectionWrapperProps {
  id: string;
  background: "light" | "dark";
  backgroundColor?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ 
  id, 
  background, 
  backgroundColor,
  className,
  children 
}: SectionWrapperProps) => {
  // Verify React is available before trying to use hooks
  if (typeof React !== 'object' || typeof React.useRef !== 'function') {
    console.error(`SectionWrapper (${id}): React context unavailable`);
    
    // Return minimal fallback that won't crash
    return (
      <section 
        className={cn("relative w-full min-h-screen p-0 m-0", className)}
        id={id} 
        data-section
        data-background={background}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        <div className="h-screen flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h3 className="text-xl font-bold mb-2">Section temporarily unavailable</h3>
            <p>Please refresh the page to reload.</p>
          </div>
        </div>
      </section>
    );
  }
  
  try {
    // Create ref only if we're in a valid React context
    const sectionRef = React.useRef<HTMLElement>(null);
    
    React.useEffect(() => {
      // This effect helps with testing the section awareness in dev mode
      if (process.env.NODE_ENV === 'development' && sectionRef.current) {
        console.debug(`Section ${id} registered with background: ${background}`);
      }
    }, [id, background]);

    return (
      <section 
        ref={sectionRef}
        className={cn("relative w-full min-h-screen p-0 m-0", className)}
        id={id} 
        data-section
        data-background={background}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        <ErrorBoundary
          fallback={
            <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
              <div className="max-w-md text-center">
                <h3 className="text-xl font-bold mb-2">Section unavailable</h3>
                <p>We're experiencing issues with this section. Please try again later.</p>
              </div>
            </div>
          }
        >
          {children}
        </ErrorBoundary>
      </section>
    );
  } catch (error) {
    // Fallback rendering if React context is missing
    console.error(`SectionWrapper (${id}): Error with React context`, error);
    
    return (
      <section 
        className={cn("relative w-full min-h-screen p-0 m-0", className)}
        id={id} 
        data-section
        data-background={background}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        <div className="h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="max-w-md text-center">
            <h3 className="text-xl font-bold mb-2">Section temporarily unavailable</h3>
            <p>Please refresh the page to reload this section.</p>
          </div>
        </div>
      </section>
    );
  }
};

export default SectionWrapper;
