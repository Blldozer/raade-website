import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CountdownTimer from "@/components/CountdownTimer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CountdownTimer />
    </div>
  );
};

export default Index;