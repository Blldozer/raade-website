import React from "react";
import { motion } from "framer-motion";
import DonationForm from "./DonationForm";
import DynamicDonationImpact from "./DynamicDonationImpact";
import { useDonationForm } from "./useDonationForm";

/**
 * DonationSection Component
 * 
 * A complete donation section for the RAADE conference page:
 * - Features a main "Support Our Mission" heading styled like other main sections
 * - Uses a 39%/61% layout split for title and subtitle
 * - Contains modern, clean design with side-by-side layout
 * - Features impact information alongside donation form
 * - Optimized for both mobile and desktop views
 * - Includes animation effects for better engagement
 */
const DonationSection = () => {
  const {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit: handleSubmit,
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain
  } = useDonationForm();

  return (
    <section id="donation" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* First row: Title on left (39%), empty space on right (61%) */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%] mb-6 lg:mb-0"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Support Our Mission
            </h2>
          </motion.div>
          
          {/* Empty right spacer - 61% */}
          <motion.div 
            className="lg:w-[61%]" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Intentionally empty for layout */}
          </motion.div>
        </div>

        {/* Second row: Empty space on left (39%), paragraph on right (61%) */}
        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <p className="text-xl font-lora text-black leading-relaxed max-w-[800px]">
              Your support directly fuels innovation and impact across Africa. 
              Every donation helps us connect more students with African organizations to create 
              scalable solutions for pressing challenges.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side: Donation form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-simula">Make a Donation</h3>
              
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Donation amount selection */}
                <div className="space-y-3">
                  <div className="text-base font-medium">Select Amount</div>
                  <div className="grid grid-cols-2 gap-3">
                    {["25", "50", "100", "250", "500", "1000"].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          form.setValue("amount", amount);
                          handleAmountSelect(amount);
                        }}
                        className={`w-full text-center px-4 py-3 rounded-lg border transition-all ${
                          selectedAmount === amount
                            ? "bg-[#FBB03B] text-white border-[#FBB03B]"
                            : "bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      form.setValue("amount", "custom");
                      handleAmountSelect("custom");
                    }}
                    className={`w-full text-center px-4 py-3 rounded-lg border transition-all ${
                      selectedAmount === "custom"
                        ? "bg-[#FBB03B] text-white border-[#FBB03B]"
                        : "bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
                    }`}
                  >
                    Custom Amount
                  </button>
                </div>
                
                {/* Custom amount field */}
                {selectedAmount === "custom" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter custom amount ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        placeholder="e.g. 75"
                        type="number"
                        min="1"
                        step="any"
                        className="pl-8 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...form.register("customAmount")}
                        onChange={(e) => {
                          form.setValue("customAmount", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-700">Your Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input 
                      placeholder="Your full name" 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...form.register("fullName")}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...form.register("email")}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      placeholder="Share why you're supporting RAADE..."
                      className="resize-none h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...form.register("message")}
                    />
                  </div>
                  
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mt-1"
                      {...form.register("makeAnonymous")}
                    />
                    <div className="space-y-1 leading-none">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Make this donation anonymous
                      </label>
                      <p className="text-sm text-gray-500">
                        Your name will not be displayed publicly
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white h-12 rounded-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Donate {getDonationAmount()}
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Your donation helps support RAADE's work in pioneering innovative approaches to 
                  African development. Tax receipts will be provided for eligible donations.
                </p>
              </form>
            </div>
          </motion.div>
          
          {/* Right side: Dynamic Impact display */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <DynamicDonationImpact 
              selectedAmount={selectedAmount} 
              customAmount={form.watch("customAmount")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
