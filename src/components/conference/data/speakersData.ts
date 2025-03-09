
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
    id: "sarah-nkandu",
    name: "Dr. Sarah Nkandu",
    role: "Innovation Director",
    organization: "African Development Institute",
    imagePlaceholder: "speaker-1",
    bio: "Expert in sustainable technology solutions for rural communities.",
    fullBio: "Dr. Sarah Nkandu has over 15 years of experience developing sustainable technology solutions for rural communities across East Africa. Her work focuses on bridging the digital divide and ensuring technological advancements benefit underserved populations.",
    expertise: ["Sustainable Technology", "Rural Development", "Digital Inclusion"],
    social: {
      linkedin: "https://linkedin.com/in/sample",
      twitter: "https://twitter.com/sample",
      website: "https://example.com"
    },
    speaking: {
      title: "Sustainable Innovation: Technology Solutions for Rural Africa",
      description: "This keynote will explore how sustainable technology can transform rural African communities and create lasting impact.",
      time: "3:30 PM - 4:00 PM",
      date: "April 11"
    }
  },
  {
    id: "kofi-mensah",
    name: "Kofi Mensah",
    role: "Founder & CEO",
    organization: "TechAfrica Ventures",
    imagePlaceholder: "speaker-2",
    bio: "Serial entrepreneur focused on technology startups across West Africa.",
    fullBio: "Kofi Mensah is a serial entrepreneur who has founded three successful technology startups operating across West Africa. His current venture, TechAfrica, focuses on identifying and supporting promising tech innovations with potential for continental scale.",
    expertise: ["Entrepreneurship", "Venture Capital", "Tech Startups"],
    social: {
      linkedin: "https://linkedin.com/in/sample",
      twitter: "https://twitter.com/sample",
      website: "https://example.com"
    },
    speaking: {
      title: "Building Scalable Tech Ventures in Africa",
      description: "Learn about the unique challenges and opportunities in scaling technology ventures across African markets.",
      time: "4:00 PM - 5:15 PM",
      date: "April 11"
    }
  },
  {
    id: "amina-diallo",
    name: "Prof. Amina Diallo",
    role: "Research Lead",
    organization: "Center for African Innovation",
    imagePlaceholder: "speaker-3",
    bio: "Leading researcher in human-centered design for development challenges.",
    fullBio: "Professor Amina Diallo leads groundbreaking research in human-centered design approaches to solving critical development challenges. Her work has been implemented in over 10 African countries and has received international recognition for its impact on community health outcomes.",
    expertise: ["Human-Centered Design", "Development Research", "Public Health Innovation"],
    social: {
      linkedin: "https://linkedin.com/in/sample",
      twitter: "https://twitter.com/sample"
    },
    speaking: {
      title: "Human-Centered Approaches to Development Challenges",
      description: "This panel discussion will explore how human-centered design methodologies can create more effective and sustainable solutions.",
      time: "10:15 AM - 12:00 PM",
      date: "April 12"
    }
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    role: "Policy Advisor",
    organization: "Pan-African Development Commission",
    imagePlaceholder: "speaker-4",
    bio: "Specialist in innovation policy and governance frameworks.",
    fullBio: "James Okafor specializes in developing innovation policy frameworks that enable sustainable growth across African nations. With a background in both government and private sector roles, he brings a unique perspective on how policy can accelerate innovation ecosystems.",
    expertise: ["Innovation Policy", "Governance", "Public-Private Partnerships"],
    social: {
      linkedin: "https://linkedin.com/in/sample",
      website: "https://example.com"
    },
    speaking: {
      title: "Policy Frameworks for Innovation Ecosystems",
      description: "Discover how thoughtful policy design can accelerate innovation ecosystems across the continent.",
      time: "2:00 PM - 3:30 PM",
      date: "April 12"
    }
  },
  {
    id: "fatima-ahmed",
    name: "Dr. Fatima Ahmed",
    role: "Executive Director",
    organization: "Women in African Innovation",
    imagePlaceholder: "speaker-5",
    bio: "Champion for gender equity in innovation and technology sectors.",
    fullBio: "Dr. Fatima Ahmed has dedicated her career to advancing gender equity in innovation and technology sectors. Her organization has supported over 5,000 women entrepreneurs and innovators through mentorship, funding, and skill development programs.",
    expertise: ["Gender Equity", "Innovation Funding", "Entrepreneurship Education"],
    social: {
      linkedin: "https://linkedin.com/in/sample",
      twitter: "https://twitter.com/sample",
      website: "https://example.com"
    },
    speaking: {
      title: "Breaking Barriers: Women Leaders in African Innovation",
      description: "This panel will highlight strategies for advancing gender equity in innovation ecosystems.",
      time: "4:00 PM - 5:15 PM",
      date: "April 11"
    }
  },
  {
    id: "michael-nkrumah",
    name: "Michael Nkrumah",
    role: "Investment Director",
    organization: "African Venture Partners",
    imagePlaceholder: "speaker-6",
    bio: "Expert in scaling innovative solutions through strategic investment.",
    fullBio: "Michael Nkrumah has facilitated over $50 million in strategic investments into innovative African startups. His investment approach focuses on identifying solutions with potential for continental scale and connecting them with appropriate capital and partnership opportunities.",
    expertise: ["Investment Strategy", "Scaling Innovation", "Venture Capital"],
    social: {
      linkedin: "https://linkedin.com/in/sample",
      twitter: "https://twitter.com/sample"
    },
    speaking: {
      title: "Funding Innovation: Investment Strategies for African Ventures",
      description: "Learn about effective investment strategies for scaling innovative solutions across African markets.",
      time: "1:00 PM - 2:00 PM",
      date: "April 12"
    }
  }
];

// Helper function to find a speaker by ID
export const getSpeakerById = (id: string): Speaker | undefined => {
  return speakersList.find(speaker => speaker.id === id);
};
