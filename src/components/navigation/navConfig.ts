
export interface NavItem {
  name: string;
  href: string;
  dropdownItems?: { name: string; href: string }[];
}

const navConfig = {
  mainNavItems: [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Innovation Studios",
      href: "/studios",
    },
    {
      name: "Conference",
      href: "/conference",
      dropdownItems: [
        {
          name: "Overview",
          href: "/conference#overview",
        },
        {
          name: "Why Attend",
          href: "/conference#why-attend",
        },
        {
          name: "Speakers",
          href: "/conference#speakers",
        },
        {
          name: "Registration",
          href: "/conference#registration",
        },
        {
          name: "Donate",
          href: "/conference#donate",
        },
      ],
    },
  ],
  
  // Add footer navigation items
  footerNavItems: [
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Donate",
      href: "/donate",
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
    }
  ]
};

export default navConfig;
