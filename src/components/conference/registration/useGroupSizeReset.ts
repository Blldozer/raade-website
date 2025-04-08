
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useEffect } from "react";
import { RegistrationFormData } from "../RegistrationFormTypes";

/**
 * Custom hook to handle group size logic
 * 
 * This hook ensures that:
 * - When ticket type is not "student-group", groupSize is undefined
 * - Group emails array size matches the selected group size
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 */
export const useGroupSizeReset = (
  watch: UseFormWatch<RegistrationFormData>,
  setValue: UseFormSetValue<RegistrationFormData>
) => {
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize");
  
  useEffect(() => {
    // If ticket type is not student-group, reset group size
    if (ticketType !== "student-group" && groupSize !== undefined) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    }
  }, [ticketType, groupSize, setValue]);
};
