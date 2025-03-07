
import AboutNav from "../components/navigation/AboutNav";
import AboutHero from "../components/about/AboutHero";
import NewModel from "../components/about/NewModel";
import Reality from "../components/about/Reality";
import Approach from "../components/about/Approach";
import Impact from "../components/about/Impact";
import Team from "../components/about/Team";
import ConferenceValue from "../components/about/ConferenceValue";

const About = () => {
  return (
    <div className="bg-white">
      <AboutNav />
      <AboutHero />
      <NewModel />
      <Reality />
      <Approach />
      <ConferenceValue />
      <Impact />
      <Team />
    </div>
  );
};

export default About;
