import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch bg-cream">
      {/* Left Side - Text */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[38%] p-8 lg:p-16 flex flex-col justify-center"
      >
        <h1 className="text-6xl lg:text-7xl font-simula text-black mb-8">
          Who we are
        </h1>
        <p className="text-xl lg:text-2xl text-gray-700 font-lora max-w-xl">
          RAADE pioneers innovative approaches to African development by connecting
          students with African organizations to create scalable solutions for pressing
          challenges.
        </p>
      </motion.div>

    {/* Right Side - Image */}
<motion.div 
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="w-full lg:w-[62%] min-h-screen relative bg-[#F5F5F5]"
>
  <div className="absolute inset-0 flex items-center justify-center">
    <img
      src="raade-eboard-wb.jpg"
      alt="RAADE Team at Baker Institute"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute inset-0 bg-black/10" />
</motion.div>
    </div>
  );
};

export default AboutHero;