
import { useEmailVerification } from "./verification/useEmailVerification";
import VerificationCodeInput from "./verification/VerificationCodeInput";
import VerificationActions from "./verification/VerificationActions";
import VerificationStatus from "./verification/VerificationStatus";

interface EmailVerificationProps {
  email: string;
  fullName: string;
  ticketType: string;
  emailSent: boolean;
  onVerificationSuccess: () => void;
  onVerificationError: (error: string) => void;
}

/**
 * EmailVerification Component
 * 
 * Manages the email verification workflow for conference registration
 * Split into smaller components for better maintainability
 * 
 * @param email - User's email address
 * @param fullName - User's full name
 * @param ticketType - Selected ticket type
 * @param emailSent - Whether verification email was already sent
 * @param onVerificationSuccess - Callback for successful verification
 * @param onVerificationError - Callback for verification errors
 */
const EmailVerification = ({
  email,
  fullName,
  ticketType,
  emailSent,
  onVerificationSuccess,
  onVerificationError
}: EmailVerificationProps) => {
  const {
    verificationCode,
    setVerificationCode,
    isSubmitting,
    isSendingEmail,
    sendingAttempts,
    sendingError,
    handleVerifyEmail,
    handleSendVerificationEmail
  } = useEmailVerification(
    email,
    fullName,
    ticketType,
    emailSent,
    onVerificationSuccess,
    onVerificationError
  );

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <VerificationStatus 
          sendingError={sendingError} 
          sendingAttempts={sendingAttempts}
          email={email}
        />
        
        <div className="space-y-4">
          <VerificationCodeInput 
            value={verificationCode} 
            onChange={setVerificationCode} 
          />
          
          <VerificationActions 
            onVerify={handleVerifyEmail}
            onResend={handleSendVerificationEmail}
            isVerifying={isSubmitting}
            isResending={isSendingEmail}
            isVerifyDisabled={!verificationCode}
          />
          
          <p className="text-sm text-gray-500">
            The verification code will expire in 24 hours. If you don't receive the code, check your spam folder or click "Resend Code".
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
