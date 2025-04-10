import React, { useState } from 'react';

// Create a simpler browser-compatible email preview
const EmailPreview = () => {
  const [emailType, setEmailType] = useState<'confirmation' | 'verification'>('confirmation');
  
  // Sample data for display
  const confirmationData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    ticketType: 'professional',
    ticketPrice: '$199',
    totalPrice: '$199',
    eventDates: 'April 11-12, 2025',
    registrationDate: 'April 10, 2025',
    referenceId: 'REF123456',
    couponCode: 'SAMPLE25'
  };
  
  // Simple email templates for browser preview
  const ConfirmationEmailPreview = () => (
    <div className="font-sans max-w-[600px] mx-auto p-4 bg-white border rounded-md">
      <div className="mb-8">
        <img 
          src="/raade-logo.png" 
          alt="RAADE Conference Logo" 
          className="h-16 mb-4" 
        />
        <h1 className="text-2xl font-bold text-[#274675] mb-2">
          Registration Confirmation
        </h1>
        <p className="text-gray-700">
          Thank you for registering for the RAADE Conference! We're excited to have you join us.
        </p>
      </div>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-[#274675] mb-2">
          Your Registration Details
        </h2>
        
        <div className="mb-4">
          <p className="text-gray-500 m-0">Name</p>
          <p className="font-semibold m-0">{confirmationData.fullName}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-500 m-0">Email</p>
          <p className="font-semibold m-0">{confirmationData.email}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-500 m-0">Ticket Type</p>
          <p className="font-semibold m-0">{confirmationData.ticketType.charAt(0).toUpperCase() + confirmationData.ticketType.slice(1)}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-500 m-0">Conference Dates</p>
          <p className="font-semibold m-0">{confirmationData.eventDates}</p>
        </div>
        
        {confirmationData.couponCode && (
          <div className="mb-4">
            <p className="text-gray-500 m-0">Applied Coupon</p>
            <p className="font-semibold m-0">{confirmationData.couponCode}</p>
          </div>
        )}
        
        <hr className="my-4 border-gray-300" />
        
        <div className="mb-4">
          <p className="text-gray-500 m-0">Registration Date</p>
          <p className="text-sm m-0">{confirmationData.registrationDate}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-500 m-0">Registration Reference</p>
          <p className="text-sm font-mono m-0">{confirmationData.referenceId}</p>
        </div>
      </div>
      
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-[#274675] mb-2">
          Payment Information
        </h2>
        
        <div className="flex justify-between mb-2">
          <p className="text-gray-700 m-0">Ticket Price:</p>
          <p className="font-semibold m-0">{confirmationData.ticketPrice}</p>
        </div>
        
        {confirmationData.couponCode && (
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 m-0">Discount Applied:</p>
            <p className="font-semibold text-green-600 m-0">-$50.00</p>
          </div>
        )}
        
        <hr className="my-2 border-gray-300" />
        
        <div className="flex justify-between mb-0">
          <p className="font-bold m-0">Total:</p>
          <p className="font-bold m-0">{confirmationData.totalPrice}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#274675] mb-2">
          Next Steps
        </h2>
        <p className="text-gray-700 mb-4">
          You'll receive updates about the conference schedule and any important announcements via email.
          Be sure to mark your calendar for the event dates.
        </p>
        <button 
          className="bg-[#274675] text-white px-4 py-2 rounded font-semibold"
        >
          View Conference Schedule
        </button>
      </div>
      
      <hr className="my-8 border-gray-300" />
      
      <div>
        <p className="text-sm text-gray-500 text-center">
          &copy; 2025 RAADE Conference. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 text-center">
          If you have any questions, please contact us at{' '}
          <a href="mailto:support@raadeconf.com" className="text-blue-600">
            support@raadeconf.com
          </a>
        </p>
      </div>
    </div>
  );
  
  const VerificationEmailPreview = () => {
    const verificationData = {
      fullName: 'John Doe',
      verificationUrl: 'https://raadeconf.com/verify?token=sample-token',
      ticketType: 'professional'
    };
    
    return (
      <div className="font-sans max-w-[600px] mx-auto p-4 bg-white border rounded-md">
        <div className="mb-8">
          <img 
            src="/raade-logo.png" 
            alt="RAADE Conference Logo" 
            className="h-16 mb-4" 
          />
          <h1 className="text-2xl font-bold text-[#274675] mb-2">
            Email Verification
          </h1>
          <p className="text-gray-700">
            Thank you for starting your registration for the RAADE Conference! Please verify your email to continue the registration process.
          </p>
        </div>

        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#274675] mb-2">
            Hello, {verificationData.fullName}
          </h2>
          
          <p className="text-gray-700 mb-4">
            You've selected the <strong>{verificationData.ticketType.charAt(0).toUpperCase() + verificationData.ticketType.slice(1)}</strong> ticket type for the RAADE Conference. 
            To complete your registration, please verify your email by clicking the button below:
          </p>
          
          <button 
            className="bg-[#274675] text-white px-4 py-2 rounded font-semibold"
          >
            Verify My Email
          </button>
          
          <p className="text-sm text-gray-600 mt-4">
            If the button doesn't work, you can copy and paste the following link into your browser:
          </p>
          
          <div className="bg-gray-100 p-2 rounded my-2">
            <p className="text-xs text-gray-600 break-all font-mono">
              {verificationData.verificationUrl}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            This verification link will expire in 24 hours for security reasons.
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-700 mb-4">
            If you did not attempt to register for the RAADE Conference, please disregard this email.
          </p>
        </div>
        
        <hr className="my-8 border-gray-300" />
        
        <div>
          <p className="text-sm text-gray-500 text-center">
            &copy; 2025 RAADE Conference. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 text-center">
            If you have any questions, please contact us at{' '}
            <a href="mailto:support@raadeconf.com" className="text-blue-600">
              support@raadeconf.com
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Email Template Preview</h1>
        <p className="mb-4 text-gray-600">
          This is a simplified preview of how your email templates will look. The actual emails will be rendered with React Email on the server.
        </p>
        <div className="flex gap-4 mb-4">
          <button 
            className={`px-4 py-2 rounded ${emailType === 'confirmation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setEmailType('confirmation')}
          >
            Confirmation Email
          </button>
          <button 
            className={`px-4 py-2 rounded ${emailType === 'verification' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setEmailType('verification')}
          >
            Verification Email
          </button>
        </div>
      </div>
      
      <div className="border p-4 rounded">
        {emailType === 'confirmation' ? <ConfirmationEmailPreview /> : <VerificationEmailPreview />}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h2 className="text-xl font-semibold mb-2">About React Email Templates</h2>
        <p className="mb-2">
          These are simplified HTML previews of the email templates. The actual email templates are located in:
        </p>
        <code className="bg-gray-100 p-2 block mb-4 overflow-auto">
          supabase/functions/_shared/email-templates/
        </code>
        <p className="mb-2">
          The actual email HTML is generated with React Email components that are rendered server-side when emails are sent. 
          These previews approximate how those will look but are not exact matches.
        </p>
      </div>
    </div>
  );
};

export default EmailPreview;
