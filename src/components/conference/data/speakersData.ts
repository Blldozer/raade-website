
export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  imagePlaceholder: string;
  bio: string;
  fullBio?: string;
  expertise?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  speaking?: {
    title?: string;
    description?: string;
    time?: string;
    date?: string;
  };
}

export const speakersList: Speaker[] = [
  {
    id: "peter-obi",
    name: "Peter Obi",
    role: "Former Governor of Anambra State",
    organization: "Labour Party",
    imagePlaceholder: "Peter Obi",
    bio: "Nigerian businessman and politician who served as the Governor of Anambra State from 2006 to 2014.",
    fullBio: "Peter Gregory Obi is a Nigerian businessman and politician who served as the Governor of Anambra State from 2006 to 2014. Born on July 19, 1961, in Onitsha, Anambra State, he attended Christ the King College and later earned a Bachelor of Philosophy from the University of Nigeria, Nsukka. Obi has an extensive background in business, holding leadership positions in various companies, including serving as the youngest chairman of Fidelity Bank Plc. In 2022, he became the Labour Party's presidential candidate for the 2023 Nigerian general election.",
    expertise: ["Governance", "Business Leadership", "Economic Policy"],
    speaking: {
      title: "Economic Development in Nigeria: Challenges and Opportunities",
      description: "A discussion on sustainable economic strategies for Nigeria's future growth.",
      time: "10:00 AM - 11:00 AM",
      date: "April 11"
    }
  },
  {
    id: "oby-ezekwesili",
    name: "Obiageli \"Oby\" Ezekwesili",
    role: "Former Minister & World Bank VP",
    organization: "Transparency International Co-founder",
    imagePlaceholder: "Oby Ezekwesili",
    bio: "Economic policy expert renowned for advocacy in transparency, accountability, and good governance.",
    fullBio: "Obiageli \"Oby\" Ezekwesili is a Nigerian economic policy expert renowned for her advocacy in transparency, accountability, good governance, and human capital development. She co-founded Transparency International and served as its Director for Africa from 1994 to 1999. Ezekwesili held prominent positions in the Nigerian government, including Minister of Solid Minerals (2005–2006) and Minister of Education (2006–2007). She also served as Vice President for the Africa Region at the World Bank from 2007 to 2012. Ezekwesili holds a bachelor's degree from the University of Nigeria, Nsukka, a master's in International Law and Diplomacy from the University of Lagos, and a Master of Public Administration from Harvard Kennedy School. She is a chartered accountant and has been instrumental in various initiatives, including the #BringBackOurGirls movement.",
    expertise: ["Economic Policy", "Transparency & Governance", "Education"],
    social: {
      twitter: "https://twitter.com/obyezeks"
    },
    speaking: {
      title: "Transparency and Governance in African Development",
      description: "Insights on promoting transparency and good governance for sustainable development.",
      time: "1:30 PM - 2:30 PM",
      date: "April 11"
    }
  },
  {
    id: "alexander-byrd",
    name: "Dr. Alexander X. Byrd",
    role: "Vice Provost for Diversity, Equity, and Inclusion",
    organization: "Rice University",
    imagePlaceholder: "Dr. Byrd",
    bio: "Associate Professor of History specializing in Afro-American history in the Atlantic world.",
    fullBio: "Dr. Alexander X. Byrd serves as the Vice Provost for Diversity, Equity, and Inclusion at Rice University, a position he has held since July 2020. In this role, he provides strategic leadership for diversity initiatives and coordinates efforts across the campus. He is also an Associate Professor of History at Rice, specializing in Afro-American history, particularly black life in the Atlantic world and the Jim Crow South. His notable work includes the book \"Captives & Voyagers,\" which examines free and forced transatlantic black migration during the American Revolution. Dr. Byrd is a recipient of the 2020 Piper Professor Award and has been honored multiple times with Rice University's George R. Brown Award for Superior Teaching. He earned his bachelor's degree from Rice University and completed his doctorate in History at Duke University.",
    expertise: ["History", "Diversity & Inclusion", "Education"],
    social: {
      website: "https://humanities.rice.edu/people/alexander-x-byrd"
    },
    speaking: {
      title: "Historical Perspectives on African Development",
      description: "Examining the historical context and its influence on current development challenges.",
      time: "3:00 PM - 4:00 PM",
      date: "April 11"
    }
  },
  {
    id: "rebecca-richards-kortum",
    name: "Rebecca Richards-Kortum",
    role: "Malcolm Gillis University Professor",
    organization: "Rice University",
    imagePlaceholder: "Dr. Richards-Kortum",
    bio: "Professor focusing on developing low-cost technologies for global health in low-resource settings.",
    fullBio: "Dr. Rebecca Richards-Kortum is the Malcolm Gillis University Professor at Rice University, where she serves as a Professor of Bioengineering and Co-Director of the Rice360 Institute for Global Health Technologies. Her research focuses on developing low-cost, high-performance technologies for low-resource settings, particularly in global health. Richards-Kortum holds a Ph.D. in Medical Physics from the Harvard-MIT Division of Health Sciences and Technology.",
    expertise: ["Bioengineering", "Global Health", "Medical Technologies"],
    social: {
      website: "https://bioengineering.rice.edu/people/faculty/rebecca-richards-kortum"
    },
    speaking: {
      title: "Innovation in Healthcare for African Development",
      description: "How low-cost, high-performance technologies can address healthcare challenges in Africa.",
      time: "9:30 AM - 10:30 AM",
      date: "April 12"
    }
  },
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
  },
  {
    id: "bunmi-akinyemiju",
    name: "Bunmi Akinyemiju",
    role: "CEO & Co-Founder",
    organization: "Venture Garden Group",
    imagePlaceholder: "Bunmi Akinyemiju",
    bio: "Serial entrepreneur and investor focusing on innovative technology companies.",
    fullBio: "Bunmi Akinyemiju is a serial entrepreneur, technology innovator, and investor. He is the CEO and Co-Founder of Venture Garden Group, a technology investment holding company, and a Founding Partner at GreenHouse Capital. Akinyemiju has over 23 years of experience in entrepreneurship and venture capital, focusing on innovative technology companies. He holds a degree in Computer Science from Michigan State University.",
    expertise: ["Technology Innovation", "Entrepreneurship", "Venture Capital"],
    social: {
      linkedin: "https://linkedin.com/in/bunmi-akinyemiju"
    },
    speaking: {
      title: "Technology Entrepreneurship in African Markets",
      description: "Strategies for building successful technology ventures in Africa's emerging markets.",
      time: "3:00 PM - 4:00 PM",
      date: "April 12"
    }
  },
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
    organization: "International Finance Corporation (IFC)",
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

// Helper function to find a speaker by ID
export const getSpeakerById = (id: string): Speaker | undefined => {
  return speakersList.find(speaker => speaker.id === id);
};
