
/**
 * Finance Speakers Data
 * 
 * Contains profiles for speakers focused on finance, investment, and legal aspects
 */
import { Speaker } from "../types/Speaker";

export const financeSpeakers: Speaker[] = [
  {
    id: "yomi-jemibewon",
    name: "Yomi Jemibewon",
    role: "Co-Founder & Partner",
    organization: "CardinalStone Partners",
    imagePlaceholder: "Yomi Jemibewon",
    bio: "Investment management expert focusing on growth investments in West African businesses.",
    fullBio: "Yomi Jemibewon is a Co-Founder and Partner at CardinalStone Partners, a West African investment management firm. He has a background in private equity, focusing on growth investments in small and mid-sized businesses in Nigeria and West Africa. Jemibewon holds B.Sc. and M.Sc. degrees in Electrical Engineering from Virginia Tech and an MBA from the Wharton School at the University of Pennsylvania.",
    expertise: ["Investment Management", "Private Equity", "Business Growth"],
    social: {
      linkedin: "https://linkedin.com/in/yomi-jemibewon"
    },
    speaking: {
      title: "Growth Capital for African Businesses",
      description: "Strategies for accessing and deploying growth capital in African markets.",
      time: "10:30 AM - 11:30 AM",
      date: "April 11"
    }
  },
  {
    id: "uzoma-alexander-eze",
    name: "Uzoma Alexander Eze",
    role: "Partner & Chair",
    organization: "Romano Law",
    imagePlaceholder: "Uzoma Eze",
    bio: "Corporate attorney and CPA with expertise in multinational corporate finance and compliance.",
    fullBio: "Uzoma Alexander Eze is a corporate and employment attorney, finance professional, and Certified Public Accountant (CPA). He serves as a Partner and Chair of Corporate, Tax & Texas Litigation at Romano Law. Eze has extensive experience representing multinational corporations in various legal and financial sectors, including corporate finance, U.S. regulatory compliance, cross-border taxation, and bankruptcy restructuring.",
    expertise: ["Corporate Law", "Financial Compliance", "Cross-border Taxation"],
    social: {
      linkedin: "https://linkedin.com/in/uzoma-eze"
    },
    speaking: {
      title: "Legal and Regulatory Framework for African Business",
      description: "Navigating legal complexities in African business environments.",
      time: "9:00 AM - 10:00 AM",
      date: "April 11"
    }
  },
  {
    id: "ismael-fanny",
    name: "Ismaël Fanny",
    role: "Investment Officer",
    organization: "International Finance Corporation (IFC), World  ",
    imagePlaceholder: "Ismaël Fanny",
    bio: "Impact investment professional focusing on funding projects in the Caribbean region.",
    fullBio: "Ismaël Fanny is an Investment Officer with the International Finance Corporation (IFC), a member of the World Bank Group. In this role, he focuses on impact investments, particularly in the Caribbean region, where he helps fund projects and startups that have a direct positive impact on local communities. Prior to joining IFC, Ismaël gained experience in private equity and entrepreneurship. He holds an MBA from McGill University. Additionally, Ismaël has been featured in IFC's \"90 Seconds With\" series, where he discusses the organization's adaptability and efforts in delivering for clients in Haiti.",
    expertise: ["Impact Investing", "Development Finance", "Entrepreneurship"],
    social: {
      linkedin: "https://linkedin.com/in/ismael-fanny"
    },
    speaking: {
      title: "Impact Investment Strategies for Development",
      description: "Leveraging impact investments to drive sustainable development outcomes.",
      time: "4:30 PM - 5:30 PM",
      date: "April 11"
    }
  }
];
