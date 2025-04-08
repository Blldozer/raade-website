
import { TICKET_TYPES_ENUM, RegistrationFormData, getTicketPrice, getRegularTicketPrice, isSaleActive } from "../RegistrationFormTypes";
import { UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TicketTypeSelectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  register: UseFormWatch<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

/**
 * TicketTypeSelection Component
 * 
 * Displays the ticket type options for conference registration
 * - Includes regular and sale pricing options
 * - Shows student, professional, and group registration options
 * - Highlights the currently active sale pricing
 */
const TicketTypeSelection = ({ 
  watch, 
  setValue, 
  errors 
}: TicketTypeSelectionProps) => {
  const ticketType = watch("ticketType");
  const isOnSale = isSaleActive();
  
  const handleTicketTypeChange = (value: string) => {
    setValue("ticketType", value as any);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semula mb-3">Select Ticket Type</h3>
        
        <RadioGroup 
          value={ticketType} 
          onValueChange={handleTicketTypeChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <TicketCard
            id="student"
            title="Student Ticket"
            description="For individual students"
            price={getTicketPrice(TICKET_TYPES_ENUM.STUDENT)}
            regularPrice={getRegularTicketPrice(TICKET_TYPES_ENUM.STUDENT)}
            isSelected={ticketType === TICKET_TYPES_ENUM.STUDENT}
            isOnSale={isOnSale}
          />

          <TicketCard
            id="professional"
            title="Professional Ticket"
            description="For working professionals"
            price={getTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL)}
            regularPrice={getRegularTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL)}
            isSelected={ticketType === TICKET_TYPES_ENUM.PROFESSIONAL}
            isOnSale={isOnSale}
          />

          <TicketCard
            id="student-group"
            title="Student Group"
            description="For groups of 5+ students"
            price={getTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP, 5) / 5}
            regularPrice={getRegularTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP, 5) / 5}
            perPerson
            isSelected={ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP}
            isOnSale={isOnSale}
          />
        </RadioGroup>
        
        {errors.ticketType && (
          <p className="text-red-500 text-sm mt-1">Please select a ticket type</p>
        )}
      </div>
    </div>
  );
};

interface TicketCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  regularPrice: number;
  isSelected: boolean;
  isOnSale: boolean;
  perPerson?: boolean;
}

const TicketCard = ({
  id,
  title,
  description,
  price,
  regularPrice,
  isSelected,
  isOnSale,
  perPerson = false
}: TicketCardProps) => {
  return (
    <Card className={`relative overflow-hidden border-2 transition-all ${
      isSelected ? 'border-[#FBB03B]' : 'border-gray-200 dark:border-gray-700'
    }`}>
      {isOnSale && (
        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">Sale</Badge>
      )}
      
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex items-start gap-2">
          <RadioGroupItem value={id} id={id} className="mt-1" />
          <div className="flex-1">
            <Label htmlFor={id} className="text-lg font-medium block mb-1">{title}</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
            
            <div className="mt-auto">
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold">${price.toFixed(2)}</span>
                {isOnSale && (
                  <span className="text-sm text-gray-500 line-through mb-0.5">${regularPrice.toFixed(2)}</span>
                )}
                {perPerson && <span className="text-sm text-gray-500 mb-0.5">/person</span>}
              </div>
              {perPerson && (
                <p className="text-xs text-gray-500 mt-1">Minimum 5 people required</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketTypeSelection;
