
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StudentFormHeader from "@/components/forms/StudentFormHeader";
import StudentPersonalInfo from "@/components/forms/StudentPersonalInfo";
import StudentAcademicInfo from "@/components/forms/StudentAcademicInfo";
import StudentAdditionalInfo from "@/components/forms/StudentAdditionalInfo";
import SubmitButton from "@/components/forms/SubmitButton";
import Navigation from "@/components/Navigation";

const StudentApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    graduation_year: "",
    why_join_raade: "",
    skills: "",
    portfolio_link: "",
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
      const requiredFields = ["full_name", "email", "university", "major", "why_join_raade"];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace("_", " ")} is required`);
        }
      }

      // Submit to Supabase
      const { error } = await supabase
        .from("student_applications")
        .insert([formData]);

      if (error) throw error;

      // Success
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in RAADE Innovation Studios! We'll be in touch soon.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        university: "",
        major: "",
        graduation_year: "",
        why_join_raade: "",
        skills: "",
        portfolio_link: "",
      });
      
      // Redirect back to studios page after 2 seconds
      setTimeout(() => {
        navigate("/studios");
      }, 2000);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "There was an error submitting your application. Please try again.";
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation forceDarkMode={true} />
      <div className="container mx-auto px-6 py-12 md:px-12 pt-24">
        <StudentFormHeader />

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#121212] p-8 rounded-lg border border-[#333] max-w-3xl mx-auto">
          <StudentPersonalInfo formData={formData} handleChange={handleChange} />
          <StudentAcademicInfo formData={formData} handleChange={handleChange} />
          <StudentAdditionalInfo formData={formData} handleChange={handleChange} />
          <SubmitButton 
            isSubmitting={isSubmitting} 
            text="Submit Application" 
            submittingText="Submitting..." 
          />
        </form>
      </div>
    </div>
  );
};

export default StudentApplication;
