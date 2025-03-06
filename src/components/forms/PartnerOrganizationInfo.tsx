
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PartnerOrganizationInfoProps {
  formData: {
    organization_name: string;
    organization_type: string;
    country: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PartnerOrganizationInfo = ({ formData, handleChange }: PartnerOrganizationInfoProps) => {
  return (
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
  );
};

export default PartnerOrganizationInfo;
