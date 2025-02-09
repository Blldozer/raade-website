
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const JoinSection = () => {
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
            Build with us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Innovation Studios */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
              <img
                src="/Cozy-Sunlit-Rustic-Kitchen.jpeg"
                alt="Innovation Studios"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#1A365D] font-zillaslab">Innovation Studios</h3>
            <p className="text-lg text-[#1A365D]/80 font-merriweather">
              9-week intensive programs where Rice students collaborate with African
              organizations to develop innovative solutions.
            </p>
            <Link
              to="/studios"
              className="inline-flex items-center text-[#1A365D] text-lg font-alegreyasans hover:translate-x-2 transition-all duration-300"
            >
              Join the Studios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          {/* Annual Conference */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
              <img
                src="/Cozy-Café-Interior.jpeg"
                alt="Annual Conference"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#1A365D] font-zillaslab">Annual Conference</h3>
            <p className="text-lg text-[#1A365D]/80 font-merriweather">
              Global summit bringing together African leaders, scholars, and innovators
              to shape the future of development.
            </p>
            <Link
              to="/conference"
              className="inline-flex items-center text-[#1A365D] text-lg font-alegreyasans hover:translate-x-2 transition-all duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
