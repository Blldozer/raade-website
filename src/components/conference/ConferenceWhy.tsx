
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import WhyAttendTabs from "./why/WhyAttendTabs";

const ConferenceWhy = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-raade-navy via-raade-navy/95 to-[#1c3a68] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12 scroll-animate"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 font-simula">Why Attend</h2>
          <p className="text-lg max-w-3xl mx-auto font-lora text-white/80">
            The distinctive value of the RAADE conference is that attendees don't just gain knowledge 
            or contacts – they become part of creating solutions that can spread across the continent.
          </p>
        </motion.div>
        
        <WhyAttendTabs />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg mb-6 font-lora font-semibold">
            By bringing together diverse perspectives and focusing on implementation rather than just discussion, 
            the conference creates a unique environment where each person's contribution becomes more valuable 
            through its connection to others.
          </p>
          <Button 
            size="lg" 
            className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora"
            onClick={() => navigate("/conference/register")}
          >
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceWhy;
