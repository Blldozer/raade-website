
import * as React from 'npm:react@18.2.0';
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
} from 'npm:@react-email/components@0.0.7';

export interface NextStepsEmailProps {
  fullName: string;
  ticketType: string;
  conferenceDate: string;
  venueAddress: string;
  conferenceUrl: string;
}

export const NextStepsEmail: React.FC<NextStepsEmailProps> = ({
  fullName,
  ticketType,
  conferenceDate,
  venueAddress,
  conferenceUrl = 'https://raadeconf.com',
}) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = ticketType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Html>
      <Head />
      <Preview>RAADE Conference 2025 - Next Steps for Your Registration</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-600 p-4">
            <Section className="mb-8">
              <Heading className="text-[#274675] text-2xl font-bold text-center mb-4">
                Your RAADE Conference Registration
              </Heading>
              <Text className="text-gray-700 text-center">
                Important next steps and information for attendees
              </Text>
            </Section>
            
            <Section className="mb-8 bg-gray-50 p-6 rounded-lg">
              <Text className="text-xl font-semibold text-[#274675]">
                Hello, {fullName}
              </Text>
              
              <Text className="text-gray-700 mb-4">
                Thank you for registering for the RAADE Conference with a <strong>{formattedTicketType}</strong> ticket! 
                We're excited to have you join us for this transformative event.
              </Text>
              
              <Heading className="text-lg font-semibold text-[#274675] mt-6 mb-4">
                Here are your next steps:
              </Heading>
              
              <Box className="bg-white p-4 rounded my-4 border-l-4 border-[#274675]">
                <Text className="font-semibold text-[#274675] mb-1">1. Mark your calendar</Text>
                <Text className="text-gray-700 text-sm">
                  The conference will take place on <strong>{conferenceDate}</strong> at <strong>{venueAddress}</strong>.
                </Text>
              </Box>
              
              <Box className="bg-white p-4 rounded my-4 border-l-4 border-[#FBB03B]">
                <Text className="font-semibold text-[#274675] mb-1">2. Book your accommodation</Text>
                <Text className="text-gray-700 text-sm">
                  We recommend booking your accommodation as soon as possible. Our recommended hotels are listed on the conference website.
                </Text>
              </Box>
              
              <Box className="bg-white p-4 rounded my-4 border-l-4 border-[#274675]">
                <Text className="font-semibold text-[#274675] mb-1">3. Review the schedule</Text>
                <Text className="text-gray-700 text-sm">
                  Check out our exciting lineup of speakers and sessions on the conference website.
                </Text>
              </Box>
              
              <Box className="bg-white p-4 rounded my-4 border-l-4 border-[#FBB03B]">
                <Text className="font-semibold text-[#274675] mb-1">4. Connect with us</Text>
                <Text className="text-gray-700 text-sm">
                  Follow us on social media for the latest updates and announcements.
                </Text>
              </Box>
              
              <Section className="text-center mt-6">
                <Button 
                  href={conferenceUrl}
                  className="bg-[#274675] text-white px-4 py-2 rounded font-semibold"
                >
                  Visit Conference Website
                </Button>
              </Section>
            </Section>
            
            <Section className="mb-8">
              <Heading className="text-lg font-semibold text-[#274675] mb-2">
                What to Expect
              </Heading>
              <Text className="text-gray-700 mb-4">
                The RAADE Conference will feature keynote speakers, panel discussions, workshops, and networking opportunities. 
                There will be ample time to connect with African organizations and leaders.
              </Text>
              
              <Text className="text-gray-700 mb-4">
                If you have any questions before the conference, please contact us at{' '}
                <Link href="mailto:support@raadeconf.com" className="text-blue-600">
                  support@raadeconf.com
                </Link>
              </Text>
            </Section>
            
            <Hr className="border-gray-300 my-6" />
            
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

export default NextStepsEmail;
