
import React from 'react';
import * as ReactEmail from '@react-email/components';

const {
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
  Img,
} = ReactEmail;

/**
 * Verification Email Preview Component
 * 
 * This component renders a preview of the email verification template.
 * It's used in development for testing and previewing how the verification
 * email will appear to users.
 */
const VerificationEmail: React.FC = () => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email for RAADE Conference</Preview>
      <Tailwind>
        <Body className="font-sans bg-white">
          <Container className="max-w-[600px] mx-auto p-4">
            <Section className="mb-8">
              <Img 
                src="https://raadeconf.com/logos/RAADE-logo-final-black.png" 
                alt="RAADE Conference Logo" 
                className="h-16 mb-4 mx-auto" 
              />
              <Heading className="text-2xl font-bold text-[#274675] mb-2 text-center">
                Email Verification Required
              </Heading>
              <Text className="text-gray-700 text-center">
                Please verify your email to complete your conference registration
              </Text>
            </Section>

            <Section className="mb-8 bg-gray-50 p-4 rounded-lg">
              <Heading className="text-xl font-semibold text-[#274675] mb-2">
                Hello, Conference Attendee
              </Heading>
              
              <Text className="text-gray-700 mb-4">
                Thank you for registering for the RAADE Conference! To complete your registration, 
                please verify your email address by entering the verification code below.
              </Text>
              
              <Box className="bg-white p-6 rounded my-6 border border-gray-300 text-center">
                <Text className="font-mono text-2xl font-bold tracking-widest text-[#274675]">
                  123456
                </Text>
              </Box>
              
              <Text className="text-gray-700 mb-4">
                Alternatively, you can click the button below to verify your email address directly.
              </Text>
              
              <Button 
                className="bg-[#274675] text-white px-4 py-2 mt-2 rounded font-semibold w-full text-center"
                href="https://example.com/verify"
              >
                Verify Email Address
              </Button>
              
              <Text className="text-sm text-gray-500 mt-4">
                This verification code will expire in 24 hours.
              </Text>
            </Section>
            
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                If you did not register for the RAADE Conference, you can safely ignore this email.
              </Text>
              
              <Text className="text-gray-700 mb-4">
                For any questions, please contact us at{' '}
                <Link href="mailto:support@raadeconf.com" className="text-blue-600">
                  support@raadeconf.com
                </Link>
              </Text>
            </Section>
            
            <Hr className="my-6 border-gray-300" />
            
            <Section className="text-center">
              <Text className="text-sm text-gray-500">
                &copy; 2025 RAADE Conference. All rights reserved.
              </Text>
              <Text className="text-xs text-gray-500 mt-2">
                Rice Association for African Development | Houston, TX
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
