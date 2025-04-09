
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Loader2 } from "lucide-react";
import { CouponCode } from "../../types/CouponTypes";
import { formatDate, getDiscountTypeDisplay, getDiscountValueDisplay } from "../../utils/couponUtils";

/**
 * Component for rendering a single coupon row in the table
 * 
 * Handles display of coupon information and action buttons
 */
interface CouponTableRowProps {
  coupon: CouponCode;
  actionInProgress: string | null;
  onDelete: (id: string, code: string) => void;
  onToggleStatus: (id: string, isActive: boolean, code: string) => void;
}

const CouponTableRow = ({ 
  coupon, 
  actionInProgress, 
  onDelete, 
  onToggleStatus 
}: CouponTableRowProps) => {
  return (
    <TableRow key={coupon.id}>
      <TableCell className="font-medium">{coupon.code}</TableCell>
      <TableCell>
        {getDiscountTypeDisplay(coupon.discount_type)}
      </TableCell>
      <TableCell>
        {getDiscountValueDisplay(coupon.discount_type, coupon.discount_amount)}
      </TableCell>
      <TableCell>
        {coupon.current_uses}{coupon.max_uses ? `/${coupon.max_uses}` : ''}
      </TableCell>
      <TableCell>{formatDate(coupon.expires_at)}</TableCell>
      <TableCell>
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            coupon.is_active 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {coupon.is_active ? 'Active' : 'Inactive'}
        </span>
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleStatus(coupon.id, coupon.is_active, coupon.code)}
          title={coupon.is_active ? "Deactivate" : "Activate"}
          disabled={actionInProgress === coupon.id}
        >
          {actionInProgress === coupon.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className={`h-4 w-4 ${coupon.is_active ? 'text-green-500' : 'text-gray-400'}`} />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(coupon.id, coupon.code)}
          title="Delete"
          disabled={actionInProgress === coupon.id}
        >
          {actionInProgress === coupon.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 text-red-500" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CouponTableRow;
