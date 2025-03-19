import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StudentFormHeader from "@/components/forms/StudentFormHeader";
import StudentPersonalInfo from "@/components/forms/StudentPersonalInfo";
import StudentAcademicInfo from "@/components/forms/StudentAcademicInfo";
import StudentAdditionalInfo from "@/components/forms/StudentAdditionalInfo";
import SubmitButton from "@/components/forms/SubmitButton";
import SubmissionConfirmation from "@/components/forms/SubmissionConfirmation";

// StudentApplication component for handling student applications to RAADE Innovation Studios
const StudentApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    graduation_year: "",
    why_join_raade: "",
    skills: "",
    portfolio_link: ""
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
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

      console.log("Submitting student application:", formData);

      // Submit to Supabase with status handled by database default
      const { error, data } = await supabase
        .from("student_applications")
        .insert([{
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          university: formData.university,
          major: formData.major,
          graduation_year: formData.graduation_year,
          why_join_raade: formData.why_join_raade,
          skills: formData.skills,
          portfolio_link: formData.portfolio_link
          // Let the database handle the status with its default value
        }]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Student application submitted successfully:", data);

      // Success
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in RAADE Innovation Studios! We'll be in touch soon.",
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

  const applicationSummary = (
    <div className="text-white/80 font-lora text-left p-4 bg-[#1a1a1a] rounded-md mb-4">
      <h3 className="text-[#FBB03B] mb-2 font-simula">Your Application Summary:</h3>
      <p><span className="text-[#FBB03B]/80">Name:</span> {formData.full_name}</p>
      <p><span className="text-[#FBB03B]/80">University:</span> {formData.university}</p>
      <p><span className="text-[#FBB03B]/80">Major:</span> {formData.major}</p>
    </div>
  );

  return (
    <div className="bg-black min-h-screen" id="student-form">
      <div className="container mx-auto px-6 py-12 md:px-12 pt-24">
        <StudentFormHeader />

        {isSubmitted ? (
          <SubmissionConfirmation 
            title="Application Submitted Successfully!"
            message="Thank you for your interest in RAADE Innovation Studios! We'll review your application and be in touch soon."
            customMessage={applicationSummary}
            buttonText="Return to Home"
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default StudentApplication;
