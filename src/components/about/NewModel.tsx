
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

const NewModel = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title Section with 39/61 split */}
        <div className="flex flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%] pl-4 md:pl-8 pr-8"
          >
            <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] font-simula text-black mb-8">
              A <span className="font-['Simula_Book_Italic']">new</span> Model for African Development
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div> {/* Spacer div for maintaining the split */}
        </div>

        {/* Content Section with reversed 39/61 split */}
        <div className="flex flex-col lg:flex-row mt-8">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%] px-4 md:px-8"
          >
            <div className="space-y-6 text-xl font-lora text-gray-700 leading-relaxed">
              <p>
                We are pioneering a fundamentally different approach to African development. 
                One where solutions aren't imported, but co-created. Where innovation isn't 
                imposed, but inspired. Where students don't just study development—they drive it.
              </p>
              <p>
                Our model bridges two worlds: the innovative spirit of Rice University and 
                the transformative potential of African organizations. Through this unique 
                partnership, we're creating solutions that are both groundbreaking and 
                grounded in local realities.
              </p>
              <p>
                This isn't just another development initiative. It's a movement that brings 
                together student innovators and African change-makers to solve real challenges, 
                create lasting impact, and reimagine what's possible.
              </p>
            </div>

            {/* Interactive Diagram */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 p-8 bg-cream rounded-xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-simula mb-4">Rice Students</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Innovation Capacity</li>
                    <li>Technical Expertise</li>
                    <li>Fresh Perspectives</li>
                  </ul>
                </div>
                <ArrowLeftRight className="w-16 h-16 text-raade-navy rotate-90 md:rotate-0" />
                <div className="text-center md:text-right">
                  <h3 className="text-2xl font-simula mb-4">African Partners</h3>
                  <ul className="space-y-2 text-gray-700">
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
