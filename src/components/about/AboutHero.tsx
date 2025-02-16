import { motion } from "framer-motion";
const AboutHero = () => {
  return <div className="min-h-screen relative bg-raade-navy overflow-hidden flex items-center">
      <div className="absolute inset-0 from-black/50 via-transparent to-transparent z-10 bg-[2b212e]" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="space-y-6">
            {["Design.", "Build.", "Scale."].map((word, index) => <motion.div key={word} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.2 + 0.3,
            duration: 0.5
          }}>
                <h1 className="text-6xl md:text-8xl font-montserrat font-bold text-white">
                  {word}
                </h1>
              </motion.div>)}
          </motion.div>
          
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1.2,
          duration: 0.5
        }} className="mt-12 text-xl md:text-2xl text-white/90 font-lora max-w-2xl">
            We're reimagining African development through student-led innovation and 
            meaningful partnerships.
          </motion.p>
        </div>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-raade-navy via
-raade-navy to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-raade-gold-start/30 via-transparent to-transparent" />
        </div>
      </div>
    </div>;
};
export default AboutHero;