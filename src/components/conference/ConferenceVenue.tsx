import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Users } from "lucide-react";

const ConferenceVenue = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Venue & Location</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Join us at Rice University's beautiful campus in Houston, Texas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="scroll-animate" 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden bg-gray-200 aspect-video">
              {/* Placeholder for campus map or venue image */}
              <div className="w-full h-full flex items-center justify-center bg-raade-navy/10">
                <p className="text-raade-navy font-medium font-lora">Rice University Campus Map</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="scroll-animate" 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-raade-navy mb-4 font-simula">Getting Here</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold font-simula">Address</h4>
                  <p className="text-gray-600 font-lora">Rice University, 6100 Main St, Houston, TX 77005</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Building className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold font-simula">Conference Facilities</h4>
                  <p className="text-gray-600 font-lora">The conference will take place at the Rice Memorial Center (RMC).</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold font-simula">Accommodation</h4>
                  <p className="text-gray-600 font-lora">Special rates are available at partner hotels near campus.</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4 border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
                onClick={() => window.open("https://maps.google.com/?q=Rice+University,+Houston,+TX", "_blank")}
              >
                View on Google Maps
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceVenue;
