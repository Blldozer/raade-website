
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PartnerFormHeader from "@/components/forms/PartnerFormHeader";
import PartnerOrganizationInfo from "@/components/forms/PartnerOrganizationInfo";
import PartnerContactInfo from "@/components/forms/PartnerContactInfo";
import PartnerProjectInfo from "@/components/forms/PartnerProjectInfo";
import SubmitButton from "@/components/forms/SubmitButton";
import SubmissionConfirmation from "@/components/forms/SubmissionConfirmation";

/**
 * PartnerApplication component for handling partner organization applications to RAADE
 * 
 * This component:
 * - Manages the application form state
 * - Handles form submission and validation
 * - Sanitizes data before sending to Supabase
 * - Shows confirmation after successful submission
 */
const PartnerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_name: "",
    email: "",
    phone: "",
    organization_type: "",
    country: "",
    project_idea: "",
    expected_outcome: "",
    timeline: ""
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Sanitize form data before submission
   * Removes characters that could cause JSON parsing issues
   */
  const sanitizeData = (data: Record<string, any>) => {
    const sanitized: Record<string, any> = {};
    
    // Process each field to remove problematic characters
    for (const key in data) {
      if (typeof data[key] === 'string') {
        // Remove trailing commas, control characters, and ensure proper encoding
        sanitized[key] = data[key]
          .trim()
          .replace(/,\s*$/, '') // Remove trailing commas
          .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
      } else {
        sanitized[key] = data[key];
      }
    }
    
    return sanitized;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      const requiredFields = ["organization_name", "contact_name", "email", "organization_type", "country", "project_idea"];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace(/_/g, " ")} is required`);
        }
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Sanitize data before submission
      const sanitizedData = sanitizeData(formData);
      
      console.log("Submitting partner application:", sanitizedData);

      // Submit to Supabase with database default handling status
      // Fix: Pass the object directly, not as an array
      const { error, data } = await supabase
        .from("partner_applications")
        .insert(sanitizedData);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Partner application submitted successfully:", data);

      // Success
      toast({
        title: "Partnership Request Submitted",
        description: "Thank you for your interest in partnering with RAADE! We'll be in touch soon to discuss your project.",
        variant: "default",
      });
      
      // Show confirmation screen instead of redirecting
      setIsSubmitted(true);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "There was an error submitting your application. Please try again.";
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectSummary = (
    <div className="text-white/80 font-lora text-left p-4 bg-[#1a1a1a] rounded-md mb-4">
      <h3 className="text-[#FBB03B] mb-2 font-simula">Your Challenge Summary:</h3>
      <p><span className="text-[#FBB03B]/80">Organization:</span> {formData.organization_name}</p>
      <p><span className="text-[#FBB03B]/80">Project Idea:</span> {formData.project_idea.substring(0, 100)}{formData.project_idea.length > 100 ? '...' : ''}</p>
      <p><span className="text-[#FBB03B]/80">Expected Timeline:</span> {formData.timeline || 'Not specified'}</p>
    </div>
  );

  return (
    <div className="bg-black min-h-screen" id="partner-form">
      <div className="container mx-auto px-6 py-12 md:px-12 pt-24">
        <PartnerFormHeader />

        {isSubmitted ? (
          <SubmissionConfirmation 
            title="Partnership Request Submitted Successfully!"
            message="Thank you for your interest in partnering with RAADE Innovation Studios! Our team will review your challenge and be in touch soon."
            customMessage={projectSummary}
            buttonText="Return to Home"
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-[#121212] p-8 rounded-lg border border-[#333] max-w-3xl mx-auto">
            <PartnerOrganizationInfo formData={formData} handleChange={handleChange} />
            <PartnerContactInfo formData={formData} handleChange={handleChange} />
            <PartnerProjectInfo formData={formData} handleChange={handleChange} />
            <SubmitButton 
              isSubmitting={isSubmitting} 
              text="Submit Partnership Request" 
              submittingText="Submitting..." 
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default PartnerApplication;
