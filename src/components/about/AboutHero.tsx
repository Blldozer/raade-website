
import { motion } from "framer-motion";

/**
 * About Hero Section
 * This component has a dark background, which requires a light navbar (white text)
 * We mark it with data-background="dark" for the useNavBackground hook to detect
 */
const AboutHero = () => {
  return (
    <section className="about-hero-section min-h-[90vh] bg-[#274675] relative flex items-center overflow-hidden" data-background="dark">
      <div className="absolute inset-0 bg-gradient-to-t from-[#274675]/90 to-[#274675]/80 z-0"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full lg:w-[61%] text-white"
          >
            <h1 className="text-[clamp(3.5rem,8vw,6rem)] leading-[1] font-simula mb-8 mt-20 lg:mt-0">
              Building African futures, together
            </h1>
            <p className="text-xl md:text-2xl font-lora text-white/90 max-w-[700px]">
              RAADE is a student organization at Rice University pioneering a new approach to African development through innovation and collaboration.
            </p>
          </motion.div>
          
          <div className="w-full lg:w-[39%] flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.5, duration: 0.8 }}
              className="aspect-square w-full max-w-md rounded-full bg-[#FBB03B]/40 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-2 rounded-full bg-[#FBB03B]/60 flex items-center justify-center">
                <div className="text-center p-8">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 font-simula">Founded 2023</h2>
                  <p className="text-white/90 font-lora">
                    From idea to impact in just one year
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
