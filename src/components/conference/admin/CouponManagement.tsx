
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, PlusCircle, Edit, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CouponCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  is_active: boolean;
  max_uses: number | null;
  current_uses: number;
  created_at: string;
  expires_at: string | null;
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New coupon state
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discount_type: "full" as const,
    discount_amount: 100,
    max_uses: 10,
    is_active: true,
    expires_at: "" // YYYY-MM-DD format
  });
  
  const { toast } = useToast();
  
  // Fetch coupons on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);
  
  const fetchCoupons = async () => {
    setIsLoading(true);
    
    try {
      // Use raw queries with limited type safety as a workaround
      // Since the database types haven't been generated yet
      const { data, error } = await supabase
        .rpc('get_coupon_codes')
        .select();
      
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === 'discount_amount' || name === 'max_uses') {
      setNewCoupon({
        ...newCoupon,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setNewCoupon({
        ...newCoupon,
        [name]: value
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewCoupon({
      ...newCoupon,
      [name]: value
    });
    
    // Reset discount amount to 100 for 'full' type
    if (name === 'discount_type' && value === 'full') {
      setNewCoupon(prev => ({
        ...prev,
        discount_amount: 100
      }));
    }
  };
  
  const handleCreateCoupon = async () => {
    // Validate form
    if (!newCoupon.code) {
      toast({
        title: "Error",
        description: "Coupon code is required",
        variant: "destructive",
      });
      return;
    }
    
    // Auto-uppercase the code for consistency
    const formattedCode = newCoupon.code.trim().toUpperCase();
    
    setIsSubmitting(true);
    
    try {
      // Prepare data
      const couponData = {
        ...newCoupon,
        code: formattedCode,
        // Format expiration date if provided
        expires_at: newCoupon.expires_at ? new Date(newCoupon.expires_at).toISOString() : null
      };
      
      // Use the custom function to create a new coupon
      const { data, error } = await supabase
        .rpc('create_coupon_code', {
          p_code: couponData.code,
          p_description: couponData.description,
          p_discount_type: couponData.discount_type,
          p_discount_amount: couponData.discount_amount,
          p_max_uses: couponData.max_uses,
          p_is_active: couponData.is_active,
          p_expires_at: couponData.expires_at
        });
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          throw new Error("A coupon with this code already exists");
        }
        throw error;
      }
      
      // Success
      toast({
        title: "Success",
        description: `Coupon code ${formattedCode} created successfully`,
        variant: "default",
      });
      
      // Reset form
      setNewCoupon({
        code: "",
        description: "",
        discount_type: "full",
        discount_amount: 100,
        max_uses: 10,
        is_active: true,
        expires_at: ""
      });
      
      // Refresh coupon list
      fetchCoupons();
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create coupon code",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteCoupon = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete coupon ${code}?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .rpc('delete_coupon_code', { p_id: id });
      
      if (error) {
        throw error;
      }
      
      // Success
      toast({
        title: "Success",
        description: `Coupon code ${code} deleted successfully`,
        variant: "default",
      });
      
      // Refresh coupon list
      fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast({
        title: "Error",
        description: "Failed to delete coupon code",
        variant: "destructive",
      });
    }
  };
  
  const toggleCouponStatus = async (id: string, currentStatus: boolean, code: string) => {
    try {
      const { error } = await supabase
        .rpc('toggle_coupon_status', { 
          p_id: id,
          p_is_active: !currentStatus 
        });
      
      if (error) {
        throw error;
      }
      
      // Success
      toast({
        title: "Success",
        description: `Coupon ${code} is now ${!currentStatus ? 'active' : 'inactive'}`,
        variant: "default",
      });
      
      // Refresh coupon list
      fetchCoupons();
    } catch (error) {
      console.error("Error toggling coupon status:", error);
      toast({
        title: "Error",
        description: "Failed to update coupon status",
        variant: "destructive",
      });
    }
  };
  
  // Format date in a friendly way
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Never';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Create New Coupon Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="RAADE100"
                  value={newCoupon.code}
                  onChange={handleInputChange}
                  className="uppercase"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount_type">Discount Type</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('discount_type', value)}
                  value={newCoupon.discount_type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Discount (100% off)</SelectItem>
                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                    <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {newCoupon.discount_type !== 'full' && (
              <div className="space-y-2">
                <Label htmlFor="discount_amount">
                  {newCoupon.discount_type === 'percentage' ? 'Discount Percentage' : 'Discount Amount ($)'}
                </Label>
                <Input
                  id="discount_amount"
                  name="discount_amount"
                  type="number"
                  min={1}
                  max={newCoupon.discount_type === 'percentage' ? 100 : undefined}
                  value={newCoupon.discount_amount}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                name="description"
                placeholder="Special discount for early registrants"
                value={newCoupon.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_uses">Maximum Uses</Label>
                <Input
                  id="max_uses"
                  name="max_uses"
                  type="number"
                  min={1}
                  value={newCoupon.max_uses}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expires_at">Expiration Date (Optional)</Label>
                <Input
                  id="expires_at"
                  name="expires_at"
                  type="date"
                  value={newCoupon.expires_at}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleCreateCoupon} 
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
          </div>
        </CardContent>
      </Card>
      
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
                      {coupon.discount_type === 'full' && 'Full Discount'}
                      {coupon.discount_type === 'percentage' && 'Percentage'}
                      {coupon.discount_type === 'fixed' && 'Fixed Amount'}
                    </TableCell>
                    <TableCell>
                      {coupon.discount_type === 'full' && '100% OFF'}
                      {coupon.discount_type === 'percentage' && `${coupon.discount_amount}%`}
                      {coupon.discount_type === 'fixed' && `$${coupon.discount_amount}`}
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
                        onClick={() => toggleCouponStatus(coupon.id, coupon.is_active, coupon.code)}
                        title={coupon.is_active ? "Deactivate" : "Activate"}
                      >
                        <CheckCircle className={`h-4 w-4 ${coupon.is_active ? 'text-green-500' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponManagement;
