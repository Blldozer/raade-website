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
} from 'npm:@react-email/components@0.0.7';

export interface ConfirmationEmailProps {
  fullName: string;
  email: string;
  ticketType: string;
  ticketPrice: string;
  totalPrice: string;
  groupSize?: number;
  couponCode?: string;
  eventDates: string;
  registrationDate: string;
  referenceId: string;
}

export const ConfirmationEmail = ({
  fullName = 'John Doe',
  email = 'john.doe@example.com',
  ticketType = 'professional',
  ticketPrice = '$199',
  totalPrice = '$199',
  groupSize,
  couponCode,
  eventDates = 'April 11-12, 2025',
  registrationDate = 'April 10, 2025',
  referenceId = 'REF123456',
}: ConfirmationEmailProps) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = ticketType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const isGroupTicket = ticketType === 'student-group';

  return (
    <Html>
      <Head />
      <Preview>Your RAADE Conference Registration Confirmation</Preview>
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
                Registration Confirmation
              </Heading>
              <Text className="text-gray-700">
                Thank you for registering for the RAADE Conference! We're excited to have you join us.
              </Text>
            </Section>

            <Section className="mb-8 bg-gray-50 p-4 rounded-lg">
              <Heading className="text-xl font-semibold text-[#274675] mb-2">
                Your Registration Details
              </Heading>
              
              <Box className="mb-4">
                <Text className="text-gray-500 m-0">Name</Text>
                <Text className="font-semibold m-0">{fullName}</Text>
              </Box>
              
              <Box className="mb-4">
                <Text className="text-gray-500 m-0">Email</Text>
                <Text className="font-semibold m-0">{email}</Text>
              </Box>
              
              <Box className="mb-4">
                <Text className="text-gray-500 m-0">Ticket Type</Text>
                <Text className="font-semibold m-0">{formattedTicketType}</Text>
                {isGroupTicket && groupSize && (
                  <Text className="text-sm text-gray-600 m-0">Group Size: {groupSize}</Text>
                )}
              </Box>
              
              <Box className="mb-4">
                <Text className="text-gray-500 m-0">Conference Dates</Text>
                <Text className="font-semibold m-0">{eventDates}</Text>
              </Box>
              
              {couponCode && (
                <Box className="mb-4">
                  <Text className="text-gray-500 m-0">Applied Coupon</Text>
                  <Text className="font-semibold m-0">{couponCode}</Text>
                </Box>
              )}
              
              <Hr className="my-4 border-gray-300" />
              
              <Box className="mb-4">
                <Text className="text-gray-500 m-0">Registration Date</Text>
                <Text className="text-sm m-0">{registrationDate}</Text>
              </Box>
              
              <Box className="mb-4">
                <Text className="text-gray-500 m-0">Registration Reference</Text>
                <Text className="text-sm font-mono m-0">{referenceId}</Text>
              </Box>
            </Section>
            
            <Section className="mb-8 bg-gray-50 p-4 rounded-lg">
              <Heading className="text-xl font-semibold text-[#274675] mb-2">
                Payment Information
              </Heading>
              
              <Box className="flex justify-between mb-2">
                <Text className="text-gray-700 m-0">Ticket Price:</Text>
                <Text className="font-semibold m-0">{ticketPrice}</Text>
              </Box>
              
              {couponCode && ticketPrice !== totalPrice && (
                <Box className="flex justify-between mb-2">
                  <Text className="text-gray-700 m-0">Discount Applied:</Text>
                  <Text className="font-semibold text-green-600 m-0">-{
                    (parseFloat(ticketPrice.replace(/[^0-9.]/g, '')) - 
                    parseFloat(totalPrice.replace(/[^0-9.]/g, ''))).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })
                  }</Text>
                </Box>
              )}
              
              <Hr className="my-2 border-gray-300" />
              
              <Box className="flex justify-between mb-0">
                <Text className="font-bold m-0">Total:</Text>
                <Text className="font-bold m-0">{totalPrice}</Text>
              </Box>
            </Section>
            
            <Section className="mb-8">
              <Heading className="text-xl font-semibold text-[#274675] mb-2">
                Next Steps
              </Heading>
              <Text className="text-gray-700 mb-4">
                You'll receive updates about the conference schedule and any important announcements via email.
                Be sure to mark your calendar for the event dates.
              </Text>
              <Button 
                className="bg-[#274675] text-white px-4 py-2 rounded font-semibold"
                href="https://raadeconf.com/schedule"
              >
                View Conference Schedule
              </Button>
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

export default ConfirmationEmail;
