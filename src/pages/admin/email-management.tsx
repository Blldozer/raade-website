import React from 'react';
import EmailSender from '../../components/conference/email/EmailSender';

/**
 * Email Management Page
 * 
 * Admin page for managing conference emails and sending campaigns
 * through the Brevo integration.
 */
const EmailManagement = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-simula font-bold text-raade-navy mb-8">Email Management</h1>
      
      <div className="mb-8">
        <p className="text-lg font-lora mb-4">
          This page allows you to send RAADE Conference emails to attendees through Brevo's email service.
          You can send individual emails or create bulk campaigns.
        </p>
      </div>
      
      <EmailSender />
    </div>
  );
};

export default EmailManagement;
