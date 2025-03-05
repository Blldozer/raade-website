
import { motion } from "framer-motion";

const SprintImage = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image container - 80% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[80%]"
          >
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/RAADE-Design-Sprint-Edith-Ibeke.jpg" 
                alt="RAADE Design Sprint led by Edith Ibeke" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* Right empty space - 20% */}
          <div className="lg:w-[20%]"></div>
        </div>
      </div>
    </section>
  );
};

export default SprintImage;
