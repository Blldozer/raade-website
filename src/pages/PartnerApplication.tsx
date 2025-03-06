
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PartnerFormHeader from "@/components/forms/PartnerFormHeader";
import PartnerOrganizationInfo from "@/components/forms/PartnerOrganizationInfo";
import PartnerContactInfo from "@/components/forms/PartnerContactInfo";
import PartnerProjectInfo from "@/components/forms/PartnerProjectInfo";
import SubmitButton from "@/components/forms/SubmitButton";

const PartnerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_name: "",
    email: "",
    phone: "",
    organization_type: "",
    country: "",
    project_idea: "",
    expected_outcome: "",
    timeline: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      const requiredFields = ["organization_name", "contact_name", "email", "organization_type", "country", "project_idea"];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace("_", " ")} is required`);
        }
      }

      // Submit to Supabase
      const { error } = await supabase
        .from("partner_applications")
        .insert([formData]);

      if (error) throw error;

      // Success
      toast({
        title: "Partnership Request Submitted",
        description: "Thank you for your interest in partnering with RAADE! We'll be in touch soon to discuss your project.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        organization_name: "",
        contact_name: "",
        email: "",
        phone: "",
        organization_type: "",
        country: "",
        project_idea: "",
        expected_outcome: "",
        timeline: "",
      });
      
      // Redirect back to studios page after 2 seconds
      setTimeout(() => {
        navigate("/studios");
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-6 py-12 md:px-12">
        <PartnerFormHeader />

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
      </div>
    </div>
  );
};

export default PartnerApplication;
