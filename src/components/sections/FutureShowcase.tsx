
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "YOUR KITCHEN IS ENOUGH",
    image: "/Cozy-Sunlit-Rustic-Kitchen.jpeg",
    description: "Empowering local ingredients, enriching communities",
    slug: "kitchen-project"
  },
  {
    title: "LIGHTS THAT NEVER GO OUT",
    image: "/Cozy-Café-Interior.jpeg",
    description: "Sustainable power for unstoppable progress",
    slug: "lights-project"
  },
  {
    title: "YOUR CHILDREN WILL DO BETTER",
    image: "/Mother-and-Newborn-Intimacy.jpeg",
    description: "Building generational prosperity through innovation",
    slug: "prosperity-project"
  }
];

const ProjectCard = ({ title, image, description, slug }: { 
  title: string, 
  image: string, 
  description: string,
  slug: string 
}) => {
  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        className="relative aspect-video lg:h-[400px] rounded-xl overflow-hidden shadow-lg transition-all duration-300 group hover:shadow-2xl hover:ring-2 hover:ring-white/20 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-white font-zillaslab">
              {title}
            </h3>
            <p className="text-white/80 font-merriweather text-sm md:text-base transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {description}
            </p>
          </div>
          
          {/* Learn More Link */}
          <div className="flex justify-end mt-4">
            <span className="inline-flex items-center text-white/90 text-sm font-merriweather transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Learn More 
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A365D] mb-6 font-zillaslab">
            What We're Building Today
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
