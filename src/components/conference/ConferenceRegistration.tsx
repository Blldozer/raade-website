
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConferenceRegistration = () => {
  const navigate = useNavigate();
  
  return (
    <section id="registration" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Registration Options</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Secure your spot at the RAADE Conference 2025. Early bird registration is now open!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Standard Ticket */}
          <motion.div 
            className="scroll-animate" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all relative h-full">
              <div className="absolute top-4 right-4 bg-[#FBB03B] text-white text-sm font-medium py-1 px-3 rounded-full">
                Early Bird
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-simula">Standard Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-raade-navy mb-4">$199</p>
                <p className="text-gray-500 mb-6 font-lora text-sm">Regular price: $249</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Full conference access</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Networking opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Conference materials</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Lunch and refreshments</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                  onClick={() => navigate("/conference/register")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* VIP Ticket */}
          <motion.div 
            className="scroll-animate" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all relative h-full">
              <div className="absolute top-4 right-4 bg-[#FBB03B] text-white text-sm font-medium py-1 px-3 rounded-full">
                Limited
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-simula">VIP Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-raade-navy mb-4">$349</p>
                <p className="text-gray-500 mb-6 font-lora text-sm">Regular price: $399</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Everything in Standard ticket</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">VIP reception with speakers</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Reserved seating</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Special gift package</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                  onClick={() => navigate("/conference/register")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Student Ticket */}
          <motion.div 
            className="scroll-animate" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all h-full">
              <CardHeader>
                <CardTitle className="text-xl font-simula">Student Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-raade-navy mb-4">$99</p>
                <p className="text-gray-500 mb-6 font-lora text-sm">For enrolled students only</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Full conference access</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Student networking events</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Conference materials</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Lunch and refreshments</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                  onClick={() => navigate("/conference/register")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="bg-[#FBB03B]/10 p-8 rounded-xl mt-12">
          <h3 className="text-xl font-bold text-raade-navy mb-4 font-simula">Group Registration</h3>
          <p className="text-gray-600 mb-6 font-lora">
            Coming with a team? Special discounts are available for groups of 5 or more attendees.
          </p>
          <Button 
            variant="outline" 
            className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
            onClick={() => window.location.href = "mailto:conference@raade.org?subject=Group Registration Inquiry"}
          >
            Contact for Group Rates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConferenceRegistration;
