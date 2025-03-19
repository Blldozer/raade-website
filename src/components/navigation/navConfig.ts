
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
      { name: "Overview", href: "/about#model" }, // Changed to link to the New Model section
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
      { name: "Apply", href: "/studios#apply" }
    ]
  },
  { 
    name: "Conference", 
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference#overview" },
      { name: "Why Attend", href: "/conference#why-attend" },
      { name: "Get Tickets!", href: "/conference/register", highlight: true } // Direct link to registration page
    ]
  }
];

/**
 * Footer navigation items
 * These appear at the bottom of the mobile menu
 */
const footerNavItems: NavItem[] = [
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" }
];

export default {
  mainNavItems,
  footerNavItems
};
