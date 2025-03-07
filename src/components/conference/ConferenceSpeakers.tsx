
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakersList } from "./data/speakersData";

const ConferenceSpeakers = () => {
  return (
    <section id="speakers" className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Featured Speakers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Learn from thought leaders and innovators at the forefront of African development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {speakersList.map((speaker, index) => (
            <motion.div
              key={index}
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  {/* Placeholder for speaker image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-raade-navy/10">
                    <p className="text-raade-navy font-medium font-lora">{speaker.imagePlaceholder}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-raade-navy font-simula">{speaker.name}</h3>
                  <p className="text-[#FBB03B] font-medium mb-1 font-lora">{speaker.role}</p>
                  <p className="text-gray-600 text-sm mb-3 font-lora">{speaker.organization}</p>
                  <p className="text-gray-600 font-lora">{speaker.bio}</p>
                  
                  <button className="mt-4 text-raade-navy hover:text-[#FBB03B] transition-colors flex items-center text-sm font-medium">
                    <span>Full profile</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6 font-lora">
            More speakers will be announced in the coming weeks. 
            Stay tuned for updates!
          </p>
          <Button
            variant="outline"
            className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
          >
            Nominate a Speaker
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSpeakers;
