import Navigation from "@/components/Navigation";
import TeamProfiles from "@/components/TeamProfiles";
import { Building, Users, Handshake, BookOpen, Globe } from "lucide-react";

const About = () => {
  return (
    <div>
      <Navigation />
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

        {/* Team Structure */}
        <section id="mentors" className="mb-16">
          <h2 className="text-3xl font-bold text-raade-navy mb-6">Team Structure</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="w-8 h-8 text-raade-gold mb-4" />
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Student Leadership</h3>
                <p className="text-gray-700">
                  Our organization is entirely student-led, with dedicated teams managing
                  different aspects of our initiatives.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Project Teams</h3>
                <p className="text-gray-700">
                  Each Innovation Studio project is managed by a team of 4-6 students,
                  supported by faculty mentors and industry experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Mentors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-raade-navy mb-6">Faculty Mentors</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="w-8 h-8 text-raade-gold mb-4" />
            <p className="text-gray-700 mb-6">
              Our faculty mentors provide guidance and expertise across various disciplines,
              ensuring academic rigor in our approach to development challenges.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-1">Dr. Sarah Johnson</h3>
                <p className="text-gray-600">International Development Studies</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-1">Prof. Michael Chen</h3>
                <p className="text-gray-600">Engineering & Technology Innovation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Organizations */}
        <section id="partners" className="mb-16">
          <h2 className="text-3xl font-bold text-raade-navy mb-6">Partner Organizations</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Handshake className="w-8 h-8 text-raade-gold mb-4" />
            <p className="text-gray-700 mb-6">
              We collaborate with various organizations across Africa to implement
              sustainable development solutions.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg text-center">
                <h3 className="font-semibold">Tech4Africa</h3>
                <p className="text-gray-600">Technology Education</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <h3 className="font-semibold">HealthBridge Kenya</h3>
                <p className="text-gray-600">Healthcare Innovation</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <h3 className="font-semibold">EcoSolutions Ghana</h3>
                <p className="text-gray-600">Sustainable Energy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rice University Affiliation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-raade-navy mb-6">Rice University Affiliation</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Building className="w-8 h-8 text-raade-gold mb-4" />
            <p className="text-gray-700">
              As a Rice University student organization, RAADE benefits from the
              university's resources, academic excellence, and global network. We work
              closely with various departments and centers at Rice to enhance our impact
              and provide meaningful opportunities for student engagement in African
              development.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;