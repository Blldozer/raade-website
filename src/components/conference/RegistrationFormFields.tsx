
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch, Control } from "react-hook-form";
import { RegistrationFormData, CouponData } from "./RegistrationFormTypes";
import TicketTypeSelection from "./registration/TicketTypeSelection";
import SpecialRequests from "./registration/SpecialRequests";
import BasicInformationSection from "./registration/BasicInformationSection";
import GroupRegistrationSection from "./registration/GroupRegistrationSection";
import ReferralSourceSection from "./registration/ReferralSourceSection";
import CouponCodeSection from "./registration/CouponCodeSection";
import { useGroupSizeReset } from "./registration/useGroupSizeReset";
import { useState } from "react";

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
  onCouponChange?: (coupon: CouponData | null) => void;
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
 * @param onCouponChange - Callback when coupon status changes
 */
const RegistrationFormFields = ({ 
  register, 
  errors, 
  setValue, 
  watch,
  control,
  onEmailValidation,
  onCouponChange
}: RegistrationFormFieldsProps) => {
  
  // Use the group size reset hook to handle group size logic
  useGroupSizeReset(watch, setValue);
  
  // State to manage the coupon data
  const [couponData, setCouponData] = useState<CouponData | null>(null);
  
  // Handle coupon data changes
  const handleCouponChange = (data: CouponData | null) => {
    setCouponData(data);
    setValue('couponCode', data?.code || undefined);
    
    // Call the parent callback if provided
    if (onCouponChange) {
      onCouponChange(data);
    }
  };
  
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
        errors={errors} 
      />
      
      <GroupRegistrationSection
        watch={watch}
        setValue={setValue}
        control={control}
      />

      <CouponCodeSection 
        setCouponData={handleCouponChange}
        couponData={couponData}
      />

      <ReferralSourceSection 
        register={register}
        setValue={setValue}
        watch={watch}
      />

      <SpecialRequests register={register} />
    </div>
  );
};

export default RegistrationFormFields;
