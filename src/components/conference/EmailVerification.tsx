
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationProps {
  email: string;
  ticketType: string;
  onVerificationSuccess: () => void;
  onVerificationError: (error: string) => void;
}

const EmailVerification = ({
  email,
  ticketType,
  onVerificationSuccess,
  onVerificationError
}: EmailVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      toast({
        title: "Verification code required",
        description: "Please enter the verification code sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("verify-email-token", {
        body: {
          email,
          token: verificationCode,
          ticketType
        },
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        onVerificationSuccess();
      } else {
        throw new Error(data.error || "Failed to verify email");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Verification failed",
        description: errorMessage,
        variant: "destructive",
      });
      onVerificationError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-verification-email", {
        body: {
          email,
          fullName: "User", // This should be passed from the parent component
          ticketType,
          isKnownInstitution: false // This will be set on the server
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Verification code sent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Failed to send code",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-2">Email Verification Required</h3>
        <p className="text-gray-600 mb-4">
          We've sent a verification code to <span className="font-semibold">{email}</span>. Please check your inbox and enter the code below.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              placeholder="Enter the 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
              className="text-center tracking-wider font-mono text-lg"
              maxLength={6}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleVerifyEmail}
              disabled={isSubmitting || !verificationCode}
              className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
            >
              {isSubmitting ? (
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
              onClick={handleResendCode}
              disabled={isSubmitting}
              className="w-full mt-2 sm:mt-0"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            The verification code will expire in 24 hours. If you don't receive the code, check your spam folder or click "Resend Code".
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
