
import { motion } from "framer-motion";

const StudioOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-raade-Thunder">
              Transforming <span className="font-['Simula_Book_Italic']">non-consumption</span> into consumption
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div> {/* Filler space */}
        </div>

        {/* Content Section - 39/61 split reversed */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[39%]"></div> {/* Filler space */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%]"
          >
            <div className="space-y-8 text-xl leading-relaxed font-lora text-gray-700 max-w-[800px]">
              <p>
                At RAADE, we focus on a powerful concept: identifying areas where millions 
                of people cannot access essential products and services, then creating 
                innovative solutions to make them accessible.
              </p>
              <p>
                Rather than simply improving existing offerings for those already served, 
                we design pathways that reach those previously excluded from markets 
                entirely — transforming "non-consumers" into consumers.
              </p>
              <p>
                This approach creates sustainable impact by building new markets that serve 
                more people while creating economic opportunity. When done right, these 
                solutions scale organically, reaching far beyond initial implementations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioOverview;
