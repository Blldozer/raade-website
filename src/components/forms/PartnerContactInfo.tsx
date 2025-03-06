
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PartnerContactInfoProps {
  formData: {
    contact_name: string;
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PartnerContactInfo = ({ formData, handleChange }: PartnerContactInfoProps) => {
  return (
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
  );
};

export default PartnerContactInfo;
