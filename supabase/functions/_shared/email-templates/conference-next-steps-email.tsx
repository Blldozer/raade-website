
/// <reference path="../types/deno-imports.d.ts" />
/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx, Fragment } from 'npm:react/jsx-runtime';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from 'npm:@react-email/components';

interface ConferenceNextStepsEmailProps {
  firstName?: string;
  fullName?: string;
  conferenceLink?: string;
  mapLink?: string;
}

/**
 * Conference Next Steps Email Template
 * 
 * Branded email template for RAADE conference communications
 * Features:
 * - RAADE brand colors and styling
 * - Responsive design for all devices
 * - Custom typography using web-safe fonts that match Simula Book and Lora
 * - Detailed conference information and schedule
 * - Call-to-actions for participants
 */
export const ConferenceNextStepsEmail = ({
  firstName = "there",
  fullName = "",
  conferenceLink = "https://rice-raade.com",
  mapLink = "https://goo.gl/maps/RAADE",
}: ConferenceNextStepsEmailProps) => {
  // Extract first name if not provided separately
  const displayName = firstName || (fullName ? fullName.split(' ')[0] : "there");
  
  return (
    <Html>
      <Head />
      <Preview>{displayName}, We're Excited to Welcome You to RAADE at Rice!</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Header with RAADE Logo */}
          <Section style={headerStyle}>
            <Img
              src="https://raadeconf.com/logos/RAADE-logo-final-black.png"
              width="220"
              height="60"
              alt="RAADE Logo"
              style={logoStyle}
            />
          </Section>

          {/* Main Content */}
          <Section style={mainContentStyle}>
            <Heading style={mainHeadingStyle}>
              Hello {displayName}!
            </Heading>
            
            <Text style={paragraphStyle}>
              I can't tell you how excited our entire team is to welcome you to the RAADE Conference at Rice University! 
              There's something special about bringing together minds passionate about African development, and we're thrilled 
              you'll be joining us for what promises to be two days of meaningful connections and impactful work.
            </Text>
            
            <Text style={paragraphStyle}>
              As someone who's been involved in planning this event from the beginning, I've seen firsthand how much 
              thought has gone into creating an experience that's both inspiring and practical. We're not just another 
              conference with endless PowerPoints - we're building a community of changemakers.
            </Text>
            
            <Heading style={sectionHeadingStyle}>
              Here's what you need to know:
            </Heading>
            
            <Section style={infoBoxStyle}>
              <Heading style={infoHeadingStyle}>
                Conference Schedule:
              </Heading>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <Text style={listTextStyle}>
                    <strong>Friday, April 11:</strong> Welcome Event at the Multicultural Center at 5:30pm (check-in begins at 4pm)
                  </Text>
                </li>
                <li style={listItemStyle}>
                  <Text style={listTextStyle}>
                    <strong>Saturday, April 12:</strong> Main Conference Day at the Glasscock School of Continuing Studies from 9am-5:30pm
                  </Text>
                </li>
                <li style={listItemStyle}>
                  <Text style={listTextStyle}>
                    <strong>Saturday Morning:</strong> Breakfast available at Ann Siebel Servery from 8am-9am
                  </Text>
                </li>
              </ul>
            </Section>
            
            <Section style={infoBoxStyle}>
              <Heading style={infoHeadingStyle}>
                Parking Information:
              </Heading>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <Text style={listTextStyle}>
                    <strong>Friday, April 11:</strong> Please park at the Cambridge Office Building Garage
                  </Text>
                </li>
                <li style={listItemStyle}>
                  <Text style={listTextStyle}>
                    <strong>Saturday, April 12:</strong> Please park at West Lot 4
                  </Text>
                </li>
              </ul>
              <Text style={noteStyle}>
                We've taken care of parking for you - just bring your ticket to the registration desk for validation. No need to worry about parking fees!
              </Text>
              
              <Text style={paragraphStyle}>
                To help you navigate campus easily, we've created a custom Google Maps guide highlighting all conference locations:
              </Text>
              
              <Button
                href={mapLink}
                style={buttonStyle}
              >
                RAADE Forum Locations
              </Button>
            </Section>
            
            <Heading style={sectionHeadingStyle}>
              The Heart of RAADE - Our Interactive Workshops:
            </Heading>
            
            <Text style={paragraphStyle}>
              What I'm most excited about is our case study workshops. Instead of just talking about challenges 
              across the African continent, we'll be rolling up our sleeves together to develop potential solutions.
            </Text>
            
            <Text style={paragraphStyle}>
              These workshops are designed to be collaborative and engaging - creating natural opportunities for you to 
              connect with others who share your specific interests. We've found this approach creates much more 
              meaningful relationships than typical networking events.
            </Text>
            
            <Section style={infoBoxStyle}>
              <Heading style={infoHeadingStyle}>
                Case Study Selection:
              </Heading>
              <Text style={paragraphStyle}>
                You'll soon receive a follow-up email with details about the case studies available and instructions 
                on how to select your preferred workshop. This will help us finalize arrangements based on your interests.
              </Text>
              <Text style={noteStyle}>
                Please know that no prior expertise is required - these workshops thrive on diverse perspectives and fresh thinking!
              </Text>
            </Section>
            
            <Heading style={sectionHeadingStyle}>
              Stay Connected:
            </Heading>
            
            <Text style={paragraphStyle}>
              Join our community before the conference:
            </Text>
            
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <Text style={listTextStyle}>
                  Follow our journey on Instagram: <Link href="https://instagram.com/rice_raade" style={linkStyle}>@rice_raade</Link>
                </Text>
              </li>
              <li style={listItemStyle}>
                <Text style={listTextStyle}>
                  Explore our website: <Link href={conferenceLink} style={linkStyle}>rice-raade.com</Link>
                </Text>
              </li>
            </ul>
            
            <Text style={paragraphStyle}>
              If you have any questions before the big day, please don't hesitate to reach out to us at 
              <Link href="mailto:raade@rice.edu" style={linkStyle}> raade@rice.edu</Link>. We're here to help!
            </Text>
            
            <Text style={paragraphStyle}>
              I'm looking forward to meeting you at Rice University. Until then, warmest regards from all of us at RAADE!
            </Text>
            
            <Text style={signatureStyle}>
              Ife Idakolo<br />
              Co-Executive Director<br />
              Rice Association for African Development
            </Text>
            
            <Text style={postscriptStyle}>
              P.S. Is there anything specific you're hoping to get out of the conference? Feel free to reply and let us know!
            </Text>
          </Section>
          
          {/* Footer */}
          <Section style={footerStyle}>
            <Hr style={dividerStyle} />
            <Text style={footerTextStyle}>
              © 2025 Rice Association for African Development. All rights reserved.
            </Text>
            <Text style={footerAddressStyle}>
              Rice University, 6100 Main St, Houston, TX 77005
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const bodyStyle = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Georgia, serif', // Web-safe alternative to Lora
  margin: '0',
  padding: '0',
};

const containerStyle = {
  margin: '0 auto',
  padding: '20px 0',
  width: '100%',
  maxWidth: '600px',
};

const headerStyle = {
  backgroundColor: '#FFFFFF',
  padding: '20px',
  textAlign: 'center' as const,
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const logoStyle = {
  margin: '0 auto',
};

const mainContentStyle = {
  backgroundColor: '#FFFFFF',
  padding: '30px',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const mainHeadingStyle = {
  fontFamily: 'Arial, sans-serif', // Web-safe alternative to Simula Book
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#274675', // RAADE Navy Blue
  marginBottom: '20px',
  marginTop: '0',
};

const sectionHeadingStyle = {
  fontFamily: 'Arial, sans-serif', // Web-safe alternative to Simula Book
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#274675', // RAADE Navy Blue
  marginTop: '25px',
  marginBottom: '15px',
};

const infoHeadingStyle = {
  fontFamily: 'Arial, sans-serif', // Web-safe alternative to Simula Book
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#274675', // RAADE Navy Blue
  marginTop: '0',
  marginBottom: '10px',
};

const paragraphStyle = {
  fontFamily: 'Georgia, serif', // Web-safe alternative to Lora
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#3C403A', // RAADE Light accent: Oslo gray
  marginBottom: '15px',
};

const infoBoxStyle = {
  backgroundColor: '#F4F5F4', // RAADE Light shades: Athens gray
  padding: '20px',
  borderRadius: '6px',
  marginBottom: '20px',
  border: '1px solid #E5E7E5',
};

const listStyle = {
  paddingLeft: '25px',
  margin: '10px 0 15px',
};

const listItemStyle = {
  marginBottom: '8px',
};

const listTextStyle = {
  fontFamily: 'Georgia, serif', // Web-safe alternative to Lora
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#3C403A', // RAADE Light accent: Oslo gray
  margin: '0',
};

const noteStyle = {
  fontFamily: 'Georgia, serif', // Web-safe alternative to Lora
  fontSize: '16px',
  fontStyle: 'italic',
  lineHeight: '1.5',
  color: '#3C403A', // RAADE Light accent: Oslo gray
  marginTop: '15px',
  marginBottom: '15px',
  borderLeft: `4px solid #FBB03B`, // RAADE Dark Accent: yellow-orange
  paddingLeft: '15px',
};

const buttonStyle = {
  backgroundColor: '#274675', // RAADE Navy Blue
  color: '#FFFFFF',
  fontFamily: 'Arial, sans-serif', // Web-safe alternative to Simula Book
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '12px 20px',
  borderRadius: '4px',
  margin: '10px 0 20px',
  display: 'inline-block',
};

const linkStyle = {
  color: '#274675', // RAADE Navy Blue
  fontWeight: 'bold',
  textDecoration: 'underline',
};

const signatureStyle = {
  fontFamily: 'Georgia, serif', // Web-safe alternative to Lora
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#3C403A', // RAADE Light accent: Oslo gray
  marginTop: '25px',
  marginBottom: '20px',
};

const postscriptStyle = {
  fontFamily: 'Georgia, serif', // Web-safe alternative to Lora
  fontSize: '16px',
  fontStyle: 'italic',
  lineHeight: '1.5',
  color: '#3C403A', // RAADE Light accent: Oslo gray
  marginTop: '25px',
};

const footerStyle = {
  padding: '20px',
  textAlign: 'center' as const,
};

const dividerStyle = {
  borderTop: '1px solid #E5E7E5',
  margin: '0 0 20px',
};

const footerTextStyle = {
  fontFamily: 'Arial, sans-serif', // Web-safe alternative to Simula Book
  fontSize: '14px',
  color: '#7B7F7D',
  margin: '0 0 5px',
};

const footerAddressStyle = {
  fontFamily: 'Arial, sans-serif', // Web-safe alternative to Simula Book
  fontSize: '12px',
  color: '#A0A4A2',
  margin: '0',
};

export default ConferenceNextStepsEmail;
