
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const initiatives = [
  {
    title: "Innovation Studios",
    description: "9-week intensive programs where Rice students collaborate with African organizations to develop innovative solutions.",
    metric: "8 Active Projects",
    link: "/studios"
  },
  {
    title: "Annual Conference",
    description: "A global summit bringing together African leaders, scholars, and innovators to shape the future of development.",
    metric: "Coming April 2025",
    link: "/conference"
  },
  {
    title: "Research Partnerships",
    description: "Collaborative research initiatives with leading African institutions to drive evidence-based solutions.",
    metric: "6 Partner Organizations",
    link: "#"
  }
];

const WhatWeAreBuilding = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1A365D] mb-6 font-alegreyasans">
            What We're Building Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-merriweather">
            Through our key initiatives, we're actively creating sustainable solutions 
            for African development challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-[#1A365D] mb-4 font-alegreyasans">{initiative.title}</h3>
                  <p className="text-gray-600 mb-6 font-merriweather">{initiative.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FBB03B] font-semibold font-alegreyasans">{initiative.metric}</span>
                    <a 
                      href={initiative.link} 
                      className="text-raade-gold-start hover:text-[#1A365D] transition-colors flex items-center gap-2 font-merriweather"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeAreBuilding;
