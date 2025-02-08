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
        className="group relative h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative rounded-lg overflow-hidden h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <p className="text-sm font-medium text-white/80 tracking-wider mb-2">
                {category}
              </p>
              <h3 className="text-2xl font-bold text-white font-zillaslab mb-3">
                {title}
              </h3>
              <p className="text-white/90 font-merriweather mb-3 text-sm">
                {description}
              </p>
              
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
    <section className="relative pb-32 pt-12">
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, #F8F7F4 0%, #FFFFFF 100%)',
        }}
      />
      
      <div className="relative z-10 max-w-[90vw] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4 font-zillaslab">
            What We're Building Today
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 h-[60vh] mb-16">
          <div className="col-span-12 md:col-span-6 h-full">
            <ProjectCard {...projects[0]} />
          </div>
          
          <div className="col-span-12 md:col-span-6 h-full">
            <ProjectCard {...projects[1]} />
          </div>
          
          <div className="col-span-12 md:col-span-8 md:col-start-3 h-full">
            <ProjectCard {...projects[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
