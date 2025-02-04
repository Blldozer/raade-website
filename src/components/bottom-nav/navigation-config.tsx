import { Home, Users, Lightbulb, Calendar } from "lucide-react";

export interface NavItem {
  icon: JSX.Element;
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
}

export const navItems: NavItem[] = [
  {
    icon: <Home size={20} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <Users size={20} />,
    label: "About",
    path: "/about",
    subItems: [
      { label: "Our Team", path: "/about#team" },
      { label: "Mission", path: "/about#mission" },
    ],
  },
  {
    icon: <Lightbulb size={20} />,
    label: "Studios",
    path: "/studios",
    subItems: [
      { label: "Current Projects", path: "/studios#projects" },
      { label: "Get Involved", path: "/studios#involve" },
      { label: "Past Success", path: "/studios#success" },
    ],
  },
  {
    icon: <Calendar size={20} />,
    label: "Conference",
    path: "/conference",
    subItems: [
      { label: "Schedule", path: "/conference#schedule" },
      { label: "Speakers", path: "/conference#speakers" },
      { label: "Register", path: "/conference#register" },
      { label: "Location", path: "/conference#location" },
    ],
  },
];