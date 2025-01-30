import { Link } from "react-router-dom";
import { Home, Users, Lightbulb, Calendar } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <nav className="max-w-md mx-auto rounded-4xl bg-gradient-to-r from-[#e6cb96]/90 to-[#d4b36b]/90 backdrop-blur-sm border border-white/10">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center text-white hover:text-white/80 transition-colors">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/about" className="flex flex-col items-center text-white hover:text-white/80 transition-colors">
            <Users size={24} />
            <span className="text-xs mt-1">About</span>
          </Link>
          <Link to="/studios" className="flex flex-col items-center text-white hover:text-white/80 transition-colors">
            <Lightbulb size={24} />
            <span className="text-xs mt-1">Studios</span>
          </Link>
          <Link to="/conference" className="flex flex-col items-center text-white hover:text-white/80 transition-colors">
            <Calendar size={24} />
            <span className="text-xs mt-1">Conference</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;