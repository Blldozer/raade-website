
/**
 * Leadership Speakers Data
 * 
 * Contains profiles for speakers focused on governance and leadership
 */
import { Speaker } from "../types/Speaker";

export const leadershipSpeakers: Speaker[] = [
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
  }
];
