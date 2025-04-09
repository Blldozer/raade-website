
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CouponCode } from "../../types/CouponTypes";
import CouponTableRow from "./CouponTableRow";

/**
 * Component for rendering the table of coupons
 * 
 * Displays coupon data in a structured format with headers and rows
 */
interface CouponTableProps {
  coupons: CouponCode[];
  actionInProgress: string | null;
  onDelete: (id: string, code: string) => void;
  onToggleStatus: (id: string, isActive: boolean, code: string) => void;
}

const CouponTable = ({ 
  coupons, 
  actionInProgress, 
  onDelete, 
  onToggleStatus 
}: CouponTableProps) => {
  return (
    <Table>
      <TableCaption>List of all coupon codes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Uses</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coupons.map((coupon) => (
          <CouponTableRow
            key={coupon.id}
            coupon={coupon}
            actionInProgress={actionInProgress}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CouponTable;
