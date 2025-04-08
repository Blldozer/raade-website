
// Define the sale end date (April 8, 2025, 4:00 PM CST)
export const SALE_END_DATE = new Date('2025-04-08T16:00:00-05:00');

// Function to check if the sale is still active
export const isSaleActive = (): boolean => {
  return new Date() < SALE_END_DATE;
};
