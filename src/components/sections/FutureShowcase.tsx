import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/ProjectData';

// Get the specific projects we want to highlight
const sunfiProject = projects.find(p => p.slug === "sunfi-solar-initiative");
const nutritionProject = projects.find(p => p.slug === "child-nutrition-initiative");
const womenProject = projects.find(p => p.slug === "womens-entrepreneurship-program");
const showcaseProjects = [{
  title: sunfiProject?.name || "SunFi Solar Access Program",
  image: sunfiProject?.image || "/innovation-studios-project-cards/RAADE-Sunfi-Solar-Panel-image.jpeg",
  description: sunfiProject?.challenge || "Limited access to clean energy in rural Nigerian communities",
  category: "ENERGY",
  slug: sunfiProject?.slug || "sunfi-solar-initiative"
}, {
  title: nutritionProject?.name || "Child Nutrition Initiative",
  image: nutritionProject?.image || "/innovation-studios-project-cards/RAADE-nutrition-project-image.jpeg",
  description: nutritionProject?.challenge || "Nearly 1/3 of under-five children in Nigeria suffer from malnutrition; rising inflation has put commercial baby foods beyond reach for most families.",
  category: "HEALTHCARE",
  slug: nutritionProject?.slug || "child-nutrition-initiative"
}, {
  title: womenProject?.name || "Women's Entrepreneurship Program",
  image: womenProject?.image || "/innovation-studios-project-cards/RAADE-Women-Entrepreneurs.jpg",
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
  const descriptionClass = 'text-raade-navy/70'; // Restored to original RAADE brand color
  return <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 min-h-[clamp(400px,50vh,600px)] group`} style={{
    gridTemplateAreas: {
      xs: '"image" "content"',
      md: index % 2 === 1 ? '"content image"' : '"image content"'
    }[window.innerWidth < 768 ? 'xs' : 'md']
  }}>
      <Link to={`/projects/${slug}`} className="project-image relative overflow-hidden rounded-2xl shadow-lg" style={{
      gridArea: 'image'
    }}>
        <img src={image} alt={title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      
      <div className="project-content flex flex-col justify-center space-y-4 sm:space-y-8 p-4 sm:p-6 md:p-10" style={{
      gridArea: 'content'
    }}>
        <p className={`text-sm font-extrabold ${textOpacityClass} tracking-wider`}>
          {category}
        </p>
        <h3 className={`fluid-h3 font-extrabold ${textColorClass} font-simula leading-tight font-bold`}>
          <strong>{title}</strong>
        </h3>
        <p className={`text-xl ${descriptionClass} font-lora leading-relaxed`}>
          {description}
        </p>
        <Link to={`/projects/${slug}`} className={`inline-flex items-center text-raade-yellow-orange hover:text-raade-yellow-orange/80 text-lg font-alegreyasans group-hover:translate-x-2 transition-all duration-300 ease-out`}>
          See the Impact 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>;
};

const FutureShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    // When leaving this section (scrolling down), trigger transition to the hook section
    const onSectionExit = () => {
      document.dispatchEvent(new CustomEvent('transitionToHook'));
    };
    
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      // When the section is no longer intersecting and scrolling down
      if (!entry.isIntersecting && entry.boundingClientRect.y < 0) {
        onSectionExit();
      }
    }, {
      threshold: 0.1
    });
    
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section 
      id="future-showcase" 
      ref={sectionRef} 
      className="relative pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-16 sm:pb-24 md:pb-32 lg:pb-40 bg-white overflow-hidden" 
      style={{
        height: 'auto',
        minHeight: '100vh',
        zIndex: 1 // Ensure proper stacking context
      }}
    >
      <div className="fluid-container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Title Section with 39/61 split */}
        <div className="flex flex-col md:flex-row mb-8 md:mb-12">
          <div className="md:w-[39%] text-left">
            <span className="block text-sm font-normal tracking-wider text-raade-navy/70 mb-4 uppercase opacity-100">
              Our Projects
            </span>
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-raade-navy mb-8 opacity-100 font-black max-w-[700px] text-left">
              <strong>Building in Progress</strong>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-raade-yellow-orange mb-8 opacity-100"></div>
          </div>
          <div className="md:w-[61%]">
            {/* Empty box that takes up 61% of the space */}
          </div>
        </div>
        
        {/* Content Section with reversed 39/61 split */}
        <div className="flex flex-col md:flex-row mb-12 md:mb-16 lg:mb-20">
          <div className="md:w-[39%]">
            {/* Empty box that takes up 39% of the space */}
          </div>
          <div className="md:w-[61%]">
            <p className="text-xl leading-relaxed font-lora text-raade-navy/70 max-w-[800px]">
              Step into the future we're creating. Each project is a window into tomorrow,
              where innovation meets impact in real time.
            </p>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {showcaseProjects.map((project, index) => (
            <div key={project.title} className="project-card overflow-hidden">
              <ProjectCard {...project} index={index} slug={project.slug} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
