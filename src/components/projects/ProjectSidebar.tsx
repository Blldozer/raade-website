
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface RelatedProject {
  slug: string;
  name: string;
  image: string;
  sector: string;
  partner: string;
}

interface ProjectSidebarProps {
  impact?: string;
  testimonials?: Testimonial[];
  relatedProjects: RelatedProject[];
}

const ProjectSidebar = ({ impact, testimonials, relatedProjects }: ProjectSidebarProps) => {
  return (
    <div className="lg:w-1/3 space-y-8">
      {/* Impact Card - Only show if impact exists */}
      {impact && (
        <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#FBB03B] to-[#1a1a1a]">
          <CardContent className="p-8">
            <h3 className="text-2xl font-simula text-white mb-4">Impact</h3>
            <p className="text-xl font-lora text-white/90 leading-relaxed">{impact}</p>
          </CardContent>
        </Card>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-simula text-white">Testimonials</h3>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md bg-[#1a1a1a]">
              <CardContent className="p-6">
                <p className="italic font-lora text-gray-200 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-simula text-white">Related Projects</h3>
          {relatedProjects.map((relatedProject) => (
            <Link 
              key={relatedProject.slug} 
              to={`/projects/${relatedProject.slug}`}
              className="block"
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden bg-[#1a1a1a]">
                <div className="relative h-32">
                  <img 
                    src={relatedProject.image} 
                    alt={relatedProject.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <Badge className="self-start mb-2 bg-[#FBB03B] text-white border-none">
                      {relatedProject.sector}
                    </Badge>
                    <h4 className="text-white font-semibold">{relatedProject.name}</h4>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 font-lora">{relatedProject.partner}</span>
                    <ArrowRight className="h-4 w-4 text-[#FBB03B]" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSidebar;
