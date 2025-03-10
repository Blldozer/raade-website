
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projects } from '@/data/ProjectData';
gsap.registerPlugin(ScrollTrigger);

// Get the specific projects we want to highlight
const sunfiProject = projects.find(p => p.slug === "sunfi-solar-initiative");
const nutritionProject = projects.find(p => p.slug === "child-nutrition-initiative");
const womenProject = projects.find(p => p.slug === "womens-entrepreneurship-program");
const showcaseProjects = [{
  title: sunfiProject?.name || "SunFi Solar Initiative",
  image: sunfiProject?.image || "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80",
  description: sunfiProject?.challenge || "Limited access to clean energy in rural Nigerian communities",
  category: "ENERGY",
  slug: sunfiProject?.slug || "sunfi-solar-initiative"
}, {
  title: nutritionProject?.name || "Child Nutrition Initiative",
  image: nutritionProject?.image || "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80",
  description: nutritionProject?.challenge || "Nearly 1/3 of under-five children in Nigeria are underweight or wasted",
  category: "HEALTHCARE",
  slug: nutritionProject?.slug || "child-nutrition-initiative"
}, {
  title: womenProject?.name || "Women's Entrepreneurship Program",
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80", // Updated to image with Black individuals
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
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const imageEl = card.querySelector('.project-image img');
    const content = card.querySelectorAll('.animate-content');
    gsap.set(card, {
      opacity: 0,
      y: 40
    });
    gsap.set(imageEl, {
      scale: 1.2
    });
    gsap.set(content, {
      opacity: 0,
      y: 30
    });
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        });
        gsap.to(imageEl, {
          scale: 1,
          duration: 2,
          ease: "power2.out"
        });
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out"
        });
      }
    });
  }, []);
  const textColorClass = index === 0 ? 'text-[#1A365D]' : 'text-[#1A365D]';
  const textOpacityClass = index === 0 ? 'text-[#1A365D]/90' : 'text-[#1A365D]/90';
  const descriptionClass = index === 0 ? 'text-[#1A365D]/80' : 'text-[#1A365D]/80';
  return <div ref={cardRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-[600px] opacity-0 group`} style={{
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
        <p className={`animate-content text-sm font-medium ${textOpacityClass} tracking-wider`}>
          {category}
        </p>
        <h3 className={`animate-content text-3xl md:text-4xl lg:text-5xl font-bold ${textColorClass} font-simula leading-tight`}>
          {title}
        </h3>
        <p className={`animate-content ${descriptionClass} font-lora leading-relaxed text-lg`}>
          {description}
        </p>
        <Link to={`/projects/${slug}`} className={`animate-content inline-flex items-center text-[#FBB03B] text-lg font-alegreyasans group-hover:translate-x-2 transition-all duration-300 ease-out`}>
          Learn More 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>;
};
const FutureShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Create zoom-in animation for this section
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top center",
        scrub: true,
      }
    });
    
    // Create zoom-in effect when entering this section
    enterTl.fromTo(section,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );
    
    return () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.refresh();
      }, sectionRef);
      ctx.revert();
    };
  }, []);
  
  return <section ref={sectionRef} className="relative py-40 bg-white overflow-y-auto" style={{
    height: 'auto',
    minHeight: '100vh'
  }}>
      <div className="max-w-[90vw] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-40">
          <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-[#1A365D] mb-8">
            Building in Progress
          </h2>
          <p className="text-lg md:text-xl text-[#1A365D]/80 max-w-3xl mx-auto font-lora leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </div>

        <div className="space-y-32">
          {showcaseProjects.map((project, index) => <div key={project.title} className="project-card">
              <ProjectCard {...project} index={index} slug={project.slug} />
            </div>)}
        </div>
      </div>
    </section>;
};
export default FutureShowcase;
