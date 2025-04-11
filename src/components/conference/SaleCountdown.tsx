
import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * SaleCountdown Component - UPDATED TO SHOW REGISTRATION CLOSED
 * 
 * Displays a message indicating that registration for the conference has closed
 * Features:
 * - Clear visual indication that registration is no longer available
 * - Consistent styling with other conference components
 * - Mobile responsive design
 */
const SaleCountdown = () => {
  return (
    <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 flex items-center justify-center shadow-md">
      <AlertCircle className="h-6 w-6 mr-3 text-red-600" />
      <div className="text-red-700 font-bold text-lg">
        Registration has closed. We look forward to seeing you at Rice University!
      </div>
    </div>
  );
};

export default SaleCountdown;
