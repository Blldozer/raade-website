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
    id: "dr-oluwaseun-abimbola",
    name: "Dr. Oluwaseun Abimbola",
    role: "Public Health Researcher",
    organization: "University of Global Health Equity, Rwanda",
    imagePlaceholder: "speaker-1",
    bio: "Leading expert in health systems research and global health equity.",
    fullBio: "Dr. Oluwaseun Abimbola is a physician and health systems researcher whose work focuses on community engagement and governance for equitable health systems in Africa. He is a pioneer in developing frameworks for understanding and addressing health disparities through innovative policy approaches.",
    expertise: ["Health Systems Research", "Global Health Policy", "Community Health"],
    social: {
      linkedin: "https://linkedin.com/in/oluwaseun-abimbola",
      twitter: "https://twitter.com/drseunabimbola"
    },
    speaking: {
      title: "Health Innovation for Equitable Outcomes in Africa",
      description: "Exploring how health system innovations can address inequities and improve healthcare access across African countries.",
      time: "10:30 AM - 11:30 AM",
      date: "April 11"
    }
  },
  {
    id: "dr-akintoye-akindele",
    name: "Dr. Akintoye Akindele",
    role: "Chairman & CEO",
    organization: "Platform Capital Group",
    imagePlaceholder: "speaker-2",
    bio: "Venture capitalist and business leader with expertise in African investments.",
    fullBio: "Dr. Akintoye Akindele is a seasoned entrepreneur, investor, and business leader with a strong track record in identifying and supporting high-growth ventures across Africa. As Chairman of Platform Capital, he has pioneered innovative investment models that connect African startups to global markets and capital.",
    expertise: ["Venture Capital", "Business Growth", "Technology Investment"],
    social: {
      linkedin: "https://linkedin.com/in/akintoye-akindele",
      twitter: "https://twitter.com/drtoyeakindele",
      website: "https://platformcapital.com"
    },
    speaking: {
      title: "Scaling Innovation: Investment Models for African Growth",
      description: "Insights on developing sustainable and scalable investment approaches for African ventures and innovation ecosystems.",
      time: "2:00 PM - 3:00 PM",
      date: "April 11"
    }
  },
  {
    id: "professor-thuli-madonsela",
    name: "Professor Thuli Madonsela",
    role: "Law Trust Chair",
    organization: "Stellenbosch University",
    imagePlaceholder: "speaker-3",
    bio: "Renowned legal expert and former Public Protector of South Africa.",
    fullBio: "Professor Thuli Madonsela is a legal expert who served as South Africa's Public Protector from 2009 to 2016. She now holds the Law Trust Chair at Stellenbosch University, where she focuses on social justice and constitutional governance. Her work explores the intersection of law, governance, and inclusive development.",
    expertise: ["Constitutional Law", "Social Justice", "Governance"],
    social: {
      linkedin: "https://linkedin.com/in/thuli-madonsela",
      twitter: "https://twitter.com/ThuliMadonsela3"
    },
    speaking: {
      title: "Governance and Inclusive Development",
      description: "Examining the role of effective governance structures in promoting inclusive social and economic development across Africa.",
      time: "11:45 AM - 12:45 PM",
      date: "April 12"
    }
  },
  {
    id: "iyinoluwa-aboyeji",
    name: "Iyinoluwa Aboyeji",
    role: "Founder & General Partner",
    organization: "Future Africa",
    imagePlaceholder: "speaker-4",
    bio: "Serial entrepreneur and investor focused on mission-driven African startups.",
    fullBio: "Iyinoluwa Aboyeji is a serial entrepreneur who has co-founded several successful African startups including Andela and Flutterwave. As the founder of Future Africa, he invests in mission-driven founders solving challenging problems across the continent, with a focus on leveraging technology for widespread impact.",
    expertise: ["Entrepreneurship", "Tech Ecosystem Building", "Startup Funding"],
    social: {
      linkedin: "https://linkedin.com/in/iyinoluwa-aboyeji",
      twitter: "https://twitter.com/iaboyeji",
      website: "https://future.africa"
    },
    speaking: {
      title: "Building Africa's Future: From Founder to Funder",
      description: "Insights from the journey of building successful tech companies in Africa and now investing in the next generation of innovators.",
      time: "9:30 AM - 10:30 AM",
      date: "April 12"
    }
  },
  {
    id: "odunayo-eweniyi",
    name: "Odunayo Eweniyi",
    role: "Co-founder & COO",
    organization: "PiggyVest",
    imagePlaceholder: "speaker-5",
    bio: "Fintech leader pioneering digital savings and investment solutions in Africa.",
    fullBio: "Odunayo Eweniyi is a co-founder and the Chief Operations Officer of PiggyVest, Nigeria's foremost fintech platform for savings and investments. Under her leadership, PiggyVest has grown to help over 3 million users achieve their financial goals through simplified savings and investment products.",
    expertise: ["Fintech", "Financial Inclusion", "Women in Tech"],
    social: {
      linkedin: "https://linkedin.com/in/odunayoeweniyi",
      twitter: "https://twitter.com/oduneweniyi"
    },
    speaking: {
      title: "Democratizing Finance: Technology and Financial Inclusion",
      description: "How fintech innovations are creating pathways to financial inclusion and economic empowerment across Africa.",
      time: "3:15 PM - 4:15 PM",
      date: "April 12"
    }
  },
  {
    id: "dr-vera-songwe",
    name: "Dr. Vera Songwe",
    role: "Economist & Development Expert",
    organization: "Liquidity & Sustainability Facility",
    imagePlaceholder: "speaker-6",
    bio: "Influential economist with expertise in development economics and policy reform.",
    fullBio: "Dr. Vera Songwe is a distinguished economist with extensive experience in international development. She has served as the Under-Secretary-General at the United Nations and Executive Secretary of the Economic Commission for Africa. Her work focuses on economic governance, public sector reforms, and sustainable development.",
    expertise: ["Economic Policy", "Sustainable Development", "Public Sector Reform"],
    social: {
      linkedin: "https://linkedin.com/in/vera-songwe",
      twitter: "https://twitter.com/songwevera"
    },
    speaking: {
      title: "Economic Transformation in the Age of Climate Change",
      description: "Exploring economic strategies for African countries to achieve sustainable development while addressing climate challenges.",
      time: "1:30 PM - 2:30 PM",
      date: "April 11"
    }
  }
];

// Helper function to find a speaker by ID
export const getSpeakerById = (id: string): Speaker | undefined => {
  return speakersList.find(speaker => speaker.id === id);
};
