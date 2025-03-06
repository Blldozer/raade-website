
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, getRelatedProjects } from "@/data/ProjectData";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectOverview from "@/components/projects/ProjectOverview";
import ProjectChallenge from "@/components/projects/ProjectChallenge";
import ProjectGoals from "@/components/projects/ProjectGoals";
import ProjectOutcomes from "@/components/projects/ProjectOutcomes";
import ProjectSidebar from "@/components/projects/ProjectSidebar";
import ProjectCTA from "@/components/projects/ProjectCTA";

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
    <div className="bg-black">
      {/* Hero Section */}
      <ProjectHero 
        image={project.image}
        name={project.name}
        sector={project.sector}
        partner={project.partner}
        partnerLink={project.partnerLink}
      />

      {/* Back Button */}
      <div className="container mx-auto px-6 py-8 md:px-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/studios")}
          className="mb-8 text-white hover:text-[#FBB03B]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-4 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Column */}
          <div className="lg:w-2/3">
            <ProjectOverview 
              description={project.description}
              timeline={project.timeline}
              partner={project.partner}
              partnerLink={project.partnerLink}
              sector={project.sector}
            />
            <ProjectChallenge challenge={project.challenge} />
            <ProjectGoals goals={project.goals} />
            <ProjectOutcomes outcomes={project.outcomes} />
          </div>

          {/* Sidebar */}
          <ProjectSidebar 
            impact={project.impact}
            testimonials={project.testimonials}
            relatedProjects={relatedProjects}
          />
        </div>
      </div>

      {/* CTA Section */}
      <ProjectCTA />
    </div>
  );
};

export default ProjectDetail;
