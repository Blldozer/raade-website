
import { CheckCircle } from "lucide-react";

/**
 * SuccessIcon Component
 * 
 * Displays a success icon with a background circle
 * Used in success confirmation screens
 */
const SuccessIcon = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full inline-flex">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
    </div>
  );
};

export default SuccessIcon;
