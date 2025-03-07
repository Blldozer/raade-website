
export interface Speaker {
  name: string;
  role: string;
  organization: string;
  imagePlaceholder: string;
  bio: string;
}

export const speakersList: Speaker[] = [
  {
    name: "Dr. Sarah Nkandu",
    role: "Innovation Director",
    organization: "African Development Institute",
    imagePlaceholder: "speaker-1",
    bio: "Expert in sustainable technology solutions for rural communities."
  },
  {
    name: "Kofi Mensah",
    role: "Founder & CEO",
    organization: "TechAfrica Ventures",
    imagePlaceholder: "speaker-2",
    bio: "Serial entrepreneur focused on technology startups across West Africa."
  },
  {
    name: "Prof. Amina Diallo",
    role: "Research Lead",
    organization: "Center for African Innovation",
    imagePlaceholder: "speaker-3",
    bio: "Leading researcher in human-centered design for development challenges."
  },
  {
    name: "James Okafor",
    role: "Policy Advisor",
    organization: "Pan-African Development Commission",
    imagePlaceholder: "speaker-4",
    bio: "Specialist in innovation policy and governance frameworks."
  },
  {
    name: "Dr. Fatima Ahmed",
    role: "Executive Director",
    organization: "Women in African Innovation",
    imagePlaceholder: "speaker-5",
    bio: "Champion for gender equity in innovation and technology sectors."
  },
  {
    name: "Michael Nkrumah",
    role: "Investment Director",
    organization: "African Venture Partners",
    imagePlaceholder: "speaker-6",
    bio: "Expert in scaling innovative solutions through strategic investment."
  }
];
