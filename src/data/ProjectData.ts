export type Project = {
  name: string;
  partner: string;
  partnerLink?: string; // Adding optional partner website link
  challenge: string;
  sector: "Healthcare" | "Technology" | "Education" | "Energy" | "Business";
  sectors?: Array<"Healthcare" | "Technology" | "Education" | "Energy" | "Business">; // Multiple sectors
  image: string;
  slug: string;
  description: string;
  goals: string[];
  outcomes: string[];
  timeline: string;
  impact?: string; // Optional impact property
  testimonials?: {
    quote: string;
    author: string;
    role: string;
  }[];
  relatedProjects?: string[];
};

export const projects: Project[] = [
  {
    name: "SunFi Solar Access Program",
    partner: "SunFi Energy",
    partnerLink: "https://www.sunfi.co/",
    challenge: "Limited access to clean energy in rural Nigerian communities; decentralized market with price verification challenges",
    sector: "Energy", // Keep primary sector for backwards compatibility
    sectors: ["Energy", "Business"], // Add multiple sectors
    image: "/innovation-studios-project-cards/RAADE-Sunfi-Solar-Panel-image.jpeg",
    slug: "sunfi-solar-initiative",
    description: "The SunFi Solar Access Program addresses Nigeria's significant energy gap, where nearly half the population lacks reliable electricity access. In partnership with SunFi Energy, we're reimagining how distributed energy partners (DEPs) can expand solar power access across Nigeria. Our team is developing strategies to optimize this entrepreneurial distribution model, enabling more efficient deployment of affordable solar solutions to underserved communities. By enhancing the effectiveness of local energy entrepreneurs, this initiative aims to create pathways to clean energy that can scale nationwide.",
    goals: [
      "Optimize the distributed energy partner (DEP) network model",
      "Develop strategies for more efficient solar solution deployment",
      "Create sustainable financing models for rural communities",
      "Build capacity among local energy entrepreneurs"
    ],
    outcomes: [
      "SunFi provides 85% upfront financing to DEPs",
      "Each DEP serves as both distributor and installation support",
      "Developing scalable pathways to clean energy access",
      "Working to expand reliable energy to millions of Nigerians currently off-grid"
    ],
    timeline: "Ongoing"
  },
  {
    name: "Maternal Health Platform",
    partner: "Medical Women's Association of Nigeria",
    partnerLink: "https://www.mwan.org/",
    challenge: "Only 31% of rural Nigerian women have access to skilled birth attendance; significant reliance on traditional birth attendants",
    sector: "Healthcare",
    image: "/innovation-studios-project-cards/RAADE-maternal-health-image.jpeg",
    slug: "maternal-health-platform",
    description: "Nigeria faces one of the world's highest maternal mortality rates, with rural women particularly vulnerable due to limited access to skilled healthcare providers. Working with the Medical Women's Association of Nigeria (MWAN), our team is redesigning the maternal healthcare delivery experience to increase skilled birth attendance in rural communities. We're developing solutions that bridge traditional and modern healthcare approaches, addressing the social, cultural, and logistical barriers that prevent women from accessing life-saving care. This initiative aims to create sustainable pathways to quality maternal healthcare that respect cultural contexts while improving health outcomes.",
    goals: [
      "Increase skilled birth attendance in rural communities",
      "Bridge traditional and modern healthcare approaches",
      "Address cultural, financial, and access barriers",
      "Design sustainable maternal healthcare pathways"
    ],
    outcomes: [
      "Nigeria accounts for over 25% of maternal deaths worldwide",
      "Creating culturally appropriate healthcare solutions",
      "Working to reduce maternal deaths through increased skilled attendance",
      "Developing bridges between traditional birth attendants and modern healthcare"
    ],
    timeline: "Ongoing",
    relatedProjects: ["child-nutrition-initiative"]
  },
  {
    name: "Child Nutrition Initiative",
    partner: "Medical Women's Association of Nigeria",
    partnerLink: "https://www.mwan.org/",
    challenge: "Nearly 1/3 of under-five children in Nigeria suffer from malnutrition; rising inflation has put commercial baby foods beyond reach for most families.",
    sector: "Healthcare",
    image: "/innovation-studios-project-cards/RAADE-nutrition-project-image.jpeg",
    slug: "child-nutrition-initiative",
    description: "Malnutrition underlies over half of childhood deaths in Nigeria, with commercial complementary foods increasingly unaffordable due to rising inflation. In collaboration with the Medical Women's Association of Nigeria, our team is designing innovative, affordable nutrition solutions for children aged 6-23 months using locally available ingredients. We're developing both the food formulations and educational strategies to help caregivers prepare nutritious meals during the critical transition from exclusive breastfeeding to solid foods. By creating accessible nutrition pathways, this project aims to address a fundamental driver of child mortality and development challenges.",
    goals: [
      "Develop affordable nutrition solutions using local ingredients",
      "Create educational strategies for caregivers",
      "Focus on the critical 6-23 month transition period",
      "Design culturally appropriate complementary foods"
    ],
    outcomes: [
      "Targeting a critical developmental window after breastfeeding",
      "Working to reduce childhood malnutrition rates",
      "Developing both direct nutrition solutions and caregiver education",
      "Creating accessible nutrition pathways for vulnerable children"
    ],
    timeline: "Ongoing",
    relatedProjects: ["maternal-health-platform"]
  },
  {
    name: "Language Preservation Platform",
    partner: "Izesan Limited",
    partnerLink: "https://izesan.com/",
    challenge: "UNESCO predicts many Nigerian languages may vanish by 2025; limited documentation and educational integration",
    sector: "Education", // Keep primary sector for backwards compatibility
    sectors: ["Education", "Technology"], // Add multiple sectors
    image: "/innovation-studios-project-cards/RAADE-izesan-image.jpeg",
    slug: "language-preservation-platform",
    description: "Nigeria is home to over 520 languages, many of which face extinction within a generation. In partnership with Izesan Limited, our team is designing digital resources to revitalize critically endangered indigenous languages in Taraba and Bayelsa states. We're developing innovative learning experiences for children aged 2-10 that incorporate indigenous languages as the medium of instruction, aligning with Nigeria's National Language Policy. By combining educational technology with community engagement strategies, this project aims to preserve cultural heritage while creating new pathways for mother-tongue education across Nigeria.",
    goals: [
      "Create digital resources for endangered indigenous languages",
      "Develop learning experiences for children aged 2-10",
      "Align with Nigeria's National Language Policy",
      "Preserve cultural heritage through technology"
    ],
    outcomes: [
      "Targeting critically endangered languages in Taraba and Bayelsa states",
      "Developing mother-tongue education pathways",
      "Supporting improved educational outcomes",
      "Creating sustainable models for language preservation"
    ],
    timeline: "Ongoing"
  },
  {
    name: "Women's Entrepreneurship Program",
    partner: "International Peace Initiatives",
    partnerLink: "https://ipeacei.org/",
    challenge: "Young mothers with limited education struggle to maintain small businesses; cycle of poverty persists across generations",
    sector: "Business",
    image: "/innovation-studios-project-cards/RAADE-Women-Entrepreneurs.jpg",
    slug: "womens-entrepreneurship-program",
    description: "In Meru County, Kenya, many young mothers with limited formal education struggle to maintain small businesses that could lift their families out of poverty. Partnering with International Peace Initiatives, our team is designing interventions to enhance business skills and build self-confidence among vulnerable women entrepreneurs. We're developing practical tools and support systems that address both technical business challenges and the underlying social dynamics that affect women's economic participation. This initiative aims to create sustainable pathways to financial independence that can break intergenerational cycles of poverty.",
    goals: [
      "Enhance business skills among vulnerable women entrepreneurs",
      "Build self-confidence and community support systems",
      "Address both technical and social challenges",
      "Create sustainable pathways to financial independence"
    ],
    outcomes: [
      "Targeting women with primary-level education",
      "Supporting entrepreneurs who have attempted multiple businesses",
      "Working to break intergenerational cycles of poverty",
      "Creating sustainable income sources for family support"
    ],
    timeline: "Ongoing"
  },
  {
    name: "Elect.ai Electoral Innovation",
    partner: "Electoral technology startup",
    challenge: "Electoral systems plagued by fraud, intimidation, disenfranchisement, and logistical inefficiencies",
    sector: "Technology",
    image: "/innovation-studios-project-cards/RAADE-elect-ai-image.jpeg",
    slug: "electoral-innovation",
    description: "Electoral processes worldwide face persistent challenges with fraud, accessibility, and transparency that undermine democratic participation. In collaboration with Elect.ai, our team is developing innovations to modernize voting systems, particularly in African contexts. We're designing secure, accessible voting technology that leverages existing telecommunications infrastructure to expand democratic participation while enhancing election integrity. By addressing both technical and social aspects of the electoral process, this initiative aims to create more inclusive, transparent democratic systems that can build public trust and reduce election-day tensions.",
    goals: [
      "Develop secure, accessible voting technology",
      "Enhance election transparency and integrity",
      "Reduce barriers to democratic participation",
      "Leverage existing telecommunications infrastructure"
    ],
    outcomes: [
      "Emphasizing real-time vote tabulation and verifiable results",
      "Working to enhance public confidence in electoral outcomes",
      "Developing systems to reduce election-related conflicts",
      "Creating inclusive, transparent democratic processes"
    ],
    timeline: "Ongoing"
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getRelatedProjects = (project: Project): Project[] => {
  if (!project.relatedProjects || project.relatedProjects.length === 0) {
    return [];
  }
  
  return projects.filter(p => project.relatedProjects?.includes(p.slug));
};
