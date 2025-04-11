
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
    bio: "Leader in clean energy financial technology, passionate about electrifying Africa through innovative solutions.",
    fullBio: "Tomiwa Igun is passionate about electrifying Africa, as depicted in his 2012 Harvard Business School Annual Portrait project (\"Tell Me, What Is It You Plan To Do With Your One Wild And Precious Life?\") where he laid out a brief basis for this passion. His professional career has revolved around this goal of improving the electrification around Africa. He co-founded SunFi Corporation and serves as Chief Operating Officer. SunFi is a Clean Energy FinTech that provides financing and digital tools to enable distributed clean energy providers in Nigeria to scale clean, affordable, and reliable electricity. SunFi came about after co-founding Aspire Power Solutions, which is a distributed energy provider in Nigeria.\n\nPreviously, he was a Manager within the Grow Africa Team at The Boston Consulting Group (BCG) where he has served several clients providing strategic advisory and executing on energy projects, including in Nigeria and other African countries. Before this, Tomiwa worked at Africa Finance Corporation with a mandate to develop infrastructure projects in Africa. He also co-founded Young African MBAs (YAM), a non-profit helping bridge the gap in Africa's management talent.\n\nTomiwa holds an MBA with Honors from Harvard Business School, M.Sc. Electrical Engineering from University of Michigan, and B.Sc. Electrical Engineering from Howard University. During his time at HBS, he co-chaired the Africa Business Conference, the largest student-run conference focused on Africa. He also co-authored a published Harvard Business School case study on the Privatization of Nigeria's Power Sector.",
    expertise: ["Clean Energy", "Financial Technology", "Sustainable Development"],
    social: {
      linkedin: "https://linkedin.com/in/tomiwaigun"
    },
    speaking: {
      title: "Workshop Session 1: Defining the Opportunity",
      description: "Interactive workshop on identifying and defining market opportunities in sustainable energy.",
      time: "11:25 AM - 12:20 PM",
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
      title: "Workshop Session 1: Defining the Opportunity",
      description: "Interactive workshop on identifying opportunities in Africa's agricultural investment landscape.",
      time: "11:25 AM - 12:20 PM",
      date: "April 12"
    }
  }
];
