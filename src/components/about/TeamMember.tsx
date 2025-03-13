
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState } from "react";

interface TeamMemberProps {
  member: {
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  };
  index: number;
}

const TeamMember = ({ member, index }: TeamMemberProps) => {
  const [imageError, setImageError] = useState(false);

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
        duration: 0.6
      }
    }
  };

  const photoAnimation = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleImageError = () => {
    console.log(`Image error for team member: ${member.name}`);
    setImageError(true);
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={item}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      layoutId={`team-member-${index}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#3C403A] rounded-lg" />
      <div className="relative z-10">
        <motion.div 
          className="rounded-t-lg overflow-hidden"
          variants={photoAnimation}
        >
          {!imageError ? (
            <motion.img
              src={`/raade-individual-e-board-photos-webp/${member.name.split(" ").join("-")}-raade-website-image.webp`}
              alt={member.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
              whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-[#4C504A] flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {member.name.split(" ")[0][0]}{member.name.split(" ")[1]?.[0] || ''}
              </span>
            </div>
          )}
        </motion.div>
        <motion.div 
          className="p-8"
          variants={textAnimation}
        >
          {member.linkedin ? (
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2 flex items-center gap-3">
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FBB03B] transition-colors flex items-center gap-2"
              >
                {member.name} <Linkedin className="w-6 h-6 md:w-8 md:h-8 inline text-[#FBB03B]" />
              </a>
            </h3>
          ) : (
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2">
              {member.name}
            </h3>
          )}
          <p className="text-xl md:text-2xl text-gray-300 font-lora">
            {member.position}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
