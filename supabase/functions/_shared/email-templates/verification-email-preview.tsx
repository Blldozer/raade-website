import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Box,
  Hr,
  Link,
  Button,
} from '@react-email/components';

export interface VerificationEmailProps {
  fullName?: string;
  verificationUrl?: string;
  ticketType?: string;
}

export const VerificationEmail = ({
  fullName = 'John Doe',
  verificationUrl = 'https://raadeconf.com/verify?token=sample-token',
  ticketType = 'professional',
}: VerificationEmailProps) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = ticketType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Html>
      <Head />
      <Preview>Verify your email for RAADE Conference Registration</Preview>
      <Tailwind>
        <Body className="font-sans bg-white">
          <Container className="max-w-[600px] mx-auto p-4">
            <Section className="mb-8">
              <img 
                src="https://raadeconf.com/raade-logo.png" 
                alt="RAADE Conference Logo" 
                className="h-16 mb-4" 
              />
              <Heading className="text-2xl font-bold text-[#274675] mb-2">
                Email Verification
              </Heading>
              <Text className="text-gray-700">
                Thank you for starting your registration for the RAADE Conference! Please verify your email to continue the registration process.
              </Text>
            </Section>

            <Section className="mb-8 bg-gray-50 p-4 rounded-lg">
              <Heading className="text-xl font-semibold text-[#274675] mb-2">
                Hello, {fullName}
              </Heading>
              
              <Text className="text-gray-700 mb-4">
                You've selected the <strong>{formattedTicketType}</strong> ticket type for the RAADE Conference. 
                To complete your registration, please verify your email by clicking the button below:
              </Text>
              
              <Button 
                className="bg-[#274675] text-white px-4 py-2 rounded font-semibold"
                href={verificationUrl}
              >
                Verify My Email
              </Button>
              
              <Text className="text-sm text-gray-600 mt-4">
                If the button doesn't work, you can copy and paste the following link into your browser:
              </Text>
              
              <Box className="bg-gray-100 p-2 rounded my-2">
                <Text className="text-xs text-gray-600 break-all font-mono">
                  {verificationUrl}
                </Text>
              </Box>
              
              <Text className="text-sm text-gray-600 mt-4">
                This verification link will expire in 24 hours for security reasons.
              </Text>
            </Section>
            
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                If you did not attempt to register for the RAADE Conference, please disregard this email.
              </Text>
            </Section>
            
            <Hr className="my-8 border-gray-300" />
            
            <Section>
              <Text className="text-sm text-gray-500 text-center">
                &copy; 2025 RAADE Conference. All rights reserved.
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                If you have any questions, please contact us at{' '}
                <Link href="mailto:support@raadeconf.com" className="text-blue-600">
                  support@raadeconf.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
