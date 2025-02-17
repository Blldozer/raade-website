
import { motion } from "framer-motion";
import { Users, Scale, Shapes } from "lucide-react";

const Approach = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-[48px] font-simula text-black mb-8">
            Our Approach to Change
          </h2>
          <p className="text-xl font-lora text-gray-700 leading-relaxed">
            We've built our model on three core principles that guide everything we do:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-cream rounded-xl"
          >
            <Users className="w-16 h-16 text-raade-navy mb-6" />
            <h3 className="text-2xl font-simula mb-4">Human-Centered Design</h3>
            <p className="text-gray-700 leading-relaxed">
              We start with people, not problems. Every solution begins with deep 
              understanding of the human experience, ensuring our innovations serve 
              real needs and create meaningful change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-cream rounded-xl"
          >
            <Shapes className="w-16 h-16 text-raade-navy mb-6" />
            <h3 className="text-2xl font-simula mb-4">Co-Creation</h3>
            <p className="text-gray-700 leading-relaxed">
              We bring together the innovative spirit of Rice students with the deep 
              contextual knowledge of our African partners. This collaboration creates 
              solutions that are both innovative and implementable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-cream rounded-xl"
          >
            <Scale className="w-16 h-16 text-raade-navy mb-6" />
            <h3 className="text-2xl font-simula mb-4">Scalable Impact</h3>
            <p className="text-gray-700 leading-relaxed">
              We design every solution with scale in mind. Our goal isn't just to 
              solve individual challenges, but to create templates for change that 
              can transform communities across Africa.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
