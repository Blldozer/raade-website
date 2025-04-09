
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch, Control } from "react-hook-form";
import { RegistrationFormData } from "./RegistrationFormTypes";
import TicketTypeSelection from "./registration/TicketTypeSelection";
import SpecialRequests from "./registration/SpecialRequests";
import BasicInformationSection from "./registration/BasicInformationSection";
import GroupRegistrationSection from "./registration/GroupRegistrationSection";
import ReferralSourceSection from "./registration/ReferralSourceSection";
import { useGroupSizeReset } from "./registration/useGroupSizeReset";
import CouponCodeSection from "./registration/CouponCodeSection";

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
  setCouponCode: (couponCode: string | null) => void;
  setCouponDiscount: (discount: { type: 'percentage' | 'fixed'; amount: number } | null) => void;
  setIsFullDiscount: (isFullDiscount: boolean) => void;
  couponDiscount: { type: 'percentage' | 'fixed'; amount: number } | null;
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
 * @param setCouponCode - Function to set coupon code 
 * @param setCouponDiscount - Function to set coupon discount details
 * @param setIsFullDiscount - Function to indicate if coupon provides 100% discount
 * @param couponDiscount - Current coupon discount details
 */
const RegistrationFormFields = ({ 
  register, 
  errors, 
  setValue, 
  watch,
  control,
  onEmailValidation,
  setCouponCode,
  setCouponDiscount,
  setIsFullDiscount,
  couponDiscount
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
        errors={errors} 
        couponDiscount={couponDiscount}
      />
      
      <GroupRegistrationSection
        watch={watch}
        setValue={setValue}
        control={control}
      />
      
      {/* Add the coupon code section */}
      <div className="py-4 border-t border-b border-gray-100">
        <h3 className="text-lg font-medium text-[#274675] mb-3">Coupon Code</h3>
        <p className="text-sm text-gray-500 mb-3">If you have a coupon code, enter it below.</p>
        <CouponCodeSection 
          setCouponCode={setCouponCode}
          setCouponDiscount={setCouponDiscount}
          setIsFullDiscount={setIsFullDiscount}
        />
      </div>

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
