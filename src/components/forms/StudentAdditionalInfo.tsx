
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface StudentAdditionalInfoProps {
  formData: {
    why_join_raade: string;
    skills: string;
    portfolio_link: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StudentAdditionalInfo = ({ formData, handleChange }: StudentAdditionalInfoProps) => {
  return (
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
  );
};

export default StudentAdditionalInfo;
