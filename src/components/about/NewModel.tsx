import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

/**
 * NewModel Component - The first content section after the hero
 * Has light background which requires a dark navbar (navy text)
 */
const NewModel = () => {
  return (
    <section id="overview" className="about-content-section py-32 bg-white" data-background="light">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section with 39/61 split */}
        <div className="flex flex-col lg:flex-row">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black max-w-[700px]">
              A <span className="font-simula-italic">new</span> model for African development
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div> {/* Spacer div for maintaining the split */}
        </div>

        {/* Content Section with reversed 39/61 split */}
        <div className="flex flex-col lg:flex-row mt-16">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%]"
          >
            <div className="space-y-8 text-xl leading-relaxed font-lora text-gray-700 max-w-[800px]">
              <p>
                We are pioneering a fundamentally different approach to African development. 
                One where solutions aren’t imported, but co-created. Where innovation isn’t 
                imposed, but inspired. Where students don’t just study development—they drive it.
              </p>
              <p>
                Our model bridges two worlds: the innovative spirit of Rice University and 
                the transformative potential of African organizations. Through this unique 
                partnership, we’re creating solutions that are both groundbreaking and 
                grounded in local realities.
              </p>
              <p>
                This isn’t just another development initiative. It’s a movement that brings 
                together student innovators and African change-makers to solve real challenges, 
                create lasting impact, and reimagine what’s possible.
              </p>
            </div>
            {/* Interactive Diagram */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-24 p-12 bg-[#3C403A] rounded-xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-simula mb-6 text-white">Rice Students</h3>
                  <ul className="space-y-3 text-gray-200 font-lora">
                    <li>Innovation Capacity</li>
                    <li>Technical Expertise</li>
                    <li>Fresh Perspectives</li>
                  </ul>
                </div>
                <ArrowLeftRight className="w-16 h-16 text-white rotate-90 md:rotate-0" />
                <div className="text-center md:text-right">
                  <h3 className="text-2xl font-simula mb-6 text-white">African Partners</h3>
                  <ul className="space-y-3 text-gray-200 font-lora">
                    <li>Local Knowledge</li>
                    <li>Cultural Context</li>
                    <li>Implementation Expertise</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        </div>
    </section>
  );
};

export default NewModel;
