import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2 } from "lucide-react";

const partners = [
  {
    name: "Tech Innovation Hub",
    country: "Kenya",
    focus: "Renewable Energy",
    logo: "/placeholder.svg"
  },
  {
    name: "Health Solutions Africa",
    country: "Nigeria",
    focus: "Healthcare Technology",
    logo: "/placeholder.svg"
  },
  {
    name: "EduTech Ghana",
    country: "Ghana",
    focus: "Education Technology",
    logo: "/placeholder.svg"
  },
  {
    name: "AgriTech Solutions",
    country: "Tanzania",
    focus: "Agricultural Innovation",
    logo: "/placeholder.svg"
  }
];

const PartnerShowcase = () => {
  return (
    <section className="py-24 px-6 bg-design-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 mb-16">
          <Building2 className="w-8 h-8 text-design-accent" />
          <h2 className="text-4xl font-display font-bold text-design-primary text-center">
            Our Partners
          </h2>
          <p className="text-lg text-design-text-secondary max-w-2xl text-center">
            Collaborating with leading organizations across Africa to drive innovation
            and sustainable development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <Card 
              key={partner.name} 
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-design-background-glass backdrop-blur-sm border border-white/20"
            >
              <CardHeader>
                <CardTitle className="text-xl font-display text-center text-design-primary">
                  {partner.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-design-accent/5 rounded-full -z-10" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-design-text-primary">{partner.country}</p>
                  <p className="text-sm text-design-text-secondary">{partner.focus}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcase;