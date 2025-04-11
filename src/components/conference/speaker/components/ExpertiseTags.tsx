import React from "react";

/**
 * ExpertiseTags Component
 * 
 * Displays tags representing a speaker's areas of expertise
 * 
 * @param expertise - Array of expertise areas to display as tags
 */
type ExpertiseTagsProps = {
  expertise: string[];
};

const ExpertiseTags = ({ expertise }: ExpertiseTagsProps) => {
  if (!expertise || expertise.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-raade-navy uppercase tracking-wider mb-2 font-simula">Expertise</h3>
      <div className="flex flex-wrap gap-2">
        {expertise.map((skill, index) => (
          <span 
            key={index} 
            className="bg-[#FBB03B]/10 text-[#FBB03B] px-3 py-1 rounded-full text-xs font-lora"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseTags;
