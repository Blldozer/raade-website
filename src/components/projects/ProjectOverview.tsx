
import { Clock, Users, Target, ExternalLink } from "lucide-react";

interface ProjectOverviewProps {
  description: string;
  timeline: string;
  partner: string;
  partnerLink?: string;
  sector: string;
}

const ProjectOverview = ({ description, timeline, partner, partnerLink, sector }: ProjectOverviewProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-simula text-white mb-6">Overview</h2>
      <p className="text-xl leading-relaxed font-lora text-gray-100 mb-8">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex items-start">
          <Clock className="h-6 w-6 text-[#FBB03B] mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-white mb-1">Timeline</h3>
            <p className="font-lora text-gray-200">{timeline}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Users className="h-6 w-6 text-[#FBB03B] mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-white mb-1">Partner</h3>
            <div className="flex items-center font-lora text-gray-200">
              <span>{partner}</span>
              {partnerLink && (
                <a 
                  href={partnerLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center text-[#FBB03B] hover:text-[#FBB03B]/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <Target className="h-6 w-6 text-[#FBB03B] mr-3 mt-1" />
          <div>
            <h3 className="font-bold text-white mb-1">Sector</h3>
            <p className="font-lora text-gray-200">{sector}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
