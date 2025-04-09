
import { Card, CardContent } from "@/components/ui/card";

interface DonationSummaryProps {
  values: {
    amount: string;
    customAmount?: string;
    fullName: string;
    email: string;
    message?: string;
    makeAnonymous?: boolean;
  };
  formattedAmount: string;
}

/**
 * DonationSummary Component
 * 
 * Displays a summary of the user's donation details:
 * - Shows donation amount and donor information
 * - Indicates anonymous status if selected
 * - Displays optional message if provided
 * - Maintains consistent styling with registration summary
 */
const DonationSummary = ({ values, formattedAmount }: DonationSummaryProps) => {
  const { fullName, email, message, makeAnonymous } = values;

  return (
    <Card className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white transition-colors duration-200 mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Donation Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Name:</span>
            <span className="font-medium text-gray-900 dark:text-white">{fullName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Email:</span>
            <span className="font-medium text-gray-900 dark:text-white">{email}</span>
          </div>
          
          {makeAnonymous && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Display:</span>
              <span className="font-medium text-gray-900 dark:text-white">Anonymous</span>
            </div>
          )}
          
          <div className="flex justify-between border-t pt-2 mt-2 border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Donation Amount:</span>
            <span className="font-bold text-[#274675] dark:text-[#FBB03B]">{formattedAmount}</span>
          </div>
          
          {message && (
            <div className="border-t pt-2 mt-2 border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 block mb-1 dark:text-gray-300">Message:</span>
              <p className="text-sm italic text-gray-700 dark:text-gray-200">{message}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationSummary;
