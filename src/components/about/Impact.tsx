import { motion } from "framer-motion";
import CountUp from "react-countup";

const Impact = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              The numbers that drive us
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div>
        </div>

        {/* Subtitle Section - 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed text-center">
              We've come a long way, in a few short months, but we are only just getting started
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid - 2x2 Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-t border-gray-200 pt-8"
            >
              <div className="text-[8rem] font-montserrat font-black text-black leading-none tracking-tighter">
                8
              </div>
              <p className="text-xl text-gray-600 mt-2">
                Active projects transforming communities
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="border-t border-gray-200 pt-8"
            >
              <div className="text-[8rem] font-montserrat font-black text-black leading-none tracking-tighter">
                6
              </div>
              <p className="text-xl text-gray-600 mt-2">
                African partner organizations
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="border-t border-gray-200 pt-8"
            >
              <div className="text-[8rem] font-montserrat font-black text-black leading-none tracking-tighter">
                100<span className="text-gray-300">+</span>
              </div>
              <p className="text-xl text-gray-600 mt-2">
                Rice students engaged in real-world innovation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="border-t border-gray-200 pt-8"
            >
              <div className="text-[8rem] font-montserrat font-black text-black leading-none tracking-tighter">
                3
              </div>
              <p className="text-xl text-gray-600 mt-2">
                Solutions ready for scaling
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Content - 39/61 split */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[39%]"></div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-full lg:w-[61%]"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed">
              These are milestones in our journey to transform 
              how development happens. Each number represents real people, real solutions, 
              and real impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
