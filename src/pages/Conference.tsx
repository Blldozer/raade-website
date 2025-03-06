
import ConferenceSection from "@/components/Conference";
import Navigation from "@/components/Navigation";

const Conference = () => {
  return (
    <div>
      <Navigation isHeroPage={false} />
      <div>
        <ConferenceSection />
      </div>
    </div>
  );
};

export default Conference;
