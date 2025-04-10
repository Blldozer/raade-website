
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
import * as React from 'npm:react@18.2.0';

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

export const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  fullName,
  email,
  ticketType,
  ticketPrice,
  totalPrice,
  groupSize,
  couponCode,
  eventDates,
  registrationDate,
  referenceId,
}) => {
  // Format ticket type for display (e.g., "student-group" -> "Student Group")
  const formattedTicketType = ticketType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const isGroupTicket = ticketType === 'student-group';

  return (
    <Html>
      <Head />
      <Preview>Your RAADE Conference Registration is Confirmed!</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-600 p-4">
            <Section className="bg-[#274675] text-center p-5 rounded-t-md">
              <Heading className="text-white text-2xl font-bold m-0">Your RAADE Conference Registration is Confirmed!</Heading>
            </Section>
            
            <Section className="bg-white p-6 border border-solid border-gray-200 rounded-b-md">
              <Text className="text-gray-800">Dear {fullName},</Text>
              
              <Text className="text-gray-800">
                Thank you for registering for the <strong>RAADE Annual Conference 2025</strong>! Your registration has been successfully processed and confirmed.
              </Text>
              
              <Heading as="h2" className="text-xl font-semibold text-gray-800 mt-6 mb-3">Receipt</Heading>
              <Box className="bg-gray-50 p-4 mb-4 rounded-md border-l-4 border-[#274675]">
                <Text className="text-gray-800 mb-2"><strong>Registration Date:</strong> {registrationDate}</Text>
                <Text className="text-gray-800 mb-2"><strong>Name:</strong> {fullName}</Text>
                <Text className="text-gray-800 mb-2"><strong>Email:</strong> {email}</Text>
                <Text className="text-gray-800 mb-2"><strong>Ticket Type:</strong> {formattedTicketType}</Text>
                <Text className="text-gray-800 mb-2"><strong>Price:</strong> {ticketPrice}</Text>
                
                {isGroupTicket && groupSize && (
                  <Text className="text-gray-800 mb-2"><strong>Group Size:</strong> {groupSize} people</Text>
                )}
                
                <Text className="text-gray-800 mb-2"><strong>Total Amount Paid:</strong> {totalPrice}</Text>
                
                {couponCode && (
                  <Text className="text-gray-800 mb-2"><strong>Coupon Applied:</strong> {couponCode}</Text>
                )}
                
                <Text className="text-gray-600 italic mt-2">
                  <em>Reference: RAADE-CONF-2025-{referenceId}</em>
                </Text>
              </Box>
              
              <Box className="bg-gray-50 p-4 mb-4 rounded-md">
                <Heading as="h2" className="text-xl font-semibold text-gray-800 mb-3">Event Details</Heading>
                <Text className="text-gray-800 mb-2"><strong>Dates:</strong> {eventDates}</Text>
                <Text className="text-gray-800 mb-2"><strong>Location:</strong> Rice University, Houston, TX</Text>
                <Text className="text-gray-800 mb-2"><strong>Check-in:</strong> Begins at 8:00 AM on April 11th</Text>
              </Box>
              
              <Hr className="border-t border-gray-300 my-6" />
              
              <Heading as="h2" className="text-xl font-semibold text-gray-800 mt-6 mb-3">What's Next?</Heading>
              <Text className="text-gray-800">
                Please mark your calendar for this exciting event. You'll receive the following information closer to the event date:
              </Text>
              <Box className="ml-4">
                <Text className="text-gray-800 mb-1">• Detailed venue information and campus map</Text>
                <Text className="text-gray-800 mb-1">• Complete conference schedule</Text>
                <Text className="text-gray-800 mb-1">• Speaker announcements</Text>
                <Text className="text-gray-800 mb-1">• Networking opportunities</Text>
              </Box>
              
              <Text className="text-gray-800 mt-4">
                If you have any questions or need to make changes to your registration, please contact us at{' '}
                <Link href="mailto:conference@raade.org" className="text-[#FBB03B]">conference@raade.org</Link>
              </Text>
              
              <Box className="text-center mt-6">
                <Button 
                  href="https://raade.org/conference" 
                  className="bg-[#FBB03B] text-white font-bold py-3 px-6 rounded no-underline"
                >
                  Conference Information
                </Button>
              </Box>
              
              <Text className="text-gray-800 mt-6">
                We look forward to seeing you at the conference!
              </Text>
              
              <Text className="text-gray-800">
                Best regards,<br />
                The RAADE Conference Team
              </Text>
              
              <Hr className="border-t border-gray-300 my-6" />
              
              <Text className="text-gray-500 text-xs text-center">
                This is an automated message. Please do not reply to this email.<br />
                &copy; 2024 RAADE - Rice Association for African Development
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmail;
