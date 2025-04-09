
import React from "react";
import { Form } from "@/components/ui/form";
import DonationConfirmation from "./DonationConfirmation";
import { useDonationForm } from "./useDonationForm";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, ArrowLeft } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DynamicDonationImpact from "./DynamicDonationImpact";
import { Toaster } from "@/components/ui/toaster";
import StripeWrapper from "./stripe/StripeWrapper";
import StripePaymentForm from "./stripe/StripePaymentForm";
import { useStripePayment } from "./stripe/useStripePayment";

/**
 * DonationForm Component
 * 
 * Interactive donation form with:
 * - Clean, modern interface based on the provided design
 * - Preset donation amounts with highlighted selection
 * - Stripe payment processing integration
 * - Mobile responsive design
 * - Confirmation screen after successful payment
 */
const DonationForm = () => {
  const {
    form,
    isSubmitting,
    showConfirmation,
    showCardPayment,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit: handleSubmit,
    handleAmountSelect,
    getDonationAmount,
    getDonationAmountValue,
    handleDonateAgain,
    handlePaymentSuccess,
    handlePaymentError,
    handleBackToForm
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

  // Get the Stripe payment hook when showing payment screen
  const stripePaymentProps = showCardPayment && submittedValues ? 
    useStripePayment({
      donationAmount: getDonationAmountValue(),
      email: submittedValues.email,
      fullName: submittedValues.fullName,
      message: submittedValues.message,
      makeAnonymous: submittedValues.makeAnonymous
    }) : null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Toaster />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Donation Form or Payment Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
          {!showCardPayment ? (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-simula">Make a Donation</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {/* Donation amount selection */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base">Select Amount</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleAmountSelect(value);
                            }}
                            value={field.value}
                            className="grid grid-cols-2 gap-3"
                          >
                            {["25", "50", "100", "250", "500", "1000"].map((amount) => (
                              <div key={amount} className="flex items-center">
                                <div className="w-full">
                                  <RadioGroupItem
                                    value={amount}
                                    id={`amount-${amount}`}
                                    className="sr-only peer"
                                  />
                                  <Label
                                    htmlFor={`amount-${amount}`}
                                    className="w-full flex justify-center text-center px-4 py-3 rounded-lg cursor-pointer border transition-all peer-data-[state=checked]:bg-[#FBB03B] peer-data-[state=checked]:text-white peer-data-[state=checked]:border-[#FBB03B] bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
                                  >
                                    ${amount}
                                  </Label>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
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
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleAmountSelect(value);
                          }}
                          value={field.value}
                        >
                          <div className="flex items-center">
                            <div className="w-full">
                              <RadioGroupItem
                                value="custom"
                                id="amount-custom"
                                className="sr-only peer"
                              />
                              <Label
                                htmlFor="amount-custom"
                                className="w-full flex justify-center text-center px-4 py-3 rounded-lg cursor-pointer border transition-all peer-data-[state=checked]:bg-[#FBB03B] peer-data-[state=checked]:text-white peer-data-[state=checked]:border-[#FBB03B] bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
                              >
                                Custom Amount
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
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
                  
                  {/* Display payment error if any */}
                  {paymentError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <p className="font-medium">Payment Error</p>
                      <p>{paymentError}</p>
                    </div>
                  )}
                  
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
                        Continue to Payment
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Your donation helps support RAADE's work in pioneering innovative approaches to 
                    African development. Tax receipts will be provided for eligible donations.
                  </p>
                </form>
              </Form>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={handleBackToForm}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span>Back</span>
                </button>
                <h3 className="text-xl font-bold text-gray-800 font-simula">Payment Details</h3>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="font-medium text-[#FBB03B]">
                    {getDonationAmount()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Donor:</span>
                  <span className="font-medium">{submittedValues?.fullName}</span>
                </div>
              </div>
              
              {submittedValues && stripePaymentProps && (
                <StripeWrapper>
                  <StripePaymentForm
                    isSubmitting={stripePaymentProps.isLoading || isSubmitting}
                    error={stripePaymentProps.error || paymentError}
                  />
                  
                  {/* Donate button */}
                  <Button 
                    onClick={async () => {
                      const success = await stripePaymentProps.processPayment();
                      if (success) {
                        handlePaymentSuccess();
                      }
                    }}
                    disabled={stripePaymentProps.isLoading || isSubmitting}
                    className="w-full mt-4 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
                  >
                    {stripePaymentProps.isLoading || isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      `Complete Donation of ${getDonationAmount()}`
                    )}
                  </Button>
                </StripeWrapper>
              )}
            </>
          )}
        </div>
        
        {/* Right column - Impact Display */}
        <div>
          <DynamicDonationImpact 
            selectedAmount={selectedAmount} 
            customAmount={form.watch("customAmount")}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
