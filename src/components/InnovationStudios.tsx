import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, Calendar, Target } from "lucide-react";

const projects = [
  {
    title: "SunFi Energy Project",
    description: "Developing sustainable energy solutions with SunFi to increase access to clean power in African communities.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
  },
  {
    title: "IPI Mothers Support Initiative",
    description: "Creating support systems and resources for mothers in partnership with IPI to improve maternal health outcomes.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
  },
  {
    title: "Medical Women's Association",
    description: "Collaborating with MWA to enhance healthcare delivery systems and medical education initiatives.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
  },
];

const timeline = [
  {
    week: "Weeks 1-2",
    title: "Problem Discovery",
    description: "Deep dive into the challenge with partner organizations",
    icon: Users,
  },
  {
    week: "Weeks 3-5",
    title: "Solution Design",
    description: "Collaborative ideation and prototype development",
    icon: Calendar,
  },
  {
    week: "Weeks 6-9",
    title: "Implementation",
    description: "Testing, refinement, and deployment of solutions",
    icon: Target,
  },
];

const InnovationStudios = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Innovation Studios</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            A 9-week intensive program where Rice students collaborate with African organizations
            to develop innovative solutions for real-world challenges.
          </p>
        </div>

        {/* Projects Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#3C403A]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-300">{project.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Program Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timeline.map((phase, index) => (
              <Card key={index} className="text-center bg-[#3C403A]">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-white rounded-full w-12 h-12 flex items-center justify-center">
                    {phase.icon && <phase.icon className="w-6 h-6 text-[#3C403A]" />}
                  </div>
                  <CardTitle className="text-lg font-semibold text-white">{phase.week}</CardTitle>
                  <CardDescription className="font-medium text-gray-300">
                    {phase.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-[#3C403A] rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Our Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: "100+", label: "Students Engaged" },
              { metric: "8", label: "Active Projects" },
              { metric: "6", label: "Faculty Mentors" },
              { metric: "3", label: "Partner Countries" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.metric}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-[#3C403A] hover:bg-gray-100 transition-colors"
          >
            Apply Now <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovationStudios;
