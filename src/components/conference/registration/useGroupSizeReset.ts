
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { useEffect } from "react";

/**
 * A hook to reset group size and emails when ticket type changes
 * 
 * Ensures the form is in a consistent state when users switch between
 * individual and group registration options
 */
export const useGroupSizeReset = (
  watch: UseFormWatch<RegistrationFormData>,
  setValue: UseFormSetValue<RegistrationFormData>
) => {
  const ticketType = watch("ticketType");
  
  useEffect(() => {
    // If ticket type is not student-group, clear group fields
    if (ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    }
  }, [ticketType, setValue]);
};
