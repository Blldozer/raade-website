
import { useState } from "react";
import { NewCouponFormData } from "../types/CouponTypes";
import { formatCouponCode } from "../utils/couponUtils";
import { createCoupon } from "../services/couponService";
import { useToast } from "@/hooks/use-toast";

/**
 * Custom hook to manage coupon form state and submission
 * 
 * Handles form state, validation, and API interactions
 */
export const useCouponForm = (onCouponCreated: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // New coupon state
  const [newCoupon, setNewCoupon] = useState<NewCouponFormData>({
    code: "",
    description: "",
    discount_type: "full" as const,
    discount_amount: 100,
    max_uses: 10,
    is_active: true,
    expires_at: "" // YYYY-MM-DD format
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === 'discount_amount' || name === 'max_uses') {
      setNewCoupon({
        ...newCoupon,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setNewCoupon({
        ...newCoupon,
        [name]: value
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewCoupon({
      ...newCoupon,
      [name]: value
    });
    
    // Reset discount amount to 100 for 'full' type
    if (name === 'discount_type' && value === 'full') {
      setNewCoupon(prev => ({
        ...prev,
        discount_amount: 100
      }));
    }
  };
  
  const handleCreateCoupon = async () => {
    // Validate form
    if (!newCoupon.code) {
      toast({
        title: "Error",
        description: "Coupon code is required",
        variant: "destructive",
      });
      return;
    }
    
    // Auto-uppercase the code for consistency
    const formattedCode = formatCouponCode(newCoupon.code);
    
    setIsSubmitting(true);
    
    try {
      // Prepare data
      const couponData = {
        code: formattedCode,
        description: newCoupon.description || null,
        discount_type: newCoupon.discount_type,
        discount_amount: newCoupon.discount_amount,
        max_uses: newCoupon.max_uses || null,
        is_active: newCoupon.is_active,
        // Format expiration date if provided
        expires_at: newCoupon.expires_at ? new Date(newCoupon.expires_at).toISOString() : null
      };
      
      // Create the coupon
      const { data, error } = await createCoupon(couponData);
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          throw new Error("A coupon with this code already exists");
        }
        throw error;
      }
      
      // Success
      toast({
        title: "Success",
        description: `Coupon code ${formattedCode} created successfully`,
        variant: "default",
      });
      
      // Reset form
      setNewCoupon({
        code: "",
        description: "",
        discount_type: "full",
        discount_amount: 100,
        max_uses: 10,
        is_active: true,
        expires_at: ""
      });
      
      // Notify parent component
      onCouponCreated();
      
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create coupon code",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    newCoupon,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCreateCoupon
  };
};
