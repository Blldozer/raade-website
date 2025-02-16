
import { BookOpen, Globe } from "lucide-react";
import TeamProfiles from "../components/TeamProfiles";
import AboutHero from "../components/about/AboutHero";

const About = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Mission Statement */}
        <section className="mb-32">
          <div className="max-w-3xl">
            <h2 className="text-[64px] font-simula text-black mb-8">
              Our Mission
            </h2>
            <p className="text-2xl font-lora text-gray-700 leading-relaxed">
              RAADE pioneers innovative approaches to African development by connecting
              students with African organizations to create scalable solutions for pressing
              challenges.
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-32">
          <h2 className="text-4xl font-simula text-black mb-16">
            Our Approach to African Development
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white p-12 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <Globe className="w-16 h-16 text-black mb-8" />
              <h3 className="text-2xl font-simula font-semibold mb-4">
                Collaborative Innovation
              </h3>
              <p className="text-lg text-gray-700 font-lora leading-relaxed">
                We foster partnerships between students and African organizations,
                creating sustainable solutions through our Innovation Studios program.
              </p>
            </div>
            <div className="bg-white p-12 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <BookOpen className="w-16 h-16 text-black mb-8" />
              <h3 className="text-2xl font-simula font-semibold mb-4">
                Knowledge Exchange
              </h3>
              <p className="text-lg text-gray-700 font-lora leading-relaxed">
                Through our annual conference and ongoing projects, we facilitate
                meaningful exchange of ideas and expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamProfiles />
      </div>
    </div>
  );
};

export default About;
