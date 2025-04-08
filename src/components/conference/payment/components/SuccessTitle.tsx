
interface SuccessTitleProps {
  isFreeRegistration?: boolean;
}

/**
 * SuccessTitle Component
 * 
 * Displays an appropriate title based on registration type
 */
const SuccessTitle = ({ isFreeRegistration = false }: SuccessTitleProps) => {
  return (
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
      {isFreeRegistration ? "Registration Complete" : "Payment Successful"}
    </h3>
  );
};

export default SuccessTitle;
