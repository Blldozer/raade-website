
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Share2 } from 'lucide-react';

/**
 * Success Page
 * 
 * This page is shown after successful registration for the conference:
 * - Shows confirmation details
 * - Provides options to add to calendar and share
 * - Links to conference page
 * - Shows registration details
 */
const Success = () => {
  const [email, setEmail] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem('registrationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    
    // Clear checkout session data
    const checkoutSessionId = sessionStorage.getItem('checkoutSessionId');
    if (checkoutSessionId) {
      console.log('Clearing checkout session data');
      sessionStorage.removeItem('checkoutSessionId');
    }
    
    // Check if we came from a payment success route
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      console.log('Payment session ID detected in URL');
      // We could verify the session ID here if needed
    }
    
    return () => {
      // Remove email from session storage when leaving the page
      // sessionStorage.removeItem('registrationEmail');
    };
  }, [location.search]);

  // Share the conference info
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RAADE African Development Forum 2025',
          text: 'Join me at the RAADE African Development Forum on April 11-12, 2025!',
          url: window.location.origin + '/conference',
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(
        'Join me at the RAADE African Development Forum on April 11-12, 2025! ' +
        window.location.origin + '/conference'
      );
      alert('Conference link copied to clipboard!');
    }
  };

  // Add to calendar using .ics file
  const addToCalendar = () => {
    const startDate = '20250411T090000';
    const endDate = '20250412T170000';
    const title = 'RAADE African Development Forum 2025';
    const description = 'RAADE African Development Forum at Rice University';
    const location = 'Rice University, Houston, TX';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'raade-conference-2025.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#274675]/10 to-white dark:from-[#274675]/30 dark:to-gray-900">
      <Navigation forceDarkMode={true} />
      <div className="container mx-auto px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-10"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-green-600 dark:text-green-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Registration Confirmed!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Thank you for registering for the RAADE African Development Forum 2025
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
            <div className="flex flex-col space-y-4">
              {email && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Registration Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Event Date</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">April 11-12, 2025</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Rice University, Houston, TX</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-gray-700 dark:text-gray-300">
              A confirmation email has been sent to your email address with all the details.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We look forward to seeing you at the conference. Please check your email for any updates.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button
              onClick={addToCalendar}
              variant="outline"
              className="flex-1 flex items-center justify-center"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 flex items-center justify-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Event
            </Button>
          </div>
          
          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate('/conference')}
              className="bg-[#274675] hover:bg-[#274675]/90 text-white"
            >
              Go to Conference Page
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
