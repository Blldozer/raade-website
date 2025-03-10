
import { useEffect } from 'react';
import { useNavBackground } from './useNavBackground';
import { useSectionParallax } from './useSectionParallax';
import { useTransitionStatAnimation } from './useTransitionStatAnimation';
import { useTransitionHookAnimation } from './useTransitionHookAnimation';
import { useFutureShowcaseAnimation } from './useFutureShowcaseAnimation';
import { useGeneralSectionAnimations } from './useGeneralSectionAnimations';

export const useSectionTransitions = () => {
  // Use all our specialized hooks
  useNavBackground();
  useSectionParallax();
  useTransitionStatAnimation();
  useTransitionHookAnimation();
  useFutureShowcaseAnimation();
  useGeneralSectionAnimations();
  
  // Additional cleanup for any ScrollTrigger instances
  useEffect(() => {
    return () => {
      // This is now handled in each individual hook
    };
  }, []);
};
