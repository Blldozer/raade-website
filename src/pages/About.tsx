
import { BookOpen, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#F5F5F0]">
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Mission Statement */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-montserrat font-bold text-raade-navy mb-8">
              Our Mission
            </h1>
            <p className="text-2xl font-lora text-gray-700 leading-relaxed">
              RAADE pioneers innovative approaches to African development by connecting
              students with African organizations to create scalable solutions for pressing
              challenges.
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-24">
          <h2 className="text-3xl font-montserrat font-bold text-raade-navy mb-12">
            Our Approach to African Development
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <Globe className="w-12 h-12 text-raade-gold-start mb-6" />
              <h3 className="text-xl font-montserrat font-semibold mb-4">
                Collaborative Innovation
              </h3>
              <p className="text-gray-700 font-opensans leading-relaxed">
                We foster partnerships between students and African organizations,
                creating sustainable solutions through our Innovation Studios program.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <BookOpen className="w-12 h-12 text-raade-gold-start mb-6" />
              <h3 className="text-xl font-montserrat font-semibold mb-4">
                Knowledge Exchange
              </h3>
              <p className="text-gray-700 font-opensans leading-relaxed">
                Through our annual conference and ongoing projects, we facilitate
                meaningful exchange of ideas and expertise.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
