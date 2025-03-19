export interface NavItem {
  name: string;
  href: string;
  dropdownItems?: {
    name: string;
    href: string;
  }[];
}

export const navItems: NavItem[] = [
  {
    name: "About",
    href: "/about", // Points to the hero section by default
    dropdownItems: [
      { name: "Overview", href: "/about#overview" }, // Links to new model section
      { name: "Our Approach", href: "/about#approach" },
      { name: "Our Impact", href: "/about#impact" },
      { name: "Meet the Team", href: "/about#team" }
    ],
  },
  {
    name: "Innovation Studios",
    href: "/studios", // Points to the hero section by default
    dropdownItems: [
      { name: "Overview", href: "/studios" }, // Home/hero section
      { name: "Current Projects", href: "/studios#projects" },
      { name: "Join Us", href: "/studios#apply" },
    ],
  },
  {
    name: "Conference",
    href: "/conference", // Points to the hero section by default
    dropdownItems: [
      { name: "Overview", href: "/conference" }, // Home/hero section
      { name: "Why Attend", href: "/conference#why" },
      { name: "Registration", href: "/conference#registration" },
    ],
  },
];

// Additional items for mobile nav footer menu (events, contact)
export const mobileFooterItems: NavItem[] = [
  {
    name: "Events",
    href: "/conference", // Points to conference page hero section
  },
  {
    name: "Contact",
    href: "/contact", // Points to contact page hero section
  },
  {
    name: "Join Us",
    href: "/#build", // Points to the "Build with us" section on the homepage
  }
];
