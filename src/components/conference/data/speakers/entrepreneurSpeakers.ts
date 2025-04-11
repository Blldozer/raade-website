
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
    role: "Founder & CEO",
    organization: "SunFi Corporation",
    imagePlaceholder: "Tomiwa Igun",
    bio: "Pioneer in clean energy financing solutions for Africa with experience at Boston Consulting Group.",
    fullBio: "Tomiwa Igun is passionate about electrifying Africa, as highlighted in Harvard Business School's Annual Portrait Project. He is the Founder and CEO of SunFi Corporation, which provides financing and digital tools for clean energy providers across Africa to increase access to sustainable and reliable electricity.\n\nPrior to founding SunFi, Tomiwa worked at The Boston Consulting Group (BCG) and the Africa Finance Corporation (AFC). At AFC, he financed infrastructure projects across Africa, including a 5,000 MW thermal power program and a 60 MW wind farm in Djibouti. He also co-founded Young African MBAs (YAM), a network to strengthen the pipeline of global business talent from Africa.\n\nTomiwa earned his MBA from Harvard Business School (with Honors), his M.Sc. in Automotive Systems Engineering from the University of Michigan, and his B.Sc. in Mechanical Engineering from Howard University. While at HBS, he led the Africa Business Conference, which gathered over 1,500 professionals focused on business in Africa. He was also a co-author of a Harvard Business School case study on Nigeria's Power Sector Privatization.",
    expertise: ["Clean Energy Financing", "Infrastructure Development", "African Entrepreneurship"],
    social: {
      linkedin: "https://linkedin.com/in/tomiwa-igun"
    },
    speaking: {
      title: "Workshop Session 1: Defining the Opportunity",
      description: "An interactive workshop on identifying opportunities in energy access and business development across Africa, featuring the case study 'Harnessing the Sun: Market-Creating Innovations for Rural Electrification in Niger'.",
      time: "11:25 AM - 12:20 PM",
      date: "April 12"
    },
    additionalSessions: [
      {
        title: "Panel: From Prototype to Phenomenon",
        role: "Panelist",
        time: "2:30 PM - 3:10 PM",
        date: "April 12"
      }
    ]
  },
  {
    id: "mezuo-nwuneli",
    name: "Mezuo Nwuneli",
    role: "Co-Founder & Managing Partner",
    organization: "Sahel Capital Partners",
    imagePlaceholder: "Mezuo Nwuneli",
    bio: "Agricultural investment expert and Managing Partner of Sahel Capital focused on sustainable food systems.",
    fullBio: "Mezuo Nwuneli is the Co-Founder and Managing Partner of Sahel Capital Partners, a leading food and agriculture-focused private equity firm in West Africa. He manages the firm's investments in food production, processing, and distribution businesses. Prior to founding Sahel Capital, Mezuo worked with private equity firms including Actis LLP and South Africa Infrastructure Fund Managers, as well as Oceanic Capital, and SecTrust (now part of Afrinvest). He earned an MBA from Harvard Business School and a B.Sc. in Industrial Management from Carnegie Mellon University, with a minor in Economics.",
    expertise: ["Agricultural Investment", "Food Security", "Private Equity"],
    social: {
      linkedin: "https://linkedin.com/in/mezuo-nwuneli"
    },
    speaking: {
      title: "Workshop Session 1: Defining the Opportunity",
      description: "An interactive workshop on identifying opportunities in nutrition and agriculture for sustainable food systems in Africa, featuring the case study 'From Indigenous Crops to Nutritional Wealth: Market-Creating Innovations for Burkina Faso'.",
      time: "11:25 AM - 12:20 PM",
      date: "April 12"
    },
    additionalSessions: [
      {
        title: "Workshop Session 1: Defining the Opportunity",
        role: "Workshop Leader - Energy Access & Business Track",
        description: "A focused workshop on business opportunities in improving energy access across Africa.",
        time: "11:25 AM - 12:20 PM",
        date: "April 12"
      },
      {
        title: "Panel: Financing the Impossible",
        role: "Panelist",
        time: "10:40 AM - 11:20 AM",
        date: "April 12"
      }
    ]
  }
];
