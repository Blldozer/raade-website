
export type Project = {
  name: string;
  partner: string;
  challenge: string;
  impact: string;
  sector: "Healthcare" | "Technology" | "Education" | "Energy";
  image: string;
  slug: string;
  description: string;
  goals: string[];
  outcomes: string[];
  timeline: string;
  testimonials?: {
    quote: string;
    author: string;
    role: string;
  }[];
  relatedProjects?: string[];
};

export const projects: Project[] = [
  {
    name: "SunFi Solar Initiative",
    partner: "SunFi Energy",
    challenge: "Limited access to clean energy in rural communities",
    impact: "Installed 500+ solar units, impacting 2,500+ lives",
    sector: "Energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80",
    slug: "sunfi-solar-initiative",
    description: "The SunFi Solar Initiative addresses the critical energy gap in rural African communities by designing scalable, affordable solar systems tailored to local needs. Our student team worked with SunFi Energy to create innovative distribution models that make clean energy solutions economically viable for communities that previously relied on kerosene lamps or had no electricity at all.",
    goals: [
      "Design affordable solar units for rural households",
      "Create a sustainable distribution and financing model",
      "Build local capacity for maintenance and repairs",
      "Measure and track social impact of clean energy access"
    ],
    outcomes: [
      "Installed over 500 solar units in rural communities",
      "Established a micro-financing system with 95% repayment rate",
      "Trained 50 local technicians in maintenance and repairs",
      "Reduced kerosene use by 75% in participating communities"
    ],
    timeline: "January 2023 - Present",
    testimonials: [
      {
        quote: "The solar system has transformed our entire community. Children can study at night, businesses can stay open longer, and we all feel safer with proper lighting.",
        author: "Amina Diallo",
        role: "Community Leader, Mali"
      }
    ]
  },
  {
    name: "Maternal Health Platform",
    partner: "Medical Women's Association",
    challenge: "Limited access to maternal healthcare information",
    impact: "Connected 1,000+ mothers with healthcare providers",
    sector: "Healthcare",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80",
    slug: "maternal-health-platform",
    description: "The Maternal Health Platform bridges critical information gaps for expectant mothers in underserved communities. Working with the Medical Women's Association, our team developed a mobile platform that delivers essential health information, facilitates appointments, and connects women with qualified healthcare providers throughout their pregnancy journey.",
    goals: [
      "Create an accessible mobile platform for maternal health information",
      "Develop a network of qualified healthcare providers",
      "Implement a reminder system for appointments and checkups",
      "Build analytics to identify high-risk pregnancies"
    ],
    outcomes: [
      "Connected over 1,000 expectant mothers with healthcare providers",
      "Reduced missed prenatal appointments by 60%",
      "Delivered over 10,000 targeted health messages",
      "Identified and provided early intervention for 75 high-risk pregnancies"
    ],
    timeline: "March 2022 - Present",
    testimonials: [
      {
        quote: "The platform gave me confidence during my pregnancy. I always knew what to expect and had direct access to my doctor when I needed guidance.",
        author: "Sarah Okafor",
        role: "Platform User, Nigeria"
      }
    ],
    relatedProjects: ["healthcare-analytics", "remote-health-monitoring"]
  },
  {
    name: "Digital Learning Hub",
    partner: "EduTech Africa",
    challenge: "Limited access to quality education resources",
    impact: "Reached 5,000+ students across 3 countries",
    sector: "Education",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    slug: "digital-learning-hub",
    description: "The Digital Learning Hub democratizes access to quality educational content for students across Africa. In partnership with EduTech Africa, we created a platform that delivers curriculum-aligned content, interactive learning modules, and assessment tools that work even in low-bandwidth environments.",
    goals: [
      "Build an offline-capable learning platform",
      "Create curriculum-aligned content for multiple countries",
      "Develop interactive learning modules and assessments",
      "Implement progress tracking and analytics"
    ],
    outcomes: [
      "Reached over 5,000 students across Ghana, Kenya, and Nigeria",
      "Created 200+ hours of interactive learning content",
      "Achieved 40% improvement in test scores among participating students",
      "Established partnerships with 25 schools"
    ],
    timeline: "September 2022 - Present",
    testimonials: [
      {
        quote: "The Digital Learning Hub has transformed how we teach. Our students are more engaged, and we can track their progress in real-time to provide targeted support.",
        author: "James Mwangi",
        role: "Headteacher, Kenya"
      }
    ]
  },
  {
    name: "Healthcare Analytics",
    partner: "Regional Health Network",
    challenge: "Inefficient healthcare data management",
    impact: "Reduced reporting time by 60% across 12 facilities",
    sector: "Technology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    slug: "healthcare-analytics",
    description: "Healthcare Analytics transforms how medical facilities manage and utilize data. Working with the Regional Health Network, our team developed a comprehensive analytics platform that streamlines data collection, generates actionable insights, and improves decision-making across healthcare facilities.",
    goals: [
      "Streamline healthcare data collection processes",
      "Develop predictive analytics for resource allocation",
      "Create standardized reporting templates",
      "Implement dashboards for real-time facility monitoring"
    ],
    outcomes: [
      "Reduced reporting time by 60% across 12 healthcare facilities",
      "Improved inventory management efficiency by 35%",
      "Decreased patient wait times by identifying peak hours",
      "Enhanced resource allocation based on predictive demand models"
    ],
    timeline: "November 2022 - Present",
    testimonials: [
      {
        quote: "The analytics platform has revolutionized our operations. We've eliminated mountains of paperwork and can now make decisions based on real-time data.",
        author: "Dr. Fatima Ibrahim",
        role: "Medical Director, Regional Health Network"
      }
    ],
    relatedProjects: ["maternal-health-platform", "remote-health-monitoring"]
  },
  {
    name: "Remote Health Monitoring",
    partner: "TechCare Solutions",
    challenge: "Limited access to healthcare in remote areas",
    impact: "Monitoring 2,000+ patients remotely",
    sector: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
    slug: "remote-health-monitoring",
    description: "Remote Health Monitoring brings healthcare to underserved communities through innovative technology. In collaboration with TechCare Solutions, we developed a system that enables remote patient monitoring, virtual consultations, and health tracking using low-cost devices and mobile technology.",
    goals: [
      "Design affordable remote monitoring devices",
      "Create a secure platform for patient-doctor communication",
      "Develop health tracking algorithms for early intervention",
      "Establish protocols for emergency response"
    ],
    outcomes: [
      "Currently monitoring over 2,000 patients remotely",
      "Facilitated more than 5,000 virtual consultations",
      "Reduced emergency hospital visits by 45%",
      "Identified 120 cases requiring early intervention"
    ],
    timeline: "June 2023 - Present",
    testimonials: [
      {
        quote: "This system has been life-changing for our community. We now have access to doctors without traveling hours to the nearest hospital, and my chronic condition is properly managed.",
        author: "Thomas Osei",
        role: "Patient, Ghana"
      }
    ],
    relatedProjects: ["maternal-health-platform", "healthcare-analytics"]
  },
  {
    name: "Smart Agriculture",
    partner: "AgriTech Ghana",
    challenge: "Inefficient farming practices",
    impact: "Increased crop yield by 40% for 200 farmers",
    sector: "Technology",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80",
    slug: "smart-agriculture",
    description: "Smart Agriculture leverages technology to optimize farming practices and increase yields. Our team worked with AgriTech Ghana to develop a system that combines IoT sensors, weather data, and mobile technology to provide farmers with actionable insights for improved crop management.",
    goals: [
      "Design low-cost soil and weather monitoring systems",
      "Develop a mobile platform for agricultural advice",
      "Create predictive models for optimal planting and harvesting",
      "Implement water management recommendations"
    ],
    outcomes: [
      "Increased crop yield by 40% for 200 participating farmers",
      "Reduced water usage by 30% through optimized irrigation",
      "Decreased crop losses due to pests and diseases by 50%",
      "Expanded to three different agricultural regions"
    ],
    timeline: "April 2023 - Present",
    testimonials: [
      {
        quote: "The smart farming system has transformed my business. I've doubled my yield while using less water and fertilizer, making my farm more profitable and sustainable.",
        author: "Kwame Mensah",
        role: "Farmer, Ghana"
      }
    ]
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
