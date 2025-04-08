
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch, Control } from "react-hook-form";
import { RegistrationFormData } from "./RegistrationFormTypes";
import TicketTypeSelection from "./registration/TicketTypeSelection";
import SpecialRequests from "./registration/SpecialRequests";
import BasicInformationSection from "./registration/BasicInformationSection";
import GroupRegistrationSection from "./registration/GroupRegistrationSection";
import ReferralSourceSection from "./registration/ReferralSourceSection";
import CouponCodeInput from "./registration/CouponCodeInput";
import { useGroupSizeReset } from "./registration/useGroupSizeReset";

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
        register={register}
        watch={watch} 
        setValue={setValue} 
        errors={errors} 
      />
      
      <GroupRegistrationSection
        register={register}
        watch={watch}
        setValue={setValue}
        control={control}
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
