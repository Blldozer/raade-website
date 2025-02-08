
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
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Container */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-auto max-w-full"
            style={{ display: 'block' }}
          />
          
          {/* Overlay with Content - Always visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-sm font-medium text-white/80 tracking-wider mb-2">
                {category}
              </p>
              <h3 className="text-3xl font-bold text-white font-zillaslab mb-4">
                {title}
              </h3>
              <p className="text-white/90 font-merriweather mb-4">
                {description}
              </p>
              
              {/* Learn More Link */}
              <span className="inline-flex items-center text-white text-sm font-merriweather group-hover:translate-x-1 transition-transform">
                Learn More 
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const FutureShowcase = () => {
  return (
    <section className="relative py-12">
      {/* Background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, #F8F7F4 0%, #FFFFFF 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-[90vw] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A365D] mb-6 font-zillaslab">
            What We're Building Today
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </motion.div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* First Project - Top Left */}
          <div className="col-span-12 md:col-span-6">
            <ProjectCard {...projects[0]} />
          </div>
          
          {/* Second Project - Top Right */}
          <div className="col-span-12 md:col-span-6 md:translate-y-12">
            <ProjectCard {...projects[1]} />
          </div>
          
          {/* Third Project - Bottom Center */}
          <div className="col-span-12 md:col-span-8 md:col-start-3 mt-8">
            <ProjectCard {...projects[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;

