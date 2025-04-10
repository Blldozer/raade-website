
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
  Img,
} from '@react-email/components';

export interface NextStepsEmailProps {
  fullName?: string;
  ticketType?: string;
  conferenceDate?: string;
  venueAddress?: string;
  conferenceUrl?: string;
}

/**
 * Next Steps Email Template
 * 
 * Sends conference attendees important information about next steps
 * after they have registered for the RAADE Conference. Includes:
 * - Calendar information
 * - Accommodation recommendations
 * - Schedule link
 * - Preparation tips
 * - Social media links
 */
export const NextStepsEmail = ({
  fullName = 'Conference Attendee',
  ticketType = 'professional',
  conferenceDate = 'April 11-12, 2025',
  venueAddress = 'Rice University, Houston, TX',
  conferenceUrl = 'https://raadeconf.com',
}: NextStepsEmailProps) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = ticketType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Html>
      <Head />
      <Preview>Next Steps for Your RAADE Conference Registration</Preview>
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
                Your RAADE Conference Registration
              </Heading>
              <Text className="text-gray-700 text-center">
                Important next steps and information for attendees
              </Text>
            </Section>

            <Section className="mb-8 bg-gray-50 p-4 rounded-lg">
              <Heading className="text-xl font-semibold text-[#274675] mb-2">
                Hello, {fullName}
              </Heading>
              
              <Text className="text-gray-700 mb-4">
                Thank you for registering for the RAADE Conference with a <strong>{formattedTicketType}</strong> ticket! 
                We're excited to have you join us for this transformative event.
              </Text>
              
              <Heading className="text-lg font-semibold text-[#274675] mt-6 mb-2">
                Here are your next steps:
              </Heading>
              
              <Box className="bg-white p-3 rounded my-4 border-l-4 border-[#274675]">
                <Text className="font-semibold text-[#274675] mb-1">1. Mark your calendar</Text>
                <Text className="text-gray-700 text-sm">
                  The conference will take place on <strong>{conferenceDate}</strong> at <strong>{venueAddress}</strong>.
                </Text>
              </Box>
              
              <Box className="bg-white p-3 rounded my-4 border-l-4 border-[#FBB03B]">
                <Text className="font-semibold text-[#274675] mb-1">2. Book your accommodation</Text>
                <Text className="text-gray-700 text-sm">
                  We recommend booking your accommodation as soon as possible. Our recommended hotels are listed on the conference website.
                </Text>
              </Box>
              
              <Box className="bg-white p-3 rounded my-4 border-l-4 border-[#274675]">
                <Text className="font-semibold text-[#274675] mb-1">3. Review the schedule</Text>
                <Text className="text-gray-700 text-sm">
                  Check out our exciting lineup of speakers and sessions on the conference website.
                </Text>
              </Box>
              
              <Box className="bg-white p-3 rounded my-4 border-l-4 border-[#FBB03B]">
                <Text className="font-semibold text-[#274675] mb-1">4. Connect with us</Text>
                <Text className="text-gray-700 text-sm">
                  Follow us on social media for the latest updates and announcements.
                </Text>
              </Box>
              
              <Button 
                className="bg-[#274675] text-white px-4 py-2 mt-4 rounded font-semibold w-full text-center"
                href={conferenceUrl}
              >
                Visit Conference Website
              </Button>
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

export default NextStepsEmail;
