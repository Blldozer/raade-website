
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const carouselSlides = [
  {
    image: "/RAADE-Design-Sprint-Gustavo-Vives.jpg",
    alt: "RAADE Design Sprint with Gustavo Vives",
    caption: {
      line1: "No spectators.",
      line2: "Active changemakers."
    },
    phase: "Immersion & Discovery"
  },
  {
    image: "/RAADE-Design-Sprint-Edith-Ibeke.jpg",
    alt: "RAADE Design Sprint with Edith Ibeke",
    caption: {
      line1: "No observers.",
      line2: "Only participants."
    },
    phase: "Rapid Ideation & Prototyping"
  },
  {
    image: "/RAADE-Innovation-Studio-1-Hawa-Ife-Hamza.jpg",
    alt: "RAADE Innovation Studio with Hawa, Ife, and Hamza",
    caption: {
      line1: "No theoretical solutions.",
      line2: "Real-world impact."
    },
    phase: "Implementation"
  },
  {
    image: "/RAADE-Innovation-Studios-Izesan.jpg",
    alt: "RAADE Innovation Studios Izesan",
    caption: {
      line1: "No boundaries.",
      line2: "Limitless potential."
    },
    phase: "Immersion & Discovery"
  }
];

const SprintImage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => 
    emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  
  const scrollNext = useCallback(() => 
    emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full bg-white relative py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-[90%] mx-auto relative"
      >
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-montserrat uppercase tracking-wider text-raade-Thunder font-medium">
            HOW WE APPROACH INNOVATION
          </h3>
        </div>
        
        {/* Carousel container */}
        <div className="relative overflow-hidden w-full">
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {carouselSlides.map((slide, index) => (
                <div key={index} className="relative flex-[0_0_100%] min-w-0">
                  <div className="relative h-screen">
                    <img 
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Phase label */}
                    <div className="absolute top-8 left-8 bg-white/80 px-6 py-3 rounded-md">
                      <h4 className="text-lg font-montserrat font-medium text-raade-Thunder">
                        Phase: {slide.phase}
                      </h4>
                    </div>
                    
                    {/* Caption overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-simula leading-tight">
                          {slide.caption.line1}<br />
                          {slide.caption.line2}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#9b87f5] text-white p-6 z-10"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#9b87f5] text-white p-6 z-10"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default SprintImage;
