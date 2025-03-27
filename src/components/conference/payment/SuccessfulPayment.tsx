
import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Calendar, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface SuccessfulPaymentProps {
  registrationData: RegistrationFormData;
  onContinue: () => void;
}

/**
 * SuccessfulPayment Component
 * 
 * Displays a comprehensive payment confirmation screen:
 * - Shows a success animation and user-friendly message
 * - Provides registration details summary
 * - Includes conference dates and next steps
 * - Offers easy navigation to continue
 * 
 * @param registrationData - The user's registration information
 * @param onContinue - Callback for the continue button
 */
const SuccessfulPayment: React.FC<SuccessfulPaymentProps> = ({
  registrationData,
  onContinue
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
    >
      <div className="flex flex-col items-center text-center mb-8">
        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-4">
          <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-simula mb-2">Payment Successful!</h1>
        <p className="text-gray-600 dark:text-gray-300 font-lora">
          Thank you for registering for the RAADE Conference 2025. Your payment has been confirmed.
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-simula mb-4">Registration Details</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <User className="h-5 w-5 text-[#FBB03B] mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{registrationData.fullName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{registrationData.organization} • {registrationData.role}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-[#FBB03B] mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{registrationData.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">A confirmation email has been sent</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-[#FBB03B] mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">April 11-12, 2025</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rice University, Houston, TX</p>
            </div>
          </div>
          
          {registrationData.ticketType === "student-group" && registrationData.groupSize && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="font-medium text-gray-900 dark:text-white">Group Registration</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {registrationData.groupSize} attendees • ${30 * registrationData.groupSize} total
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-simula mb-4">What's Next?</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
          <li className="flex items-start">
            <span className="mr-2 text-[#FBB03B]">•</span>
            Check your inbox for detailed conference information
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-[#FBB03B]">•</span>
            Add April 11-12, 2025 to your calendar
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-[#FBB03B]">•</span>
            Follow RAADE on social media for updates
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onContinue}
          className="flex-1 bg-[#274675] hover:bg-[#274675]/90 text-white font-lora"
        >
          Continue to Conference
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=RAADE%20Conference%202025&dates=20250411/20250413&details=RAADE%20African%20Development%20Forum%202025&location=Rice%20University,%20Houston,%20TX', '_blank')}
          className="flex-1 border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
        >
          Add to Calendar
        </Button>
      </div>
    </motion.div>
  );
};

export default SuccessfulPayment;
