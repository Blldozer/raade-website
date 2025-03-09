
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConferenceFinalCta = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 md:px-8 bg-raade-navy text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 font-simula">Be Part of Africa's Innovation Journey</h2>
        <p className="text-lg mb-8 font-lora text-white/80">
          Join us at the RAADE Conference 2025 to connect, collaborate, and create sustainable solutions
          for Africa's development challenges.
        </p>
        
        <Button 
          size="lg" 
          className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora px-8 py-6 text-lg"
          onClick={() => navigate("/conference/register")}
        >
          Register Now
        </Button>
        
        <div className="mt-8 text-white/60 flex justify-center items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <p className="font-lora">April 11-12, 2025</p>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <p className="font-lora">Rice University, Houston, TX</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceFinalCta;
