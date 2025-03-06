
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
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

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name is required"),
  role: z.string().min(2, "Your role is required"),
  ticketType: z.string().min(1, "Please select a ticket type"),
  dietaryRequirements: z.string().optional(),
  specialRequests: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const ConferenceRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      dietaryRequirements: "",
      specialRequests: "",
    },
  });

  const watchTicketType = watch("ticketType");

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // First, store registration in Supabase
      const { error: storageError } = await supabase
        .from('conference_registrations')
        .insert([
          { 
            full_name: data.fullName,
            email: data.email,
            organization: data.organization,
            role: data.role,
            ticket_type: data.ticketType,
            dietary_requirements: data.dietaryRequirements || null,
            special_requests: data.specialRequests || null,
            status: 'confirmed'
          }
        ]);
      
      if (storageError) throw storageError;
      
      // Then, trigger email confirmation
      const { error: emailError } = await supabase.functions.invoke('send-conference-confirmation', {
        body: {
          fullName: data.fullName,
          email: data.email,
          ticketType: data.ticketType,
        },
      });
      
      if (emailError) throw emailError;
      
      // Success case
      toast({
        title: "Registration successful!",
        description: "You have been registered for the conference. A confirmation email has been sent to your email address.",
      });
      
      reset();
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

  return (
    <Card className="shadow-lg border-raade-navy/10">
      <CardHeader>
        <CardTitle className="text-2xl font-zillaslab">Registration Details</CardTitle>
        <CardDescription>Please fill out the form below to register for the conference.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <SelectItem value="early-bird">Early Bird ($199)</SelectItem>
                  <SelectItem value="standard">Standard ($249)</SelectItem>
                  <SelectItem value="student">Student ($99)</SelectItem>
                  <SelectItem value="speaker">Speaker ($0)</SelectItem>
                </SelectContent>
              </Select>
              {errors.ticketType && (
                <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
              <Input
                id="dietaryRequirements"
                placeholder="Vegetarian, vegan, gluten-free, etc. (optional)"
                {...register("dietaryRequirements")}
              />
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
            className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Registration...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Complete Registration
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4">
        Your information will only be used for conference communication purposes.
      </CardFooter>
    </Card>
  );
};

export default ConferenceRegistrationForm;
