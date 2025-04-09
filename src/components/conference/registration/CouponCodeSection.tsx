import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Tag, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { TICKET_TYPES_ENUM } from "../RegistrationFormTypes";

interface CouponCodeSectionProps {
  setCouponCode: (couponCode: string | null) => void;
  setCouponDiscount: (discount: { type: 'percentage' | 'fixed'; amount: number } | null) => void;
  setIsFullDiscount: (isFullDiscount: boolean) => void;
  email?: string; // Email prop for checking usage history
  ticketType?: string; // Add ticket type to check if it's a group ticket
}

/**
 * CouponCodeSection Component
 * 
 * Allows users to enter and validate coupon codes:
 * - Validates coupon codes through the Supabase edge function
 * - Shows coupon discount information
 * - Displays validation state with clear feedback
 * - Handles various coupon validation errors
 * - Improved visual feedback for successful coupon application
 * - Added error handling to display meaningful error messages
 * - Tests Supabase connection when validation fails
 * - Supports special school codes that have unlimited uses but can't be used twice by the same email
 * - Prevents discount application to group tickets
 * - Ensures coupon code is accessible for registration process
 * 
 * @param setCouponCode - Function to update coupon code in parent component
 * @param setCouponDiscount - Function to update coupon discount details
 * @param setIsFullDiscount - Function to indicate if coupon is 100% off
 * @param email - User's email to check for previous usage of unlimited school codes
 * @param ticketType - The selected ticket type to check if it's a group ticket
 */
const CouponCodeSection = ({
  setCouponCode,
  setCouponDiscount,
  setIsFullDiscount,
  email,
  ticketType
}: CouponCodeSectionProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    discount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  } | null>(null);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  // Check if this is a group ticket - discounts don't apply to groups
  const isGroupTicket = ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP;
  
  // List of special school codes that need email verification
  const SCHOOL_CODES = ['PVAMU', 'TEXAS', 'TULANE'];
  
  // Function to test Supabase connection
  const testSupabaseConnection = async () => {
    try {
      // Test if Supabase is accessible by making a simple request
      const { error } = await supabase.from('coupon_codes').select('id').limit(1);
      
      if (error) {
        console.error("Supabase connection test failed:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Supabase connection test exception:", error);
      return false;
    }
  };

  // Handle coupon code validation
  const validateCoupon = async () => {
    if (!inputValue.trim()) return;
    
    // Don't allow coupon validation for group tickets
    if (isGroupTicket) {
      toast({
        title: "Not available for group tickets",
        description: "Discount codes cannot be applied to group tickets.",
        variant: "destructive",
      });
      return;
    }
    
    setIsValidating(true);
    setCouponCode(null);
    setCouponDiscount(null);
    setIsFullDiscount(false);
    setValidationResult(null);
    setConnectionError(false);
    
    try {
      // Test Supabase connection before validating
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        setConnectionError(true);
        toast({
          title: "Connection issue",
          description: "We're having trouble connecting to our services. Please try again in a moment.",
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }
      
      // For school codes, we need to include the email to check usage history
      const upperCaseCode = inputValue.trim().toUpperCase();
      const isSchoolCode = SCHOOL_CODES.includes(upperCaseCode);
      
      // Check if we need email for school code but don't have it
      if (isSchoolCode && !email) {
        toast({
          title: "Email required",
          description: "Please fill in your email first before applying this school coupon code.",
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }
      
      // Prepare request payload
      const requestPayload: { code: string; email?: string; ticketType?: string } = { 
        code: inputValue.trim() 
      };
      
      // Add email for school codes
      if (isSchoolCode && email) {
        requestPayload.email = email;
      }
      
      // Add ticket type to check if it's a group ticket on the backend
      if (ticketType) {
        requestPayload.ticketType = ticketType;
      }
      
      // Call the validate-coupon edge function
      const { data, error } = await supabase.functions.invoke('validate-coupon', {
        body: requestPayload
      });
      
      if (error) {
        console.error("Coupon validation error:", error);
        setValidationResult({
          isValid: false,
          message: "Error validating coupon code. Please try again."
        });
        
        toast({
          title: "Validation error",
          description: "There was an error validating your coupon code. Please try again.",
          variant: "destructive",
        });
        
        setIsValidating(false);
        return;
      }
      
      if (data.isValid) {
        // Set coupon code and discount in parent component
        setCouponCode(inputValue.trim().toUpperCase());
        setCouponDiscount(data.discount);
        
        // Check if it's a 100% discount
        const isFullDiscount = data.discount.type === 'percentage' && data.discount.amount === 100;
        setIsFullDiscount(isFullDiscount);
        
        // Format message based on discount type and amount
        let message = "";
        if (isFullDiscount) {
          message = 'Free registration code applied!';
        } else {
          message = `Discount applied: ${data.discount.type === 'percentage' 
            ? `${data.discount.amount}%` 
            : `$${data.discount.amount}`} off`;
        }
        
        setValidationResult({
          isValid: true,
          message,
          discount: data.discount
        });
        
        // Store the coupon code as a data attribute for retrieval later if needed
        setTimeout(() => {
          const hiddenElement = document.getElementById("coupon-code-value");
          if (hiddenElement) {
            hiddenElement.setAttribute("data-value", inputValue.trim().toUpperCase());
          } else {
            // Create an element to store the coupon code if it doesn't exist
            const element = document.createElement("div");
            element.id = "coupon-code-value";
            element.style.display = "none";
            element.setAttribute("data-value", inputValue.trim().toUpperCase());
            document.body.appendChild(element);
          }
        }, 100);
        
        toast({
          title: "Coupon applied",
          description: isFullDiscount 
            ? "Your registration will be free with this coupon!" 
            : `Discount of ${data.discount.type === 'percentage' 
                ? `${data.discount.amount}%` 
                : `$${data.discount.amount}`} applied to your registration.`,
          variant: "default",
        });
      } else {
        setValidationResult({
          isValid: false,
          message: data.message || "Invalid coupon code"
        });
        
        toast({
          title: "Invalid coupon",
          description: data.message || "The coupon code you entered is not valid.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      setValidationResult({
        isValid: false,
        message: "Error validating coupon"
      });
      
      toast({
        title: "Validation failed",
        description: "We couldn't validate your coupon code due to a technical error. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Clear current coupon validation
  const clearCoupon = () => {
    setInputValue("");
    setCouponCode(null);
    setCouponDiscount(null);
    setIsFullDiscount(false);
    setValidationResult(null);
    setConnectionError(false);
    
    // Clear the stored coupon code
    const hiddenElement = document.getElementById("coupon-code-value");
    if (hiddenElement) {
      hiddenElement.removeAttribute("data-value");
    }
    
    toast({
      title: "Coupon cleared",
      description: "Coupon code has been removed from your registration.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#274675] flex items-center dark:text-[#FBB03B]">
        <Tag className="h-5 w-5 mr-2" />
        Apply Coupon Code
      </h3>
      
      {isGroupTicket ? (
        <div className="text-amber-600 text-sm p-2 border border-amber-200 rounded-md bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
          Discount codes cannot be applied to group tickets.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Enter coupon code"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              className="w-full"
              disabled={isValidating || (validationResult?.isValid ?? false) || isGroupTicket}
            />
            
            {validationResult?.isValid ? (
              <Button
                onClick={clearCoupon}
                variant="outline"
                type="button"
                disabled={isGroupTicket}
                className="w-full"
              >
                Clear
              </Button>
            ) : (
              <Button
                onClick={validateCoupon}
                disabled={!inputValue.trim() || isValidating || isGroupTicket}
                variant="outline"
                type="button"
                className="w-full"
              >
                {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
              </Button>
            )}
          </div>
          
          <div id="coupon-code-value" style={{ display: 'none' }}></div>
          
          {connectionError && (
            <div className="flex items-center gap-2 text-sm p-2 rounded-md text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>Could not connect to our service. Please check your connection and try again.</span>
            </div>
          )}
          
          {validationResult && (
            <div className={`flex items-center gap-2 text-sm p-2 rounded-md ${
              validationResult.isValid 
                ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' 
                : 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {validationResult.isValid ? (
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 flex-shrink-0" />
              )}
              <span>{validationResult.message}</span>
            </div>
          )}
          
          {validationResult?.isValid && validationResult.discount && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <p className="italic">
                This discount will be applied at checkout.
                {validationResult.discount.type === 'percentage' && validationResult.discount.amount === 100 
                  ? ' Your registration will be free.' 
                  : ''}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CouponCodeSection;
