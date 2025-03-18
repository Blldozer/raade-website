
import React from 'react';
import ErrorBoundary from "@/components/ErrorBoundary";

/**
 * SectionWrapper Component - Wraps each section with ErrorBoundary and proper structure
 * Provides consistent error handling and fallback UI for all sections
 * 
 * @param id - Section ID for navigation and scrolling
 * @param background - Light or dark background for proper styling and contrast
 * @param children - Section content to render
 */
interface SectionWrapperProps {
  id: string;
  background: "light" | "dark";
  children: React.ReactNode;
}

const SectionWrapper = ({ id, background, children }: SectionWrapperProps) => {
  return (
    <section className="relative w-full min-h-screen" id={id} data-background={background}>
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
};

export default SectionWrapper;
