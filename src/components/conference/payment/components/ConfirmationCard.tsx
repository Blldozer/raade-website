
import { Card } from "@/components/ui/card";

interface ConfirmationCardProps {
  email: string;
  emailSent: boolean;
  isLoading: boolean;
  isFreeRegistration?: boolean;
}

/**
 * ConfirmationCard Component
 * 
 * Displays confirmation details after successful payment:
 * - Registration information
 * - Email confirmation status
 * - Optional messaging for free registrations
 */
const ConfirmationCard = ({ 
  email, 
  emailSent, 
  isLoading,
  isFreeRegistration = false 
}: ConfirmationCardProps) => {
  return (
    <Card className="p-4 bg-gray-50 dark:bg-gray-800 text-left">
      <p className="text-gray-700 dark:text-gray-200 mb-2">
        Thank you for registering for the RAADE African Development Conference 2025!
      </p>
      
      <p className="text-gray-700 dark:text-gray-200 mb-2">
        {isFreeRegistration
          ? "Your complimentary registration has been processed successfully."
          : "Your payment has been processed and your registration is confirmed."}
      </p>
      
      <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Registration details have been sent to: <span className="font-medium">{email}</span>
        </p>
        {!emailSent && !isLoading && (
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
            Note: We couldn't send a confirmation email. Please keep your reference information.
          </p>
        )}
      </div>
    </Card>
  );
};

export default ConfirmationCard;
