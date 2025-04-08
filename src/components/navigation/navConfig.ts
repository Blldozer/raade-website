
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
};

export default navConfig;
