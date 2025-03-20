
import { Control, UseFormRegister, FormState, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import BasicInformation from "./BasicInformation";
import { useEmailValidation } from "./useEmailValidation";

interface BasicInformationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  watch: UseFormWatch<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

/**
 * BasicInformationSection Component
 * 
 * Wrapper component that manages the email validation logic and renders
 * the BasicInformation component with appropriate props
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param watch - React Hook Form watch function
 * @param onEmailValidation - Callback when email validation completes
 */
const BasicInformationSection = ({
  register,
  errors,
  watch,
  onEmailValidation
}: BasicInformationSectionProps) => {
  const watchEmail = watch("email");
  const watchTicketType = watch("ticketType");

  // Use the email validation hook
  const { isCheckingEmail, validationMessage, isValid } = useEmailValidation(
    watchEmail,
    watchTicketType,
    onEmailValidation
  );

  return (
    <BasicInformation
      register={register}
      errors={errors}
      watch={watch}
      isCheckingEmail={isCheckingEmail}
      emailValidationMessage={validationMessage}
      emailIsValid={isValid}
    />
  );
};

export default BasicInformationSection;
