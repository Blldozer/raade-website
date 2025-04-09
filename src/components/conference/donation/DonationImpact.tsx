
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users, GraduationCap, Building } from "lucide-react";

/**
 * DonationImpact Component
 * 
 * Visualizes the impact of donations with:
 * - Animated progress indicators
 * - Key impact metrics
 * - Clear explanation of how funds are used
 * - Testimonial from a beneficiary
 * - Mobile responsive design
 */
const DonationImpact = () => {
  const impactAreas = [
    {
      icon: <Lightbulb className="h-8 w-8 text-[#FBB03B]" />,
      title: "Innovation Studios",
      description: "Fund student-led innovation teams working on real-world African development challenges.",
      percentage: 40
    },
    {
      icon: <Users className="h-8 w-8 text-[#FBB03B]" />,
      title: "Scholarships",
      description: "Support scholarships for students from underrepresented backgrounds to participate.",
      percentage: 25
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-[#FBB03B]" />,
      title: "Education Programs",
      description: "Expand educational resources and training for participants in our programs.",
      percentage: 20
    },
    {
      icon: <Building className="h-8 w-8 text-[#FBB03B]" />,
      title: "Partner Support",
      description: "Provide resources to our African partner organizations to implement solutions.",
      percentage: 15
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 font-simula">Your Impact</h3>
        <p className="text-gray-600 font-lora">
          Your donation directly supports our mission to connect Rice students with 
          African organizations to create scalable solutions for pressing challenges.
        </p>
      </div>
      
      {/* Impact areas with progress bars */}
      <div className="space-y-6">
        {impactAreas.map((area, index) => (
          <motion.div 
            key={area.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#FBB03B]/10 p-2 rounded-full">
                {area.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{area.title}</h4>
                <p className="text-sm text-gray-600">{area.percentage}% of donations</p>
              </div>
            </div>
            
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#FBB03B]"
                initial={{ width: 0 }}
                whileInView={{ width: `${area.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              />
            </div>
            
            <p className="text-sm text-gray-600">{area.description}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-raade-navy">100+</div>
          <p className="text-sm text-gray-600">Students Engaged</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-raade-navy">8</div>
          <p className="text-sm text-gray-600">Active Projects</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-raade-navy">6</div>
          <p className="text-sm text-gray-600">Faculty Mentors</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-raade-navy">4+</div>
          <p className="text-sm text-gray-600">African Countries</p>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#FBB03B] mt-6">
        <p className="text-gray-700 italic mb-2 font-lora">
          "RAADE's Innovation Studios connected our healthcare organization with brilliant 
          students who created a solution that has significantly improved our maternal health 
          outcomes in rural communities."
        </p>
        <p className="text-sm text-gray-600 font-medium">
          — Dr. Amina Okafor, Partner Organization Leader
        </p>
      </div>
    </div>
  );
};

export default DonationImpact;
