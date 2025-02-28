
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const AboutNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Since the About page usually has a dark background at the top,
  // we'll use the black background logo (with white text)
  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                className="h-28 w-auto transition-all duration-300"
                src={isScrolled 
                  ? "/logos/RAADE-LOGO-White-BG.png" // When scrolled, use white bg logo
                  : "/logos/RAADE-LOGO-Black-BG.png"  // Initially, use black bg logo with white text
                }
                alt="RAADE Logo"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link
              to="/"
              className={cn(
                "px-3 py-2 text-base font-medium rounded-md",
                isScrolled
                  ? "text-[#1A365D] hover:text-[#274675]"
                  : "text-white hover:text-white/80"
              )}
            >
              Home
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md",
                isScrolled
                  ? "text-[#1A365D] hover:text-[#274675] hover:bg-gray-100"
                  : "text-white hover:text-white hover:bg-white/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#1A365D] hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AboutNav;
