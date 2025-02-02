import React, { useEffect, useRef } from 'react';
import { gsap } from '@/config/gsapConfig';

interface OpeningSceneProps {
  onComplete: () => void;
}

const OpeningScene = ({ onComplete }: OpeningSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We'll create arrays of letters for each word
  const words = {
    R: "RICE",
    A1: "ASSOCIATION",
    A2: "AFRICAN",
    DE: "DEVELOPMENT"
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        // Exit animation remains the same
        const exitTl = gsap.timeline({
          onComplete
        });
        
        exitTl
          .to(container.querySelectorAll('.letter, .word-letter'), {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
          })
          .to(container, {
            x: '100%',
            duration: 1,
            ease: 'power2.inOut'
          });
      }
    });

    // Set initial states
    gsap.set('.letter, .word-letter', {
      opacity: 0,
      display: 'inline-block' // Important for letter-by-letter reveal
    });

    // The typing animation for each section
    const typeSpeed = 0.1; // Adjust this for faster/slower typing
    
    // Function to create typing animation for a word
    const createTypingAnimation = (mainLetter: string, word: string, delay: number = 0) => {
      // First show the main letter
      tl.to(`#letter-${mainLetter}`, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, delay);

      // Then type out the corresponding word
      const letters = word.split('');
      letters.forEach((_, index) => {
        tl.to(`#word-${mainLetter}-${index}`, {
          opacity: 1,
          duration: 0.1,
          ease: 'none'
        }, `>-${typeSpeed}`);
      });

      // Add a small pause after each word
      tl.to({}, { duration: 0.5 });
    };

    // Create animations for each section
    createTypingAnimation('R', words.R);
    createTypingAnimation('A1', words.A1, 0.5);
    createTypingAnimation('A2', words.A2, 1.0);
    createTypingAnimation('DE', words.DE, 1.5);

    // Start the animation
    tl.play();

    return () => {
      tl.kill();
    };
  }, [onComplete, words.A1, words.A2, words.DE, words.R]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ zIndex: 50 }}
    >
      <div className="text-white text-center">
        {/* Main RAADE container */}
        <div className="flex justify-center mb-6">
          <div id="letter-R" className="letter text-9xl font-bold">R</div>
          <div id="letter-A1" className="letter text-9xl font-bold">A</div>
          <div id="letter-A2" className="letter text-9xl font-bold">A</div>
          <div id="letter-DE" className="letter text-9xl font-bold">DE</div>
        </div>

        {/* Words container */}
        <div className="flex justify-center space-x-2">
          {/* RICE */}
          <div className="flex">
            {words.R.split('').map((letter, index) => (
              <span 
                key={`R-${index}`}
                id={`word-R-${index}`}
                className="word-letter text-2xl"
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* ASSOCIATION */}
          <div className="flex">
            {words.A1.split('').map((letter, index) => (
              <span
                key={`A1-${index}`}
                id={`word-A1-${index}`}
                className="word-letter text-2xl"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Add "for" here */}
          <div className="text-2xl">for</div>

          {/* AFRICAN */}
          <div className="flex">
            {words.A2.split('').map((letter, index) => (
              <span
                key={`A2-${index}`}
                id={`word-A2-${index}`}
                className="word-letter text-2xl"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* DEVELOPMENT */}
          <div className="flex">
            {words.DE.split('').map((letter, index) => (
              <span
                key={`DE-${index}`}
                id={`word-DE-${index}`}
                className="word-letter text-2xl"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningScene;