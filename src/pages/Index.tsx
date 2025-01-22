import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CountdownTimer from "@/components/CountdownTimer";
import TeamProfiles from "@/components/TeamProfiles";
import PartnerShowcase from "@/components/PartnerShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CountdownTimer />
      <TeamProfiles />
      <PartnerShowcase />
    </div>
  );
};

export default Index;