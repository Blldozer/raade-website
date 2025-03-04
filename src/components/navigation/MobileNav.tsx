
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { useState } from "react";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
}

const MobileNav = ({ isScrolled = false, isHeroPage = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "transition-colors duration-200",
          isHeroPage && !isScrolled ? "text-white" : "text-[#FBB03B]"
        )}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-b-lg shadow-lg animate-fade-in">
          <NavLinks
            className="block px-3 py-2"
            onClick={() => setIsOpen(false)}
            isScrolled={isScrolled}
            isHeroPage={isHeroPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
