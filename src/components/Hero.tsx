import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  const stats = [
    { value: "100+", label: "Students Engaged" },
    { value: "8", label: "Active Projects" },
    { value: "6", label: "Faculty Mentors" },
    { value: "10+", label: "African Countries" },
  ];

  const images = [
    "/lovable-uploads/e94065dc-60d5-469d-8ea2-6657f57bb00b.png",
    "/lovable-uploads/b5ad6ef6-d0dc-473a-a096-05bf5c57449e.png",
    "/lovable-uploads/9c6ceb51-936a-4146-a252-1051ae86534a.png",
    "/lovable-uploads/57a9d290-224d-44e7-b284-7715e6f4f3fd.png",
    "/lovable-uploads/01329b6e-7667-47f0-9c6c-d308158644e8.png",
    "/lovable-uploads/ea70dd62-188f-483f-b286-c31c1e137ceb.png",
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {images.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
            Transforming African Development Through Innovation
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 animate-fade-in opacity-90">
            A student-led initiative at Rice University pioneering innovative solutions for sustainable development in Africa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in">
            <Button
              size="lg"
              className="bg-raade-gold hover:bg-raade-gold/90 text-raade-navy font-semibold text-lg"
              onClick={() => window.location.href = "#studios"}
            >
              Join Our Next Innovation Studio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 font-semibold text-lg"
              onClick={() => window.location.href = "#conference"}
            >
              Learn About Our Conference
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-raade-gold">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-200 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;