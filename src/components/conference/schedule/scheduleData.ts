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
    description: "",
    location: "Multicultural Center",
    type: "break"
  },
  {
    time: "5:35 PM - 5:55 PM",
    title: "Welcome Reception",
    description: "",
    location: "Multicultural Center",
    type: "ceremony"
  },
  {
    time: "5:55 PM - 6:00 PM",
    title: "Opening Address",
    description: "",
    location: "Multicultural Center",
    type: "keynote",
    speaker: "Dr. Caroline Levander"
  },
  {
    time: "6:00 PM - 6:30 PM",
    title: "Opening Address - Reimagining Solutions for Africa's Toughest Challenges",
    description: "",
    location: "Multicultural Center",
    type: "keynote",
    speaker: "Dr. Alex Byrd"
  },
  {
    time: "6:30 PM - 7:30 PM",
    title: "Networking Dinner",
    description: "",
    location: "Multicultural Center",
    type: "social"
  }
];

export const scheduleDay2: ScheduleEvent[] = [
  {
    time: "8:00 AM - 9:00 AM",
    title: "Breakfast & Registration",
    description: "",
    location: "Siebel Servery",
    type: "break"
  },
  {
    time: "9:00 AM - 9:30 AM",
    title: "Opening Experience",
    description: "",
    location: "Hudspeth Auditorium",
    type: "ceremony"
  },
  {
    time: "9:35 AM - 9:50 AM",
    title: "Welcome Address",
    description: "",
    location: "Hudspeth Auditorium",
    type: "keynote",
    speaker: "Paul Cherkuri"
  },
  {
    time: "9:55 AM - 10:30 AM",
    title: "Plenary Speech 1: Unlocking the Vault: New Capital Models for Africa's Market Revolution",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "keynote",
    speaker: "Yomi Jemibewon"
  },
  {
    time: "10:40 AM - 11:20 AM",
    title: "Panel: Financing the Impossible",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "panel",
    speaker: "Moderator: Ijeoma Anadu Okoli | Panelists: Yomi Jemibewon, Ismael Fanny, Uzoma Eze, Mezuo Nwuneli"
  },
  {
    time: "11:25 AM - 12:20 PM",
    title: "Workshop Session 1: Defining the Opportunity",
    description: "",
    location: "Breakout Rooms",
    type: "workshop",
    speaker: "Workshop Leaders: Ismaël Ouale Fanny, Tomiwa Igun, Dr. Alexander Byrd, Dr. June Madete, Mezuo Nwuneli"
  },
  {
    time: "12:30 PM - 1:25 PM",
    title: "Taste of Africa Lunch",
    description: "",
    location: "Dining Hall",
    type: "social"
  },
  {
    time: "1:25 PM - 1:35 PM",
    title: "Break",
    description: "",
    location: "Various Areas",
    type: "break"
  },
  {
    time: "1:35 PM - 2:30 PM",
    title: "Workshop Session 2: Designing Market Solutions",
    description: "",
    location: "Breakout Rooms",
    type: "workshop"
  },
  {
    time: "2:30 PM - 3:10 PM",
    title: "Panel: From Prototype to Phenomenon",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "panel",
    speaker: "Moderator: Favour Williams | Panelists: Tomiwa Igun, Idris Bello, Uzoma Eze"
  },
  {
    time: "3:10 PM - 3:20 PM",
    title: "Break",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "break"
  },
  {
    time: "3:20 PM - 3:50 PM",
    title: "Plenary Speech 2: The Governance Revolution",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "keynote",
    speaker: "Peter Obi"
  },
  {
    time: "3:50 PM - 4:30 PM",
    title: "RAADE Innovation Studios Showcase",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "showcase"
  },
  {
    time: "4:30 PM - 5:15 PM",
    title: "Closing Plenary Speech 3: The Future We Choose",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "keynote",
    speaker: "Obiageli Ezekwesili"
  },
  {
    time: "5:15 PM - 5:25 PM",
    title: "Commitment Session",
    description: "",
    location: "Hudspeth Auditorium, Glasscock School of Continuing Studies",
    type: "call-to-action"
  },
  {
    time: "7:00 PM - 9:00 PM",
    title: "Conference Gala",
    description: "",
    location: "TBA",
    type: "social"
  }
];
