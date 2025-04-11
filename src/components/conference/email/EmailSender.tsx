import React, { useState } from 'react';
import { sendConferenceEmail, createConferenceCampaign } from './brevo-integration';

/**
 * Email Sender Component
 * 
 * A utility component for sending RAADE Conference emails through Brevo
 * Supports both individual emails and bulk campaigns
 */
const EmailSender: React.FC = () => {
  const [emailType, setEmailType] = useState<'individual' | 'campaign'>('individual');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Individual email state
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('RAADE Conference 2025 - Your Invitation');
  const [senderEmail, setSenderEmail] = useState('conference@raade.org');
  const [senderName, setSenderName] = useState('RAADE Conference Team');
  
  // Campaign state
  const [campaignName, setCampaignName] = useState('RAADE Conference 2025 Announcement');
  const [listId, setListId] = useState('');

  const handleSendIndividualEmails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);
    
    try {
      // Parse recipients from comma-separated list
      const recipientList = recipients.split(',').map(item => {
        const [email, name] = item.trim().split('|');
        return { email, name: name || email.split('@')[0] };
      });
      
      // Send individual emails
      const response = await sendConferenceEmail({
        recipients: recipientList,
        subject,
        senderEmail,
        senderName
      });
      
      setResult({
        success: true,
        message: `Successfully sent ${response.count} emails.`
      });
    } catch (error) {
      console.error('Error sending emails:', error);
      setResult({
        success: false,
        message: `Error sending emails: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResult(null);
    
    try {
      // Create a campaign
      const response = await createConferenceCampaign(
        campaignName,
        parseInt(listId, 10),
        subject,
        senderEmail,
        senderName
      );
      
      setResult({
        success: true,
        message: `Successfully created campaign (ID: ${response.id}).`
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      setResult({
        success: false,
        message: `Error creating campaign: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-raade-navy mb-6">RAADE Conference Email Sender</h1>
      
      {/* Email Type Selector */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${
              emailType === 'individual'
                ? 'bg-raade-navy text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setEmailType('individual')}
          >
            Individual Emails
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${
              emailType === 'campaign'
                ? 'bg-raade-navy text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setEmailType('campaign')}
          >
            Bulk Campaign
          </button>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div
          className={`p-4 mb-6 rounded-md ${
            result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {result.message}
        </div>
      )}

      {emailType === 'individual' ? (
        <form onSubmit={handleSendIndividualEmails}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipients (comma-separated, format: email|name)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="john@example.com|John Doe, jane@example.com|Jane Smith"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: john@example.com|John Doe, jane@example.com|Jane Smith
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`px-4 py-2 bg-[#FBB03B] text-raade-navy rounded-md font-medium ${
              isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e9a62c]'
            }`}
          >
            {isSending ? 'Sending...' : 'Send Individual Emails'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleCreateCampaign}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brevo List ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              You can find your list ID in your Brevo account under Contacts
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`px-4 py-2 bg-[#FBB03B] text-raade-navy rounded-md font-medium ${
              isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e9a62c]'
            }`}
          >
            {isSending ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-md text-sm">
        <h3 className="font-semibold mb-2">Setup Instructions</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Install the Brevo SDK: <code>npm install sib-api-v3-sdk</code></li>
          <li>Add your Brevo API key to environment variables as <code>BREVO_API_KEY</code></li>
          <li>Import this component where you want to manage email sending</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailSender;
