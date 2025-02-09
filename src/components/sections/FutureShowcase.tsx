
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const ProjectCard = ({ title, image, description, slug, category, index }: { 
  title: string, 
  image: string, 
  description: string,
  slug: string,
  category: string,
  index: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const image = card.querySelector('.project-image img');
    const content = card.querySelectorAll('.animate-content');
    
    gsap.set(card, { opacity: 0, y: 40 }); // Increased initial offset
    gsap.set(image, { scale: 1.2 }); // Slightly increased scale
    gsap.set(content, { opacity: 0, y: 30 }); // Increased content offset
    
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%", // Trigger slightly earlier
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1.2, // Slower animation
          ease: "power3.out"
        });
        
        gsap.to(image, {
          scale: 1,
          duration: 2, // Slower zoom
          ease: "power2.out"
        });
        
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15, // Slightly faster stagger
          ease: "power2.out"
        });
      }
    });
  }, []);

  // Determine text color based on index (position in the list)
  const textColorClass = index === 0 ? 'text-white' : 'text-[#1A365D]';
  const textOpacityClass = index === 0 ? 'text-white/90' : 'text-[#1A365D]/90';
  const descriptionClass = index === 0 ? 'text-white/80' : 'text-[#1A365D]/80';

  return (
    <Link to={`/projects/${slug}`}>
      <div
        ref={cardRef}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-[600px] opacity-0 group`}
        style={{
          gridTemplateAreas: index % 2 === 1 ? '"content image"' : '"image content"'
        }}
      >
        <div 
          className="project-image relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ gridArea: 'image' }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div 
          className="project-content flex flex-col justify-center space-y-8 p-6 md:p-10"
          style={{ gridArea: 'content' }}
        >
          <p className={`animate-content text-sm font-medium ${textOpacityClass} tracking-wider`}>
            {category}
          </p>
          <h3 className={`animate-content text-3xl md:text-4xl lg:text-5xl font-bold ${textColorClass} font-zillaslab leading-tight`}>
            {title}
          </h3>
          <p className={`animate-content ${descriptionClass} font-merriweather leading-relaxed text-lg`}>
            {description}
          </p>
          <span className={`animate-content inline-flex items-center ${textColorClass} text-sm font-merriweather group-hover:translate-x-2 transition-all duration-300 ease-out`}>
            Learn More 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const FutureShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#1A365D] via-[#1A365D]/5 to-white"
    >
      <div className="max-w-[90vw] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-zillaslab">
            Building in Progress
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </div>

        <div className="space-y-48"> {/* Increased spacing between projects */}
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;

