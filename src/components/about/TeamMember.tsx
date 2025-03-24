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
  isPriority?: boolean;
}

/**
 * TeamMember component - Display wrapper for individual team members
 * This component has been refactored to use more focused sub-components
 * for better maintainability and organization.
 */
const TeamMember = ({ member, index, onImageLoad, isPriority }: TeamMemberProps) => {
  return (
    <TeamMemberCard
      member={member}
      index={index}
      onImageLoad={onImageLoad}
      isPriority={isPriority}
    />
  );
};

export default TeamMember;
