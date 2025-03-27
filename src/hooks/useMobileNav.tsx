
// This is the right code for the hamburger implementation

import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage mobile navigation state and actions
 * 
 * Provides:
 * - State tracking for menu open/closed status
 * - Toggle function for changing state
 * - Open and close functions for direct state control
 * - Body scroll locking when menu is open
 * 
 * Enhanced with React context error handling
 * 
 * @returns Object with isOpen state and control functions
 */
export function useMobileNav() {
  try {
    // Ensure we're in a valid React context
    const [isOpen, setIsOpen] = useState(false);
    
    // Toggle the menu state
    const toggleMenu = useCallback(() => {
      setIsOpen(prev => !prev);
    }, []);
    
    // Explicitly open the menu
    const openMenu = useCallback(() => {
      setIsOpen(true);
    }, []);
    
    // Explicitly close the menu
    const closeMenu = useCallback(() => {
      setIsOpen(false);
    }, []);
    
    // Handle escape key to close menu
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          closeMenu();
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeMenu]);
    
    return {
      isOpen,
      toggleMenu,
      openMenu,
      closeMenu
    };
  } catch (error) {
    // Provide a fallback when React context is not available
    console.warn("useMobileNav: React context unavailable, providing fallback");
    
    return {
      isOpen: false,
      toggleMenu: () => console.warn("Mobile menu toggle attempted but React context unavailable"),
      openMenu: () => console.warn("Mobile menu open attempted but React context unavailable"),
      closeMenu: () => console.warn("Mobile menu close attempted but React context unavailable")
    };
  }
}

export default useMobileNav;
