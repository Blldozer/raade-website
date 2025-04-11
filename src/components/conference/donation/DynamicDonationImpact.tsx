import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, GraduationCap, Globe, Heart, BookOpen, FileCheck } from "lucide-react";

interface DynamicDonationImpactProps {
  selectedAmount: string;
  customAmount?: string;
}

/**
 * DynamicDonationImpact Component
 * 
 * Displays donation impact information that changes dynamically based on the selected donation amount:
 * - Different tier names and descriptions for each donation level
 * - Specific benefits or actions supported by the donation
 * - Consistent thank you message across all levels
 */
const DynamicDonationImpact: React.FC<DynamicDonationImpactProps> = ({ 
  selectedAmount,
  customAmount 
}) => {
  // Get the amount to display (handling custom amounts)
  const amount = selectedAmount === "custom" 
    ? (customAmount ? parseFloat(customAmount) : 0) 
    : parseInt(selectedAmount);
  
  // Define impact tiers with their corresponding information
  const getImpactTier = () => {
    if (selectedAmount === "custom") {
      return {
        title: "Innovation Partner",
        description: "Every contribution matters! Your donation helps RAADE connect students with real-world challenges and develop solutions for sustainable development across Africa.",
        benefits: [
          "Support RAADE's mission to pioneer innovative approaches to development",
          "Enable students to engage with African organizations",
          "Help create sustainable solutions for development challenges"
        ],
        color: "indigo"
      };
    }
    
    switch (selectedAmount) {
      case "25":
        return {
          title: "Knowledge Cultivator",
          description: "Your $25 donation helps plant the seeds for impactful connections and knowledge sharing.",
          benefits: [
            "Fund a welcome packet for a conference attendee",
            "Support technical equipment needed for one speaker's presentation",
            "Help provide name badges for multiple participants"
          ],
          color: "green"
        };
        
      case "50":
        return {
          title: "Connection Builder",
          description: "Your $50 donation helps enhance the conference experience for attendees and speakers.",
          benefits: [
            "Cover breakfast for two conference attendees",
            "Fund transportation for a speaker from their hotel to the conference venue",
            "Support the printing of conference materials for multiple participants"
          ],
          color: "blue"
        };
        
      case "100":
        return {
          title: "Impact Accelerator",
          description: "Your $100 donation creates meaningful opportunities for participation and documentation.",
          benefits: [
            "Provide dinner for four conference attendees",
            "Fund a portion of the documentation costs (photography/videography)",
            "Support youth participation in RAADE's programs"
          ],
          color: "purple"
        };
        
      case "250":
        return {
          title: "Vision Amplifier",
          description: "Your $250 donation contributes significantly to the core conference activities and recognition.",
          benefits: [
            "Sponsor a speaker's honorarium",
            "Fund part of the conference venue rental costs",
            "Support the creation of essential conference materials including recognition plaques"
          ],
          color: "pink"
        };
        
      case "500":
        return {
          title: "Partnership Champion",
          description: "Your $500 donation enables significant aspects of our programming and African participation.",
          benefits: [
            "Fund a half-day workshop for African entrepreneurs",
            "Sponsor multiple regional attendees' participation",
            "Support an Innovation Studio project with mentoring and resources"
          ],
          color: "amber"
        };
        
      case "1000":
        return {
          title: "Transformation Catalyst",
          description: "Your donation of $1,000 or more enables transformative impact across our entire initiative.",
          benefits: [
            "Sponsor a complete Studio Innovation project tackling a specific challenge",
            "Fund travel and accommodation for international speakers",
            "Support multiple aspects of the conference including venue, meals, and documentation",
            "Help establish sustainable partnerships between Rice University and African organizations"
          ],
          color: "orange"
        };
        
      default:
        return {
          title: "RAADE Supporter",
          description: "Your donation makes a difference in fostering innovative approaches to development.",
          benefits: [
            "Support RAADE's mission and programs",
            "Help connect students with real-world challenges",
            "Contribute to sustainable development across Africa"
          ],
          color: "gray"
        };
    }
  };
  
  const impactTier = getImpactTier();
  const getIconColor = () => {
    const colorMap: Record<string, string> = {
      green: "text-green-600",
      blue: "text-blue-600",
      purple: "text-purple-600",
      pink: "text-pink-600",
      amber: "text-amber-600",
      orange: "text-orange-600",
      indigo: "text-indigo-600",
      gray: "text-gray-600"
    };
    return colorMap[impactTier.color] || "text-blue-600";
  };
  
  const getBgColor = () => {
    const bgMap: Record<string, string> = {
      green: "bg-green-50",
      blue: "bg-blue-50",
      purple: "bg-purple-50",
      pink: "bg-pink-50",
      amber: "bg-amber-50",
      orange: "bg-orange-50",
      indigo: "bg-indigo-50",
      gray: "bg-gray-50"
    };
    return bgMap[impactTier.color] || "bg-blue-50";
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-raade-navy mb-3 font-simula">Your Impact</h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAmount}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className={`${getBgColor()} rounded-lg p-5 mb-6`}>
              <h4 className={`font-bold text-xl font-simula text-raade-navy`}>{impactTier.title}</h4>
              <p className="text-gray-700 mt-1 font-lora">{impactTier.description}</p>
            </div>
            
            <div>
              <h5 className="font-medium font-simula text-raade-navy mb-3">Your donation will help:</h5>
              <div className="space-y-3">
                {impactTier.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`h-5 w-5 mt-0.5 text-[#FBB03B]`} />
                    <p className="text-gray-600 font-lora">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="border-t border-gray-100 pt-4 mt-6">
          <p className="text-gray-600 text-sm font-lora italic">
            Thank you for supporting our mission to create sustainable solutions for African development challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicDonationImpact;
