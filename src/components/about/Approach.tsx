import { motion } from "framer-motion";
import { Users, Scale, Shapes } from "lucide-react";

/**
 * Approach Component - Third content section
 * Has light background which requires a dark navbar (navy text)
 */
const Approach = () => {
  return (
    <section id="approach" className="about-content-section py-24 bg-white" data-background="light">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section */}
        <div className="flex flex-col lg:flex-row mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Our approach to <span className="font-simula-italic">change</span>
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div>
        </div>

        {/* First Principle - 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[39%] pr-8"
          >
            <Users className="w-20 h-20 text-raade-navy mb-8" />
            <h3 className="text-3xl font-simula mb-6">Human-Centered Design</h3>
            <p className="text-xl text-gray-700 leading-relaxed font-lora">
              We start with people, not problems. Every solution begins with deep 
              understanding of the human experience, ensuring our innovations serve 
              real needs and create meaningful change.
            </p>
          </motion.div>
          <div className="lg:w-[61%] h-[400px] mt-8 lg:mt-0">
            <div className="w-full h-full bg-cream rounded-xl"></div>
          </div>
        </div>

        {/* Second Principle - 61/39 split (reversed) */}
        <div className="flex flex-col lg:flex-row mb-24">
          <div className="lg:w-[61%] h-[400px] mb-8 lg:mb-0">
            <div className="w-full h-full bg-cream rounded-xl"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-[39%] lg:pl-8"
          >
            <Shapes className="w-20 h-20 text-raade-navy mb-8" />
            <h3 className="text-3xl font-simula mb-6">Co-Creation</h3>
            <p className="text-xl text-gray-700 leading-relaxed font-lora">
              We bring together the innovative spirit of Rice students with the deep 
              contextual knowledge of our African partners. This collaboration creates 
              solutions that are both innovative and implementable.
            </p>
          </motion.div>
        </div>

        {/* Third Principle - 39/61 split */}
        <div className="flex flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="w-full lg:w-[39%] pr-8"
          >
            <Scale className="w-20 h-20 text-raade-navy mb-8" />
            <h3 className="text-3xl font-simula mb-6">Scalable Impact</h3>
            <p className="text-xl text-gray-700 leading-relaxed font-lora">
              We design every solution with scale in mind. Our goal isn't just to 
              solve individual challenges, but to create templates for change that 
              can transform communities across Africa.
            </p>
          </motion.div>
          <div className="lg:w-[61%] h-[400px] mt-8 lg:mt-0">
            <div className="w-full h-full bg-cream rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
