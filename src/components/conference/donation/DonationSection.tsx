
import React, { useState } from "react";
import { motion } from "framer-motion";
import DonationForm from "./DonationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * DonationSection Component
 * 
 * Container for the donation functionality:
 * - Provides context and explanation for donations
 * - Contains the donation form with two-step process
 * - Uses consistent styling with other conference sections
 * - Now includes error handling and recovery options
 */
const DonationSection = () => {
  const [hasError, setHasError] = useState(false);

  const handleRetry = () => {
    setHasError(false);
    window.location.reload();
  };

  return (
    <div className="w-full py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-simula text-[#274675]">Support Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Your donation directly supports RAADE's work in pioneering innovative approaches to African development. 
            Help us continue making a difference by contributing today.
          </p>
        </div>
        
        {hasError ? (
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertTitle>Payment System Error</AlertTitle>
              <AlertDescription>
                We're experiencing technical difficulties with our payment system. Please try again later or contact us for alternative donation methods.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button onClick={handleRetry} className="flex items-center">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <DonationForm onPaymentError={() => setHasError(true)} />
        )}
      </motion.div>
    </div>
  );
};

export default DonationSection;
