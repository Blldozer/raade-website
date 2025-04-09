
import { UseFormWatch, UseFormSetValue, FormState, Control } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM, getTicketPrice, isSaleActive, calculateDiscountedPrice } from "../RegistrationFormTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formatCurrency } from "@/lib/utils";

interface TicketTypeSelectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  couponDiscount: { type: 'percentage' | 'fixed'; amount: number } | null;
  control: Control<RegistrationFormData>;
}

/**
 * TicketTypeSelection Component
 * 
 * Displays radio options for selecting conference ticket types:
 * - Student tickets
 * - Professional tickets
 * - Student group tickets
 * - Shows discounted prices when coupons are applied
 * - Displays sale indicators when active
 * - Optimized for both mobile and desktop viewing
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 * @param errors - Form validation errors
 * @param couponDiscount - Applied coupon discount information
 * @param control - React Hook Form control object
 */
const TicketTypeSelection = ({ watch, setValue, errors, couponDiscount, control }: TicketTypeSelectionProps) => {
  const saleActive = isSaleActive();
  
  // Get prices for each ticket type
  const studentPrice = getTicketPrice(TICKET_TYPES_ENUM.STUDENT);
  const professionalPrice = getTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL);
  const groupPrice = getTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP);
  
  // Calculate discounted prices if a coupon is applied
  const discountedStudentPrice = calculateDiscountedPrice(studentPrice, couponDiscount);
  const discountedProfessionalPrice = calculateDiscountedPrice(professionalPrice, couponDiscount);
  const discountedGroupPrice = calculateDiscountedPrice(groupPrice, couponDiscount);
  
  // Check if prices are discounted
  const hasStudentDiscount = discountedStudentPrice < studentPrice;
  const hasProfessionalDiscount = discountedProfessionalPrice < professionalPrice;
  const hasGroupDiscount = discountedGroupPrice < groupPrice;

  // Calculate discount percentages for display
  const getDiscountPercentage = (original: number, discounted: number) => {
    if (original <= 0 || discounted >= original) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  const studentDiscountPercentage = getDiscountPercentage(studentPrice, discountedStudentPrice);
  const professionalDiscountPercentage = getDiscountPercentage(professionalPrice, discountedProfessionalPrice);
  const groupDiscountPercentage = getDiscountPercentage(groupPrice, discountedGroupPrice);

  return (
    <div className="py-4">
      <h3 className="text-lg font-medium text-[#274675] mb-3">Select Ticket Type</h3>
      
      <FormField
        control={control}
        name="ticketType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              className="space-y-3"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={TICKET_TYPES_ENUM.STUDENT} id="ticket-student" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer" htmlFor="ticket-student">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Student</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      {hasStudentDiscount ? (
                        <>
                          <span className="line-through mr-2">{formatCurrency(studentPrice)}</span>
                          <span className="text-green-600 font-medium">{formatCurrency(discountedStudentPrice)}</span>
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {studentDiscountPercentage}% off
                          </span>
                        </>
                      ) : (
                        <>{formatCurrency(studentPrice)}</>
                      )}
                      {saleActive && !hasStudentDiscount && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Sale!
                        </span>
                      )}
                    </div>
                  </div>
                </FormLabel>
              </FormItem>

              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={TICKET_TYPES_ENUM.PROFESSIONAL} id="ticket-professional" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer" htmlFor="ticket-professional">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Professional</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      {hasProfessionalDiscount ? (
                        <>
                          <span className="line-through mr-2">{formatCurrency(professionalPrice)}</span>
                          <span className="text-green-600 font-medium">{formatCurrency(discountedProfessionalPrice)}</span>
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {professionalDiscountPercentage}% off
                          </span>
                        </>
                      ) : (
                        <>{formatCurrency(professionalPrice)}</>
                      )}
                      {saleActive && !hasProfessionalDiscount && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Sale!
                        </span>
                      )}
                    </div>
                  </div>
                </FormLabel>
              </FormItem>

              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={TICKET_TYPES_ENUM.STUDENT_GROUP} id="ticket-group" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer" htmlFor="ticket-group">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Student Group</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      {hasGroupDiscount ? (
                        <>
                          <span className="line-through mr-2">{formatCurrency(groupPrice)}</span>
                          <span className="text-green-600 font-medium">{formatCurrency(discountedGroupPrice)}</span>
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            {groupDiscountPercentage}% off
                          </span>
                        </>
                      ) : (
                        <>{formatCurrency(groupPrice)}</>
                      )}
                      <span className="ml-1">per person</span>
                      {saleActive && !hasGroupDiscount && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Sale!
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">For student groups of 3 or more</div>
                  </div>
                </FormLabel>
              </FormItem>
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TicketTypeSelection;
