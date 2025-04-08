
import { useEffect } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";

/**
 * Custom hook to reset group size and emails when ticket type changes
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 */
export const useGroupSizeReset = (
  watch: UseFormWatch<RegistrationFormData>,
  setValue: UseFormSetValue<RegistrationFormData>
) => {
  const ticketType = watch("ticketType");

  useEffect(() => {
    // If ticket type is not student group, reset group-related fields
    if (ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    } 
    // If ticket type is student group but no group size set, initialize it
    else if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && !watch("groupSize")) {
      setValue("groupSize", 5);
    }
  }, [ticketType, setValue, watch]);
};

export default useGroupSizeReset;
