
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Handshake, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const JoinSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-20 md:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f4f5f4]/80 -z-10" />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent -z-10" />
      <motion.div 
        className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-[#FBB03B]/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-[#274675]/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-[2px] w-12 bg-[#FBB03B]" />
            <h2 className="mx-4 text-lg uppercase tracking-wider text-[#274675] font-simula">Get Involved</h2>
            <div className="h-[2px] w-12 bg-[#FBB03B]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#274675] mb-6 font-simula">
            Build with us
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-[#274675]/80 font-lora">
            Join our growing community of changemakers and contribute to creating
            impactful solutions for African development challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Innovation Studios Card */}
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

          {/* Conference Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="h-full flex flex-col border-0 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="/RAADE-Design-Sprint-Edith-Ibeke.jpg" 
                  alt="RAADE Conference" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FBB03B] text-white text-sm font-medium mb-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      April 11-12, 2025
                    </span>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-simula text-[#274675] flex items-center">
                  <Handshake className="mr-2 h-5 w-5 text-[#FBB03B]" /> 
                  African Development Forum
                </CardTitle>
                <CardDescription className="text-[#274675]/70 font-lora">
                  Global summit bringing together African leaders, scholars, and innovators
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-3 font-lora text-[#274675]/80">
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-[#FBB03B]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#FBB03B]"></div>
                    </div>
                    <span>Connect with influential innovators and leaders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-[#FBB03B]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#FBB03B]"></div>
                    </div>
                    <span>Engage in discussions on sustainable development</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-[#FBB03B]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#FBB03B]"></div>
                    </div>
                    <span>Experience the power of collective ideation</span>
                  </li>
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#274675]/70 font-lora">Rice University, Houston, TX</span>
                  </div>
                  <Link
                    to="/conference/register"
                    className="block w-full"
                  >
                    <Button className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora group">
                      Register for the Forum
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        
        {/* Partner submission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[#274675]/80 mb-4 font-lora">
            Have a challenge that needs solving? Partner with RAADE.
          </p>
          <Link to="/apply/partner">
            <Button variant="outline" className="border-[#274675] text-[#274675] hover:bg-[#274675] hover:text-white">
              Submit Your Challenge <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
