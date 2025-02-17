
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Reality = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section with 39/61 split */}
        <div className="flex flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              The Reality We're Addressing
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed">
              For too long, development solutions have followed a one-way path: from the 
              Global North to Africa, from theory to practice, from boardrooms to communities. 
              The result? A landscape littered with well-intentioned but ineffective solutions.
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="text-5xl font-simula text-raade-navy mb-4">
              <CountUp end={70} suffix="%" duration={2.5} />
            </div>
            <p className="text-gray-700">
              of development projects fail to achieve their intended impact
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="text-5xl font-simula text-raade-navy mb-4">
              <CountUp prefix="$" end={4.5} suffix="B" decimals={1} duration={2.5} />
            </div>
            <p className="text-gray-700">
              spent annually on solutions that don't last
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="text-5xl font-simula text-raade-navy mb-4">
              <CountUp end={80} suffix="%" duration={2.5} />
            </div>
            <p className="text-gray-700">
              of initiatives designed without meaningful local input
            </p>
          </motion.div>
        </div>

        {/* Bottom Content with 39/61 split */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-full lg:w-[61%]"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed">
              But these statistics aren't just numbers—they represent missed opportunities 
              for transformation. They represent the gap between good intentions and lasting 
              impact. They represent why we need a new approach.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reality;
