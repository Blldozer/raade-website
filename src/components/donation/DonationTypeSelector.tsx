
import { DonationType } from "@/types/donation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DonationTypeSelectorProps {
  onSelect: (type: DonationType) => void;
}

/**
 * DonationTypeSelector Component
 * 
 * Allows users to select the type of donation they want to make
 * with visual cards for each option
 */
const DonationTypeSelector = ({ onSelect }: DonationTypeSelectorProps) => {
  const donationTypes = [
    {
      id: "general" as DonationType,
      title: "General Support",
      description: "Support all RAADE programs and initiatives",
      icon: "🌍",
    },
    {
      id: "scholarship" as DonationType,
      title: "Scholarship Fund",
      description: "Support scholarships for African students",
      icon: "🎓",
    },
    {
      id: "innovation-studios" as DonationType,
      title: "Innovation Studios",
      description: "Support our Innovation Studios programs",
      icon: "💡",
    },
    {
      id: "conference" as DonationType, 
      title: "Annual Conference",
      description: "Support our annual conference",
      icon: "🎤",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#274675] dark:text-[#FBB03B]">
          Make a Donation
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your contribution helps us pioneer innovative approaches to African development
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {donationTypes.map((type) => (
          <Card 
            key={type.id}
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-[#274675] dark:border-[#FBB03B]/30"
            onClick={() => onSelect(type.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{type.icon}</span>
                <CardTitle>{type.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{type.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DonationTypeSelector;
