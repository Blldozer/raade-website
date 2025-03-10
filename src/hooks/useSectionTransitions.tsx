
import { useEffect } from 'react';
import { useNavBackground } from './useNavBackground';
import { useSectionParallax } from './useSectionParallax';
import { useTransitionStatAnimation } from './useTransitionStatAnimation';
import { useTransitionHookAnimation } from './useTransitionHookAnimation';
import { useFutureShowcaseAnimation } from './useFutureShowcaseAnimation';
import { useGeneralSectionAnimations } from './useGeneralSectionAnimations';

export const useSectionTransitions = () => {
  useNavBackground();
  
  // Initialize parallax effect for each section with specific depths
  useSectionParallax('conference-promo', 0.15); // Subtle effect for promo
  useSectionParallax('transition-stat', 0.2);   // Medium effect for stats
  useSectionParallax('future-showcase', 0.25);  // Stronger effect for showcase
  
  useTransitionStatAnimation();
  useTransitionHookAnimation();
  useFutureShowcaseAnimation();
  useGeneralSectionAnimations();
};
