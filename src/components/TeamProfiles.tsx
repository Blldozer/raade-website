
import { Card } from "./ui/card";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "President",
    image: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "Innovation Director", 
    image: "/placeholder.svg",
  },
  {
    name: "Aisha Patel",
    role: "Partnerships Lead",
    image: "/placeholder.svg",
  },
  {
    name: "David Kim",
    role: "Technical Director",
    image: "/placeholder.svg",
  },
  {
    name: "Elena Rodriguez",
    role: "Project Manager",
    image: "/placeholder.svg",
  },
  {
    name: "James Wilson",
    role: "Research Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Maya Patel",
    role: "Operations Director",
    image: "/placeholder.svg",
  },
  {
    name: "Thomas Lee",
    role: "Strategy Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Sofia Martinez",
    role: "Communications Director",
    image: "/placeholder.svg",
  },
  {
    name: "Marcus Johnson",
    role: "Development Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Priya Shah",
    role: "Innovation Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Daniel Park",
    role: "Partnerships Director",
    image: "/placeholder.svg",
  },
  {
    name: "Lisa Chen",
    role: "Project Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Omar Hassan",
    role: "Technology Lead",
    image: "/placeholder.svg",
  },
  {
    name: "Rachel Kim",
    role: "Operations Lead",
    image: "/placeholder.svg",
  }
];

const TeamProfiles = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-[48px] font-montserrat font-bold text-center mb-6">
          Our Team
        </h2>
        <p className="text-xl font-montserrat text-center text-gray-600 mb-24 max-w-2xl mx-auto">
          Pioneering innovative approaches to African development through student-led initiatives
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
          {teamMembers.map((member) => (
            <Card 
              key={member.name}
              className="border-none shadow-none"
            >
              <div className="relative aspect-[3/4] mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-1">
                {member.name}
              </h3>
              <p className="font-montserrat text-gray-600">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;

