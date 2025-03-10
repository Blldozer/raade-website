
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { registrationSchema, RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationFormFields from "./RegistrationFormFields";
import PaymentSection from "./PaymentSection";
import EmailVerification from "./EmailVerification";

const ConferenceRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidationResult, setEmailValidationResult] = useState<{ isValid: boolean; message?: string } | null>(null);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      ticketType: "",
      specialRequests: "",
      groupEmails: [],
    },
  });

  const watchTicketType = watch("ticketType");
  
  const handleInitialSubmit = async (data: RegistrationFormData) => {
    // Double-check email validation
    if (!emailValidationResult?.isValid) {
      toast({
        title: "Email validation error",
        description: emailValidationResult?.message || "Please provide a valid email for the selected ticket type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For student group registrations, validate all emails
      if (data.ticketType === "student-group" && data.groupEmails) {
        // Check if the group has at least the selected number of members
        if (!data.groupSize || data.groupEmails.length < data.groupSize) {
          toast({
            title: "Group incomplete",
            description: `Please add all ${data.groupSize} group member emails.`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      console.log("Sending verification email to:", data.email);
      
      const { error: verificationError } = await supabase.functions.invoke("send-verification-email", {
        body: {
          email: data.email,
          fullName: data.fullName,
          ticketType: data.ticketType,
          isKnownInstitution: false // Will be set server-side
        },
      });
      
      if (verificationError) {
        console.error("Error sending verification email:", verificationError);
        throw verificationError;
      }
      
      toast({
        title: "Verification email sent",
        description: `We've sent a verification code to ${data.email}. Please check your inbox and enter the code.`,
      });
      
      setVerificationEmailSent(true);
      setRegistrationData(data);
      setShowEmailVerification(true);
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description: "There was an error sending the verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSuccess = () => {
    setShowEmailVerification(false);
    setShowPayment(true);
  };

  const handleVerificationError = (errorMessage: string) => {
    toast({
      title: "Verification failed",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const handlePaymentSuccess = async () => {
    if (!registrationData) return;
    
    setIsSubmitting(true);
    
    try {
      // Store registration in Supabase using generic insert
      const { error: storageError } = await supabase
        .from('conference_registrations' as any)
        .insert({
          full_name: registrationData.fullName,
          email: registrationData.email,
          organization: registrationData.organization,
          role: registrationData.role,
          ticket_type: registrationData.ticketType,
          special_requests: registrationData.specialRequests || null,
          status: 'confirmed',
          email_verified: true
        } as any);
      
      if (storageError) throw storageError;
      
      // Then, trigger email confirmation
      const { error: emailError } = await supabase.functions.invoke('send-conference-confirmation', {
        body: {
          fullName: registrationData.fullName,
          email: registrationData.email,
          ticketType: registrationData.ticketType,
        },
      });
      
      if (emailError) throw emailError;
      
      // Success case
      toast({
        title: "Registration successful!",
        description: "You have been registered for the conference. A confirmation email has been sent to your email address.",
      });
      
      // Reset form and state
      reset();
      setShowPayment(false);
      setShowEmailVerification(false);
      setRegistrationData(null);
      setEmailValidationResult(null);
      setVerificationEmailSent(false);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    toast({
      title: "Payment failed",
      description: errorMessage || "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
    setIsSubmitting(false);
  };

  return (
    <Card className="shadow-lg border-[#FBB03B]/10">
      <CardHeader>
        <CardTitle className="text-2xl font-simula">Registration Details</CardTitle>
        <CardDescription>Please fill out the form below to register for the conference.</CardDescription>
      </CardHeader>
      <CardContent>
        {!showEmailVerification && !showPayment ? (
          <form onSubmit={handleSubmit(handleInitialSubmit)} className="space-y-6">
            <RegistrationFormFields 
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              control={control}
              onEmailValidation={setEmailValidationResult}
            />

            <Button
              type="submit"
              disabled={isSubmitting || (emailValidationResult && !emailValidationResult.isValid)}
              className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Verification
                </>
              )}
            </Button>
          </form>
        ) : showEmailVerification && registrationData ? (
          <EmailVerification 
            email={registrationData.email}
            fullName={registrationData.fullName}
            ticketType={registrationData.ticketType}
            emailSent={verificationEmailSent}
            onVerificationSuccess={handleVerificationSuccess}
            onVerificationError={handleVerificationError}
          />
        ) : (
          <PaymentSection 
            registrationData={registrationData!}
            isSubmitting={isSubmitting}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onBackClick={() => {
              setShowPayment(false);
              setShowEmailVerification(true);
            }}
          />
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4 font-lora">
        Your information will only be used for conference communication purposes.
      </CardFooter>
    </Card>
  );
};

export default ConferenceRegistrationForm;
