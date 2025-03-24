import TeamMemberCard from "./team/TeamMemberCard";

interface TeamMemberProps {
  member: {
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  };
  index: number;
  onImageLoad?: () => void;
}

/**
 * TeamMember component - Display wrapper for individual team members
 * This component has been refactored to use more focused sub-components
 * for better maintainability and organization.
 */
const TeamMember = ({ member, index, onImageLoad }: TeamMemberProps) => {
  return (
    <TeamMemberCard
      member={member}
      index={index}
      onImageLoad={onImageLoad}
    />
  );
};

export default TeamMember;
