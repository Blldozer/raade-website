
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Ticket, 
  DollarSign, 
  Award, 
  MapPin, 
  Clock, 
  Star,
  MessageSquare,
  Building,
  Sparkles
} from "lucide-react";

import ConferenceHero from "./conference/ConferenceHero";
import CountdownTimer from "./CountdownTimer";
import ConferenceSpeakers from "./conference/ConferenceSpeakers";
import ConferenceSchedule from "./conference/ConferenceSchedule";
import ConferenceSponsors from "./conference/ConferenceSponsors";
import SocialProof from "./conference/SocialProof";

const Conference = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <ConferenceHero />
      
      {/* Countdown Section */}
      <section className="bg-white py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-gradient-to-r from-[#274675]/90 to-[#274675] p-8 shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4 font-simula">Join us in</h2>
            <CountdownTimer 
              targetDate="2025-04-11T09:00:00" 
              className="text-[#FBB03B] font-bold"
            />
            <div className="mt-6">
              <Button
                size="lg"
                className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora mx-2"
                onClick={() => navigate("/conference/register")}
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#274675] font-lora mx-2 mt-4 md:mt-0"
                onClick={() => {
                  const scheduleSection = document.getElementById('schedule');
                  scheduleSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Conference Overview */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-raade-navy mb-4 font-simula">
              AFRICA NOW & NEXT
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
              The RAADE Conference brings together innovators, thought leaders, and change-makers
              from across the continent and diaspora to shape Africa's future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-col items-center">
                  <Sparkles className="h-12 w-12 text-[#FBB03B] mb-4" />
                  <CardTitle className="text-xl font-simula text-center">Innovation Showcase</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 font-lora">
                    Discover groundbreaking solutions developed by RAADE's Innovation Studios
                    and other leading African initiatives.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-col items-center">
                  <Users className="h-12 w-12 text-[#FBB03B] mb-4" />
                  <CardTitle className="text-xl font-simula text-center">Global Networking</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 font-lora">
                    Connect with African organizations, investors, academics, and students
                    passionate about sustainable development.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-col items-center">
                  <Star className="h-12 w-12 text-[#FBB03B] mb-4" />
                  <CardTitle className="text-xl font-simula text-center">Thought Leadership</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 font-lora">
                    Engage with compelling talks, panels, and workshops that challenge conventional
                    thinking about African development.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="aspect-video max-w-4xl mx-auto bg-gray-200 mb-8 rounded-xl overflow-hidden">
              {/* Placeholder for promotional video */}
              <div className="w-full h-full flex items-center justify-center bg-raade-navy/10">
                <p className="text-raade-navy font-medium font-lora">Conference Promotional Video</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full">
                <Calendar className="h-5 w-5 text-[#FBB03B] mr-2" />
                <p className="text-raade-navy font-lora font-medium">April 11-12, 2025</p>
              </div>
              <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full">
                <MapPin className="h-5 w-5 text-[#FBB03B] mr-2" />
                <p className="text-raade-navy font-lora font-medium">Rice University, Houston, TX</p>
              </div>
              <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full">
                <Users className="h-5 w-5 text-[#FBB03B] mr-2" />
                <p className="text-raade-navy font-lora font-medium">200+ Attendees</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Attend Section */}
      <section className="py-16 px-4 md:px-8 bg-raade-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl font-bold mb-4 font-simula">Why Attend</h2>
            <p className="text-lg max-w-3xl mx-auto font-lora text-white/80">
              The RAADE Conference offers a unique opportunity to be part of Africa's innovation journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <MessageSquare className="h-10 w-10 text-[#FBB03B]" />,
                title: "Expert Insights",
                description: "Learn from leading academics, entrepreneurs, and policymakers shaping Africa's future."
              },
              {
                icon: <Building className="h-10 w-10 text-[#FBB03B]" />,
                title: "Partnership Opportunities",
                description: "Connect with organizations seeking innovative solutions to development challenges."
              },
              {
                icon: <Award className="h-10 w-10 text-[#FBB03B]" />,
                title: "Project Showcase",
                description: "Experience firsthand the impact of student-led innovation in addressing real challenges."
              },
              {
                icon: <Sparkles className="h-10 w-10 text-[#FBB03B]" />,
                title: "Interactive Workshops",
                description: "Engage in hands-on sessions exploring human-centered design and innovation methodologies."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all scroll-animate"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-simula">{item.title}</h3>
                <p className="text-white/80 font-lora">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora"
              onClick={() => navigate("/conference/register")}
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Speakers Section */}
      <ConferenceSpeakers />
      
      {/* Schedule Section */}
      <ConferenceSchedule />
      
      {/* Registration Options */}
      <section id="registration" className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Registration Options</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
              Secure your spot at the RAADE Conference 2025. Early bird registration is now open!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all relative h-full">
                <div className="absolute top-4 right-4 bg-[#FBB03B] text-white text-sm font-medium py-1 px-3 rounded-full">
                  Early Bird
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-simula">Standard Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-raade-navy mb-4">$199</p>
                  <p className="text-gray-500 mb-6 font-lora text-sm">Regular price: $249</p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Full conference access</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Networking opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Conference materials</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Lunch and refreshments</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                    onClick={() => navigate("/conference/register")}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all relative h-full">
                <div className="absolute top-4 right-4 bg-[#FBB03B] text-white text-sm font-medium py-1 px-3 rounded-full">
                  Limited
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-simula">VIP Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-raade-navy mb-4">$349</p>
                  <p className="text-gray-500 mb-6 font-lora text-sm">Regular price: $399</p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Everything in Standard ticket</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">VIP reception with speakers</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Reserved seating</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Special gift package</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                    onClick={() => navigate("/conference/register")}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-simula">Student Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-raade-navy mb-4">$99</p>
                  <p className="text-gray-500 mb-6 font-lora text-sm">For enrolled students only</p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Full conference access</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Student networking events</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Conference materials</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-lora">Lunch and refreshments</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                    onClick={() => navigate("/conference/register")}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="bg-[#FBB03B]/10 p-8 rounded-xl mt-12">
            <h3 className="text-xl font-bold text-raade-navy mb-4 font-simula">Group Registration</h3>
            <p className="text-gray-600 mb-6 font-lora">
              Coming with a team? Special discounts are available for groups of 5 or more attendees.
            </p>
            <Button
              variant="outline"
              className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
              onClick={() => window.location.href = "mailto:conference@raade.org?subject=Group Registration Inquiry"}
            >
              Contact for Group Rates
            </Button>
          </div>
        </div>
      </section>
      
      {/* Venue and Location */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Venue & Location</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
              Join us at Rice University's beautiful campus in Houston, Texas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden bg-gray-200 aspect-video">
                {/* Placeholder for campus map or venue image */}
                <div className="w-full h-full flex items-center justify-center bg-raade-navy/10">
                  <p className="text-raade-navy font-medium font-lora">Rice University Campus Map</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="scroll-animate"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-raade-navy mb-4 font-simula">Getting Here</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold font-simula">Address</h4>
                    <p className="text-gray-600 font-lora">Rice University, 6100 Main St, Houston, TX 77005</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold font-simula">Conference Facilities</h4>
                    <p className="text-gray-600 font-lora">The conference will take place at the Rice Memorial Center (RMC).</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold font-simula">Accommodation</h4>
                    <p className="text-gray-600 font-lora">Special rates are available at partner hotels near campus.</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="mt-4 border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
                  onClick={() => window.open("https://maps.google.com/?q=Rice+University,+Houston,+TX", "_blank")}
                >
                  View on Google Maps
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sponsors Section */}
      <ConferenceSponsors />
      
      {/* Social Proof Section */}
      <SocialProof />
      
      {/* Final CTA */}
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
            <div className="w-1 h-1 rounded-full bg-white/30"></div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <p className="font-lora">Rice University, Houston</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Conference;
