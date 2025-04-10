import React from 'react';
import { NextStepsEmail, NextStepsEmailProps } from './next-steps-email-browser';

/**
 * Preview version of the Next Steps Email template
 * 
 * This component renders a standalone version of the Next Steps Email
 * that can be embedded in a page for preview purposes without
 * requiring the full React Email server-side rendering setup.
 */
const NextStepsEmailPreview = (props: NextStepsEmailProps) => {
  return (
    <div className="font-sans bg-white">
      <div className="max-w-[600px] mx-auto p-4">
        <div className="mb-8">
          <img 
            src="/logos/RAADE-logo-final-black.png" 
            alt="RAADE Conference Logo" 
            className="h-16 mb-4 mx-auto" 
          />
          <h2 className="text-2xl font-bold text-[#274675] mb-2 text-center">
            Your RAADE Conference Registration
          </h2>
          <p className="text-gray-700 text-center">
            Important next steps and information for attendees
          </p>
        </div>

        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-[#274675] mb-2">
            Hello, {props.fullName || 'Conference Attendee'}
          </h3>
          
          <p className="text-gray-700 mb-4">
            Thank you for registering for the RAADE Conference with a <strong>{props.ticketType || 'Professional'}</strong> ticket! 
            We're excited to have you join us for this transformative event.
          </p>
          
          <h4 className="text-lg font-semibold text-[#274675] mt-6 mb-2">
            Here are your next steps:
          </h4>
          
          <div className="bg-white p-3 rounded my-4 border-l-4 border-[#274675]">
            <p className="font-semibold text-[#274675] mb-1">1. Mark your calendar</p>
            <p className="text-gray-700 text-sm">
              The conference will take place on <strong>{props.conferenceDate || 'April 11-12, 2025'}</strong> at <strong>{props.venueAddress || 'Rice University, Houston, TX'}</strong>.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded my-4 border-l-4 border-[#FBB03B]">
            <p className="font-semibold text-[#274675] mb-1">2. Book your accommodation</p>
            <p className="text-gray-700 text-sm">
              We recommend booking your accommodation as soon as possible. Our recommended hotels are listed on the conference website.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded my-4 border-l-4 border-[#274675]">
            <p className="font-semibold text-[#274675] mb-1">3. Review the schedule</p>
            <p className="text-gray-700 text-sm">
              Check out our exciting lineup of speakers and sessions on the conference website.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded my-4 border-l-4 border-[#FBB03B]">
            <p className="font-semibold text-[#274675] mb-1">4. Connect with us</p>
            <p className="text-gray-700 text-sm">
              Follow us on social media for the latest updates and announcements.
            </p>
          </div>
          
          <button 
            className="bg-[#274675] text-white px-4 py-2 mt-4 rounded font-semibold w-full text-center"
          >
            Visit Conference Website
          </button>
        </div>
        
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-[#274675] mb-2">
            What to Expect
          </h4>
          <p className="text-gray-700 mb-4">
            The RAADE Conference will feature keynote speakers, panel discussions, workshops, and networking opportunities. 
            There will be ample time to connect with African organizations and leaders.
          </p>
          
          <p className="text-gray-700 mb-4">
            If you have any questions before the conference, please contact us at{' '}
            <a href="mailto:support@raadeconf.com" className="text-blue-600">
              support@raadeconf.com
            </a>
          </p>
        </div>
        
        <hr className="my-6 border-gray-300" />
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 RAADE Conference. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Rice Association for African Development | Houston, TX
          </p>
        </div>
      </div>
    </div>
  );
};

export default NextStepsEmailPreview;
