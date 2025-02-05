import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Lightbulb, Calendar } from 'lucide-react';

const TopNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'About', href: '#about' },
    { icon: Lightbulb, label: 'Studios', href: '#studios' },
    { icon: Calendar, label: 'Conference', href: '#conference' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-[#1A365D]/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="/"
            className="text-[#FBB03B] font-bold text-xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RAADE
          </motion.a>

          {/* Navigation Items */}
          <div className="hidden sm:flex space-x-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-[#FBB03B] transition-colors flex items-center space-x-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNav;