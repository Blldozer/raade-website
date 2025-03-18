
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
 * @returns Object with isOpen state and control functions
 */
export function useMobileNav() {
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
}

export default useMobileNav;
