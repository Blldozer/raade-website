
import { useEffect } from "react";
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch, Control } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES } from "./RegistrationFormTypes";
import BasicInformation from "./registration/BasicInformation";
import TicketTypeSelection from "./registration/TicketTypeSelection";
import GroupRegistration from "./registration/GroupRegistration";
import SpecialRequests from "./registration/SpecialRequests";
import { useEmailValidation } from "./registration/useEmailValidation";

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

const RegistrationFormFields = ({ 
  register, 
  errors, 
  setValue, 
  watch,
  control,
  onEmailValidation
}: RegistrationFormFieldsProps) => {
  
  const watchTicketType = watch("ticketType");
  const watchEmail = watch("email");
  const isStudentGroup = watchTicketType === TICKET_TYPES.STUDENT_GROUP;
  
  const { isCheckingEmail } = useEmailValidation(watchEmail, watchTicketType, onEmailValidation);
  
  useEffect(() => {
    // Reset group size when ticket type changes
    if (!isStudentGroup) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    } else if (!watch("groupSize")) {
      setValue("groupSize", 5); // Default group size
    }
  }, [watchTicketType, setValue, isStudentGroup, watch]);

  return (
    <div className="space-y-4">
      <BasicInformation 
        register={register} 
        errors={errors} 
        watch={watch} 
        isCheckingEmail={isCheckingEmail} 
      />
      
      <TicketTypeSelection 
        watch={watch} 
        setValue={setValue} 
        errors={errors} 
      />
      
      {isStudentGroup && (
        <GroupRegistration
          watch={watch}
          setValue={setValue}
          control={control}
        />
      )}

      <SpecialRequests register={register} />
    </div>
  );
};

export default RegistrationFormFields;
