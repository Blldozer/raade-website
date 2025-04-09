
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CardFormProps {
  paymentAmount: number;
  ticketType: string;
  isLoading: boolean;
  disabled: boolean;
  cardError: string | null;
  onCardChange: (event: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  saleActive?: boolean;
}

/**
 * CardForm Component
 * 
 * Displays the Stripe card input form with payment details:
 * - Shows ticket type and amount
 * - Renders card input element
 * - Handles form submission
 * - Displays loading state during payment processing
 * - Shows sale status when applicable
 */
const CardForm: React.FC<CardFormProps> = ({
  paymentAmount,
  ticketType,
  isLoading,
  disabled,
  cardError,
  onCardChange,
  onSubmit,
  saleActive
}) => {
  // Get readable ticket type name
  const ticketLabel = 
    ticketType === "student" ? "Student Ticket" : 
    ticketType === "professional" ? "Professional Ticket" : 
    "Group Registration";
  
  // Format dollar amount for display
  const amountInDollars = (paymentAmount / 100).toFixed(2);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Payment Information</h3>
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ticketLabel} - ${amountInDollars} USD
          </p>
          {saleActive && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              SALE!
            </span>
          )}
        </div>
        
        <div className="p-4 border rounded-md bg-white dark:bg-gray-800">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
                },
              },
            }}
            onChange={onCardChange}
            className="py-2"
          />
        </div>
        
        {cardError && (
          <p className="text-sm text-red-500">{cardError}</p>
        )}
      </div>
      
      <Button
        type="submit"
        disabled={isLoading || disabled}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora 
          dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
          transition-colors duration-300"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>Complete Payment</>
        )}
      </Button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Secure payment processed by Stripe. Your card information is never stored on our servers.
      </p>
    </form>
  );
};

export default CardForm;
