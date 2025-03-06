
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentFormHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate("/studios")}
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
        <h1 className="text-4xl md:text-5xl font-simula text-white mb-6">Join Innovation Studios</h1>
        <p className="text-xl font-lora text-gray-300 mb-10">
          Apply to be part of our next cohort of student innovators working on real-world solutions for African development.
        </p>
        <div className="bg-[#FBB03B]/10 border border-[#FBB03B]/30 rounded-lg p-4 mb-8">
          <p className="text-[#FBB03B] font-lora text-lg">
            <strong>Note:</strong> Students from any university are welcome to apply! You don't have to be from Rice University to join our Innovation Studios.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default StudentFormHeader;
