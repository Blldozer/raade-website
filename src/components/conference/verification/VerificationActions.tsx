
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface VerificationActionsProps {
  onVerify: () => void;
  onResend: () => void;
  isVerifying: boolean;
  isResending: boolean;
  isVerifyDisabled: boolean;
}

/**
 * VerificationActions Component
 * 
 * Provides action buttons for the verification process
 * Shows appropriate loading states during async operations
 * 
 * @param onVerify - Function to verify email with code
 * @param onResend - Function to resend verification code
 * @param isVerifying - Whether verification is in progress
 * @param isResending - Whether resending is in progress
 * @param isVerifyDisabled - Whether verify button should be disabled
 */
const VerificationActions = ({
  onVerify,
  onResend,
  isVerifying,
  isResending,
  isVerifyDisabled
}: VerificationActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        onClick={onVerify}
        disabled={isVerifying || isVerifyDisabled}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Email"
        )}
      </Button>
      
      <Button
        variant="outline"
        onClick={onResend}
        disabled={isResending}
        className="w-full mt-2 sm:mt-0"
      >
        {isResending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Resend Code"
        )}
      </Button>
    </div>
  );
};

export default VerificationActions;
