
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2 } from "lucide-react";
import { NewCouponFormData } from "../types/CouponTypes";
import { formatCouponCode } from "../utils/couponUtils";
import { useToast } from "@/hooks/use-toast";
import { createCoupon } from "../services/couponService";

interface CouponFormProps {
  onCouponCreated: () => void;
}

/**
 * Component for creating new coupon codes
 * 
 * Handles form state, validation, and submission
 */
const CouponForm = ({ onCouponCreated }: CouponFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // New coupon state
  const [newCoupon, setNewCoupon] = useState<NewCouponFormData>({
    code: "",
    description: "",
    discount_type: "full" as const,
    discount_amount: 100,
    max_uses: 10,
    is_active: true,
    expires_at: "" // YYYY-MM-DD format
  });
  
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
    const formattedCode = formatCouponCode(newCoupon.code);
    
    setIsSubmitting(true);
    
    try {
      // Prepare data
      const couponData = {
        code: formattedCode,
        description: newCoupon.description || null,
        discount_type: newCoupon.discount_type,
        discount_amount: newCoupon.discount_amount,
        max_uses: newCoupon.max_uses || null,
        is_active: newCoupon.is_active,
        // Format expiration date if provided
        expires_at: newCoupon.expires_at ? new Date(newCoupon.expires_at).toISOString() : null
      };
      
      // Create the coupon
      const { data, error } = await createCoupon(couponData);
      
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
      
      // Notify parent component
      onCouponCreated();
      
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

  return (
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
  );
};

export default CouponForm;
