import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "President",
    image: "/placeholder.svg",
    department: "Computer Science"
  },
  {
    name: "Michael Chen",
    role: "Innovation Director",
    image: "/placeholder.svg",
    department: "Mechanical Engineering"
  },
  {
    name: "Aisha Patel",
    role: "Partnerships Lead",
    image: "/placeholder.svg",
    department: "International Relations"
  },
  {
    name: "David Kim",
    role: "Technical Director",
    image: "/placeholder.svg",
    department: "Electrical Engineering"
  }
];

const TeamProfiles = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-raade-navy mb-8">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-semibold text-lg text-raade-navy">{member.name}</h3>
                <p className="text-raade-gold font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.department}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;