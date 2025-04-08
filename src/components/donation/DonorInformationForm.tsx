
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define form schema with validation
const donorFormSchema = z.object({
  donorName: z.string().optional(),
  donorEmail: z.string().email("Please enter a valid email address").optional(),
  isAnonymous: z.boolean().default(false),
  message: z.string().max(500, "Message must be less than 500 characters").optional(),
});

// Form data type from schema
type DonorFormData = z.infer<typeof donorFormSchema>;

interface DonorInformationFormProps {
  onSubmit: (data: DonorFormData) => void;
  onBack: () => void;
  initialData?: Partial<DonorFormData>;
}

/**
 * DonorInformationForm Component
 * 
 * Form for collecting donor information with optional anonymous donation
 * Includes fields for name, email, and a message
 */
const DonorInformationForm = ({ 
  onSubmit, 
  onBack,
  initialData = {}
}: DonorInformationFormProps) => {
  const [isAnonymous, setIsAnonymous] = useState(initialData.isAnonymous || false);

  // Initialize form with react-hook-form
  const form = useForm<DonorFormData>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      donorName: initialData.donorName || "",
      donorEmail: initialData.donorEmail || "",
      isAnonymous: initialData.isAnonymous || false,
      message: initialData.message || "",
    },
  });

  // Update form state when anonymous checkbox changes
  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked);
    form.setValue("isAnonymous", checked);
  };

  // Process form submission
  const handleFormSubmit = (data: DonorFormData) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#274675] dark:text-[#FBB03B]">
          Your Information
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Please provide your details for the donation
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleAnonymousChange(checked as boolean);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Make this donation anonymous</FormLabel>
                  <FormDescription>
                    Your name will not be displayed publicly
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {!isAnonymous && (
            <>
              <FormField
                control={form.control}
                name="donorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="donorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      We'll send you a receipt of your donation to this email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share why you're donating or leave a message for RAADE"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between mt-8">
            <Button 
              type="button"
              variant="outline" 
              onClick={onBack}
              className="border-[#274675] text-[#274675] hover:bg-[#274675]/10 dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B]/10"
            >
              Back
            </Button>
            <Button 
              type="submit"
              className="bg-[#274675] hover:bg-[#274675]/90 dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/90"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DonorInformationForm;
