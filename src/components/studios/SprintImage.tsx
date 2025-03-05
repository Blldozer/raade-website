
import { motion } from "framer-motion";

const SprintImage = () => {
  return (
    <section className="py-20 bg-white">
      <div className="w-full mx-auto">
        <div className="flex flex-col items-center">
          {/* Image container - 100% width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="relative overflow-hidden border-8 border-[#2b212e]">
              <img 
                 src="RAADE-Innovation-Studio-1-edited.jpg" 
                alt="RAADE Innovation Studio team IPI"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SprintImage;
