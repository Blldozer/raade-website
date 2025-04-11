import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import ReactDOMServer from 'react-dom/server';
import RaadeConferenceEmail from '../../../supabase/functions/_shared/email-templates/raade-conference-email';

/**
 * Brevo (formerly Sendinblue) Integration Service
 * 
 * This service handles sending emails through Brevo's API using the RAADE Conference email template
 */

// Configuration setup for Brevo
const configureBrevoClient = () => {
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY || '';

  if (!apiKey.apiKey) {
    console.error('Brevo API key is not set in environment variables');
    throw new Error('Brevo API key is missing');
  }

  return new SibApiV3Sdk.TransactionalEmailsApi();
};

/**
 * Interface for recipient details
 */
interface Recipient {
  email: string;
  name: string;
}

/**
 * Interface for conference email data
 */
interface ConferenceEmailData {
  recipients: Recipient[];
  subject: string;
  senderEmail: string;
  senderName: string;
}

/**
 * Sends the RAADE Conference email to specified recipients using Brevo
 * 
 * @param data Email configuration data
 * @returns Promise resolving to the email sending result
 */
export const sendConferenceEmail = async (data: ConferenceEmailData) => {
  try {
    const apiInstance = configureBrevoClient();

    // Convert React template to HTML string for each recipient
    const sendEmailPromises = data.recipients.map(async (recipient) => {
      // Render the React component to HTML string
      const emailHtml = ReactDOMServer.renderToString(
        RaadeConferenceEmail({ name: recipient.name })
      );

      // Construct email object for Brevo API
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      
      sendSmtpEmail.to = [{ email: recipient.email, name: recipient.name }];
      sendSmtpEmail.subject = data.subject;
      sendSmtpEmail.htmlContent = emailHtml;
      sendSmtpEmail.sender = { email: data.senderEmail, name: data.senderName };
      
      // Additional email properties
      sendSmtpEmail.replyTo = { email: data.senderEmail, name: data.senderName };
      sendSmtpEmail.headers = { 'X-RAADE-Conference': '2025' };
      
      // Track email engagement
      sendSmtpEmail.params = {
        conference: 'RAADE 2025',
        recipient_name: recipient.name,
      };

      // Send email through Brevo API
      return apiInstance.sendTransacEmail(sendSmtpEmail);
    });

    // Wait for all email sending operations to complete
    const results = await Promise.all(sendEmailPromises);
    console.log(`Successfully sent ${results.length} emails through Brevo`);
    return { success: true, count: results.length };
  } catch (error) {
    console.error('Error sending emails through Brevo:', error);
    throw error;
  }
};

/**
 * Sends a bulk campaign email to a larger list of recipients
 * 
 * @param campaignName Name of the email campaign
 * @param listId ID of the contact list in Brevo
 * @param subject Email subject line
 * @param senderEmail Sender's email address
 * @param senderName Sender's name
 * @returns Promise resolving to the campaign creation result
 */
export const createConferenceCampaign = async (
  campaignName: string,
  listId: number,
  subject: string,
  senderEmail: string,
  senderName: string
) => {
  try {
    // Get default API client and set API key
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY || '';

    // Create an instance of the Email Campaigns API
    const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();

    // Render the React component to HTML string with a generic name
    const emailHtml = ReactDOMServer.renderToString(
      RaadeConferenceEmail({ name: '{FIRSTNAME}' }) // Brevo will replace this with the actual first name
    );

    // Create campaign object
    const emailCampaign = new SibApiV3Sdk.CreateEmailCampaign();
    
    emailCampaign.name = campaignName;
    emailCampaign.subject = subject;
    emailCampaign.sender = { name: senderName, email: senderEmail };
    emailCampaign.htmlContent = emailHtml;
    emailCampaign.recipients = { listIds: [listId] };
    
    // Schedule for later or send immediately
    // emailCampaign.scheduledAt = '2025-04-01T09:00:00Z'; // Optional: Schedule for later
    
    // Create the campaign in Brevo
    const result = await apiInstance.createEmailCampaign(emailCampaign);
    console.log('Campaign created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating email campaign:', error);
    throw error;
  }
};

/**
 * Helper function to convert the RAADE email template to a plain HTML string
 * This is useful for testing or integrating with other systems
 * 
 * @param name Recipient's name
 * @returns HTML string of the email
 */
export const getConferenceEmailHtml = (name: string = 'Attendee') => {
  return ReactDOMServer.renderToString(RaadeConferenceEmail({ name }));
};
