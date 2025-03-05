
import { motion } from "framer-motion";

const SprintImage = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Image container - 80% width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-4/5"
          >
            <div className="relative overflow-hidden border-[3rem] border-[#2b212e]">
              <img 
                src="/RAADE-Design-Sprint-Edith-Ibeke.jpg" 
                alt="RAADE Design Sprint with Edith Ibeke"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* Empty space - 20% width */}
          <div className="w-full md:w-1/5"></div>
        </div>
      </div>
    </section>
  );
};

export default SprintImage;
