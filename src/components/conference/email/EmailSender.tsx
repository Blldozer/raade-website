
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Define the form schema
const emailFormSchema = z.object({
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  content: z.string().min(10, { message: "Email content must be at least 10 characters" }),
  recipientType: z.enum(["all", "students", "professionals", "group-leaders"]),
  testMode: z.boolean().default(false),
  testEmail: z.string().email().optional().or(z.literal('')),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

const EmailSender = () => {
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      subject: '',
      content: '',
      recipientType: 'all',
      testMode: true,
      testEmail: '',
    },
  });
  
  const testMode = form.watch('testMode');
  
  const onSubmit = async (data: EmailFormValues) => {
    if (testMode && !data.testEmail) {
      toast({
        title: "Test email required",
        description: "Please provide a test email address when in test mode",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    try {
      // Call the email sending edge function
      const { data: result, error } = await supabase.functions.invoke('send-email-campaign', {
        body: {
          subject: data.subject,
          content: data.content,
          recipientType: data.recipientType,
          testMode: data.testMode,
          testEmail: data.testEmail,
        }
      });
      
      if (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Failed to send email",
          description: error.message || "There was a problem sending the email. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      if (result.success) {
        toast({
          title: "Email sent successfully",
          description: testMode 
            ? `Test email sent to ${data.testEmail}` 
            : `Email campaign started for ${result.recipientCount || 'all'} recipients`,
          variant: "default",
        });
        
        // Reset form if it was a successful test email
        if (testMode) {
          form.reset({
            subject: '',
            content: '',
            recipientType: 'all',
            testMode: true,
            testEmail: data.testEmail, // Keep the test email for convenience
          });
        }
      } else {
        toast({
          title: "Email sending failed",
          description: result.message || "There was a problem with the email service.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Exception sending email:", error);
      toast({
        title: "Error sending email",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Send Conference Emails</CardTitle>
        <CardDescription>
          Compose and send emails to conference registrants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email subject..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter email content..." 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    You can use HTML formatting in your email content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="recipientType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Registrants</SelectItem>
                      <SelectItem value="students">Student Tickets</SelectItem>
                      <SelectItem value="professionals">Professional Tickets</SelectItem>
                      <SelectItem value="group-leaders">Group Leaders</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose which type of registrants should receive this email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="testMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Test Mode</FormLabel>
                    <FormDescription>
                      Send only to a test email address instead of real recipients.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            {testMode && (
              <FormField
                control={form.control}
                name="testEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter test email address..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The email will only be sent to this address when in test mode.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                testMode ? "Send Test Email" : "Send Campaign"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-5">
        <p className="text-sm text-gray-500">
          Use this tool responsibly to communicate with attendees.
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmailSender;
