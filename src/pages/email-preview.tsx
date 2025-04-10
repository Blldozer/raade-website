import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VerificationEmail from '../../supabase/functions/_shared/email-templates/verification-email-preview';
import NextStepsEmail from '../../supabase/functions/_shared/email-templates/next-steps-email-preview';

/**
 * Email Preview Page
 * 
 * A utility page that displays email templates used in the application.
 * Useful for testing and previewing email designs without sending actual emails.
 */
const EmailPreview = () => {
  const [activeTab, setActiveTab] = useState('verification');
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Email Template Preview</h1>
      
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle>Email Template Gallery</CardTitle>
          <CardDescription>
            Preview the email templates used throughout the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="verification" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="verification" className="flex-1">Verification Email</TabsTrigger>
              <TabsTrigger value="nextSteps" className="flex-1">Next Steps Email</TabsTrigger>
            </TabsList>
            
            <TabsContent value="verification" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b">
                  <h3 className="font-medium">Verification Email</h3>
                  <p className="text-sm text-gray-500">Sent when users need to verify their email</p>
                </div>
                <div className="h-[600px] overflow-auto bg-white p-4">
                  <VerificationEmail />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nextSteps" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b">
                  <h3 className="font-medium">Next Steps Email</h3>
                  <p className="text-sm text-gray-500">Sent after registration to guide attendees</p>
                </div>
                <div className="h-[600px] overflow-auto bg-white p-4">
                  <NextStepsEmail 
                    fullName="John Doe"
                    ticketType="professional"
                    conferenceDate="April 11-12, 2025"
                    venueAddress="Rice University, Houston, TX"
                    conferenceUrl="https://raadeconf.com"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailPreview;
