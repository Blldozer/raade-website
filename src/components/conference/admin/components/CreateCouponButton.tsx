
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";

/**
 * Submit button for coupon creation form
 * 
 * Shows loading state during submission
 */
interface CreateCouponButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

const CreateCouponButton = ({ isSubmitting, onClick }: CreateCouponButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isSubmitting}
      className="w-full md:w-auto"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        <>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Coupon Code
        </>
      )}
    </Button>
  );
};

export default CreateCouponButton;
