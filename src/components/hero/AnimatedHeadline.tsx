import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

interface AnimatedHeadlineProps {
  className?: string;
}

gsap.registerPlugin(TextPlugin);

const AnimatedHeadline = ({ className }: AnimatedHeadlineProps) => {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 1.8 // Match the scene transition delay
    });
  
    // Set initial states
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      opacity: 1,
      text: ""
    });
    gsap.set(cursorRef.current, { opacity: 0 }); // Start hidden
  
    // Create cursor blink but pause it initially
    const cursorBlink = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
      paused: true // Important!
    });
  
    tl
      // Fade in cursor first
      .to(cursorRef.current, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => { void cursorBlink.play(); } // Start blinking after fade in
      })

    // Function to update cursor position
    const updateCursorPosition = (textElement: HTMLElement | null) => {
      if (!textElement || !cursorRef.current) return;
      const textRect = textElement.getBoundingClientRect();
      gsap.set(cursorRef.current, {
        x: textRect.width
      });
    };

    tl
      // First line with cursor
      .to(line1Ref.current, {
        duration: 1.2,
        text: {
          value: "WE CAN'T WAIT",
          type: "diff"
        },
        ease: "none",
        onUpdate: () => updateCursorPosition(line1Ref.current)
      })
      // Kill cursor and continue with animation
      .add(() => {
        cursorBlink.kill();
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut"
        });
      })
      // Second line
      .to(line2Ref.current, {
        duration: 1,
        text: {
          value: "FOR TOMORROW.",
          type: "diff"
        },
        ease: "none"
      })
      // Pause for impact
      .to({}, { duration: 1 })
      // Final line
      .to(line3Ref.current, {
        duration: 1.5,
        text: {
          value: "WE'RE BUILDING IT TODAY.",
          type: "diff"
        },
        ease: "none"
      });

    return () => {
      cursorBlink.kill();
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={cn("flex flex-col items-start relative", className)}
    >
      <h1 className="font-bold tracking-tight relative">
        <div className="relative">
          <span 
            ref={line1Ref}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold"
          ></span>
          {/* Single cursor just for first line */}
          <span 
            ref={cursorRef}
            className="absolute top-0 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold select-none pointer-events-none"
            style={{ 
              left: 0,
              lineHeight: 1,
              transform: 'translateY(0)'
            }}
            aria-hidden="true"
          >|</span>
        </div>
        <div className="relative mt-2">
          <span 
            ref={line2Ref}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold"
          ></span>
        </div>
        <div className="relative mt-2">
          <span 
            ref={line3Ref}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold"
          ></span>
        </div>
      </h1>
    </div>
  );
};

export default AnimatedHeadline;