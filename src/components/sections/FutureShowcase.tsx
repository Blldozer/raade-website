
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
    
    gsap.set(card, { opacity: 0, y: 20 });
    gsap.set(image, { scale: 1.1 });
    gsap.set(content, { opacity: 0, y: 20 });
    
    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        });
        
        gsap.to(image, {
          scale: 1,
          duration: 1.5,
          ease: "power3.out"
        });
        
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });
  }, []);

  return (
    <Link to={`/projects/${slug}`}>
      <div
        ref={cardRef}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-[600px] opacity-0`}
        style={{
          gridTemplateAreas: index % 2 === 1 ? '"content image"' : '"image content"'
        }}
      >
        <div 
          className="project-image relative overflow-hidden rounded-2xl"
          style={{ gridArea: 'image' }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div 
          className="project-content flex flex-col justify-center space-y-6 p-4 md:p-8"
          style={{ gridArea: 'content' }}
        >
          <p className="animate-content text-sm font-medium text-[#1A365D]/80 tracking-wider">
            {category}
          </p>
          <h3 className="animate-content text-3xl md:text-4xl font-bold text-[#1A365D] font-zillaslab">
            {title}
          </h3>
          <p className="animate-content text-gray-600 font-merriweather leading-relaxed">
            {description}
          </p>
          <span className="animate-content inline-flex items-center text-[#1A365D] text-sm font-merriweather group-hover:translate-x-1 transition-transform">
            Learn More 
            <ArrowRight className="ml-2 h-4 w-4" />
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
      className="relative py-32 bg-white"
    >
      <div className="max-w-[90vw] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A365D] mb-8 font-zillaslab">
            Building in Progress
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-merriweather leading-relaxed">
            Step into the future we're creating. Each project is a window into tomorrow,
            where innovation meets impact in real time.
          </p>
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureShowcase;
