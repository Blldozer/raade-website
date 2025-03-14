
import { useState, useCallback } from 'react';

/**
 * Custom hook to manage mobile navigation state and actions
 * 
 * Provides:
 * - State tracking for menu open/closed status
 * - Toggle function with optional debugging
 * - Open and close functions for direct state control
 * 
 * @returns Object with isOpen state and control functions
 */
export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = useCallback(() => {
    console.log("Toggling mobile menu, current state:", isOpen);
    setIsOpen(prevState => !prevState);
  }, [isOpen]);
  
  const openMenu = useCallback(() => {
    console.log("Opening mobile menu");
    setIsOpen(true);
  }, []);
  
  const closeMenu = useCallback(() => {
    console.log("Closing mobile menu");
    setIsOpen(false);
  }, []);
  
  return {
    isOpen,
    toggleMenu,
    openMenu,
    closeMenu
  };
}
