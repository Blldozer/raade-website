
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
      <div className="container px-4 mx-auto max-w-[1400px]">
        <h2 className="text-[64px] font-montserrat font-bold text-center mb-8">
          Our Team
        </h2>
        <p className="text-2xl font-montserrat text-center mb-32 max-w-2xl mx-auto">
          The minds behind RAADE's mission to transform African development
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-32">
          {teamMembers.map((member) => (
            <Card 
              key={member.name}
              className="border-none shadow-none transition-all duration-300"
            >
              <div className="relative aspect-square mb-8 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-2">
                {member.name}
              </h3>
              <p className="font-montserrat text-gray-600 text-lg">
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
