
import { useEffect, useState } from 'react';
import { useNavigation } from '@/components/navigation/context/useNavigation';

/**
 * useNavBackgroundStyle Hook
 * 
 * Determines the navigation background styling based on:
 * - Current scroll position
 * - Whether we're in dark mode
 * - Whether we're on the hero page
 */
export const useNavBackgroundStyle = () => {
  const { state } = useNavigation();
  const [bgClass, setBgClass] = useState('');
  
  useEffect(() => {
    const { isScrolled, isHeroPage, isDarkBackground, forceDarkMode } = state;
    let newBgClass = '';
    
    if (isScrolled) {
      // Scrolled state - solid background
      newBgClass = isDarkBackground || forceDarkMode
        ? 'bg-[#274675]/95 text-white'
        : 'bg-white/95 text-[#274675] shadow-sm';
    } else if (isHeroPage) {
      // Hero page - transparent with white text
      newBgClass = 'bg-transparent text-white';
    } else {
      // Default state - depends on background
      newBgClass = isDarkBackground || forceDarkMode
        ? 'bg-transparent text-white'
        : 'bg-white/95 text-[#274675] shadow-sm';
    }
    
    setBgClass(newBgClass);
  }, [state]);
  
  return bgClass;
};
