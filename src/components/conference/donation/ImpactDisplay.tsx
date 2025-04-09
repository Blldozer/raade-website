
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, GraduationCap, Globe } from "lucide-react";

/**
 * ImpactDisplay Component
 * 
 * Shows donation impact through impact tiers and program information:
 * - Visually demonstrates what different donation amounts accomplish
 * - Provides engaging statistics about program impact
 * - Uses clean, modern design with accent colors
 * - Mobile responsive
 */
const ImpactDisplay = () => {
  const impactTiers = [
    {
      amount: "$25",
      title: "Supporter",
      description: "Provides materials for one student in our Innovation Studios program",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    {
      amount: "$50",
      title: "Advocate",
      description: "Sponsors a workshop connecting Rice students with African partners",
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    {
      amount: "$100",
      title: "Champion",
      description: "Funds prototype development for one innovation project",
      icon: <GraduationCap className="h-5 w-5 text-purple-500" />
    },
    {
      amount: "$250",
      title: "Catalyst",
      description: "Enables implementation of a solution with our African partners",
      icon: <Globe className="h-5 w-5 text-[#FBB03B]" />
    },
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 font-simula">Your Impact</h3>
        
        <div className="space-y-6">
          {impactTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#FBB03B]/30 hover:bg-[#FBB03B]/5 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">{tier.amount}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {tier.icon}
                  <h4 className="font-bold text-gray-800">{tier.title}</h4>
                </div>
                <p className="text-gray-600 text-sm mt-1">{tier.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Program Impact Stats */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 font-simula">Program Impact</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#FBB03B]/10 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-raade-navy">100+</div>
            <p className="text-sm text-gray-600">Students Engaged</p>
          </div>
          <div className="bg-[#FBB03B]/10 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-raade-navy">8</div>
            <p className="text-sm text-gray-600">Active Projects</p>
          </div>
          <div className="bg-[#FBB03B]/10 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-raade-navy">6</div>
            <p className="text-sm text-gray-600">Faculty Mentors</p>
          </div>
          <div className="bg-[#FBB03B]/10 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-raade-navy">4+</div>
            <p className="text-sm text-gray-600">African Countries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDisplay;
