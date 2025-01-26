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
  {
    name: "Remote Health Monitoring",
    partner: "TechCare Solutions",
    challenge: "Limited access to healthcare in remote areas",
    impact: "Monitoring 2,000+ patients remotely",
    sector: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
  },
  {
    name: "Smart Agriculture",
    partner: "AgriTech Ghana",
    challenge: "Inefficient farming practices",
    impact: "Increased crop yield by 40% for 200 farmers",
    sector: "Technology",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80",
  },
];

const sectors = ["All", "Healthcare", "Technology", "Education", "Energy"] as const;

const ProjectsShowcase = () => {
  const [selectedSector, setSelectedSector] = useState<typeof sectors[number]>("All");

  const filteredProjects = projects.filter(
    (project) => selectedSector === "All" || project.sector === selectedSector
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-raade-navy mb-4">Our Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions developed in partnership with
            African organizations.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sectors.map((sector) => (
            <Button
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              onClick={() => setSelectedSector(sector)}
              className={selectedSector === sector ? "bg-raade-navy" : ""}
            >
              {sector}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-raade-navy">{project.name}</CardTitle>
                  <Badge variant="secondary">{project.sector}</Badge>
                </div>
                <CardDescription className="font-medium">
                  Partner: {project.partner}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <h4 className="font-semibold text-sm text-gray-600">Challenge:</h4>
                  <p className="text-sm">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-600">Impact:</h4>
                  <p className="text-sm">{project.impact}</p>
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