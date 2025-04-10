
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
    time: "9:00 AM - 12:00 PM",
    title: "Arrival and Check In",
    description: "Register, collect your conference materials, and get oriented.",
    location: "Main Lobby",
    type: "break"
  },
  {
    time: "12:00 PM - 3:00 PM",
    title: "Lunch and Networking Mixer with Companies",
    description: "Connect with industry representatives while enjoying lunch.",
    location: "Dining Hall",
    type: "social"
  },
  {
    time: "3:00 PM - 3:30 PM",
    title: "Welcome Address",
    description: "Official welcome by RAADE leadership.",
    location: "Grand Hall",
    type: "ceremony"
  },
  {
    time: "3:30 PM - 4:00 PM",
    title: "Opening Keynote",
    description: "Inspirational address on the future of African development.",
    location: "Grand Hall",
    type: "keynote"
  },
  {
    time: "4:00 PM - 5:15 PM",
    title: "Panel 1",
    description: "Industry leaders discuss innovation and sustainable development.",
    location: "Room A",
    type: "panel"
  },
  {
    time: "5:15 PM - 6:15 PM",
    title: "RAADE Innovation Studios Showcase",
    description: "Student teams present their innovation studio projects and outcomes.",
    location: "Exhibition Hall",
    type: "showcase"
  },
  {
    time: "6:30 PM - 7:30 PM",
    title: "Evening Reception/Dinner",
    description: "Networking dinner with fellow attendees, speakers, and partners.",
    location: "Dining Hall",
    type: "social"
  },
  {
    time: "8:30 PM - 10:00 PM",
    title: "Networking Event",
    description: "Connect with speakers, sponsors, and fellow attendees in a relaxed setting.",
    location: "Garden Terrace",
    type: "social"
  }
];

export const scheduleDay2: ScheduleEvent[] = [
  {
    time: "8:00 AM - 9:00 AM",
    title: "Breakfast",
    description: "Start your day with breakfast and coffee.",
    location: "Dining Hall",
    type: "break"
  },
  {
    time: "9:00 AM - 9:15 AM",
    title: "Opening Welcome: Rice President",
    description: "Special welcome address from the Rice University President.",
    location: "Grand Hall",
    type: "ceremony"
  },
  {
    time: "9:15 AM - 10:15 AM",
    title: "Keynote Address",
    description: "Insightful keynote on innovation and development in Africa.",
    location: "Grand Hall",
    type: "keynote"
  },
  {
    time: "10:15 AM - 12:00 PM",
    title: "Interactive Idea Exchange Session 1",
    description: "Collaborative session for attendees to share ideas and insights.",
    location: "Workshop Rooms",
    type: "workshop"
  },
  {
    time: "12:00 PM - 1:00 PM",
    title: "RAADE Innovation Studios Showcase",
    description: "Continuation of project showcases from RAADE Innovation Studios.",
    location: "Exhibition Hall",
    type: "showcase"
  },
  {
    time: "1:00 PM - 2:00 PM",
    title: "Lunch & Structured Discussions",
    description: "Enjoy lunch while participating in guided discussion groups.",
    location: "Dining Hall",
    type: "break"
  },
  {
    time: "2:00 PM - 3:30 PM",
    title: "Interactive Idea Exchange Session 2",
    description: "Continue collaborative idea development and problem-solving.",
    location: "Workshop Rooms",
    type: "workshop"
  },
  {
    time: "3:30 PM - 4:15 PM",
    title: "The Bridge",
    description: "Special session connecting ideas from earlier exchanges to concrete actions.",
    location: "Grand Hall",
    type: "panel"
  },
  {
    time: "4:15 PM - 5:00 PM",
    title: "Final Keynote Address",
    description: "Closing inspirational keynote on the path forward.",
    location: "Grand Hall",
    type: "keynote"
  },
  {
    time: "6:30 PM - 2:00 AM",
    title: "Conference After Dark",
    description: "Evening celebration and continued networking.",
    location: "Various Venues",
    type: "social"
  }
];
