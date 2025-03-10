
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ImageCollage from "./ImageCollage";

const Reality = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section with 39/61 split - Title on left, spacer on right */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              The <span className="font-['Simula_Book_Italic']">reality</span> we're addressing
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div>
        </div>

        {/* Content Section with 39/61 split - Spacer on left, content on right */}
        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%] mb-8 lg:mb-0">
            <ImageCollage 
              variant="scattered" 
              images={[
                "/lovable-uploads/57a9d290-224d-44e7-b284-7715e6f4f3fd.png",
                "/lovable-uploads/9c6ceb51-936a-4146-a252-1051ae86534a.png",
                "/lovable-uploads/e94065dc-60d5-469d-8ea2-6657f57bb00b.png",
                "/Women Enterpreneurs.jpg"
              ]} 
              className="transform scale-90"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%]"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed">
              For too long, development solutions have followed a one-way path: from the 
              Global North to Africa, from theory to practice, from boardrooms to communities. 
              The result? A landscape littered with well-intentioned but ineffective solutions.
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#3C403A] p-8 rounded-xl shadow-sm"
          >
            <div className="text-5xl font-montserrat font-black text-white mb-4">
              <CountUp end={70} suffix="%" duration={2.5} />
            </div>
            <p className="text-gray-200">
              of development projects fail to achieve their intended impact
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#3C403A] p-8 rounded-xl shadow-sm"
          >
            <div className="text-5xl font-montserrat font-black text-white mb-4">
              <CountUp prefix="$" end={4.5} suffix="B" decimals={1} duration={2.5} />
            </div>
            <p className="text-gray-200">
              spent annually on solutions that don't last
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#3C403A] p-8 rounded-xl shadow-sm"
          >
            <div className="text-5xl font-montserrat font-black text-white mb-4">
              <CountUp end={80} suffix="%" duration={2.5} />
            </div>
            <p className="text-gray-200">
              of initiatives designed without meaningful local input
            </p>
          </motion.div>
        </div>

        {/* Bottom Content with 39/61 split - Spacer on left, content on right */}
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
