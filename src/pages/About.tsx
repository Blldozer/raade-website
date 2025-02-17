
import AboutHero from "../components/about/AboutHero";
import NewModel from "../components/about/NewModel";
import Reality from "../components/about/Reality";
import Approach from "../components/about/Approach";
import Impact from "../components/about/Impact";

const About = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <NewModel />
      <Reality />
      <Approach />
      <Impact />
    </div>
  );
};

export default About;
