import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is mobile
 * 
 * @returns boolean indicating if the device is mobile
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device is mobile
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileDevices = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileDevices.test(userAgent) || window.innerWidth < 768);
    };

    // Check immediately
    checkIfMobile();

    // Set up listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
