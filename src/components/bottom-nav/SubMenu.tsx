import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SubMenuItem {
  label: string;
  path: string;
}

interface SubMenuProps {
  items: SubMenuItem[];
  isVisible: boolean;
  onClose: () => void;
}

const SubMenu = ({ items, isVisible, onClose }: SubMenuProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 left-0 right-0 rounded-t-4xl bg-gradient-to-r from-raade-orange via-[#FF9848] to-raade-red transform translate-y-[-100%]"
    >
      <div className="p-4 pt-16">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block text-white/70 hover:text-white py-2 text-left transition-colors duration-300"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SubMenu;