
import React from "react";

/**
 * BackgroundDecoration Component
 * 
 * Renders the decorative background elements for the donation section
 * Creates a subtle visual effect with an image overlay and gradient
 */
const BackgroundDecoration = () => {
  return (
    <>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/public/raade-eboard-baker-institute-cmp.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/95"></div>
    </>
  );
};

export default BackgroundDecoration;
