import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Lightbulb, Calendar } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'About', href: '#about' },
    { icon: Lightbulb, label: 'Studios', href: '#studios' },
    { icon: Calendar, label: 'Conference', href: '#conference' },
  ];

  return (
    <motion.nav 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 sm:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-[#1A365D]/90 backdrop-blur-sm rounded-full px-6 py-4 shadow-lg">
        <div className="flex items-center justify-around space-x-8">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-[#FBB03B] transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;