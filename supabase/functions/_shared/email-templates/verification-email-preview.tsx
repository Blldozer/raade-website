import React from 'react';

// Create a simpler preview version that doesn't rely on React Email components
const VerificationEmail = ({
  fullName = 'John Doe',
  verificationUrl = 'https://raadeconf.com/verify?token=sample-token',
  ticketType = 'professional',
}) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = typeof ticketType === 'string'
    ? ticketType.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Professional';
    
  return (
    <div className="font-sans bg-white">
      <div className="max-w-600 mx-auto p-8">
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
            Thank you for starting your registration for the RAADE Conference!
            Please verify your email to continue the registration process.
          </p>
        </div>

        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#274675] mb-4">
            Hello, {fullName}
          </h2>
          
          <p className="text-gray-700 mb-4">
            You've selected the <strong>{formattedTicketType}</strong> ticket type for the RAADE Conference. 
            To complete your registration, please verify your email by clicking the button below:
          </p>
          
          <button 
            className="bg-[#274675] text-white px-6 py-3 rounded font-semibold w-full mb-4"
          >
            Verify My Email
          </button>
          
          <p className="text-sm text-gray-600 mt-4">
            If the button doesn't work, you can copy and paste the following link into your browser:
          </p>
          
          <div className="bg-gray-100 p-2 rounded my-2">
            <p className="text-xs text-gray-600 break-all font-mono">
              {verificationUrl}
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
        
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">&copy; 2025 RAADE Conference. All rights reserved.</p>
          <p>
            If you have any questions, please contact us at{' '}
            <a href="mailto:support@raadeconf.com" className="text-[#274675]">
              support@raadeconf.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmail;
