
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Heart } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DonationConfirmation from "./DonationConfirmation";
import { toast } from "@/hooks/use-toast";

/**
 * DonationForm schema with validation
 */
const donationFormSchema = z.object({
  amount: z.string().min(1, "Please select or enter an amount"),
  customAmount: z.string().optional(),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  makeAnonymous: z.boolean().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

/**
 * DonationForm Component
 * 
 * Interactive donation form with:
 * - Preset donation amounts with custom option
 * - Donor information collection
 * - Optional message field
 * - Anonymous donation option
 * - Success state with confirmation
 * - Mobile responsive design
 */
const DonationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [submittedValues, setSubmittedValues] = useState<DonationFormValues | null>(null);
  
  // Initialize form with zod schema validation
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "25",
      customAmount: "",
      fullName: "",
      email: "",
      message: "",
      makeAnonymous: false,
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to process the donation
      // For now, we'll simulate a successful donation
      
      console.log("Donation submitted:", data);
      
      // Store the submitted values for the confirmation screen
      setSubmittedValues(data);
      
      // Show success state after a short delay to simulate processing
      setTimeout(() => {
        setShowConfirmation(true);
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "Donation failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  // Handle amount selection
  const handleAmountSelect = (value: string) => {
    setSelectedAmount(value);
    form.setValue("amount", value);
    
    // If selecting a preset amount, clear any custom amount
    if (value !== "custom") {
      form.setValue("customAmount", "");
    }
  };
  
  // Calculate the final donation amount
  const getDonationAmount = () => {
    const amount = form.watch("amount");
    const customAmount = form.watch("customAmount");
    
    if (amount === "custom" && customAmount) {
      return `$${parseFloat(customAmount).toFixed(2)}`;
    }
    
    return `$${amount}`;
  };
  
  // Reset form and confirmation state
  const handleDonateAgain = () => {
    form.reset();
    setShowConfirmation(false);
    setSelectedAmount("25");
  };
  
  if (showConfirmation && submittedValues) {
    return (
      <DonationConfirmation 
        values={submittedValues} 
        onDonateAgain={handleDonateAgain} 
      />
    );
  }
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-simula">Make a Donation</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Donation amount selection */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Select an amount</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleAmountSelect(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-3"
                  >
                    {["25", "50", "100", "250", "custom"].map((amount) => (
                      <div key={amount} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={amount}
                          id={`amount-${amount}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`amount-${amount}`}
                          className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                            selectedAmount === amount
                              ? "bg-[#FBB03B] text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                          }`}
                        >
                          {amount === "custom" ? "Custom" : `$${amount}`}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Custom amount field */}
          {selectedAmount === "custom" && (
            <FormField
              control={form.control}
              name="customAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter custom amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g. 75"
                      type="number"
                      min="1"
                      step="any"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {/* Donor information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700">Your Information</h4>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
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
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      {...field} 
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
                      placeholder="Share why you're supporting RAADE..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="makeAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-4 w-4 mt-1"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Make this donation anonymous</FormLabel>
                    <p className="text-sm text-gray-500">
                      Your name will not be displayed publicly
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Donate {getDonationAmount()} Now
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Your donation helps support RAADE's work in pioneering innovative approaches to 
            African development. Tax receipts will be provided for eligible donations.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default DonationForm;
