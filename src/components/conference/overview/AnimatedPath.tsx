
import React from "react";
import { motion } from "framer-motion";
import { Flame, Lightbulb, Star, Target, Rocket } from "lucide-react";

const AnimatedPath = () => {
  return (
    <div className="relative h-40 w-full max-w-lg">
      {/* SVG path for curved journey */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        {/* Animated gradient path with moving dash offset */}
        <motion.path 
          d="M10,50 C60,20 90,80 150,40 C210,0 240,70 330,50"
          fill="none"
          strokeWidth="2"
          stroke="url(#gradientPath)"
          strokeDasharray="5,5"
          strokeLinecap="round"
          initial={{ pathLength: 0, strokeDashoffset: 100 }}
          whileInView={{ 
            pathLength: 1,
            transition: { duration: 2, ease: "easeOut" }
          }}
          animate={{ 
            strokeDashoffset: [100, -100], 
            transition: { 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear"
            } 
          }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBB03B" />
            <stop offset="100%" stopColor="#FF8A6A" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Animated dots along the path at key waypoints */}
      {[
        { x: 10, y: 50, delay: 0.4 },
        { x: 60, y: 20, delay: 0.8 },
        { x: 150, y: 40, delay: 1.2 },
        { x: 240, y: 70, delay: 1.6 },
        { x: 330, y: 50, delay: 2.0 }
      ].map((pos, index) => (
        <motion.div 
          key={index} 
          className="absolute w-3 h-3 rounded-full bg-[#FBB03B]" 
          style={{ left: pos.x, top: pos.y }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.5, 1], opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: pos.delay, ease: "easeOut" }}
          animate={{
            y: [pos.y - 3, pos.y + 3, pos.y - 3],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
      
      {/* Alternative icons instead of Sparkles */}
      {[
        { icon: Flame, x: "15%", y: "15%", delay: 0.7, size: 16 },
        { icon: Lightbulb, x: "45%", y: "60%", delay: 1.1, size: 20 },
        { icon: Star, x: "65%", y: "25%", delay: 1.5, size: 18 },
        { icon: Target, x: "85%", y: "45%", delay: 1.9, size: 14 },
        { icon: Rocket, x: "30%", y: "75%", delay: 2.2, size: 12 }
      ].map((iconInfo, index) => {
        const IconComponent = iconInfo.icon;
        return (
          <motion.div 
            key={`icon-${index}`} 
            className="absolute" 
            style={{ left: iconInfo.x, top: iconInfo.y }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: iconInfo.delay, duration: 0.5 }}
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 0.9, 1],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.75, 1]
              }
            }}
          >
            <IconComponent className="text-[#FBB03B]" size={iconInfo.size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
      
      {/* Path obstruction elements */}
      {[
        { x: "38%", y: "40%", delay: 1.3, rotate: 45 },
        { x: "75%", y: "65%", delay: 1.7, rotate: -30 }
      ].map((obstacle, index) => (
        <motion.div 
          key={`obstacle-${index}`} 
          className="absolute w-6 h-1 bg-[#FBB03B]/30 rounded-full" 
          style={{ 
            left: obstacle.x, 
            top: obstacle.y,
            transform: `rotate(${obstacle.rotate}deg)`
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: obstacle.delay, duration: 0.5 }}
          animate={{
            width: ["1.5rem", "1rem", "1.5rem"],
            opacity: [0.3, 0.5, 0.3],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedPath;
