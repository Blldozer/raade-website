
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
    time: "8:00 AM - 9:00 AM",
    title: "Registration & Breakfast",
    description: "Check-in, collect conference materials, and enjoy breakfast.",
    location: "Main Lobby",
    type: "break"
  },
  {
    time: "9:00 AM - 9:30 AM",
    title: "Opening Ceremony",
    description: "Welcome address by RAADE leadership and Rice University representatives.",
    location: "Grand Hall",
    type: "ceremony"
  },
  {
    time: "9:30 AM - 10:30 AM",
    title: "Keynote: The Future of African Innovation",
    description: "Dr. Sarah Nkandu explores emerging trends in innovation across Africa.",
    location: "Grand Hall",
    speaker: "Dr. Sarah Nkandu",
    type: "keynote"
  },
  {
    time: "10:45 AM - 12:15 PM",
    title: "Panel: Sustainable Development Through Innovation",
    description: "Industry leaders discuss how innovation can address development challenges.",
    location: "Room A",
    type: "panel"
  },
  {
    time: "12:15 PM - 1:30 PM",
    title: "Networking Lunch",
    description: "Connect with fellow attendees over lunch.",
    location: "Dining Hall",
    type: "break"
  },
  {
    time: "1:30 PM - 3:00 PM",
    title: "Workshop: Human-Centered Design",
    description: "Hands-on workshop applying design thinking to development challenges.",
    location: "Workshop Room 1",
    capacity: "Limited to 40 participants",
    type: "workshop"
  },
  {
    time: "3:15 PM - 4:45 PM",
    title: "RAADE Projects Showcase",
    description: "Student teams present their innovation studio projects and outcomes.",
    location: "Exhibition Hall",
    type: "showcase"
  },
  {
    time: "5:00 PM - 6:30 PM",
    title: "Evening Reception & Networking",
    description: "Meet fellow attendees, speakers, and partners in a relaxed setting.",
    location: "Garden Terrace",
    type: "social"
  }
];

export const scheduleDay2: ScheduleEvent[] = [
  {
    time: "8:30 AM - 9:00 AM",
    title: "Morning Coffee",
    description: "Start your day with coffee and light refreshments.",
    location: "Main Lobby",
    type: "break"
  },
  {
    time: "9:00 AM - 10:00 AM",
    title: "Keynote: Building Innovation Ecosystems",
    description: "Michael Nkrumah discusses investment strategies for innovation in Africa.",
    location: "Grand Hall",
    speaker: "Michael Nkrumah",
    type: "keynote"
  },
  {
    time: "10:15 AM - 11:45 AM",
    title: "Panel: Technology Transfer & Scaling Solutions",
    description: "Experts share insights on taking innovations from concept to scale.",
    location: "Room A",
    type: "panel"
  },
  {
    time: "12:00 PM - 1:15 PM",
    title: "Networking Lunch",
    description: "Continue building connections over lunch.",
    location: "Dining Hall",
    type: "break"
  },
  {
    time: "1:30 PM - 3:00 PM",
    title: "Workshop: Building Partnerships for Impact",
    description: "Interactive session on creating effective cross-sector partnerships.",
    location: "Workshop Room 1",
    capacity: "Limited to 40 participants",
    type: "workshop"
  },
  {
    time: "3:15 PM - 4:15 PM",
    title: "Closing Keynote: The Path Forward",
    description: "Dr. Fatima Ahmed outlines a vision for the future of African development.",
    location: "Grand Hall",
    speaker: "Dr. Fatima Ahmed",
    type: "keynote"
  },
  {
    time: "4:15 PM - 5:00 PM",
    title: "Closing Ceremony & Next Steps",
    description: "Reflections on the conference and announcement of future initiatives.",
    location: "Grand Hall",
    type: "ceremony"
  }
];
