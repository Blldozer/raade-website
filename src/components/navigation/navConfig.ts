/**
 * Type definitions for navigation items
 */
export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  external?: boolean;
  highlight?: boolean; // Highlight property for special items
}

export interface NavItem {
  name: string;
  href: string;
  dropdownItems?: DropdownItem[];
  external?: boolean;
  highlight?: boolean;
}

/**
 * Main navigation configuration
 * Defines the structure of the navigation menu
 */
const mainNavItems: NavItem[] = [
  { name: "About", href: "/about",
    dropdownItems: [
      { name: "Overview", href: "/about#overview" }, // Updated to link to the Overview section
      { name: "Our Approach", href: "/about#approach" },
      { name: "Our Impact", href: "/about#impact" },
      { name: "Our Team", href: "/about#team" }
    ]
  },
  { 
    name: "Innovation Studios", 
    href: "/studios", // Fixed path to match the route in App.tsx
    dropdownItems: [
      { name: "Overview", href: "/studios#overview" },
      { name: "Projects", href: "/studios#projects" },
      { name: "Join us", href: "/studios#apply" } // Changed from "Apply" to "Join us"
    ]
  },
  { 
    name: "Conference", 
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference#overview" },
      { name: "Why Attend", href: "/conference#why-attend" },
      { name: "Speakers", href: "/conference#speakers" },
      { name: "Register Now", href: "/conference/register", highlight: true } // Explicitly point to the registration page
    ]
  }
];

/**
 * Footer navigation items
 * These appear at the bottom of the mobile menu
 */
const footerNavItems: NavItem[] = [
  { name: "Contact", href: "/contact" },
  { name: "Events", href: "/conference" }
];

export default {
  mainNavItems,
  footerNavItems
};
