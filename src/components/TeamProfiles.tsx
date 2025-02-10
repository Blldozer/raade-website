
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "President",
    image: "/placeholder.svg",
    department: "Development Strategy"
  },
  {
    name: "Michael Chen",
    role: "Innovation Director",
    image: "/placeholder.svg",
    department: "Project Management"
  },
  {
    name: "Aisha Patel",
    role: "Partnerships Lead",
    image: "/placeholder.svg",
    department: "External Relations"
  },
  {
    name: "David Kim",
    role: "Technical Director",
    image: "/placeholder.svg",
    department: "Technology"
  },
  // ... Additional team members would be added here
];

const TeamProfiles = () => {
  return (
    <section className="py-24 bg-[#F5F5F0]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-montserrat font-bold text-center text-raade-navy mb-16">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-[400px] group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-raade-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-montserrat font-semibold text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="font-opensans text-raade-gold-start font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="font-opensans text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.department}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;
