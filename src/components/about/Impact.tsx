
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

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { number: 8, label: "Active projects transforming communities" },
            { number: 6, label: "African partner organizations" },
            { number: 100, label: "Rice students engaged in real-world innovation" },
            { number: 3, label: "Solutions ready for scaling" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-montserrat font-black text-black mb-4">
                <CountUp end={stat.number} duration={2.5} />
                {stat.number === 100 && "+"}
              </div>
              <p className="text-gray-700 text-lg">
                {stat.label}
              </p>
            </motion.div>
          ))}
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
              These aren't just metrics—they're milestones in our journey to transform 
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
