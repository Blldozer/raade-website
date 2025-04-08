
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch, Control } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import TicketTypeSelection from "./TicketTypeSelection";
import SpecialRequests from "./SpecialRequests";
import BasicInformationSection from "./BasicInformationSection";
import GroupRegistrationSection from "./GroupRegistrationSection";
import ReferralSourceSection from "./ReferralSourceSection";
import CouponCodeInput from "./CouponCodeInput";
import { useGroupSizeReset } from "./useGroupSizeReset";

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

/**
 * RegistrationFormFields Component
 * 
 * Organizes and renders the different sections of the registration form
 * Each section is now a separate component for better maintainability
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param setValue - React Hook Form setValue function
 * @param watch - React Hook Form watch function
 * @param control - React Hook Form control object
 * @param onEmailValidation - Callback when email validation completes
 */
const RegistrationFormFields = ({ 
  register, 
  errors, 
  setValue, 
  watch,
  control,
  onEmailValidation
}: RegistrationFormFieldsProps) => {
  
  // Use the group size reset hook to handle group size logic
  useGroupSizeReset(watch, setValue);
  
  return (
    <div className="space-y-6">
      <BasicInformationSection 
        register={register} 
        errors={errors} 
        watch={watch} 
        onEmailValidation={onEmailValidation}
      />
      
      <TicketTypeSelection 
        watch={watch} 
        setValue={setValue} 
        register={register}
        errors={errors} 
      />
      
      <GroupRegistrationSection
        watch={watch}
        setValue={setValue}
        control={control}
        register={register}
        errors={errors}
      />

      <ReferralSourceSection 
        register={register}
        setValue={setValue}
        watch={watch}
      />

      <CouponCodeInput
        register={register}
        setValue={setValue}
        watch={watch}
      />

      <SpecialRequests register={register} />
    </div>
  );
};

export default RegistrationFormFields;
