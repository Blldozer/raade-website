
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Linkedin, Twitter, Globe, Clock, Calendar } from "lucide-react";
import { getSpeakerById } from "../data/speakersData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SpeakerProfile = () => {
  const { speakerId } = useParams<{ speakerId: string }>();
  const navigate = useNavigate();
  const speaker = getSpeakerById(speakerId || "");

  if (!speaker) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Speaker not found</h2>
        <Button onClick={() => navigate("/conference")} className="mt-4">
          Return to Conference
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <Button 
          variant="ghost" 
          className="flex items-center mb-8 text-raade-navy hover:text-[#FBB03B]"
          onClick={() => navigate("/conference")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-montserrat">Back to Conference</span>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-raade-navy/10 rounded-lg">
                  <p className="text-raade-navy font-medium font-montserrat text-xl">{speaker.imagePlaceholder}</p>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-raade-navy font-montserrat mb-2">{speaker.name}</h1>
              <p className="text-[#FBB03B] font-medium mb-1 font-montserrat">{speaker.role}</p>
              <p className="text-gray-600 mb-4 font-opensans">{speaker.organization}</p>
              
              {speaker.social && (
                <div className="flex space-x-3 mb-6">
                  {speaker.social.linkedin && (
                    <a 
                      href={speaker.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#0077B5] transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {speaker.social.twitter && (
                    <a 
                      href={speaker.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {speaker.social.website && (
                    <a 
                      href={speaker.social.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-raade-navy transition-colors"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              )}
              
              {speaker.expertise && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-montserrat">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {speaker.expertise.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-[#FBB03B]/10 text-[#FBB03B] px-3 py-1 rounded-full text-xs font-montserrat"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-raade-navy font-montserrat">About</h2>
              <div className="prose max-w-none mb-8 font-opensans text-gray-700">
                <p>{speaker.fullBio || speaker.bio}</p>
              </div>
              
              {speaker.speaking && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-raade-navy font-montserrat">Speaking At</h2>
                  <Card className="border-[#FBB03B]/20">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-2 text-raade-navy font-montserrat">{speaker.speaking.title}</h3>
                      <p className="text-gray-600 mb-4 font-opensans">{speaker.speaking.description}</p>
                      
                      <div className="flex flex-wrap gap-4 items-center text-sm">
                        {speaker.speaking.date && (
                          <div className="flex items-center text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span className="font-opensans">{speaker.speaking.date}</span>
                          </div>
                        )}
                        
                        {speaker.speaking.time && (
                          <div className="flex items-center text-gray-500">
                            <Clock className="mr-2 h-4 w-4" />
                            <span className="font-opensans">{speaker.speaking.time}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="mt-12">
                <Button 
                  variant="outline" 
                  className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-opensans"
                  onClick={() => navigate("/conference")}
                >
                  View All Speakers
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;
