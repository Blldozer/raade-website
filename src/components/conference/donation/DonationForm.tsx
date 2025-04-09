
import React from "react";
import { Form } from "@/components/ui/form";
import DonationConfirmation from "./DonationConfirmation";
import { useDonationForm } from "./useDonationForm";
import StripeWrapper from "./stripe/StripeWrapper";
import { Button } from "@/components/ui/button";
import { Loader2, Heart } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

/**
 * DonationForm Component
 * 
 * Interactive donation form with:
 * - Clean, modern interface based on the provided design
 * - Preset donation amounts with highlighted selection
 * - Simplified one-page layout
 * - Mobile responsive design
 */
const DonationForm = () => {
  return (
    <StripeWrapper>
      <DonationFormContent />
    </StripeWrapper>
  );
};

/**
 * DonationFormContent Component
 * 
 * Contains the actual form content that needs to be wrapped in the Stripe context
 */
const DonationFormContent = () => {
  const {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit,
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain
  } = useDonationForm();
  
  // Show confirmation screen after successful submission
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
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Donation amount selection */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Donation Amount</FormLabel>
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
                          className={`px-5 py-3 rounded-lg cursor-pointer border transition-all ${
                            selectedAmount === amount
                              ? "bg-[#FBB03B] text-white border-[#FBB03B]"
                              : "bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
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
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        placeholder="e.g. 75"
                        type="number"
                        min="1"
                        step="any"
                        className="pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {/* Personal Information */}
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
                      className="resize-none h-24"
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
            className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white h-12 rounded-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" />
                Donate {getDonationAmount()}
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
