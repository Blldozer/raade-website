
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PartnerFormHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate("../pages/InnovationStudio")}
        className="mb-8 text-white hover:text-[#FBB03B]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Studios
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-simula text-white mb-6">Partner With Us</h1>
        <p className="text-xl font-lora text-gray-300 mb-10">
          Bring your development challenge to RAADE Innovation Studios and collaborate with our talented student teams.
        </p>
      </motion.div>
    </>
  );
};

export default PartnerFormHeader;
