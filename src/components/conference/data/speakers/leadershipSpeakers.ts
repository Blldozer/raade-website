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
    role: "Former Governor",
    organization: "Anambra State, Nigeria",
    imagePlaceholder: "Peter Obi",
    bio: "Nigerian economist, politician, and businessman who served as Governor of Anambra State from 2006 to 2014.",
    fullBio: "Peter Obi is a Nigerian politician, entrepreneur, and businessman who served as Governor of Anambra State, Nigeria from 2006 to 2014. Before his political career, Obi built a successful business career, including serving as a chairman of Fidelity Bank. He is known for his prudent management of resources and his emphasis on education and economic development. As Governor, he was recognized for leaving a substantial surplus in the state's treasury after his tenure, a rarity in Nigerian politics. Obi has been a prominent voice advocating for good governance, accountability, and economic reform in Nigeria. He holds a degree in Philosophy from the University of Nigeria, Nsukka, and has completed executive educational programs at institutions including Harvard Business School, London School of Economics, Columbia Business School, and Lagos Business School.",
    expertise: ["Political Leadership", "Economic Development", "Good Governance"],
    social: {
      twitter: "https://twitter.com/PeterObi"
    },
    speaking: {
      title: "Plenary Speech 2: The Governance Revolution",
      description: "A compelling address on the importance of transparent governance in driving sustainable development in Africa.",
      time: "3:20 PM - 3:50 PM",
      date: "April 12"
    }
  },
  {
    id: "oby-ezekwesili",
    name: "Obiageli Ezekwesili",
    role: "Former Minister of Education",
    organization: "Federal Republic of Nigeria",
    imagePlaceholder: "Obiageli Ezekwesili",
    bio: "Economic policy expert and former Vice President of the World Bank's Africa division.",
    fullBio: "Dr. Obiageli \"Oby\" Ezekwesili is a renowned economic policy expert, former Minister of Education of Nigeria, and former Vice President of the World Bank's Africa division. She was a key founder of Transparency International, the global anti-corruption body, and has been at the forefront of anti-corruption initiatives in Nigeria. As Minister of Solid Minerals and later Education, she implemented significant reforms. Dr. Ezekwesili also led the #BringBackOurGirls campaign, advocating for the rescue of schoolgirls kidnapped by Boko Haram. She is a Senior Economic Advisor for the Africa Economic Development Policy Initiative and has received numerous international awards for her work on economic reforms, transparency, and anti-corruption.",
    expertise: ["Economic Policy", "Education Reform", "Anti-corruption"],
    social: {
      twitter: "https://twitter.com/obyezeks",
      linkedin: "https://linkedin.com/in/obiageli-ezekwesili"
    },
    speaking: {
      title: "Closing Plenary Speech 3: The Future We Choose",
      description: "A powerful closing address on Africa's path forward through innovation, transparency, and collaborative leadership.",
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
    },
    additionalSessions: [
      {
        title: "Workshop Session 1: Defining the Opportunity",
        role: "Workshop Leader - History and Policy Track",
        description: "An interactive workshop exploring the historical context and policy implications for development in Africa, featuring the case study 'Exploring Mali's Development Through a Historical Lens'.",
        time: "11:25 AM - 12:20 PM",
        date: "April 12"
      }
    ]
  }
];
