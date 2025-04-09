
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Header component for the coupon list section
 * 
 * Displays the section title with consistent styling
 */
const CouponListHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="text-xl font-semibold">Manage Coupon Codes</CardTitle>
    </CardHeader>
  );
};

export default CouponListHeader;
