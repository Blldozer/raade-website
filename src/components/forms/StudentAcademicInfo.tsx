
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StudentAcademicInfoProps {
  formData: {
    university: string;
    major: string;
    graduation_year: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StudentAcademicInfo = ({ formData, handleChange }: StudentAcademicInfoProps) => {
  return (
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
  );
};

export default StudentAcademicInfo;
