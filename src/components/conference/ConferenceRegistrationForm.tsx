
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CreditCard } from "lucide-react";
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

const ConferenceRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      ticketType: "",
      specialRequests: "",
    },
  });

  const handleInitialSubmit = (data: RegistrationFormData) => {
    setRegistrationData(data);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!registrationData) return;
    
    setIsSubmitting(true);
    
    try {
      // Store registration in Supabase using generic insert
      // This works around TypeScript errors by using the `from` method with any type
      const { error: storageError } = await supabase
        .from('conference_registrations' as any)
        .insert({
          full_name: registrationData.fullName,
          email: registrationData.email,
          organization: registrationData.organization,
          role: registrationData.role,
          ticket_type: registrationData.ticketType,
          special_requests: registrationData.specialRequests || null,
          status: 'confirmed'
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
      setRegistrationData(null);
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
        {!showPayment ? (
          <form onSubmit={handleSubmit(handleInitialSubmit)} className="space-y-6">
            <RegistrationFormFields 
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Continue to Payment
                </>
              )}
            </Button>
          </form>
        ) : (
          <PaymentSection 
            registrationData={registrationData!}
            isSubmitting={isSubmitting}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onBackClick={() => setShowPayment(false)}
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
