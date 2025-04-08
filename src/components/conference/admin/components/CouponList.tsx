
import React from "react";
import { Card } from "@/components/ui/card";
import { CouponCode } from "../types/CouponTypes";
import { useCouponActions } from "../hooks/useCouponActions";
import CouponListHeader from "./coupon-list/CouponListHeader";
import CouponListContent from "./coupon-list/CouponListContent";

/**
 * Main component for displaying and managing the list of coupon codes
 * 
 * Orchestrates the coupon list UI and actions
 */
interface CouponListProps {
  coupons: CouponCode[];
  isLoading: boolean;
  onCouponUpdated: () => void;
}

const CouponList = ({ coupons, isLoading, onCouponUpdated }: CouponListProps) => {
  const {
    actionInProgress,
    handleDeleteCoupon,
    handleToggleCouponStatus
  } = useCouponActions(onCouponUpdated);
  
  return (
    <Card>
      <CouponListHeader />
      <CouponListContent 
        coupons={coupons}
        isLoading={isLoading}
        actionInProgress={actionInProgress}
        onDelete={handleDeleteCoupon}
        onToggleStatus={handleToggleCouponStatus}
      />
    </Card>
  );
};

export default CouponList;
