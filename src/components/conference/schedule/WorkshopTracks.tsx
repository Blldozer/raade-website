import React from 'react';
import { Clock, MapPin, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';

// Workshop track types
interface WorkshopTrack {
  title: string;
  caseStudy: string;
  description: string;
  leader: string;
  leaderRole: string;
  leaderOrg: string;
  firstSessionRoom: string;
  secondSessionRoom: string;
}

// Workshop tracks data
const workshopTracks: WorkshopTrack[] = [
  {
    title: "Nutrition and Agriculture",
    caseStudy: "From Indigenous Crops to Nutritional Wealth: Market-Creating Innovations for Burkina Faso",
    description: "Exploring sustainable food systems and agricultural innovation for Africa's growing population.",
    leader: "Mezuo Nwuneli",
    leaderRole: "Co-Founder & Managing Partner",
    leaderOrg: "Sahel Capital Partners",
    firstSessionRoom: "ACC 219",
    secondSessionRoom: "ACC 219"
  },
  {
    title: "Finance",
    caseStudy: "Bridging the Finance Gap: Innovative Financial Systems for Senegal's Missing Middle",
    description: "Innovative funding models and investment strategies for African development.",
    leader: "Ismaël Fanny",
    leaderRole: "Agribusiness Investment Officer",
    leaderOrg: "International Finance Corporation (IFC)",
    firstSessionRoom: "ACC 115",
    secondSessionRoom: "ACC 109"
  },
  {
    title: "Energy Access and Business",
    caseStudy: "Harnessing the Sun: Market-Creating Innovations for Rural Electrification in Niger",
    description: "Business opportunities and solutions for improving energy access across Africa.",
    leader: "Tomiwa Igun",
    leaderRole: "Founder & CEO",
    leaderOrg: "SunFi Corporation",
    firstSessionRoom: "ACC 113",
    secondSessionRoom: "ACC 113"
  },
  {
    title: "History and Policy",
    caseStudy: "Exploring Mali's Development Through a Historical Lens",
    description: "Understanding historical context and policy implications for development in Africa.",
    leader: "Dr. Alexander X. Byrd",
    leaderRole: "Vice Provost for Access and Institutional Excellence",
    leaderOrg: "Rice University",
    firstSessionRoom: "ACC 110",
    secondSessionRoom: "ACC 110"
  },
  {
    title: "Medicine and Technology",
    caseStudy: "Mobility & Medicine: Creating Sustainable Healthcare Delivery Models in Chad",
    description: "Biomedical innovation and technological solutions for healthcare challenges in Africa.",
    leader: "Dr. June K. Madete",
    leaderRole: "Senior Lecturer, Biomedical Engineering",
    leaderOrg: "Kenyatta University",
    firstSessionRoom: "ACC 108",
    secondSessionRoom: "ACC 112"
  }
];

interface WorkshopTracksProps {
  className?: string;
}

export const WorkshopTracks: React.FC<WorkshopTracksProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-raade-navy font-simula">Workshop Tracks</h2>
      
      {/* Workshop Session Info */}
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-raade-navy font-simula mb-2">Workshop Session 1: Defining the Opportunity</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Clock size={16} />
            <span>11:25 AM - 12:20 PM, April 12</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-bold text-raade-navy font-simula mb-2">Workshop Session 2: Designing Market Solutions</h3>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Clock size={16} />
            <span>1:35 PM - 2:30 PM, April 12</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} />
          <span>Anderson Clarke Center (ACC), Glasscock School of Continuing Studies</span>
        </div>
      </div>
      
      <p className="mb-6 font-lora">
        Our interactive workshop sessions are divided into five specialized tracks, each led by an expert in the field. 
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
            
            {/* Room Information */}
            <div className="mb-3 bg-gray-100 px-3 py-2 rounded border-l-2 border-[#FBB03B]">
              <p className="text-xs text-gray-700 font-medium mb-1">Room Assignments:</p>
              <div className="flex items-center gap-1 text-gray-700 mb-1">
                <Home size={14} className="text-[#274675]" />
                <span className="text-xs">Session 1: <span className="font-medium">{track.firstSessionRoom}</span></span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <Home size={14} className="text-[#274675]" />
                <span className="text-xs">Session 2: <span className="font-medium">{track.secondSessionRoom}</span></span>
              </div>
            </div>
            
            {/* Workshop Leader */}
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
