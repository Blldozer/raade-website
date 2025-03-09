import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import WhyAttendTabs from "./why/WhyAttendTabs";
const ConferenceWhy = () => {
  const navigate = useNavigate();
  return <section className="py-16 px-4 md:px-8 bg-white text-raade-navy">
      <div className="max-w-7xl mx-auto">
        {/* Title section - 39% and 61% split */}
        <div className="flex flex-col lg:flex-row mb-8">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="w-full lg:w-[39%]">
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Why Attend
            </h2>
          </motion.div>
          
          <div className="invisible w-full lg:w-[61%]"></div>
        </div>
        
        {/* Content section - 39% and 61% split */}
        <div className="flex flex-col lg:flex-row mb-12">
          <div className="invisible w-full lg:w-[39%]"></div>
          
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="w-full lg:w-[61%]">
            <p className="text-lg font-lora p-4 lg:p-0 text-slate-950">
              The distinctive value of the RAADE conference is that attendees don't just gain knowledge 
              or contacts – they become part of creating solutions that can spread across the continent.
            </p>
          </motion.div>
        </div>
        
        <WhyAttendTabs />
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="text-center mt-12">
          <p className="mb-6 font-lora text-slate-950 mx-[5px] font-normal text-2xl">
            By bringing together diverse perspectives and focusing on implementation rather than just discussion, 
            the conference creates a unique environment where each person's contribution becomes more valuable 
            through its connection to others.
          </p>
          <Button size="lg" onClick={() => navigate("/conference/register")} className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 font-lora text-xl font-bold text-white">
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>;
};
export default ConferenceWhy;