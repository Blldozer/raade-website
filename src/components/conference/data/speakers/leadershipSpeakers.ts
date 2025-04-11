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
      title: "Plenary Speech 2: The Governance Revolution",
      description: "A compelling examination of transformative governance approaches for sustainable development in Africa.",
      time: "3:20 PM - 3:50 PM",
      date: "April 12"
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
      title: "Closing Plenary Speech 3: The Future We Choose",
      description: "A visionary address on shaping Africa's future through collective action and strategic reforms.",
      time: "4:30 PM - 5:15 PM",
      date: "April 12"
    }
  },
  {
    id: "alexander-byrd",
    name: "Dr. Alexander X. Byrd",
    role: "Vice Provost for Access and Institutional Excellence",
    organization: "Rice University",
    imagePlaceholder: "Dr. Byrd",
    bio: "Associate Professor of History specializing in Afro-American history in the Atlantic world.",
    fullBio: "Dr. Alexander X. Byrd serves as the Vice Provost for Access and Institutional Excellence (AEI) at Rice University, a position he has held since July 2020. In this role, he provides strategic leadership for access initiatives and coordinates efforts across the campus. He is also an Associate Professor of History at Rice, specializing in Afro-American history, particularly black life in the Atlantic world and the Jim Crow South. His notable work includes the book \"Captives & Voyagers,\" which examines free and forced transatlantic black migration during the American Revolution. Dr. Byrd is a recipient of the 2020 Piper Professor Award and has been honored multiple times with Rice University's George R. Brown Award for Superior Teaching. He earned his bachelor's degree from Rice University and completed his doctorate in History at Duke University.",
    expertise: ["History", "Access & Institutional Excellence", "Education"],
    social: {
      website: "https://humanities.rice.edu/people/alexander-x-byrd"
    },
    speaking: {
      title: "Opening Address - Reimagining Solutions for Africa's Toughest Challenges",
      description: "A thought-provoking opening address on innovative approaches to addressing Africa's development challenges.",
      time: "6:00 PM - 6:30 PM",
      date: "April 11"
    }
  }
];
