
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StudentPersonalInfoProps {
  formData: {
    full_name: string;
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StudentPersonalInfo = ({ formData, handleChange }: StudentPersonalInfoProps) => {
  return (
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
  );
};

export default StudentPersonalInfo;
