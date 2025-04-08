import React from "../../../setup-jsx";
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
  errors: FormState<RegistrationFormData>['errors'];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  isSubmitting: boolean;
}

/**
 * RegistrationFormFields Component
 * 
 * This component encapsulates all the form fields for the registration process.
 * It manages different sections of the form and handles conditional rendering
 * based on the selected ticket type.
 */
const RegistrationFormFields: React.FC<RegistrationFormFieldsProps> = ({
  register,
  errors,
  setValue,
  watch,
  control,
  isSubmitting
}) => {
  // Custom hook to reset group size when ticket type changes
  useGroupSizeReset(watch, setValue);
  
  // Watch the ticket type to conditionally render fields
  const ticketType = watch('ticketType');
  
  return (
    <div className="space-y-8">
      {/* Basic personal information fields */}
      <BasicInformationSection 
        register={register} 
        errors={errors} 
        control={control}
        watch={watch}
      />
      
      {/* Ticket type selection */}
      <TicketTypeSelection 
        register={register} 
        errors={errors} 
        control={control}
        watch={watch}
        setValue={setValue}
      />
      
      {/* Group registration section (only shown for student-group) */}
      {ticketType === 'student-group' && (
        <GroupRegistrationSection 
          register={register} 
          errors={errors} 
          control={control}
          watch={watch}
          setValue={setValue}
        />
      )}
      
      {/* Referral source tracking */}
      <ReferralSourceSection 
        register={register} 
        errors={errors} 
        control={control}
        watch={watch}
        setValue={setValue}
      />
      
      {/* Special requests/accommodations */}
      <SpecialRequests 
        register={register} 
        errors={errors}
      />
      
      {/* Coupon code input */}
      <CouponCodeInput 
        register={register} 
        errors={errors}
      />
    </div>
  );
};

export default RegistrationFormFields;
