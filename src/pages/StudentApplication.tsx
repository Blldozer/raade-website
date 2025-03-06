
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
        <Button 
          variant="ghost" 
          onClick={() => navigate("/studios")}
          className="mb-8 text-white hover:text-[#FBB03B]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Studios
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-simula text-white mb-6">Join Innovation Studios</h1>
          <p className="text-xl font-lora text-gray-300 mb-10">
            Apply to be part of our next cohort of student innovators working on real-world solutions for African development.
          </p>
          <div className="bg-[#FBB03B]/10 border border-[#FBB03B]/30 rounded-lg p-4 mb-8">
            <p className="text-[#FBB03B] font-lora text-lg">
              <strong>Note:</strong> Students from any university are welcome to apply! You don't have to be from Rice University to join our Innovation Studios.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-[#121212] p-8 rounded-lg border border-[#333]">
            <div className="space-y-4">
              <h2 className="text-2xl font-simula text-white">Personal Information</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-white">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    placeholder="Your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border-[#444] text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border-[#444] text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-simula text-white">Academic Information</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-white">University <span className="text-red-500">*</span></Label>
                  <Input
                    id="university"
                    name="university"
                    placeholder="Your university"
                    value={formData.university}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border-[#444] text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="major" className="text-white">Major <span className="text-red-500">*</span></Label>
                  <Input
                    id="major"
                    name="major"
                    placeholder="Your field of study"
                    value={formData.major}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border-[#444] text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="graduation_year" className="text-white">Expected Graduation Year</Label>
                <Input
                  id="graduation_year"
                  name="graduation_year"
                  placeholder="e.g., 2025"
                  value={formData.graduation_year}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-simula text-white">Additional Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="why_join_raade" className="text-white">
                  Why do you want to join RAADE Innovation Studios? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="why_join_raade"
                  name="why_join_raade"
                  placeholder="Tell us about your motivation and what you hope to achieve"
                  value={formData.why_join_raade}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white min-h-[150px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-white">
                  Relevant Skills & Experiences
                </Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="Share any skills, experiences, or coursework that would be relevant"
                  value={formData.skills}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="portfolio_link" className="text-white">Portfolio or LinkedIn Link</Label>
                <Input
                  id="portfolio_link"
                  name="portfolio_link"
                  placeholder="URL to your portfolio, LinkedIn, or GitHub"
                  value={formData.portfolio_link}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-white font-lora"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentApplication;
