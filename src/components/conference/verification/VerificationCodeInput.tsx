
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * VerificationCodeInput Component
 * 
 * A specialized input field for verification codes
 * Formats the code with proper styling and accessibility features
 * 
 * @param value - Current verification code value
 * @param onChange - Function to handle value changes
 */
const VerificationCodeInput = ({ value, onChange }: VerificationCodeInputProps) => {
  return (
    <div>
      <Label htmlFor="verificationCode">Verification Code</Label>
      <Input
        id="verificationCode"
        placeholder="Enter the 6-digit code"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="text-center tracking-wider font-mono text-lg"
        maxLength={6}
      />
    </div>
  );
};

export default VerificationCodeInput;
