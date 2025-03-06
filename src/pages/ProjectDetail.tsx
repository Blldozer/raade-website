
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Target, CheckSquare, ArrowRight } from "lucide-react";
import { getProjectBySlug, getRelatedProjects } from "@/data/ProjectData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(projectSlug || "");
  const relatedProjects = project ? getRelatedProjects(project) : [];
  
  useEffect(() => {
    if (!project) {
      navigate("/studios");
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [project, navigate]);
  
  if (!project) return null;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={project.image} 
          alt={project.name} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-6 py-16 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-[#9b87f5] text-white border-none font-lora">
                {project.sector}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-simula text-white mb-4 max-w-3xl">
                {project.name}
              </h1>
              <p className="text-xl text-white/90 font-lora max-w-2xl">
                Partner: {project.partner}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-6 py-8 md:px-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/studios")}
          className="mb-8 text-raade-Thunder hover:text-[#9b87f5]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-4 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Column */}
          <div className="lg:w-2/3">
            <section className="mb-16">
              <h2 className="text-3xl font-simula text-raade-Thunder mb-6">Overview</h2>
              <p className="text-xl leading-relaxed font-lora text-gray-700 mb-8">
                {project.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-[#9b87f5] mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-raade-Thunder mb-1">Timeline</h3>
                    <p className="font-lora text-gray-700">{project.timeline}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-[#9b87f5] mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-raade-Thunder mb-1">Partner</h3>
                    <p className="font-lora text-gray-700">{project.partner}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="h-6 w-6 text-[#9b87f5] mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-raade-Thunder mb-1">Sector</h3>
                    <p className="font-lora text-gray-700">{project.sector}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-simula text-raade-Thunder mb-6">Challenge</h2>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-8">
                <p className="text-xl leading-relaxed font-lora text-gray-700">
                  {project.challenge}
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-simula text-raade-Thunder mb-6">Project Goals</h2>
              <div className="space-y-4">
                {project.goals.map((goal, index) => (
                  <div key={index} className="flex items-start">
                    <CheckSquare className="h-6 w-6 text-[#9b87f5] mr-3 mt-1 flex-shrink-0" />
                    <p className="text-lg font-lora text-gray-700">{goal}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-simula text-raade-Thunder mb-6">Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.outcomes.map((outcome, index) => (
                  <Card key={index} className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-[#9b87f5] text-xl font-bold mb-2">0{index + 1}</div>
                      <p className="font-lora text-gray-700">{outcome}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Impact Card - Only show if impact exists */}
            {project.impact && (
              <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-raade-Thunder to-[#3b2c40]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-simula text-white mb-4">Impact</h3>
                  <p className="text-xl font-lora text-white/90 leading-relaxed">{project.impact}</p>
                </CardContent>
              </Card>
            )}

            {/* Testimonials */}
            {project.testimonials && project.testimonials.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-simula text-raade-Thunder">Testimonials</h3>
                {project.testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-none shadow-md bg-gray-50">
                    <CardContent className="p-6">
                      <p className="italic font-lora text-gray-700 mb-4">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-bold text-raade-Thunder">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-simula text-raade-Thunder">Related Projects</h3>
                {relatedProjects.map((relatedProject) => (
                  <Link 
                    key={relatedProject.slug} 
                    to={`/projects/${relatedProject.slug}`}
                    className="block"
                  >
                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative h-32">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <Badge className="self-start mb-2 bg-[#9b87f5] text-white border-none">
                            {relatedProject.sector}
                          </Badge>
                          <h4 className="text-white font-semibold">{relatedProject.name}</h4>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-lora">{relatedProject.partner}</span>
                          <ArrowRight className="h-4 w-4 text-[#9b87f5]" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-simula text-raade-Thunder mb-6">Get Involved with Our Projects</h2>
          <p className="text-xl font-lora text-gray-700 max-w-2xl mx-auto mb-8">
            Join us in building innovative solutions that address Africa's most pressing challenges.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-raade-Thunder hover:bg-raade-Thunder/90 text-white font-lora"
            >
              Join As a Student
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-raade-Thunder text-raade-Thunder hover:bg-raade-Thunder/10 font-lora"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
