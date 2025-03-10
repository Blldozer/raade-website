
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InnovationStudiosCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-0 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
        <div className="relative h-60 overflow-hidden">
          <img 
            src="/RAADE-Innovation-Studio-1.jpg" 
            alt="Innovation Studios" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 p-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FBB03B] text-white text-sm font-medium mb-2">
                <Users className="mr-1 h-3 w-3" />
                For Students
              </span>
            </div>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="text-2xl font-simula text-[#274675] flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-[#FBB03B]" /> 
            Innovation Studios
          </CardTitle>
          <CardDescription className="text-[#274675]/70 font-lora">
            9-week intensive programs where students collaborate to develop innovative solutions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <ul className="space-y-3 font-lora text-[#274675]/80">
            <li className="flex items-start">
              <div className="mr-3 h-6 w-6 rounded-full bg-[#FBB03B]/20 flex items-center justify-center mt-0.5">
                <div className="h-2 w-2 rounded-full bg-[#FBB03B]"></div>
              </div>
              <span>Work directly with African organizations</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 h-6 w-6 rounded-full bg-[#FBB03B]/20 flex items-center justify-center mt-0.5">
                <div className="h-2 w-2 rounded-full bg-[#FBB03B]"></div>
              </div>
              <span>Develop real solutions to real challenges</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 h-6 w-6 rounded-full bg-[#FBB03B]/20 flex items-center justify-center mt-0.5">
                <div className="h-2 w-2 rounded-full bg-[#FBB03B]"></div>
              </div>
              <span>Gain invaluable cross-cultural experience</span>
            </li>
          </ul>
        </CardContent>
        
        <CardFooter className="pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#274675]/70 font-lora">Next cohort starting soon</span>
              <span className="text-[#FBB03B] font-bold font-lora">Limited spots</span>
            </div>
            <Link
              to="/studios"
              className="block w-full"
            >
              <Button className="w-full bg-[#274675] hover:bg-[#274675]/90 text-white font-lora group">
                Join the Studios
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default InnovationStudiosCard;
