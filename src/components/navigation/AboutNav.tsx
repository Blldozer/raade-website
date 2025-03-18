
import React from "react";
import { Link } from "react-router-dom";

/**
 * AboutNav Component - Special navigation for the About page
 * 
 * This navigation is specifically designed for the About page,
 * with smooth scrolling to sections and a cleaner look
 */
const AboutNav = () => {
  return (
    <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            {/* Use Link instead of a tag to prevent full page reloads */}
            <Link to="/" className="flex items-center">
              <img 
                src="/public/logos/RAADE-logo-final-white.png" 
                alt="RAADE Logo" 
                className="h-10" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a 
              href="#approach" 
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Our Approach
            </a>
            <a 
              href="#impact" 
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Our Impact
            </a>
            <a 
              href="#team" 
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Team
            </a>
            <Link to="/" className="text-white hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AboutNav;
