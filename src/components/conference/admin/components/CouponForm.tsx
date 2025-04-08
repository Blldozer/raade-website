
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCouponForm } from "../hooks/useCouponForm";
import CouponFormFields from "./CouponFormFields";
import CreateCouponButton from "./CreateCouponButton";

/**
 * Component for creating new coupon codes
 * 
 * Manages form state, validation, and submission
 */
interface CouponFormProps {
  onCouponCreated: () => void;
}

const CouponForm = ({ onCouponCreated }: CouponFormProps) => {
  const {
    newCoupon,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCreateCoupon
  } = useCouponForm(onCouponCreated);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Create New Coupon Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <CouponFormFields 
            couponData={newCoupon}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          
          <CreateCouponButton 
            isSubmitting={isSubmitting}
            onClick={handleCreateCoupon}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CouponForm;
