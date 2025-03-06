
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StripeCheckout from "./StripeCheckout";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name is required"),
  role: z.string().min(2, "Your role is required"),
  ticketType: z.string().min(1, "Please select a ticket type"),
  specialRequests: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

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

  const watchTicketType = watch("ticketType");

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

  // Helper function to get ticket price display text
  const getTicketPriceText = (ticketType: string) => {
    switch (ticketType) {
      case "early-bird": return "($199)";
      case "standard": return "($249)";
      case "student": return "($99)";
      case "speaker": return "(Free)";
      default: return "";
    }
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
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="Enter your organization name"
                  {...register("organization")}
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  placeholder="Your position or role"
                  {...register("role")}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ticketType">Ticket Type</Label>
                <Select 
                  onValueChange={(value) => setValue("ticketType", value)}
                  value={watchTicketType}
                >
                  <SelectTrigger id="ticketType">
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-bird">Early Bird {getTicketPriceText("early-bird")}</SelectItem>
                    <SelectItem value="standard">Standard {getTicketPriceText("standard")}</SelectItem>
                    <SelectItem value="student">Student {getTicketPriceText("student")}</SelectItem>
                    <SelectItem value="speaker">Speaker {getTicketPriceText("speaker")}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.ticketType && (
                  <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requests or accommodations (optional)"
                  {...register("specialRequests")}
                />
              </div>
            </div>

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
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2 font-simula">Registration Summary</h3>
              <p className="font-lora"><strong>Name:</strong> {registrationData?.fullName}</p>
              <p className="font-lora"><strong>Email:</strong> {registrationData?.email}</p>
              <p className="font-lora"><strong>Organization:</strong> {registrationData?.organization}</p>
              <p className="font-lora"><strong>Ticket Type:</strong> {registrationData?.ticketType} {getTicketPriceText(registrationData?.ticketType || "")}</p>
            </div>
            
            {registrationData && (
              <StripeCheckout 
                ticketType={registrationData.ticketType}
                email={registrationData.email}
                fullName={registrationData.fullName}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setShowPayment(false)}
              className="w-full border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
              disabled={isSubmitting}
            >
              Back to Registration Form
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4 font-lora">
        Your information will only be used for conference communication purposes.
      </CardFooter>
    </Card>
  );
};

export default ConferenceRegistrationForm;
