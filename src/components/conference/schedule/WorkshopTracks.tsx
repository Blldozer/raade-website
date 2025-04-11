import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Workshop track types
interface WorkshopTrack {
  title: string;
  caseStudy: string;
  description: string;
  leader: string;
  leaderRole: string;
  leaderOrg: string;
}

// Workshop tracks data
const workshopTracks: WorkshopTrack[] = [
  {
    title: "Nutrition and Agriculture",
    caseStudy: "From Indigenous Crops to Nutritional Wealth: Market-Creating Innovations for Burkina Faso",
    description: "Exploring sustainable food systems and agricultural innovation for Africa's growing population.",
    leader: "Mezuo Nwuneli",
    leaderRole: "Co-Founder & Managing Partner",
    leaderOrg: "Sahel Capital Partners"
  },
  {
    title: "Finance",
    caseStudy: "Bridging the Finance Gap: Innovative Financial Systems for Senegal's Missing Middle",
    description: "Innovative funding models and investment strategies for African development.",
    leader: "Ismaël Fanny",
    leaderRole: "Agribusiness Investment Officer",
    leaderOrg: "International Finance Corporation (IFC)"
  },
  {
    title: "Energy Access and Business",
    caseStudy: "Harnessing the Sun: Market-Creating Innovations for Rural Electrification in Niger",
    description: "Business opportunities and solutions for improving energy access across Africa.",
    leader: "Tomiwa Igun",
    leaderRole: "Founder & CEO",
    leaderOrg: "SunFi Corporation"
  },
  {
    title: "History and Policy",
    caseStudy: "Exploring Mali's Development Through a Historical Lens",
    description: "Understanding historical context and policy implications for development in Africa.",
    leader: "Dr. Alexander X. Byrd",
    leaderRole: "Vice Provost for Access and Institutional Excellence",
    leaderOrg: "Rice University"
  },
  {
    title: "Medicine and Technology",
    caseStudy: "Mobility & Medicine: Creating Sustainable Healthcare Delivery Models in Chad",
    description: "Biomedical innovation and technological solutions for healthcare challenges in Africa.",
    leader: "Dr. June K. Madete",
    leaderRole: "Senior Lecturer, Biomedical Engineering",
    leaderOrg: "Kenyatta University"
  }
];

interface WorkshopTracksProps {
  className?: string;
}

export const WorkshopTracks: React.FC<WorkshopTracksProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-raade-navy font-simula">Workshop Tracks</h2>
      <div className="text-gray-700 mb-4 font-lora italic">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock size={16} />
          <span>11:25 AM - 12:20 PM, April 12</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} />
          <span>Hudspeth Auditorium, Glasscock School of Continuing Studies</span>
        </div>
      </div>
      
      <p className="mb-6 font-lora">
        Our interactive workshop session is divided into five specialized tracks, each led by an expert in the field. 
        Attendees can choose a track based on their interests and development goals.
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workshopTracks.map((track, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-bold text-lg mb-1 text-raade-navy font-simula">{track.title}</h3>
            <p className="text-raade-navy font-semibold mb-2 text-sm font-lora italic">Case Study: {track.caseStudy}</p>
            <p className="text-gray-600 mb-3 font-lora text-sm">{track.description}</p>
            <div className="flex items-center gap-2 text-gray-700">
              <User size={16} />
              <div>
                <span className="font-medium">{track.leader}</span>
                <p className="text-xs text-gray-500">{track.leaderRole}, {track.leaderOrg}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopTracks;
