
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakersList } from "./data/speakersData";
import { Link } from "react-router-dom";
import { getSpeakerImagePosition, createImageFallback } from "@/utils/speakerImageUtils";

/**
 * ConferenceSpeakers Component
 * 
 * Displays a grid of featured speakers for the conference with their basic information
 * and links to full profiles. Uses responsive design to adjust grid columns based on screen size.
 * 
 * Features:
 * - Responsive grid layout (1 column on mobile, 3 columns on desktop)
 * - Scroll animations for better user engagement
 * - Speaker images with improved face positioning and fallback handling
 * - Links to detailed speaker profiles
 * - Mobile-optimized design with proper spacing and text sizing
 */
const ConferenceSpeakers = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white" id="speakers-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
            Featured Speakers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Learn from thought leaders and innovators at the forefront of African development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {speakersList.map((speaker, index) => (
            <motion.div
              key={index}
              className="scroll-animate"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  {/* Speaker image with improved positioning */}
                  <img 
                    src={`/Speaker Images/${speaker.id}.jpg`} 
                    alt={speaker.name}
                    onError={(e) => {
                      try {
                        // Try jpeg if jpg not found
                        const target = e.target as HTMLImageElement;
                        if (!target) return; // Guard against null target
                        
                        target.src = `/Speaker Images/${speaker.id}.jpeg`;
                        target.onerror = (e2) => {
                          try {
                            // Fallback to placeholder if neither image format works
                            if (!target || !target.parentElement) return; // Guard against null elements
                            
                            target.src = "";
                            target.alt = speaker.imagePlaceholder || speaker.name;
                            target.style.display = "none";
                            
                            // Safer DOM manipulation
                            const parent = target.parentElement;
                            if (parent) {
                              const fallbackDiv = document.createElement('div');
                              fallbackDiv.className = 'flex items-center justify-center w-full h-full bg-gray-100';
                              fallbackDiv.innerHTML = `<span class="text-3xl font-bold text-gray-400">${speaker.imagePlaceholder || speaker.name.charAt(0)}</span>`;
                              parent.appendChild(fallbackDiv);
                            }
                          } catch (err) {
                            console.warn('Error in image fallback:', err);
                          }
                        };
                      } catch (err) {
                        console.warn('Error in image error handler:', err);
                      }
                    }}
                    className={`w-full h-full ${getSpeakerImagePosition(speaker.id)}`}
                  />
                  {/* Subtle gradient overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-raade-navy font-simula">{speaker.name}</h3>
                  <p className="text-[#FBB03B] font-medium mb-1 font-lora">{speaker.role}</p>
                  <p className="text-gray-600 text-sm mb-3 font-lora">{speaker.organization}</p>
                  <p className="text-gray-600 font-lora flex-grow">{speaker.bio}</p>
                  
                  <Link 
                    to={`/conference/speakers/${speaker.id}`} 
                    className="mt-4 text-raade-navy hover:text-[#FBB03B] transition-colors flex items-center text-sm font-lora"
                  >
                    <span>Full profile</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6 font-lora">
            Join us to hear from these distinguished speakers and many more industry experts.
          </p>
          <Button
            variant="outline"
            className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
            asChild
          >
            <Link to="/conference/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSpeakers;
