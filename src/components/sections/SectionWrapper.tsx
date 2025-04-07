import React from 'react';
import { useRef, useEffect } from '../../setup-jsx';
import ErrorBoundary from "../ErrorBoundary";
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
  children: any;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  background, 
  backgroundColor, 
  className = "", 
  children 
}) => {
  
  // Create ref and use hooks imported from setup-jsx
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // This effect helps with testing the section awareness in dev mode
    if (sectionRef.current) {
      // Add identifying attribute for debugging
      sectionRef.current.setAttribute('data-section-id', id);
    }
  }, [id]);
  
  useEffect(() => {
    // Mark section as initialized
    if (sectionRef.current) {
      sectionRef.current.setAttribute('data-section-initialized', 'true');
    }
  }, []);
  
  return (
    <ErrorBoundary
      fallback={
        <section 
          className={cn("relative w-full min-h-screen", className)}
          id={id} 
          data-section
          data-background={background}
          data-error="true"
          style={backgroundColor ? { backgroundColor } : undefined}
        >
          <div className="h-screen flex items-center justify-center p-6">
            <div className="max-w-md text-center">
              <h3 className="text-xl font-bold mb-2">Section Error</h3>
              <p>There was a problem loading this section.</p>
            </div>
          </div>
        </section>
      }
    >
      <section
        ref={sectionRef}
        className={cn("relative w-full", className)}
        id={id}
        data-section
        data-background={background}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        <div className="w-full mx-auto">
          {children}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default SectionWrapper;
