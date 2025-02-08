
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "YOUR KITCHEN IS ENOUGH",
    image: "/Cozy-Sunlit-Rustic-Kitchen.jpeg",
    description: "Empowering local ingredients, enriching communities",
    slug: "kitchen-project",
    category: "SUSTAINABLE LIVING"
  },
  {
    title: "LIGHTS THAT NEVER GO OUT",
    image: "/Cozy-Café-Interior.jpeg",
    description: "Sustainable power for unstoppable progress",
    slug: "lights-project",
    category: "ENERGY SOLUTIONS"
  },
  {
    title: "YOUR CHILDREN WILL DO BETTER",
    image: "/Mother-and-Newborn-Intimacy.jpeg",
    description: "Building generational prosperity through innovation",
    slug: "prosperity-project",
    category: "COMMUNITY DEVELOPMENT"
  }
];

const ProjectCard = ({ title, image, description, slug, category }: { 
  title: string, 
  image: string, 
  description: string,
  slug: string,
  category: string 
}) => {
  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        className="group relative w-full mb-16 last:mb-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        
        {/* Content */}
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-gray-500 tracking-wider">
            {category}
          </p>
          <h3 className="text-2xl font-bold text-[#1A365D] font-zillaslab group-hover:text-[#2a4774] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 font-merriweather">
            {description}
          </p>
          
          {/* Learn More Link */}
          <div className="pt-2">
            <span className="inline-flex items-center text-[#2a4774] text-sm font-merriweather group-hover:translate-x-1 transition-transform">
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
      {/* Background */}
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
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A365D] mb-6 font-zillaslab">
            What We're Building Today
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </motion.div>

        {/* Project Stack */}
        <div className="max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
