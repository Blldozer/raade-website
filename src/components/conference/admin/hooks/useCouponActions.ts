
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteCoupon, toggleCouponStatus } from "../services/couponService";

/**
 * Custom hook for managing coupon actions like deletion and status toggling
 * 
 * Handles API calls, loading states, and toast notifications
 */
export const useCouponActions = (onCouponUpdated: () => void) => {
  const { toast } = useToast();
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  
  const handleDeleteCoupon = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete coupon ${code}?`)) {
      return;
    }
    
    setActionInProgress(id);
    
    try {
      const { error } = await deleteCoupon(id);
      
      if (error) {
        throw error;
      }
      
      // Success
      toast({
        title: "Success",
        description: `Coupon code ${code} deleted successfully`,
        variant: "default",
      });
      
      // Notify parent component to refresh the list
      onCouponUpdated();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast({
        title: "Error",
        description: "Failed to delete coupon code",
        variant: "destructive",
      });
    } finally {
      setActionInProgress(null);
    }
  };
  
  const handleToggleCouponStatus = async (id: string, currentStatus: boolean, code: string) => {
    setActionInProgress(id);
    
    try {
      const { error } = await toggleCouponStatus(id, currentStatus);
      
      if (error) {
        throw error;
      }
      
      // Success
      toast({
        title: "Success",
        description: `Coupon ${code} is now ${!currentStatus ? 'active' : 'inactive'}`,
        variant: "default",
      });
      
      // Notify parent component to refresh the list
      onCouponUpdated();
    } catch (error) {
      console.error("Error toggling coupon status:", error);
      toast({
        title: "Error",
        description: "Failed to update coupon status",
        variant: "destructive",
      });
    } finally {
      setActionInProgress(null);
    }
  };

  return {
    actionInProgress,
    handleDeleteCoupon,
    handleToggleCouponStatus
  };
};
