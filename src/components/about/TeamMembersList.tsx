
import { motion } from "framer-motion";
import TeamMember from "./TeamMember";

interface TeamMembersListProps {
  teamMembers: Array<{
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  }>;
  isInView: boolean;
  isLoaded: boolean;
}

const TeamMembersList = ({ teamMembers, isInView, isLoaded }: TeamMembersListProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate={isInView && isLoaded ? "show" : "hidden"}
    >
      {teamMembers.map((member, index) => (
        <TeamMember key={member.name} member={member} index={index} />
      ))}
    </motion.div>
  );
};

export default TeamMembersList;
