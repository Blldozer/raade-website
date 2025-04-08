
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Trash2, Loader2 } from "lucide-react";
import { CouponCode } from "../types/CouponTypes";
import { formatDate, getDiscountTypeDisplay, getDiscountValueDisplay } from "../utils/couponUtils";
import { useToast } from "@/hooks/use-toast";
import { deleteCoupon, toggleCouponStatus } from "../services/couponService";

interface CouponListProps {
  coupons: CouponCode[];
  isLoading: boolean;
  onCouponUpdated: () => void;
}

/**
 * Component for displaying and managing the list of coupon codes
 * 
 * Handles display, deletion, and status toggling of coupons
 */
const CouponList = ({ coupons, isLoading, onCouponUpdated }: CouponListProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Manage Coupon Codes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No coupon codes found. Create your first coupon above.
          </div>
        ) : (
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
                      onClick={() => handleToggleCouponStatus(coupon.id, coupon.is_active, coupon.code)}
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
                      onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
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
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponList;
