
/**
 * Type definitions for navigation items
 */
export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  external?: boolean;
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
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    dropdownItems: [
      { name: "Our Team", href: "/about#team" },
      { name: "Our Approach", href: "/about#approach" },
      { name: "Our Impact", href: "/about#impact" }
    ]
  },
  { 
    name: "Innovation Studios", 
    href: "/innovation-studios" 
  },
  { 
    name: "Conference", 
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference#overview" },
      { name: "Speakers", href: "/conference#speakers" },
      { name: "Schedule", href: "/conference#schedule" },
      { name: "Register", href: "/conference/registration", highlight: true }
    ]
  },
  { 
    name: "Projects", 
    href: "/projects" 
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
