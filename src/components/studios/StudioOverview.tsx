import { motion } from "framer-motion";
import { Compass, Rocket, CheckCircle } from "lucide-react";
const StudioOverview = () => {
  return <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} whileInView={{
        opacity: 1,
        x: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="flex flex-col lg:flex-row mb-16">
          <div className="w-full lg:w-[39%]">
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-zinc-950">
              Transforming <span className="font-['Simula_Book_Italic']">non-consumption</span> into consumption
            </h2>
          </div>
          <div className="lg:w-[61%]"></div> {/* Filler space */}
        </motion.div>

        {/* Content Section - 39/61 split reversed */}
        <div className="flex flex-col lg:flex-row mb-20">
          <div className="lg:w-[39%]"></div> {/* Filler space */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="w-full lg:w-[61%]">
            <div className="space-y-8 text-xl leading-relaxed font-lora text-black max-w-[800px]">
              <p>
                At RAADE, we focus on a powerful concept: identifying areas where millions 
                of people cannot access essential products and services, then creating 
                innovative solutions to make them accessible.
              </p>
              <p>
                Rather than simply improving existing offerings for those already served, 
                we design pathways that reach those previously excluded from markets 
                entirely — transforming "non-consumers" into consumers.
              </p>
              <p className="text-gray-700">
                This approach creates sustainable impact by building new markets that serve 
                more people while creating economic opportunity. When done right, these 
                solutions scale organically, reaching far beyond initial implementations.
              </p>
              <p className="text-gray-700">
              To bring this vision to life, we've developed a structured, three-phase innovation process that unfolds throughout the school year. 
              We begin with Immersion & Discovery, where our teams deeply understand the problem context through 
              ethnographic research and stakeholder interviews, uncovering hidden insights that reveal true needs. 
              This leads to Rapid Ideation & Prototyping, where promising solutions are quickly developed and tested with 
              users to validate core assumptions. Finally, in the Implementation phase, we refine these solutions and develop 
              comprehensive plans for real-world application and scaling, ensuring our innovations create lasting impact beyond initial pilots.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three Phase Cards with Image Backgrounds - Now Square */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Phase 1: Immersion & Discovery */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="relative aspect-square group overflow-hidden rounded-xl shadow-lg">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img src="/RAADE-Design-Sprint-Edith-Ibeke.jpg" alt="Immersion & Discovery Phase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            {/* Title Overlay - Always Visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex items-center justify-center">
              <div className="p-3 rounded-full bg-raade-navy text-white mb-4 transition-all duration-300 group-hover:translate-y-[-60px]">
                <Compass size={32} />
              </div>
              <h3 className="text-white font-simula text-3xl font-semibold text-center absolute bottom-8 group-hover:translate-y-[-20px] transition-all duration-300">
                Immersion & Discovery
              </h3>
            </div>
            
            {/* Description Overlay - Visible on Hover */}
            <div className="absolute inset-0 bg-raade-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8">
              <p className="text-white font-lora text-center mt-8">
                We dive deeply into understanding the problem through ethnographic interviews, contextual research, 
                and empathy-building exercises. Our teams carefully map stakeholder ecosystems and uncover 
                hidden insights that reveal the true nature of each challenge.
              </p>
            </div>
          </motion.div>

          {/* Phase 2: Rapid Ideation & Prototyping */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="relative aspect-square group overflow-hidden rounded-xl shadow-lg">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img src="/RAADE-Prototyping-Gustavo-Vives.jpeg" alt="Rapid Ideation & Prototyping Phase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            {/* Title Overlay - Always Visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex items-center justify-center">
              <div className="p-3 rounded-full bg-raade-yellow-orange text-white mb-4 transition-all duration-300 group-hover:translate-y-[-60px]">
                <Rocket size={32} />
              </div>
              <h3 className="text-white font-simula text-3xl font-semibold text-center absolute bottom-8 group-hover:translate-y-[-20px] transition-all duration-300">
                Rapid Ideation & Prototyping
              </h3>
            </div>
            
            {/* Description Overlay - Visible on Hover */}
            <div className="absolute inset-0 bg-raade-yellow-orange/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8">
              <p className="text-white font-lora text-center mt-8">
                In this phase we unleash creative thinking through structured brainstorming sessions and rapid experimentation, 
                where teams quickly build and test low-fidelity prototypes to validate core assumptions.
              </p>
            </div>
          </motion.div>

          {/* Phase 3: Implementation */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="relative aspect-square group overflow-hidden rounded-xl shadow-lg">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img src="/RAADE-Innovation-Studio-1-Hawa-Ife-Hamza.jpg" alt="Implementation Phase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            {/* Title Overlay - Always Visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex items-center justify-center">
              <div className="p-3 rounded-full bg-[#2b212e] text-white mb-4 transition-all duration-300 group-hover:translate-y-[-60px]">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-white font-simula text-3xl font-semibold text-center absolute bottom-8 group-hover:translate-y-[-20px] transition-all duration-300">
                Implementation
              </h3>
            </div>
            
            {/* Description Overlay - Visible on Hover */}
            <div className="absolute inset-0 bg-[#2b212e]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8">
              <p className="text-white font-lora text-center mt-8">
                Teams refine their solutions and develop comprehensive strategies 
                for real-world application, including financial modeling, 
                scalability planning, and user testing protocols. 
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default StudioOverview;