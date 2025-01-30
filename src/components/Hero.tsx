import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-raade-red to-raade-orange">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight animate-fade-in text-white">
              Innovate for Africa
            </h1>
            
            <p className="font-sans text-xl md:text-2xl text-white/90 animate-fade-in max-w-2xl mx-auto">
              Join Rice students pioneering solutions for sustainable development
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-raade-red font-semibold text-lg rounded-full px-8 transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => window.location.href = "#studios"}
            >
              Join Our Next Studio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-raade-red font-semibold text-lg rounded-full px-8 transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => window.location.href = "#conference"}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;