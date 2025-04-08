
import { CouponData, getDiscountedPrice } from "./CouponTypes";
import { TICKET_TYPES_ENUM, getTicketPrice } from "./TicketTypes";

/**
 * Calculate the total price based on ticket type and group size
 * @param ticketType The type of ticket
 * @param groupSize Optional group size for group tickets
 * @returns The total price in USD
 */
export const calculateTotalPrice = (
  ticketType: typeof TICKET_TYPES_ENUM[keyof typeof TICKET_TYPES_ENUM],
  groupSize?: number,
  coupon?: CouponData | null
): number => {
  const basePrice = getTicketPrice(ticketType);
  
  let totalPrice = basePrice;
  if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && groupSize) {
    totalPrice = basePrice * groupSize;
  }
  
  // Apply coupon discount if available
  if (coupon) {
    return getDiscountedPrice(totalPrice, coupon);
  }
  
  return totalPrice;
};
