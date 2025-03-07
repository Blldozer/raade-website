import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, GraduationCap, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ConferenceWhy = () => {
  const navigate = useNavigate();
  return <section className="py-16 px-4 md:px-8 bg-raade-navy text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold mb-4 font-simula">Why Attend</h2>
          <p className="text-lg max-w-3xl mx-auto font-lora text-white/80">
            The distinctive value of the RAADE conference is that attendees don't just gain knowledge 
            or contacts – they become part of creating solutions that can spread across the continent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* For Established Changemakers */}
          <motion.div className="scroll-animate" initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all h-full">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-8 h-8 text-[#FBB03B] flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold font-simula">For Established Changemakers</h3>
                  <p className="text-[#FBB03B] text-sm font-lora">Business Leaders, Policymakers, Investors</p>
                </div>
              </div>
              <ul className="space-y-2 text-white/80 font-lora">
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Access to fresh solutions and innovation from talented young minds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Connections to implementation-ready projects that address specific regional challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Cross-regional networking with other leaders working on similar issues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Investment opportunities in early-stage solutions with potential for continental scaling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Intelligence on emerging trends and approaches in African development</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* For the Next Generation of Leaders */}
          <motion.div className="scroll-animate" initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all h-full">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-[#FBB03B] flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold font-simula">For the Next Generation of Leaders</h3>
                  <p className="text-[#FBB03B] text-sm font-lora">Students, Young Professionals</p>
                </div>
              </div>
              <ul className="space-y-2 text-white/80 font-lora">
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Direct connections to decision-makers who can implement or fund their ideas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Mentorship from established African leaders who have successfully navigated similar challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Practical experience solving real-world problems with real stakeholders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Resume-building opportunities that demonstrate impact rather than just theoretical knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Peer networks across disciplines and institutions that can support future collaboration</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* For Curious Minds */}
          <motion.div className="scroll-animate" initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all h-full">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-[#FBB03B] flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold font-simula">For Curious Minds</h3>
                  <p className="text-[#FBB03B] text-sm font-lora">Professionals, Academics, Interested Observers</p>
                </div>
              </div>
              <ul className="space-y-2 text-white/80 font-lora">
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span className="font-lora font-normal">Deeper understanding of African development challenges beyond headlines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Connections to opportunities for involvement that match their specific skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Exposure to innovative approaches they might apply in their own work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Forum to contribute their perspectives and expertise to meaningful problems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Networking with diverse professionals interested in similar issues</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* For All Attendees */}
          <motion.div className="scroll-animate" initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all h-full">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-[#FBB03B] flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold font-simula">For All Attendees</h3>
                  <p className="text-[#FBB03B] text-sm font-lora">Everyone at the Conference</p>
                </div>
              </div>
              <ul className="space-y-2 text-white/80 font-lora">
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Being part of transformative solutions that could scale across regions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Participation in a new model of problem-solving rather than just discussion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Meaningful connections formed through collaborative work </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Access to a continuing community beyond the conference itself</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FBB03B] mr-2">•</span>
                  <span>Belonging to a pioneering effort that could reshape how development challenges are addressed</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
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
      }} className="text-center mt-8">
          <p className="text-lg mb-6 font-lora font-semibold">
            By bringing together diverse perspectives and focusing on implementation rather than just discussion, 
            the conference creates a unique environment where each person's contribution becomes more valuable 
            through its connection to others.
          </p>
          <Button size="lg" className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora" onClick={() => navigate("/conference/register")}>
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>;
};
export default ConferenceWhy;