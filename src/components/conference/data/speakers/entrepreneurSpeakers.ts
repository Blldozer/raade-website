
/**
 * Entrepreneur Speakers Data
 * 
 * Contains profiles for speakers focused on entrepreneurship and business development
 */
import { Speaker } from "../types/Speaker";

export const entrepreneurSpeakers: Speaker[] = [
  {
    id: "tomiwa-igun",
    name: "Tomiwa Igun",
    role: "Co-founder & COO",
    organization: "SunFi",
    imagePlaceholder: "Tomiwa Igun",
    bio: "Leader in clean energy financial technology, enhancing solar energy access in Africa.",
    fullBio: "Tomiwa Igun is the Co-founder and Chief Operations Officer of SunFi, a clean energy financial technology platform that enhances sales efficiency for solar installers. In this role, he oversees credit risk management and operations. Prior to founding SunFi in March 2021, Tomiwa co-founded Aspire Power Solutions, focusing on improving energy access in sub-Saharan Africa. He also held managerial positions at The Boston Consulting Group and advisory roles with Fluna. Tomiwa holds an MBA from Harvard Business School, a master's degree in Electrical Engineering from the University of Michigan, and a bachelor's degree in Electrical Engineering from Howard University.",
    expertise: ["Clean Energy", "Financial Technology", "Sustainable Development"],
    social: {
      linkedin: "https://linkedin.com/in/tomiwaigun"
    },
    speaking: {
      title: "Clean Energy Solutions for Africa's Development",
      description: "Exploring sustainable energy models and financing solutions for African markets.",
      time: "11:00 AM - 12:00 PM",
      date: "April 12"
    }
  },
  {
    id: "mezuo-nwuneli",
    name: "Mezuo Nwuneli",
    role: "Co-Founder & Managing Partner",
    organization: "Sahel Capital",
    imagePlaceholder: "Mezuo Nwuneli",
    bio: "Agribusiness investment expert with focus on the agricultural sector in West Africa.",
    fullBio: "Mezuo Nwuneli is the Co-Founder and Managing Partner of Sahel Capital, an agribusiness-focused private investment firm. With over 25 years of experience in corporate finance, investment banking, and private equity, he has concentrated on the agricultural sector in West Africa since 2010. Nwuneli serves on the boards of various companies and is recognized as an Eisenhower Fellow and an Archbishop Tutu Fellow. He holds an MBA from Harvard Business School and a B.Sc. in Industrial Management from Carnegie Mellon University.",
    expertise: ["Agribusiness", "Private Equity", "Investment"],
    social: {
      linkedin: "https://linkedin.com/in/mezuo-nwuneli"
    },
    speaking: {
      title: "Agricultural Investment Strategies for African Growth",
      description: "Insights on developing sustainable agricultural investment models in Africa.",
      time: "1:30 PM - 2:30 PM",
      date: "April 12"
    }
  }
];
