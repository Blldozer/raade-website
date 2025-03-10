import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/ProjectData';

// Get the specific projects we want to highlight
const sunfiProject = projects.find(p => p.slug === "sunfi-solar-initiative");
const nutritionProject = projects.find(p => p.slug === "child-nutrition-initiative");
const womenProject = projects.find(p => p.slug === "womens-entrepreneurship-program");
const showcaseProjects = [{
  title: sunfiProject?.name || "SunFi Solar Access Program",
  image: sunfiProject?.image || "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80",
  description: sunfiProject?.challenge || "Limited access to clean energy in rural Nigerian communities",
  category: "ENERGY",
  slug: sunfiProject?.slug || "sunfi-solar-initiative"
}, {
  title: nutritionProject?.name || "Child Nutrition Initiative",
  image: nutritionProject?.image || "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80",
  description: nutritionProject?.challenge || "Nearly 1/3 of under-five children in Nigeria suffer from malnutrition; rising inflation has put commercial baby foods beyond reach for most families.",
  category: "HEALTHCARE",
  slug: nutritionProject?.slug || "child-nutrition-initiative"
}, {
  title: womenProject?.name || "Women's Entrepreneurship Program",
  image: womenProject?.image || "/Women Enterpreneurs.jpg",
  description: womenProject?.challenge || "Young mothers with limited education struggle to maintain small businesses",
  category: "BUSINESS",
  slug: womenProject?.slug || "womens-entrepreneurship-program"
}];

const ProjectCard = ({
  title,
  image,
  description,
  category,
  slug,
  index
}: {
  title: string;
  image: string;
  description: string;
  category: string;
  slug: string;
  index: number;
}) => {
  // Using RAADE brand colors for better visibility against white background
  const textColorClass = 'text-raade-navy';
  const textOpacityClass = 'text-raade-navy/80';
  const descriptionClass = 'text-raade-navy/70';
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-[600px] group`} style={{
      gridTemplateAreas: index % 2 === 1 ? '"content image"' : '"image content"'
    }}>
      <Link to={`/projects/${slug}`} className="project-image relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-700 group-hover:scale-[1.02]" style={{
        gridArea: 'image'
      }}>
        <img src={image} alt={title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      
      <div className="project-content flex flex-col justify-center space-y-8 p-6 md:p-10" style={{
        gridArea: 'content'
      }}>
        <p className={`text-sm font-medium ${textOpacityClass} tracking-wider`}>
          {category}
        </p>
        <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColorClass} font-simula leading-tight`}>
          {title}
        </h3>
        <p className={`${descriptionClass} font-lora leading-relaxed text-lg`}>
          {description}
        </p>
        <Link to={`/projects/${slug}`} className={`inline-flex items-center text-raade-yellow-orange hover:text-raade-yellow-orange/80 text-lg font-alegreyasans group-hover:translate-x-2 transition-all duration-300 ease-out`}>
          Learn More 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const FutureShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={sectionRef} className="relative py-40 bg-white" style={{
      height: 'auto',
      minHeight: '100vh',
      zIndex: 1 // Ensure proper stacking context
    }}>
      <div className="max-w-[90vw] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-40 content-element">
          <span className="block text-sm font-medium tracking-wider text-raade-navy/70 mb-4 uppercase">
            Our Projects
          </span>
          <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-raade-navy mb-8">
            Building in Progress
          </h2>
          <div className="w-24 h-1 bg-raade-yellow-orange mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-raade-navy/80 max-w-3xl mx-auto font-lora leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </div>

        <div className="space-y-32">
          {showcaseProjects.map((project, index) => (
            <div key={project.title} className="project-card">
              <ProjectCard {...project} index={index} slug={project.slug} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
