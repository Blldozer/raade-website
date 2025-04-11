
import React, { useState } from 'react';
import RaadeConferenceEmail from '../supabase/functions/_shared/email-templates/raade-conference-email';
import ReactDOMServer from 'react-dom/server';

const EmailExportPage = () => {
  const [copied, setCopied] = useState(false);
  const [templateType, setTemplateType] = useState('preview');
  
  // Sample data for preview
  const sampleRecipient = {
    name: "Conference Attendee",
    email: "attendee@example.com"
  };

  // Generate HTML with a specific template type
  const generateHtml = (type) => {
    let htmlContent;
    
    if (type === 'brevo') {
      // For Brevo, replace the recipient.name with Brevo's personalization variable
      const brevoRecipient = {
        name: "{{ contact.FIRSTNAME }}",
        email: "{{ contact.EMAIL }}"
      };
      
      htmlContent = ReactDOMServer.renderToStaticMarkup(
        <RaadeConferenceEmail recipient={brevoRecipient} />
      );
    } else {
      // For preview, use the sample data
      htmlContent = ReactDOMServer.renderToStaticMarkup(
        <RaadeConferenceEmail recipient={sampleRecipient} />
      );
    }

    // Add DOCTYPE and HTML wrapper
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RAADE African Development Forum 2025</title>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
  };

  // Handle export to HTML file
  const handleExportToHtml = () => {
    const fullHtml = generateHtml(templateType);
    
    // Create a downloadable file
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = templateType === 'brevo' ? 
      'raade-forum-email-brevo-variables.html' : 
      'raade-forum-email.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy HTML to clipboard
  const handleCopyToClipboard = () => {
    const fullHtml = generateHtml(templateType);
    
    navigator.clipboard.writeText(fullHtml).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      },
      (err) => console.error('Could not copy text: ', err)
    );
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-simula font-bold text-raade-navy mb-6">Email Template Export</h1>
      
      <div className="mb-8">
        <p className="text-lg font-lora mb-4">
          Preview the RAADE African Development Forum email template below and export it to an HTML file
          that can be uploaded to your Brevo dashboard.
        </p>
        
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => setTemplateType('preview')}
              className={`px-4 py-2 rounded ${
                templateType === 'preview' 
                  ? 'bg-raade-navy text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Preview Version
            </button>
            <button 
              onClick={() => setTemplateType('brevo')}
              className={`px-4 py-2 rounded ${
                templateType === 'brevo' 
                  ? 'bg-raade-navy text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Brevo Version (with variables)
            </button>
          </div>
          
          {templateType === 'brevo' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm">
                <strong>Note:</strong> This version includes Brevo variables like <code>{'{{ contact.FIRSTNAME }}'}</code> that 
                will be replaced with actual recipient data when you send through Brevo.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={handleExportToHtml}
            className="bg-raade-navy text-white px-6 py-3 rounded hover:bg-opacity-90 transition-all"
          >
            Export to HTML File
          </button>
          
          <button 
            onClick={handleCopyToClipboard}
            className="bg-[#FBB03B] text-raade-navy px-6 py-3 rounded hover:bg-opacity-90 transition-all"
          >
            {copied ? 'Copied!' : 'Copy HTML to Clipboard'}
          </button>
        </div>
      </div>
      
      <div className="border p-4 rounded-lg bg-gray-50 mb-8">
        <h2 className="text-xl font-simula mb-4 text-raade-navy">Steps to Use in Brevo:</h2>
        <ol className="list-decimal pl-6 space-y-2 font-lora">
          <li>Select "Brevo Version" and click "Export to HTML File"</li>
          <li>Log in to your <a href="https://app.brevo.com/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Brevo dashboard</a></li>
          <li>Go to "Email Templates" and click "Create a template"</li>
          <li>Choose "Import HTML" and upload the exported file (or paste copied HTML)</li>
          <li>Make sure your contact list includes a "FIRSTNAME" field for each recipient</li>
          <li>Save the template in Brevo to use in your campaigns</li>
        </ol>
      </div>
      
      <div className="border-2 p-4 rounded-lg">
        <h2 className="text-xl font-simula mb-4 text-raade-navy">Preview:</h2>
        <div className="overflow-auto" style={{ maxHeight: '600px' }}>
          {templateType === 'preview' ? (
            <RaadeConferenceEmail recipient={sampleRecipient} />
          ) : (
            <div className="p-4 bg-gray-100 rounded">
              <p className="mb-4"><strong>Brevo Version:</strong> Shows dynamic variables that will be replaced</p>
              <p>
                <strong>Hello {'{{ contact.FIRSTNAME }}'}!</strong><br/><br/>
                I can't tell you how excited our entire team is to welcome you to the RAADE African Development Forum at Rice University! 
                There's something special about bringing together minds passionate about African development...
              </p>
              <p className="mt-4 text-sm text-gray-500">
                (Export this version to get the complete template with all Brevo variables)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailExportPage;
