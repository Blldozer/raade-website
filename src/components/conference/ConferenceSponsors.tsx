
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const sponsorshipTiers = [
  {
    name: "Platinum",
    price: "$10,000",
    benefits: [
      "Premier logo placement on all materials",
      "VIP reception with speakers and attendees",
      "10 complimentary conference tickets",
      "Keynote speaking opportunity",
      "Exhibition booth (premium location)",
      "Full-page ad in conference program",
      "Company profile on conference website",
      "Social media promotion (5 dedicated posts)"
    ]
  },
  {
    name: "Gold",
    price: "$5,000",
    benefits: [
      "Prominent logo placement on materials",
      "5 complimentary conference tickets",
      "Panel speaking opportunity",
      "Exhibition booth",
      "Half-page ad in conference program",
      "Company listing on conference website",
      "Social media promotion (3 dedicated posts)"
    ]
  },
  {
    name: "Silver",
    price: "$2,500",
    benefits: [
      "Logo on conference materials",
      "3 complimentary conference tickets",
      "Exhibition table",
      "Quarter-page ad in conference program",
      "Company listing on conference website",
      "Social media mention (1 dedicated post)"
    ]
  }
];

const ConferenceSponsors = () => {
  return (
    <section id="sponsorship" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Sponsorship Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Support innovation in African development by becoming a conference sponsor.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sponsorshipTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col h-full"
            >
              <Card className="border border-gray-200 h-full flex flex-col">
                <CardHeader className={`pb-2 ${tier.name === "Platinum" ? "bg-[#FBB03B]/10" : ""}`}>
                  <CardTitle className="text-2xl text-raade-navy font-simula">{tier.name}</CardTitle>
                  <p className="text-3xl font-bold mt-2 text-raade-navy">{tier.price}</p>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-[#FBB03B] mr-2 shrink-0 mt-0.5" />
                        <span className="text-gray-600 font-lora">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full mt-6 bg-raade-navy hover:bg-raade-navy/90 text-white font-lora"
                    onClick={() => window.location.href = "mailto:sponsorship@raade.org?subject=Conference Sponsorship Inquiry"}
                  >
                    Become a Sponsor
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-6 font-lora">
            Custom sponsorship packages are also available. Contact us to discuss a tailored partnership.
          </p>
          <Button
            variant="outline"
            className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
            onClick={() => window.location.href = "mailto:sponsorship@raade.org?subject=Custom Sponsorship Inquiry"}
          >
            Contact Sponsorship Team
          </Button>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-raade-navy mb-6 text-center font-simula">Our Sponsors</h3>
          <div className="bg-gray-50 p-8 rounded-xl">
            <p className="text-center text-gray-500 font-lora italic">
              Sponsor logos will appear here as partnerships are confirmed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSponsors;
