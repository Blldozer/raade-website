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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="w-6 h-6 text-raade-navy" />
          <h2 className="text-3xl font-bold text-center text-raade-navy">
            Our Partners
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <Card 
              key={partner.name} 
              className="hover:shadow-lg transition-shadow border-t-4 border-t-raade-gold"
            >
              <CardHeader>
                <CardTitle className="text-lg text-center">{partner.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-24 h-24 mx-auto mb-4 object-contain"
                />
                <p className="text-raade-navy font-medium">{partner.country}</p>
                <p className="text-gray-600 text-sm">{partner.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcase;