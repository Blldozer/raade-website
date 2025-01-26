import { Button } from "@/components/ui/button";

const Hero = () => {
  const stats = [
    { value: "100+", label: "Students Engaged" },
    { value: "8", label: "Active Projects" },
    { value: "6", label: "Faculty Mentors" },
    { value: "10+", label: "African Countries" },
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-design-background to-white"
        style={{
          opacity: 0.9
        }}
      />

      {/* Subtle Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight animate-fade-in text-design-text-primary">
              Transforming African Development Through Innovation
            </h1>
            
            <p className="font-sans text-xl md:text-2xl text-design-text-secondary animate-fade-in max-w-3xl mx-auto">
              A student-led initiative at Rice University pioneering innovative solutions 
              for sustainable development in Africa
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in">
            <Button
              size="lg"
              className="bg-design-accent hover:bg-design-accent/90 text-design-text-primary font-medium text-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => window.location.href = "#studios"}
            >
              Join Our Next Innovation Studio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-design-border text-design-text-primary hover:bg-design-background font-medium text-lg shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => window.location.href = "#conference"}
            >
              Learn About Our Conference
            </Button>
          </div>

          {/* Stats with glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 pt-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-design-text-primary">
                  {stat.value}
                </div>
                <div className="font-sans text-sm md:text-base text-design-text-secondary mt-2">
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