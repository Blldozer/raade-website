
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Users, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: "Time is of the Essence",
    description: "Every day of inaction means missed opportunities for positive change in African communities."
  },
  {
    icon: Globe,
    title: "Global Challenges",
    description: "Climate change, healthcare access, and educational gaps require immediate, innovative solutions."
  },
  {
    icon: Users,
    title: "Growing Population",
    description: "Africa's rapid population growth demands scalable solutions for sustainable development."
  },
  {
    icon: Lightbulb,
    title: "Innovation Gap",
    description: "Bridging the technology and innovation gap requires immediate action and collaboration."
  }
];

const WhyWeCantWait = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1A365D] mb-6 font-zillaslab">
            Why We Can't Wait For Tomorrow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-merriweather">
            The challenges facing African development demand immediate action. 
            Here's why we believe in taking action today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-[#FBB03B]/10 flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <reason.icon className="w-8 h-8 text-[#FBB03B]" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-3 font-alegreyasans">{reason.title}</h3>
              <p className="text-gray-600 font-merriweather">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWeCantWait;
