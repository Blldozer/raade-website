
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
          <h1 className="text-4xl md:text-5xl font-simula text-white mb-6">Partner With Us</h1>
          <p className="text-xl font-lora text-gray-300 mb-10">
            Bring your development challenge to RAADE Innovation Studios and collaborate with our talented student teams.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 bg-[#121212] p-8 rounded-lg border border-[#333]">
            <div className="space-y-4">
              <h2 className="text-2xl font-simula text-white">Organization Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="organization_name" className="text-white">Organization Name <span className="text-red-500">*</span></Label>
                <Input
                  id="organization_name"
                  name="organization_name"
                  placeholder="Your organization name"
                  value={formData.organization_name}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white"
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="organization_type" className="text-white">Organization Type <span className="text-red-500">*</span></Label>
                  <Input
                    id="organization_type"
                    name="organization_type"
                    placeholder="e.g., NGO, Startup, Government"
                    value={formData.organization_type}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border-[#444] text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white">Country <span className="text-red-500">*</span></Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Country of operation"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border-[#444] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-simula text-white">Contact Information</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact_name" className="text-white">Contact Person <span className="text-red-500">*</span></Label>
                  <Input
                    id="contact_name"
                    name="contact_name"
                    placeholder="Primary contact name"
                    value={formData.contact_name}
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
                    placeholder="Contact email address"
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
                  placeholder="Contact phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-simula text-white">Project Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="project_idea" className="text-white">
                  Project/Challenge Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="project_idea"
                  name="project_idea"
                  placeholder="Describe the challenge or project idea you'd like our team to work on"
                  value={formData.project_idea}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white min-h-[150px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expected_outcome" className="text-white">
                  Expected Outcomes
                </Label>
                <Textarea
                  id="expected_outcome"
                  name="expected_outcome"
                  placeholder="What results or solutions are you hoping to achieve?"
                  value={formData.expected_outcome}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] border-[#444] text-white min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-white">
                  Preferred Timeline
                </Label>
                <Input
                  id="timeline"
                  name="timeline"
                  placeholder="When would you like this project to start/end?"
                  value={formData.timeline}
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
                  Submit Partnership Request
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerApplication;
