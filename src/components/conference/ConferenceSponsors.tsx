import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const ConferenceSponsors = () => {
  return (
    <section id="sponsorship" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* First row: Title on left (39%), empty space on right (61%) */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%] mb-6 lg:mb-0"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Our Sponsors
            </h2>
          </motion.div>
          
          {/* Empty right spacer - 61% */}
          <motion.div 
            className="lg:w-[61%]" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Intentionally empty for layout */}
          </motion.div>
        </div>

        {/* Content with 39% / 61% layout - logo on left, content on right */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mt-8">
          {/* Logo section - 39% */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[39%] flex justify-center lg:justify-start"
          >
            <a href="https://wazobiaafricankitchen.com" target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 hover:scale-105 transition-transform duration-200 w-full lg:max-w-[90%] flex items-center justify-center" style={{height: '120px', marginTop: '40px'}}>
              <img src="/sponsors/Wazobia-Market-Logo-small-logo.png" alt="Wazobia African Market Logo" className="object-contain" style={{height: '100px', width: 'auto', display: 'block', margin: '0 auto'}} />
            </a>
          </motion.div>
          
          {/* Content section - 61% */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-[61%]"
          >
            <h4 className="text-3xl font-simula text-raade-navy font-bold mb-4">Wazobia African Market</h4>
            <p className="font-lora text-gray-700 mb-4 text-lg">
              Wazobia African Market is the premier destination for authentic African groceries, fresh produce, and cultural products in the region. Since its founding, Wazobia has been committed to bringing the diverse flavors and traditions of Africa to our community while supporting economic opportunities for African producers.
            </p>
            <p className="font-lora text-gray-700 mb-6 text-lg">
              Wazobia proudly supports RAADE (Rice Association for African Development) because of their deep commitment to African development initiatives. Their partnership with RAADE aligns with their mission of ensuring lasting connections between Houston and the African community.
            </p>
            
            <div className="flex justify-start gap-5 mb-6">
              <a href="https://wazobiaafricankitchen.com" target="_blank" rel="noopener noreferrer" aria-label="Wazobia Website" className="flex items-center" style={{height: '48px'}}>
                <img src="/sponsors/Wazobia-Market-Logo-small-logo.png" className="rounded-full border border-gray-200" alt="Website" style={{height: '48px', width: '48px', objectFit: 'cover', display: 'block'}} />
              </a>
              <a href="https://www.instagram.com/wazobiaafricanmarket/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/icons/instagram-vector-logo-icon-social-media-logo.svg" alt="Instagram" width="48" height="48" className="rounded" style={{objectFit: 'cover', width: '48px', height: '48px'}} />
              </a>
              <a href="https://www.youtube.com/channel/UCo2rxxFuYEwqfM_IpiQZvbQ/featured" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="40" height="40" fill="currentColor" className="text-[#FF0000]" viewBox="0 0 24 24"><path d="M23.498 6.186a2.958 2.958 0 0 0-2.08-2.08C19.592 3.5 12 3.5 12 3.5s-7.592 0-9.418.606a2.958 2.958 0 0 0-2.08 2.08C0 8.012 0 12 0 12s0 3.988.502 5.814a2.958 2.958 0 0 0 2.08 2.08C4.408 20.5 12 20.5 12 20.5s7.592 0 9.418-.606a2.958 2.958 0 0 0 2.08-2.08C24 15.988 24 12 24 12s0-3.988-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z"/></svg>
              </a>
              <a href="https://www.facebook.com/wazobiaafricanmarket" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="40" height="40" fill="currentColor" className="text-[#1877F3]" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0"/></svg>
              </a>
            </div>
            
            <div className="flex">
              <a href="https://wazobiaafricankitchen.com" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#FBB03B] text-raade-navy font-lora px-8 py-4 text-xl shadow-md hover:bg-[#FBB03B]/90 transition-all">
                  Support our sponsors
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSponsors;
