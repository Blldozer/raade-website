
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users, GraduationCap, Globe, Sparkles } from "lucide-react";

const ConferenceValue = () => {
  const valueGroups = [
    {
      title: "For Established Changemakers",
      subtitle: "Business Leaders, Policymakers, Investors",
      icon: <Lightbulb className="w-8 h-8 text-[#FBB03B]" />,
      values: [
        "Access to fresh solutions and innovation from talented young minds",
        "Connections to implementation-ready projects that address specific regional challenges",
        "Cross-regional networking with other leaders working on similar issues",
        "Investment opportunities in early-stage solutions with potential for continental scaling",
        "Intelligence on emerging trends and approaches in African development"
      ]
    },
    {
      title: "For the Next Generation of Leaders",
      subtitle: "Students, Young Professionals",
      icon: <GraduationCap className="w-8 h-8 text-[#FBB03B]" />,
      values: [
        "Direct connections to decision-makers who can implement or fund their ideas",
        "Mentorship from established African leaders who have successfully navigated similar challenges",
        "Practical experience solving real-world problems with real stakeholders",
        "Resume-building opportunities that demonstrate impact rather than just theoretical knowledge",
        "Peer networks across disciplines and institutions that can support future collaboration"
      ]
    },
    {
      title: "For Curious Minds",
      subtitle: "Professionals, Academics, Interested Observers",
      icon: <Globe className="w-8 h-8 text-[#FBB03B]" />,
      values: [
        "Deeper understanding of African development challenges beyond headlines",
        "Connections to opportunities for involvement that match their specific skills",
        "Exposure to innovative approaches they might apply in their own work",
        "Forum to contribute their perspectives and expertise to meaningful problems",
        "Networking with diverse professionals interested in similar issues"
      ]
    },
    {
      title: "For All Attendees",
      subtitle: "Everyone at the Conference",
      icon: <Users className="w-8 h-8 text-[#FBB03B]" />,
      values: [
        "Being part of transformative solutions that could scale across regions",
        "Participation in a new model of problem-solving rather than just discussion",
        "Meaningful connections formed through collaborative work rather than superficial networking",
        "Access to a continuing community beyond the conference itself",
        "Belonging to a pioneering effort that could reshape how development challenges are addressed"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-raade-navy mb-6 font-simula">
            Conference Value Proposition
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            The distinctive value of the RAADE conference is that attendees don't just gain knowledge 
            or contacts – they become part of creating solutions that can spread across the continent.
          </p>
          <div className="flex justify-center mt-8">
            <Badge className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 px-4 py-2 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Join us April 11-12, 2025
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {valueGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {group.icon}
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-raade-navy font-simula">{group.title}</h3>
                      <p className="text-[#FBB03B] text-sm font-lora">{group.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600 font-lora">
                    {group.values.map((value, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#FBB03B] mr-2">•</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-lg font-medium text-raade-navy mb-6 font-simula">
            By bringing together diverse perspectives and focusing on implementation rather than just discussion, 
            the conference creates a unique environment where each person's contribution becomes more valuable 
            through its connection to others.
          </p>
          <a 
            href="/conference" 
            className="inline-flex items-center bg-raade-navy text-white font-lora px-6 py-3 rounded-md hover:bg-raade-navy/90 transition-all"
          >
            Learn More About Our Conference
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceValue;
