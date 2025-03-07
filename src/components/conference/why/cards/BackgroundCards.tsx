
import React from "react";
import { motion } from "framer-motion";

interface BackgroundCardsProps {
  secondAttendee: {
    color: string;
  };
  thirdAttendee: {
    color: string;
  };
}

const BackgroundCards = ({ secondAttendee, thirdAttendee }: BackgroundCardsProps) => {
  return (
    <>
      {/* Third Card (back) */}
      <motion.div
        className="absolute top-4 -right-6 w-[320px] h-[500px] rounded-xl shadow-lg"
        style={{ 
          backgroundColor: thirdAttendee.color,
          zIndex: 1,
          opacity: 0.4,
          rotate: 4,
        }}
        animate={{ 
          rotate: 4,
          x: [0, 2, 0],
          transition: { 
            x: { repeat: Infinity, duration: 3, repeatType: 'reverse' } 
          }
        }}
      />
      
      {/* Second Card (middle) */}
      <motion.div
        className="absolute top-2 -right-3 w-[320px] h-[500px] rounded-xl shadow-xl"
        style={{ 
          backgroundColor: secondAttendee.color,
          zIndex: 2,
          opacity: 0.6,
          rotate: 2,
        }}
        animate={{ 
          rotate: 2,
          x: [0, 1, 0],
          transition: { 
            x: { repeat: Infinity, duration: 2.5, repeatType: 'reverse' } 
          }
        }}
      />
    </>
  );
};

export default BackgroundCards;
