import InnovationStudiosSection from "@/components/InnovationStudios";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import Navigation from "@/components/Navigation";

const InnovationStudios = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20">
        <InnovationStudiosSection />
        <ProjectsShowcase />
      </div>
    </div>
  );
};

export default InnovationStudios;