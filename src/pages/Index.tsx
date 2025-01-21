import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Content will be added in future iterations */}
        <div className="h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
          <h1 className="text-4xl font-bold text-raade-navy">
            Welcome to RAADE
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Index;