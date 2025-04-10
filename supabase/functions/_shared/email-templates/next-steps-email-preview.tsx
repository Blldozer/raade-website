import React from 'react';

// Create a simpler preview version that doesn't rely on React Email components
const NextStepsEmail = ({
  fullName = 'John Doe',
  ticketType = 'Professional',
  conferenceDate = 'April 11-12, 2025',
  venueAddress = 'Rice University, 6100 Main St, Houston, TX 77005',
  conferenceUrl = 'https://raadeconf.com',
}) => {
  // Format ticket type display
  const formattedTicketType = typeof ticketType === 'string' 
    ? ticketType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
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
            Your RAADE Conference Next Steps
          </h1>
          <p className="text-gray-700">
            Thank you for registering for the RAADE Conference! Here's what you need to know next.
          </p>
        </div>

        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#274675] mb-4">
            Hello {fullName},
          </h2>
          
          <p className="text-gray-700 mb-4">
            We're excited that you'll be joining us with a <strong>{formattedTicketType}</strong> ticket. 
            Here's some important information to help you prepare for the event.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#274675] mb-4">
            Conference Details
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <h3 className="font-semibold text-[#274675]">Dates</h3>
              <p className="text-gray-700">{conferenceDate}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-[#274675]">Venue</h3>
              <p className="text-gray-700">{venueAddress}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#274675]">Check-In</h3>
              <p className="text-gray-700">Registration opens at 8:00 AM each day. Please arrive early on your first day to collect your badge and conference materials.</p>
            </div>
          </div>
          
          <button 
            className="bg-[#274675] text-white px-6 py-3 rounded font-semibold w-full mb-4"
          >
            Add to Calendar
          </button>
          
          <button 
            className="bg-white border border-[#274675] text-[#274675] px-6 py-3 rounded font-semibold w-full"
          >
            View Schedule
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#274675] mb-4">
            Getting Prepared
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-700">Pre-Conference Networking</h3>
              <p className="text-blue-600">Join our online forum to connect with other attendees before the event.</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-700">Download the App</h3>
              <p className="text-purple-600">Get the conference app for real-time updates and personalized scheduling.</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-700">Travel & Accommodation</h3>
              <p className="text-green-600">Check our website for recommended hotels and transportation options.</p>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-300" />
        
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            We look forward to seeing you at the conference! If you have any questions in the meantime, please don't hesitate to contact us.
          </p>
          
          <a 
            href={`mailto:support@raadeconf.com`}
            className="text-[#274675] font-semibold"
          >
            support@raadeconf.com
          </a>
        </div>
        
        <hr className="my-8 border-gray-300" />
        
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">&copy; 2025 RAADE Conference. All rights reserved.</p>
          <p>
            <a href={conferenceUrl} className="text-[#274675]">Visit our website</a>
            {' • '}
            <a href="#" className="text-[#274675]">Unsubscribe</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NextStepsEmail;
