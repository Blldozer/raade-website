
import { useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";

/**
 * Custom hook to manage group size reset logic
 * 
 * Resets group size and emails when ticket type changes
 * Sets default group size when selecting student group ticket
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 */
export const useGroupSizeReset = (
  watch: UseFormWatch<RegistrationFormData>,
  setValue: UseFormSetValue<RegistrationFormData>
) => {
  const watchTicketType = watch("ticketType");
  const isStudentGroup = watchTicketType === TICKET_TYPES_ENUM.STUDENT_GROUP;
  
  useEffect(() => {
    // Reset group size when ticket type changes
    if (!isStudentGroup) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    } else if (!watch("groupSize")) {
      setValue("groupSize", 5); // Default group size
    }
  }, [watchTicketType, setValue, isStudentGroup, watch]);

  return { isStudentGroup };
};
