import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ExternalLink, ChevronRight, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TICKET_TYPES_ENUM, getTicketPrice, getRegularTicketPrice, isSaleActive, SALE_END_DATE } from "./RegistrationFormTypes";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

/**
 * ConferenceRegistration Component
 * 
 * Displays ticket options for the RAADE conference with their respective pricing and benefits.
 * Optimized for both desktop and mobile viewing with responsive grid layout.
 * Shows sale pricing with original prices strikethrough if sale is active.
 */
const ConferenceRegistration = () => {
  const navigate = useNavigate();
  
  // Check if the sale is currently active
  const saleActive = isSaleActive();
  
  // Format the sale end date for display
  const formattedSaleEndDate = format(SALE_END_DATE, "MMMM d, yyyy 'at' h:mm a 'CST'");
  
  // Get current prices from our centralized pricing data
  const studentPrice = getTicketPrice(TICKET_TYPES_ENUM.STUDENT);
  const professionalPrice = getTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL);
  const groupPrice = getTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP);
  
  // Get regular prices for comparison
  const regularStudentPrice = getRegularTicketPrice(TICKET_TYPES_ENUM.STUDENT);
  const regularProfessionalPrice = getRegularTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL);
  const regularGroupPrice = getRegularTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP);
  
  const handleRegistration = () => {
    navigate("/conference/register");
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };
  
  return (
    <section id="registration" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          {saleActive ? (
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 rounded-full">
              <div className="flex items-center justify-center">
                <Clock className="h-5 w-5 mr-2 text-red-600 animate-pulse" />
                <p className="text-red-600 font-bold">LIMITED TIME OFFER - Sale Ends {formattedSaleEndDate}!</p>
              </div>
            </div>
          ) : (
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <p className="text-blue-600 font-bold">Conference Registration Open</p>
            </div>
          )}
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Registration Options</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            {saleActive 
              ? "Special pricing available for a limited time! Secure your spot at the RAADE 2025 African Development Forum."
              : "Secure your spot at the RAADE 2025 African Development Forum. Early registration is recommended as space is limited."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Student Ticket */}
          <motion.div className="scroll-animate" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all relative h-full">
              <div className="absolute top-4 right-4 bg-[#FBB03B] text-white text-sm font-medium py-1 px-3 rounded-full">
                Student
              </div>
              {saleActive && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 hover:bg-red-600">SALE!</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-simula">Student Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-raade-navy">${studentPrice}</p>
                  {saleActive && (
                    <p className="text-gray-500 line-through text-lg">${regularStudentPrice}</p>
                  )}
                </div>
                <p className="text-gray-500 mb-6 font-lora text-sm">For all enrolled students</p>
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
                <Button className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora group" onClick={handleRegistration}>
                  Register Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Professional Ticket */}
          <motion.div className="scroll-animate" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all relative h-full">
              <div className="absolute top-4 right-4 z-10 bg-[#FBB03B] text-white text-sm font-medium py-1 px-3 rounded-full">
                Professional
              </div>
              {saleActive && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 hover:bg-red-600">SALE!</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-simula">Professional Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-raade-navy">${professionalPrice}</p>
                  {saleActive && (
                    <p className="text-gray-500 line-through text-lg">${regularProfessionalPrice}</p>
                  )}
                </div>
                <p className="text-gray-500 mb-6 font-lora text-sm">For professionals</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Full conference access</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-lora">Professional networking events</span>
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
                <Button className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora group" onClick={handleRegistration}>
                  Register Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Note about student group discounts */}
        <div className={`${saleActive ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} p-8 rounded-xl mt-12 mb-10 border-2 border-dashed relative`}>
          {saleActive && (
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm">
                <Clock className="h-4 w-4 mr-1 animate-pulse" />
                SALE!
              </Badge>
            </div>
          )}
          <h3 className="text-xl font-bold text-raade-navy mb-4 font-simula">Student Group Discount{saleActive ? ' - Special Sale!' : ''}</h3>
          <p className="text-gray-600 mb-2 font-lora">
            <span className="font-bold">NEW!</span> Student groups of 3 or more can register at a discounted rate of ${groupPrice} per person.
          </p>
          {saleActive ? (
            <p className="text-gray-600 mb-6 font-lora">
              <span className="text-red-600 font-medium">Limited time offer!</span> Was <span className="line-through">${regularGroupPrice}</span> per person.
            </p>
          ) : (
            <p className="text-gray-600 mb-6 font-lora">
              Save ${regularStudentPrice - groupPrice} per person compared to individual student registration.
            </p>
          )}
          <Button variant="outline" className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora group" onClick={handleRegistration}>
            Register Group
            <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConferenceRegistration;
