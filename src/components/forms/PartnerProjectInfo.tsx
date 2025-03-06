
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PartnerProjectInfoProps {
  formData: {
    project_idea: string;
    expected_outcome: string;
    timeline: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PartnerProjectInfo = ({ formData, handleChange }: PartnerProjectInfoProps) => {
  return (
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
  );
};

export default PartnerProjectInfo;
