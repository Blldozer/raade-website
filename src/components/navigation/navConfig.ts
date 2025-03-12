
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
    href: "/about",
    dropdownItems: [
      { name: "Overview", href: "/about" },
      { name: "Our Approach", href: "/about#approach" },
      { name: "Our Impact", href: "/about#impact" },
      { name: "Meet the Team", href: "/about#team" }
    ],
  },
  {
    name: "Innovation Studios",
    href: "/studios",
    dropdownItems: [
      { name: "Overview", href: "/studios#overview" },
      { name: "Current Projects", href: "/studios#projects" },
      { name: "Join Us", href: "/studios#apply" },
    ],
  },
  {
    name: "Conference",
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference" },
      { name: "Tickets", href: "/conference#registration" },
    ],
  },
];
