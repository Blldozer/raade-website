
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row mb-16"
        >
          <div className="w-full lg:w-[39%]">
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-raade-Thunder">
              Our Current Projects
            </h2>
          </div>
          <div className="lg:w-[61%]"></div> {/* Filler space */}
        </motion.div>

        {/* Content Section - 39/61 split reversed */}
        <div className="flex flex-col lg:flex-row mb-20">
          <div className="lg:w-[39%]"></div> {/* Filler space */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%]"
          >
            <div className="space-y-8 text-xl leading-relaxed font-lora text-gray-700 max-w-[800px]">
              <p>
                We focus on high-impact sectors where innovative solutions can create 
                transformative change at scale. Each project addresses challenges affecting 
                millions of people across Africa, designed not just to solve immediate problems, 
                but to create ripple effects that transform entire communities and markets.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {sectors.map((sector) => (
            <Button
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              onClick={() => setSelectedSector(sector)}
              className={`${selectedSector === sector 
                ? "bg-raade-Thunder text-white hover:bg-raade-Thunder/90 border-none" 
                : "text-raade-Thunder border-raade-Thunder/20 hover:bg-raade-Thunder/10 hover:text-raade-Thunder hover:border-raade-Thunder"} 
                font-lora`
              }
            >
              {sector}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.name}
              variants={itemVariants}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border-none h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
                  <Badge className="absolute top-4 right-4 bg-[#9b87f5] border-none text-white font-lora">
                    {project.sector}
                  </Badge>
                </div>
                <CardHeader className="relative -mt-20 bg-white rounded-t-3xl pt-8">
                  <CardTitle className="text-xl font-simula text-raade-Thunder mb-1">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="font-lora text-[#9b87f5]">
                    Partner: {project.partner}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-8">
                  <div>
                    <h4 className="font-bold text-sm text-raade-Thunder/70 uppercase tracking-wider mb-1">Challenge:</h4>
                    <p className="text-raade-Thunder font-lora">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-raade-Thunder/70 uppercase tracking-wider mb-1">Impact:</h4>
                    <p className="text-raade-Thunder font-lora">{project.impact}</p>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-[#9b87f5] hover:text-[#8B5CF6] p-0 h-auto flex items-center mt-2 font-lora"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-raade-Thunder text-white hover:bg-raade-Thunder/90 transition-colors px-8 font-lora"
          >
            See All Projects <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
