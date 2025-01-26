import { Button } from "@/components/ui/button";

const Hero = () => {
  const stats = [
    { value: "100+", label: "Students Engaged" },
    { value: "8", label: "Active Projects" },
    { value: "6", label: "Faculty Mentors" },
    { value: "10+", label: "African Countries" },
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background with African-inspired gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #1B365D 0%, #2a4774 100%)`,
          opacity: 0.97
        }}
      />

      {/* African Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4B942' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Circle */}
      <div 
        className="absolute right-0 top-0 w-96 h-96 bg-raade-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        style={{ mixBlendMode: 'soft-light' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in text-white tracking-tight">
              Transforming African Development Through Innovation
            </h1>
            
            <p className="font-sans text-xl md:text-2xl text-white/80 animate-fade-in max-w-3xl mx-auto leading-relaxed">
              A student-led initiative at Rice University pioneering innovative solutions 
              for sustainable development in Africa
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in">
            <Button
              size="lg"
              className="bg-raade-gold hover:bg-raade-gold/90 text-raade-navy font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-full px-8"
              onClick={() => window.location.href = "#studios"}
            >
              Join Our Next Innovation Studio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-raade-navy font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-full px-8"
              onClick={() => window.location.href = "#conference"}
            >
              Learn About Our Conference
            </Button>
          </div>

          {/* Stats with glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-raade-gold mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-sm md:text-base text-white/80 font-medium">
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