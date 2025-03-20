
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { useIsMobile } from "../hooks/use-mobile";
import { Skeleton } from "./ui/skeleton";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "President",
    image: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "Innovation Director", 
    image: "/placeholder.svg",
  },
  {
    name: "Aisha Patel",
    role: "Partnerships Lead",
    image: "/placeholder.svg",
  },
  {
    name: "David Kim",
    role: "Technical Director",
    image: "/placeholder.svg",
  },
  {
    name: "Elena Rodriguez",
    role: "Project Manager",
    image: "/placeholder.svg",
  },
  {
    name: "James Wilson",
    role: "Research Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Maya Patel",
    role: "Operations Director",
    image: "/placeholder.svg",
  },
  {
    name: "Thomas Lee",
    role: "Strategy Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Sofia Martinez",
    role: "Communications Director",
    image: "/placeholder.svg",
  },
  {
    name: "Marcus Johnson",
    role: "Development Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Priya Shah",
    role: "Innovation Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Daniel Park",
    role: "Partnerships Director",
    image: "/placeholder.svg",
  },
  {
    name: "Lisa Chen",
    role: "Project Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Omar Hassan",
    role: "Technology Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Rachel Kim",
    role: "Operations Lead",
    image: "/placeholder.svg",
  }
];

/**
 * TeamProfiles component - Displays a grid of team members with responsive loading states
 * 
 * Features:
 * - Enhanced mobile loading experience with visual feedback
 * - Tracking of image loading progress
 * - Skeleton placeholders during loading
 * - Responsive grid layout that adapts to all screen sizes
 * - Graceful fallback for connection issues
 */
const TeamProfiles = () => {
  const isMobile = useIsMobile();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Count loaded images and calculate progress
  const loadedCount = Object.values(loadedImages).filter(Boolean).length;
  const totalImages = teamMembers.length;

  useEffect(() => {
    // Calculate progress percentage
    const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;
    setLoadingProgress(progress);
    
    // Hide skeletons after 40% of images have loaded on mobile, or 20% on desktop
    const threshold = isMobile ? 40 : 20;
    if (progress >= threshold) {
      setShowSkeletons(false);
    }
    
    // Always hide skeletons after a maximum time (5 seconds)
    const timer = setTimeout(() => {
      setShowSkeletons(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [loadedImages, isMobile, loadedCount, totalImages]);

  // Handle image load events
  const handleImageLoad = (name: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [name]: true
    }));
  };

  return (
    <section className="py-32 bg-white">
      <div className="container px-4 mx-auto max-w-[1400px]">
        <h2 className="text-[64px] font-montserrat font-bold text-center mb-8">
          Our Team
        </h2>
        <p className="text-2xl font-montserrat text-center mb-32 max-w-2xl mx-auto">
          The minds behind RAADE's mission to transform African development
        </p>
        
        {/* Loading progress indicator for mobile */}
        {isMobile && showSkeletons && loadingProgress < 100 && (
          <div className="mb-12 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-montserrat text-[#274675]">Loading team</h3>
              <span className="text-sm">{loadedCount}/{totalImages}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#FBB03B] h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-32">
          {teamMembers.map((member) => (
            <Card 
              key={member.name}
              className="border-none shadow-none transition-all duration-300"
            >
              {showSkeletons && isMobile ? (
                <>
                  <div className="relative aspect-square mb-8 overflow-hidden bg-gray-200 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 w-2/3 mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 w-1/2 animate-pulse"></div>
                </>
              ) : (
                <>
                  <div className="relative aspect-square mb-8 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
                      onLoad={() => handleImageLoad(member.name)}
                      style={{
                        opacity: loadedImages[member.name] ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                    />
                    {!loadedImages[member.name] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <span className="text-gray-400">Loading...</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">
                    {member.name}
                  </h3>
                  <p className="font-montserrat text-gray-600 text-lg">
                    {member.role}
                  </p>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;
