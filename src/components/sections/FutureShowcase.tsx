
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "YOUR KITCHEN IS ENOUGH",
    image: "/lovable-uploads/53c3e0e3-e1ae-42a9-bdb8-6854c8b646ba.png", // Mother cooking image
    description: "Empowering local ingredients, enriching communities"
  },
  {
    title: "LIGHTS THAT NEVER GO OUT",
    image: "/lovable-uploads/57a9d290-224d-44e7-b284-7715e6f4f3fd.png", // Night business image
    description: "Sustainable power for unstoppable progress"
  },
  {
    title: "YOUR CHILDREN WILL DO BETTER",
    image: "/lovable-uploads/5f474a9c-ca13-4875-b29c-a91ae8f15738.png", // Entrepreneur image
    description: "Building generational prosperity through innovation"
  }
];

const ProjectCard = ({ title, image, description }: { title: string, image: string, description: string }) => {
  return (
    <motion.div
      className="relative h-[400px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-102 group"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-2xl font-bold text-white font-zillaslab mb-2">
          {title}
        </h3>
        <p className="text-white/80 font-merriweather text-sm transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FutureShowcase = () => {
  return (
    <section className="relative py-24">
      {/* Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, #F8F7F4 0%, #FFFFFF 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-[#1A365D] mb-6 font-zillaslab">
            What We're Building Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
