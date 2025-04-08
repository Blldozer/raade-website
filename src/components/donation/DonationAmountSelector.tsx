
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DonationType } from "@/types/donation";

interface DonationAmountSelectorProps {
  onSelect: (amount: number) => void;
  onBack: () => void;
  initialAmount: number;
  donationType: DonationType;
}

/**
 * DonationAmountSelector Component
 * 
 * Allows users to select or enter a custom donation amount
 * with preset buttons for common amounts
 */
const DonationAmountSelector = ({ 
  onSelect, 
  onBack,
  initialAmount,
  donationType
}: DonationAmountSelectorProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handlePresetAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    
    // Only set as selected amount if it's a valid number
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
    }
    
    setIsCustom(true);
  };

  const getTypeName = () => {
    switch (donationType) {
      case "general":
        return "General Support";
      case "scholarship":
        return "Scholarship Fund";
      case "innovation-studios":
        return "Innovation Studios";
      case "conference":
        return "Annual Conference";
      default:
        return "Donation";
    }
  };

  const handleContinue = () => {
    if (selectedAmount > 0) {
      onSelect(selectedAmount);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#274675] dark:text-[#FBB03B]">
          Select Donation Amount
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Choose an amount to donate to {getTypeName()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {presetAmounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant={selectedAmount === amount && !isCustom ? "default" : "outline"}
            className={`text-xl font-medium py-6 ${
              selectedAmount === amount && !isCustom 
                ? "bg-[#274675] hover:bg-[#274675]/90 text-white dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/90"
                : "border-[#274675] text-[#274675] hover:bg-[#274675]/10 dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B]/10"
            }`}
            onClick={() => handlePresetAmountClick(amount)}
          >
            ${amount}
          </Button>
        ))}
      </div>

      <div className="mt-6">
        <label htmlFor="customAmount" className="block text-sm font-medium mb-2">
          Custom Amount
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            $
          </span>
          <Input
            id="customAmount"
            type="number"
            min="1"
            step="0.01"
            placeholder="Enter amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="pl-7"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-[#274675] text-[#274675] hover:bg-[#274675]/10 dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B]/10"
        >
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={selectedAmount <= 0}
          className="bg-[#274675] hover:bg-[#274675]/90 dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DonationAmountSelector;
