
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VerificationStatusProps {
  sendingError: string | null;
  sendingAttempts: number;
  email: string;
}

/**
 * VerificationStatus Component
 * 
 * Displays the current status of the verification process
 * Shows errors and information about email delivery
 * 
 * @param sendingError - Error message if sending failed
 * @param sendingAttempts - Number of attempts to send verification
 * @param email - User's email address
 */
const VerificationStatus = ({ 
  sendingError, 
  sendingAttempts,
  email
}: VerificationStatusProps) => {
  return (
    <>
      <h3 className="font-semibold text-lg mb-2">Email Verification Required</h3>
      <p className="text-gray-600 mb-4">
        We've sent a verification code to <span className="font-semibold">{email}</span>. Please check your inbox and spam folder.
      </p>
      
      {sendingError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Error sending verification email: {sendingError}. Please try resending or contact support.
          </AlertDescription>
        </Alert>
      )}
      
      {sendingAttempts > 0 && (
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-md mb-4">
          <p className="text-blue-700 text-sm">
            {sendingAttempts === 1 ? (
              "Verification email sent. If you don't see it in your inbox, please check your spam folder."
            ) : (
              `We've attempted to send ${sendingAttempts} verification emails. Please check both your inbox and spam folder.`
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default VerificationStatus;
