
import { useState, useEffect } from "react";
import { useIsMobile } from "./use-mobile";

export const useResponsive = () => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024 && window.innerWidth < 1440);
      setIsLargeDesktop(window.innerWidth >= 1440);
    };

    // Check immediately
    checkSize();

    // Add event listener
    window.addEventListener("resize", checkSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};
