
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client"; // Import the existing Supabase client
import { Loader2 } from "lucide-react";

// Define preset donation amounts
const DONATION_PRESETS = [25, 50, 100, 250, 500];

// Create validation schema for donation form
const donationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  amount: z.coerce.number().min(1, "Donation amount must be at least $1"),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

interface DonationFormProps {
  selectedAmount: number | null;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number | null>>;
}

/**
 * DonationForm Component
 * 
 * Provides a form for users to make donations with preset amounts
 * and custom amount options
 * 
 * @param selectedAmount - Currently selected donation amount
 * @param setSelectedAmount - Function to update selected amount
 */
const DonationForm = ({ selectedAmount, setSelectedAmount }: DonationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      amount: selectedAmount || 50,
      message: "",
    },
  });
  
  // Update amount in form when preset amount is selected
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    form.setValue("amount", amount);
  };
  
  // Handle form submission
  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Call the Supabase Edge Function to create a Stripe checkout session
      const { data: checkoutData, error } = await supabase.functions.invoke('create-donation-session', {
        body: { 
          amount: data.amount,
          fullName: data.fullName,
          email: data.email,
          message: data.message || ""
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Redirect to Stripe Checkout
      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      console.error("Donation error:", error);
      toast({
        title: "Error processing donation",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <h3 className="text-2xl font-simula text-[#274675] mb-6">Make a Donation</h3>
      
      {/* Donation amount presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Amount
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DONATION_PRESETS.map((amount) => (
            <Button
              key={amount}
              type="button"
              variant={selectedAmount === amount ? "default" : "outline"}
              className={`${
                selectedAmount === amount
                  ? "bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
                  : "border-[#274675] text-[#274675] hover:bg-[#274675]/10"
              } font-lora transition-all duration-200`}
              onClick={() => handleAmountSelect(amount)}
            >
              ${amount}
            </Button>
          ))}
          <Button
            type="button"
            variant={!DONATION_PRESETS.includes(selectedAmount || 0) ? "default" : "outline"}
            className={`${
              !DONATION_PRESETS.includes(selectedAmount || 0)
                ? "bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
                : "border-[#274675] text-[#274675] hover:bg-[#274675]/10"
            } font-lora col-span-3 transition-all duration-200`}
          >
            Custom Amount
          </Button>
        </div>
      </div>
      
      {/* Donation form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Donation Amount ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1} 
                    placeholder="Amount in USD" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        setSelectedAmount(value);
                      }
                    }} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share why you're supporting our mission" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-[#274675] hover:bg-[#274675]/90 text-white font-lora py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Donate Now"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Secure payment processed by Stripe. Your information is encrypted and secure.
      </div>
    </div>
  );
};

export default DonationForm;
