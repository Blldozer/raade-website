
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
} from 'https://esm.sh/@react-email/components@0.0.7';
import * as React from 'https://esm.sh/react@18.2.0';

export interface VerificationEmailProps {
  fullName: string;
  token: string;
  ticketType: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  fullName,
  token,
  ticketType,
}) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = ticketType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Html>
      <Head />
      <Preview>RAADE Conference 2025 - Email Verification</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-600 p-4">
            <Section className="bg-[#274675] text-center p-5 rounded-t-md">
              <Heading className="text-white text-2xl font-bold m-0">Email Verification</Heading>
            </Section>
            
            <Section className="bg-white p-6 border border-solid border-gray-200 rounded-b-md">
              <Text className="text-gray-800">Dear {fullName},</Text>
              
              <Text className="text-gray-800">
                Thank you for registering for the RAADE Annual Conference 2025! Please verify your email address to complete your registration.
              </Text>
              
              <Box className="bg-gray-50 p-4 mb-4 rounded-md">
                <Text className="text-gray-800 text-center">Your verification code is:</Text>
                <Text className="text-center font-bold text-2xl bg-gray-100 p-3 tracking-wide rounded">
                  {token}
                </Text>
                <Text className="text-gray-600 text-sm text-center">
                  Please enter this code on the verification page to confirm your email address.
                </Text>
              </Box>
              
              <Text className="text-gray-800">
                You're registering with a <strong>{formattedTicketType}</strong> ticket. This code will expire in 24 hours.
              </Text>
              
              <Text className="text-gray-800">
                If you have any issues, please contact us at <Link href="mailto:conference@raade.org">conference@raade.org</Link> for assistance.
              </Text>
              
              <Text className="text-gray-800">
                Best regards,<br />
                The RAADE Conference Team
              </Text>
              
              <Hr className="border-t border-gray-300 my-6" />
              
              <Text className="text-gray-500 text-xs text-center">
                &copy; 2024 RAADE - Rice Association for African Development<br />
                This is an automated message from the conference registration system.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
