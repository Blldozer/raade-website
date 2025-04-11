
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
  Button,
  Hr,
  Link,
  Img,
} from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.2.0';

export interface RaadeConferenceEmailProps {
  recipient: {
    name: string;
    email: string;
  };
}

export const RaadeConferenceEmail: React.FC<RaadeConferenceEmailProps> = ({
  recipient,
}) => {
  return (
    <Html>
      <Head />
      <Preview>RAADE African Development Forum 2025 Registration Confirmation</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-600 p-4">
            <Section className="bg-[#274675] text-center p-5 rounded-t-md">
              <Heading className="text-white text-2xl font-bold m-0">RAADE African Development Forum 2025</Heading>
            </Section>
            
            <Section className="bg-white p-6 border border-solid border-gray-200 rounded-b-md">
              <Text className="text-gray-800">Dear {recipient.name},</Text>
              
              <Text className="text-gray-800">
                I can't tell you how excited our entire team is to welcome you to the RAADE African Development Forum at Rice University! 
                There's something special about bringing together minds passionate about African development, and your participation 
                will undoubtedly enrich our collective experience.
              </Text>
              
              <Text className="text-gray-800">
                The forum will take place on <strong>April 11-12, 2025</strong> at Rice University in Houston, Texas. 
                We've lined up exceptional speakers, interactive workshops, and networking opportunities to make this 
                a truly transformative event.
              </Text>
              
              <Section className="bg-gray-50 p-5 rounded-md my-4">
                <Text className="text-center text-gray-800 font-bold">Conference Details</Text>
                <Text className="text-gray-700 m-0">📅 <strong>Dates:</strong> April 11-12, 2025</Text>
                <Text className="text-gray-700 m-0">📍 <strong>Location:</strong> Rice University, Houston, TX</Text>
                <Text className="text-gray-700 m-0">🕙 <strong>Check-in:</strong> April 11, 8:30 AM - 9:30 AM</Text>
              </Section>
              
              <Text className="text-gray-800">
                Over the next few weeks, we'll send more detailed information about the agenda, 
                travel accommodations, and how to make the most of your forum experience.
              </Text>
              
              <Text className="text-gray-800">
                If you have any immediate questions or special requirements, please don't hesitate to reach out to 
                our team at <Link href="mailto:conference@raade.org">conference@raade.org</Link>.
              </Text>
              
              <Text className="text-gray-800">
                We're looking forward to hosting you in April!
              </Text>
              
              <Text className="text-gray-800">
                Warmest regards,<br />
                The RAADE Conference Team
              </Text>
              
              <Hr className="border-t border-gray-300 my-6" />
              
              <Text className="text-gray-500 text-xs text-center">
                &copy; 2024 RAADE - Rice Association for African Development<br />
                6100 Main St, Houston, TX 77005
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RaadeConferenceEmail;
