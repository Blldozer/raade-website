
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
      { name: "Our Team", href: "/about#team" },
      { name: "Our Approach", href: "/about#approach" },
      { name: "Our Impact", href: "/about#impact" }
    ]
  },
  { 
    name: "Innovation Studios", 
    href: "/innovation-studios",
    dropdownItems: [
      { name: "Overview", href: "/innovation-studios#overview" },
      { name: "Projects", href: "/innovation-studios#projects" },
      { name: "Apply", href: "/innovation-studios#apply" }
    ]
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
