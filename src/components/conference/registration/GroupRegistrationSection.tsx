
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import GroupRegistration from "./GroupRegistration";

interface GroupRegistrationSectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
}

/**
 * GroupRegistrationSection Component
 * 
 * Conditionally renders the group registration form based on ticket type
 * Handles logic for when to show group registration fields
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 * @param control - React Hook Form control object
 */
const GroupRegistrationSection = ({
  watch,
  setValue,
  control
}: GroupRegistrationSectionProps) => {
  const watchTicketType = watch("ticketType");
  const isStudentGroup = watchTicketType === TICKET_TYPES_ENUM.STUDENT_GROUP;

  if (!isStudentGroup) {
    return null;
  }

  return (
    <GroupRegistration
      watch={watch}
      setValue={setValue}
      control={control}
    />
  );
};

export default GroupRegistrationSection;
