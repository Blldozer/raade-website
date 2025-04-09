
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users, GraduationCap, LightbulbIcon, GlobeIcon } from "lucide-react";

interface DynamicDonationImpactProps {
  selectedAmount: string;
  customAmount?: string;
}

/**
 * DynamicDonationImpact Component
 * 
 * Shows the real-world impact of donation amounts:
 * - Dynamically changes based on donation amount
 * - Provides concrete examples of what each donation amount can accomplish
 * - Helps donors visualize their impact with meaningful metrics
 */
const DynamicDonationImpact: React.FC<DynamicDonationImpactProps> = ({ 
  selectedAmount,
  customAmount
}) => {
  // Calculate the actual donation amount
  const donationAmount = useMemo(() => {
    if (selectedAmount === "custom" && customAmount) {
      return parseFloat(customAmount);
    }
    return parseInt(selectedAmount);
  }, [selectedAmount, customAmount]);
  
  // Define impact tiers based on donation amount
  const getImpactTier = () => {
    if (isNaN(donationAmount)) return "tier1";
    
    if (donationAmount >= 500) return "tier5";
    if (donationAmount >= 250) return "tier4";
    if (donationAmount >= 100) return "tier3";
    if (donationAmount >= 50) return "tier2";
    return "tier1";
  };
  
  const impactTier = getImpactTier();
  
  // Impact details for each tier
  const impactDetails = {
    tier1: {
      title: "Student Support",
      icon: <Users className="h-10 w-10 text-blue-500" />,
      description: "Your donation helps provide resources and mentorship for a Rice student in our Innovation Studios program.",
      impacts: [
        "Support materials for one student",
        "Contribute to peer mentorship sessions",
        "Help fund student project prototypes"
      ]
    },
    tier2: {
      title: "Project Resources",
      icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
      description: "Your donation provides essential resources for student-led projects addressing real challenges in Africa.",
      impacts: [
        "Fund a student project team for one week",
        "Provide research materials and resources",
        "Support virtual collaboration with African partners",
        "Help cover prototype testing costs"
      ]
    },
    tier3: {
      title: "Innovation Catalyst",
      icon: <LightbulbIcon className="h-10 w-10 text-blue-700" />,
      description: "Your donation powers breakthrough ideas and connections between Rice students and African organizations.",
      impacts: [
        "Sponsor a team throughout an entire project phase",
        "Fund specialized equipment for student projects",
        "Enable expert consultation sessions",
        "Support virtual workshops with African partners",
        "Help cover prototype development costs"
      ]
    },
    tier4: {
      title: "Partnership Builder",
      icon: <GlobeIcon className="h-10 w-10 text-blue-800" />,
      description: "Your donation strengthens partnerships between Rice University and African organizations working on critical development challenges.",
      impacts: [
        "Help establish a new partnership with an African organization",
        "Support a full student project from concept to implementation",
        "Fund advanced prototyping and testing",
        "Enable travel for key team members",
        "Support knowledge sharing and documentation"
      ]
    },
    tier5: {
      title: "Transformative Impact",
      icon: <GlobeIcon className="h-10 w-10 text-blue-900" />,
      description: "Your generous donation creates lasting change by enabling comprehensive support for our Innovation Studios program and conference.",
      impacts: [
        "Fund a complete student project through all development phases",
        "Support implementation of solutions in partner communities",
        "Enable conference participation for African partners",
        "Provide scholarships for students to travel to partner sites",
        "Support long-term monitoring and improvement of solutions",
        "Help document and share successful approaches"
      ]
    }
  };
  
  const currentImpact = impactDetails[impactTier];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 h-full">
        <div className="flex items-center mb-6">
          <div className="bg-white p-3 rounded-full shadow-sm mr-4">
            {currentImpact.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 font-simula">{currentImpact.title}</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-4">{currentImpact.description}</p>
          
          <div className="bg-white p-4 rounded-lg border border-blue-100 mb-6">
            <p className="font-medium text-gray-800 mb-2">Your donation of ${isNaN(donationAmount) ? '25' : donationAmount} can help:</p>
            <ul className="space-y-3">
              {currentImpact.impacts.map((impact, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-[#FBB03B] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{impact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="text-center p-4 bg-blue-900/5 rounded-lg">
          <p className="text-sm text-gray-600">
            RAADE is a registered 501(c)(3) nonprofit organization.
            Your donation may be tax-deductible to the extent allowed by law.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DynamicDonationImpact;
