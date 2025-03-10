
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroLeftContent = () => {
  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {/* Pre-title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-raade-navy font-medium text-lg md:text-xl mb-4 font-montserrat"
      >
        April 11-12, 2025 • Rice University
      </motion.div>
      
      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-raade-Thunder"
      >
        <span className="block font-simula">RAADE Day Forum:</span>
        <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 font-montserrat text-raade-navy">
          Designing African Futures
        </span>
      </motion.h1>
      
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-raade-thunder/90 font-opensans leading-relaxed"
      >
        Join us for a transformative global summit where innovation meets impact, connecting Rice students with African changemakers.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          size="lg"
          className="px-8 py-6 text-lg bg-raade-navy hover:bg-raade-navy/90 text-white transition-all shadow-lg hover:shadow-xl"
          onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Register Now
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-6 text-lg border-raade-navy text-raade-navy hover:bg-raade-navy/10 transition-all"
        >
          Learn More
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroLeftContent;
