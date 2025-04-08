
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CouponCode } from "./types/CouponTypes";
import { fetchCoupons } from "./services/couponService";
import CouponForm from "./components/CouponForm";
import CouponList from "./components/CouponList";

/**
 * Coupon Management Component for Administrators
 * 
 * Allows admin users to:
 * - List all existing coupon codes
 * - Create new coupon codes
 * - Edit existing coupon codes
 * - Delete coupon codes
 * - View usage statistics
 */
const CouponManagement = () => {
  const [coupons, setCoupons] = useState<CouponCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Fetch coupons on component mount
  useEffect(() => {
    fetchCouponData();
  }, []);
  
  const fetchCouponData = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await fetchCoupons();
      
      if (error) {
        throw error;
      }
      
      setCoupons(data as CouponCode[] || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast({
        title: "Error",
        description: "Failed to load coupon codes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <CouponForm onCouponCreated={fetchCouponData} />
      <CouponList 
        coupons={coupons} 
        isLoading={isLoading} 
        onCouponUpdated={fetchCouponData} 
      />
    </div>
  );
};

export default CouponManagement;
