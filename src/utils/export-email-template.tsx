
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import RaadeConferenceEmail from '../supabase/functions/_shared/email-templates/raade-conference-email';

/**
 * Export Email Template Utility
 * 
 * This script converts the React email template to static HTML
 * which can be uploaded to Brevo's dashboard.
 */

// Sample recipient data for template preview
const sampleRecipient = {
  name: "Conference Attendee",
  email: "attendee@example.com"
};

// Render the React component to an HTML string
const htmlContent = ReactDOMServer.renderToStaticMarkup(
  <RaadeConferenceEmail recipient={sampleRecipient} />
);

// Add DOCTYPE and HTML wrapper
const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RAADE Conference 2025</title>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

// Save the HTML to a file
const outputPath = path.join(process.cwd(), 'raade-conference-email.html');
fs.writeFileSync(outputPath, fullHtml);

console.log(`HTML email template exported to: ${outputPath}`);
