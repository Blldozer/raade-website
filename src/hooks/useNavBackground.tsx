
import { useEffect } from 'react';

export const useNavBackground = () => {
  useEffect(() => {
    // Mark sections with data attributes for light/dark backgrounds
    document.querySelectorAll('#hero, #transition-hook').forEach(section => {
      section.setAttribute('data-background', 'dark');
    });
    
    document.querySelectorAll('#conference-promo, #transition-stat, #future-showcase, #join').forEach(section => {
      section.setAttribute('data-background', 'light');
    });

    // Setup background detection for navigation
    const updateNavBackground = () => {
      const scrollPosition = window.scrollY + 40; // Check slightly below the top of viewport where navbar is
      let currentBackground = 'dark'; // Default to dark (for hero section)
      
      const allSections = document.querySelectorAll('section');
      allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // If scrollPosition is within this section, update the current background
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentBackground = section.getAttribute('data-background') || 'light';
        }
      });
      
      // Set data attribute on document body for global access
      document.body.setAttribute('data-nav-background', currentBackground);
    };
    
    // Initial update for navigation
    updateNavBackground();
    
    // Update navigation background on scroll
    window.addEventListener('scroll', updateNavBackground);
    
    return () => {
      window.removeEventListener('scroll', updateNavBackground);
    };
  }, []);
};
