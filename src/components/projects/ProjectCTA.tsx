
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProjectCTA = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#0d0d0d] py-16 mt-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-simula text-white mb-6">Get Involved with Our Projects</h2>
        <p className="text-xl font-lora text-gray-200 max-w-2xl mx-auto mb-8">
          Join us in building innovative solutions that address Africa's most pressing challenges.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-white font-lora"
            onClick={() => navigate("/apply/student")}
          >
            Join As a Student
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B]/10 font-lora"
            onClick={() => navigate("/apply/partner")}
          >
            Partner With Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCTA;
