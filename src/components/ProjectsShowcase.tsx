import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Project = {
  name: string;
  partner: string;
  challenge: string;
  impact: string;
  sector: "Healthcare" | "Technology" | "Education" | "Energy";
  image: string;
};

const projects: Project[] = [
  {
    name: "SunFi Solar Initiative",
    partner: "SunFi Energy",
    challenge: "Limited access to clean energy in rural communities",
    impact: "Installed 500+ solar units, impacting 2,500+ lives",
    sector: "Energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80",
  },
  {
    name: "Maternal Health Platform",
    partner: "Medical Women's Association",
    challenge: "Limited access to maternal healthcare information",
    impact: "Connected 1,000+ mothers with healthcare providers",
    sector: "Healthcare",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80",
  },
  {
    name: "Digital Learning Hub",
    partner: "EduTech Africa",
    challenge: "Limited access to quality education resources",
    impact: "Reached 5,000+ students across 3 countries",
    sector: "Education",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
  },
  {
    name: "Healthcare Analytics",
    partner: "Regional Health Network",
    challenge: "Inefficient healthcare data management",
    impact: "Reduced reporting time by 60% across 12 facilities",
    sector: "Technology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
  },
];

const sectors = ["All", "Healthcare", "Technology", "Education", "Energy"] as const;

const ProjectsShowcase = () => {
  const [selectedSector, setSelectedSector] = useState<typeof sectors[number]>("All");

  const filteredProjects = projects.filter(
    (project) => selectedSector === "All" || project.sector === selectedSector
  );

  return (
    <section className="py-24 px-6 bg-design-background-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-display font-bold text-design-primary">
            Our Projects
          </h2>
          <p className="text-lg text-design-text-secondary max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions developed in partnership with
            African organizations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {sectors.map((sector) => (
            <Button
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              onClick={() => setSelectedSector(sector)}
              className={`
                rounded-full px-6 transition-all duration-300
                ${selectedSector === sector 
                  ? "bg-design-primary text-white shadow-lg" 
                  : "border-2 border-design-primary text-design-primary hover:bg-design-primary hover:text-white"
                }
              `}
            >
              {sector}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.name} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-design-background-glass backdrop-blur-sm border border-white/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <CardHeader className="relative">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-display text-design-primary">
                    {project.name}
                  </CardTitle>
                  <Badge 
                    variant="secondary"
                    className="bg-design-accent/10 text-design-accent font-medium"
                  >
                    {project.sector}
                  </Badge>
                </div>
                <CardDescription className="font-medium text-design-text-secondary">
                  Partner: {project.partner}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-design-text-secondary mb-1">
                    Challenge:
                  </h4>
                  <p className="text-design-text-primary">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-design-text-secondary mb-1">
                    Impact:
                  </h4>
                  <p className="text-design-text-primary">{project.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;