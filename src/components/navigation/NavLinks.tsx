import { Link } from "react-router-dom";

export const navItems = [
  { name: "About", href: "/about" },
  { name: "Innovation Studios", href: "/studios" },
  { name: "Conference", href: "/conference" },
];

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

const NavLinks = ({ className = "", onClick }: NavLinksProps) => (
  <>
    {navItems.map((item) => (
      <Link
        key={item.name}
        to={item.href}
        className={`text-raade-navy hover:text-raade-gold transition-colors duration-200 ${className}`}
        onClick={onClick}
      >
        {item.name}
      </Link>
    ))}
    <a
      href="#join"
      className="px-6 py-2 rounded-md transition-colors duration-200 bg-raade-navy text-white hover:bg-raade-gold"
      onClick={onClick}
    >
      Join Us
    </a>
  </>
);

export default NavLinks;