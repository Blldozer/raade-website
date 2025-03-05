
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/ProjectData";

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
    <section className="py-24 bg-white">
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
                  <Link 
                    to={`/projects/${project.slug}`}
                    className="text-[#9b87f5] hover:text-[#8B5CF6] inline-flex items-center mt-2 font-lora"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
