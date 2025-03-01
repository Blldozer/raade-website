
import ConferenceSection from "@/components/Conference";
import Navigation from "@/components/Navigation";

const Conference = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20">
        <ConferenceSection />
      </div>
    </div>
  );
};

export default Conference;
