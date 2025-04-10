
export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
  type: string;
  speaker?: string;
  capacity?: string;
}

export const scheduleDay1: ScheduleEvent[] = [
  {
    time: "4:00 PM - 5:30 PM",
    title: "Arrival and Check-in",
    description: "Personalized welcome packets highlighting market creation opportunities. Interactive displays showing successful case studies in sustainable design.",
    location: "Main Entrance",
    type: "break"
  },
  {
    time: "5:35 PM - 5:55 PM",
    title: "Welcome Reception",
    description: "RAADE Executive Director introduces vision for market-creating innovation. Preview of how the conference will tackle Africa's most pressing challenges.",
    location: "Auditorium",
    type: "ceremony"
  },
  {
    time: "5:55 PM - 6:00 PM",
    title: "Opening Address",
    description: "Opening remarks by Dr. Caroline Levander.",
    location: "Auditorium",
    type: "keynote",
    speaker: "Dr. Caroline Levander"
  },
  {
    time: "6:00 PM - 6:30 PM",
    title: "Opening Address: Reimagining Solutions for Africa's Toughest Challenges",
    description: "Rice's commitment to developing market-creating innovations. The RAADE approach: combining academic rigor with implementation focus. Setting the framework for the day's collaborative work.",
    location: "Auditorium",
    type: "keynote",
    speaker: "Dr. Alex Byrd"
  },
  {
    time: "6:30 PM - 7:30 PM",
    title: "Networking Dinner",
    description: "Seating arranged to connect complementary expertise across sectors. Each table assigned a specific challenge area with facilitated discussion.",
    location: "Commons Space",
    type: "social"
  }
];

export const scheduleDay2: ScheduleEvent[] = [
  {
    time: "7:30 AM - 9:00 AM",
    title: "Breakfast & Registration",
    description: "Rice point persons assigned to interact with attendees. Donating Swipes team and breakfast for speakers.",
    location: "Commons Space",
    type: "break"
  },
  {
    time: "9:00 AM - 9:30 AM",
    title: "Opening Experience",
    description: "Special welcome experience to start the day.",
    location: "Auditorium",
    type: "ceremony",
    speaker: "John Ejiogu and team"
  },
  {
    time: "9:35 AM - 9:50 AM",
    title: "Welcome Address",
    description: "Welcome address by the Rice VP on Innovation.",
    location: "Auditorium",
    type: "ceremony"
  },
  {
    time: "9:55 AM - 10:30 AM",
    title: "Plenary Speech: Unlocking the Vault: New Capital Models for Africa's Market Revolution",
    description: "Why traditional funding models are obsolete in today's Africa. The hidden capital pools most innovators never access. Creating bridges between investors and market-creating entrepreneurs.",
    location: "Auditorium",
    type: "keynote",
    speaker: "Yomi Jemibewon (CardinalStone)"
  },
  {
    time: "10:40 AM - 11:20 AM",
    title: "Panel: Financing the Impossible",
    description: "The radical new financing approaches transforming African innovation. How blended capital models are creating unprecedented opportunities. De-risking strategies that unlock investments in frontier markets.",
    location: "Auditorium",
    type: "panel",
    speaker: "Moderator: Ijeoma Anadu Okoli. Panelists: Yomi Jemibewon, Ismael Fanny (IFC), Uzoma Eze, Mezuo Nwuneli (Sahel Capital)"
  },
  {
    time: "11:25 AM - 12:20 PM",
    title: "Workshop Session 1: Defining the Opportunity",
    description: "Choose one of five tracks: Banking the Unbankable, Healing the Unreachable, Power Unleashed, Narrative Threads, or Nutritional Innovation.",
    location: "Workshop Rooms",
    type: "workshop",
    speaker: "Various Workshop Leaders"
  },
  {
    time: "12:30 PM - 1:25 PM",
    title: "Taste of Africa",
    description: "Curated seating + regional cuisine + facilitated table discussions.",
    location: "Commons Space",
    type: "break"
  },
  {
    time: "1:25 PM - 1:35 PM",
    title: "Break",
    description: "Short break between sessions.",
    location: "Various Locations",
    type: "break"
  },
  {
    time: "1:35 PM - 2:30 PM",
    title: "Workshop Session 2: Designing Market Solutions",
    description: "Participants return to their tracks to ideate solutions + build roadmaps.",
    location: "Workshop Rooms",
    type: "workshop"
  },
  {
    time: "2:30 PM - 3:10 PM",
    title: "Panel: From Prototype to Phenomenon",
    description: "The hidden barriers that kill promising innovations. Counterintuitive scaling strategies that transformed African markets. Capital structures that fuel explosive yet sustainable growth.",
    location: "Auditorium",
    type: "panel",
    speaker: "Moderator: Favour Williams. Panelists: June, Tomiwa, Idris Bello"
  },
  {
    time: "3:10 PM - 3:20 PM",
    title: "Technical Transition",
    description: "Short video + AV setup for virtual keynote.",
    location: "Auditorium",
    type: "break"
  },
  {
    time: "3:20 PM - 3:50 PM",
    title: "Virtual Plenary Speech: The Governance Revolution",
    description: "The surprising policy shifts that transformed struggling regions. Breaking the bureaucratic barriers blocking innovation. Creating regulatory frameworks that accelerate rather than inhibit growth.",
    location: "Auditorium",
    type: "keynote",
    speaker: "Peter Obi"
  },
  {
    time: "3:50 PM - 4:30 PM",
    title: "RAADE Innovation Studios Showcase",
    description: "4 student teams present + get expert feedback. The billion-dollar non-consumption opportunity being addressed. The innovative market-creating solution and its potential for scale.",
    location: "Auditorium",
    type: "showcase"
  },
  {
    time: "4:30 PM - 5:15 PM",
    title: "Closing Plenary Speech: The Future We Choose",
    description: "The coming transformation of Africa through market-creating innovation. How connected solutions create exponential rather than incremental impact. Moving from isolated interventions to systemic transformation.",
    location: "Auditorium",
    type: "keynote",
    speaker: "Obiageli Ezekwesili"
  },
  {
    time: "5:15 PM - 5:25 PM",
    title: "Commitment Session",
    description: "Final call to action and closing remarks.",
    location: "Auditorium",
    type: "ceremony"
  }
];
