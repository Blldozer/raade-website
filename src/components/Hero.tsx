import { Button } from "@/components/ui/button";
import Scene from "./3d/Scene";
import BasicSphere from "./3d/BasicSphere";

const Hero = () => {
  const stats = [
    { value: "100+", label: "Students Engaged" },
    { value: "8", label: "Active Projects" },
    { value: "6", label: "Faculty Mentors" },
    { value: "10+", label: "African Countries" },
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(109.6deg, rgba(223,234,247,0.8) 11.2%, rgba(244,248,252,0.8) 91.1%)`,
          opacity: 0.9
        }}
      />

      {/* Decorative Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-raade-navy to-raade-gold">
                Transforming African Development Through Innovation
              </h1>
              
              <p className="font-sans text-xl md:text-2xl text-gray-600 animate-fade-in max-w-3xl">
                A student-led initiative at Rice University pioneering innovative solutions 
                for sustainable development in Africa
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
              <Button
                size="lg"
                className="bg-raade-gold hover:bg-raade-gold/90 text-raade-navy font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => window.location.href = "#studios"}
              >
                Join Our Next Innovation Studio
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-raade-navy text-raade-navy hover:bg-raade-navy hover:text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => window.location.href = "#conference"}
              >
                Learn About Our Conference
              </Button>
            </div>
          </div>

          <div className="w-full h-[600px] relative backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl">
            <Scene>
              <BasicSphere />
            </Scene>
          </div>
        </div>

        {/* Stats with enhanced styling */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-200">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-raade-navy to-raade-gold bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="font-sans text-sm md:text-base text-gray-600 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;