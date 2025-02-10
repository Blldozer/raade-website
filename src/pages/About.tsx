
import Navigation from "@/components/Navigation";
import TeamProfiles from "@/components/TeamProfiles";
import { BookOpen, Globe } from "lucide-react";

const About = () => {
  return (
    <div>
      <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Mission Statement */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-raade-navy mb-6">Our Mission</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            RAADE pioneers innovative approaches to African development by connecting Rice University students
            with African organizations to create scalable solutions for pressing challenges.
          </p>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-raade-navy mb-6">Our Approach to African Development</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="w-8 h-8 text-raade-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaborative Innovation</h3>
              <p className="text-gray-700">
                We foster partnerships between Rice students and African organizations,
                creating sustainable solutions through our Innovation Studios program.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="w-8 h-8 text-raade-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3">Knowledge Exchange</h3>
              <p className="text-gray-700">
                Through our annual conference and ongoing projects, we facilitate
                meaningful exchange of ideas and expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="mb-16">
          <TeamProfiles />
        </section>
      </div>
    </div>
  );
};

export default About;
