
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Impact = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-[48px] font-simula text-black mb-8">
            The Numbers That Drive Us
          </h2>
          <p className="text-xl font-lora text-gray-700 leading-relaxed">
            Numbers we're proud of, yet humble about:
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { number: 8, label: "Active projects transforming communities" },
            { number: 6, label: "African partner organizations" },
            { number: 4, label: "Countries where we're creating impact" },
            { number: 100, label: "Rice students engaged in real-world innovation" },
            { number: 3, label: "Solutions ready for scaling" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="text-4xl md:text-5xl font-simula text-raade-navy mb-4">
                <CountUp end={stat.number} duration={2.5} />
                {stat.number === 100 && "+"}
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-xl font-lora text-gray-700 leading-relaxed max-w-3xl mt-16 mx-auto text-center"
        >
          These aren't just metrics—they're milestones in our journey to transform 
          how development happens. Each number represents real people, real solutions, 
          and real impact.
        </motion.p>
      </div>
    </section>
  );
};

export default Impact;
