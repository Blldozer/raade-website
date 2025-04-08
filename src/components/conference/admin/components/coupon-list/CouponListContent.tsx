
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CouponCode } from "../../types/CouponTypes";
import CouponTable from "./CouponTable";

/**
 * Component for rendering the content of the coupon list
 * 
 * Handles loading states, empty states, and the coupon table
 */
interface CouponListContentProps {
  coupons: CouponCode[];
  isLoading: boolean;
  actionInProgress: string | null;
  onDelete: (id: string, code: string) => void;
  onToggleStatus: (id: string, isActive: boolean, code: string) => void;
}

const CouponListContent = ({ 
  coupons, 
  isLoading, 
  actionInProgress, 
  onDelete, 
  onToggleStatus 
}: CouponListContentProps) => {
  if (isLoading) {
    return (
      <CardContent>
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </CardContent>
    );
  }

  if (coupons.length === 0) {
    return (
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          No coupon codes found. Create your first coupon above.
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <CouponTable
        coupons={coupons}
        actionInProgress={actionInProgress}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    </CardContent>
  );
};

export default CouponListContent;
