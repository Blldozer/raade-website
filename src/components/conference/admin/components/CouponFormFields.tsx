
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewCouponFormData } from "../types/CouponTypes";

/**
 * Component for rendering coupon form fields
 * 
 * Displays all input fields for creating a new coupon
 */
interface CouponFormFieldsProps {
  couponData: NewCouponFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const CouponFormFields = ({ 
  couponData, 
  onInputChange, 
  onSelectChange 
}: CouponFormFieldsProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Coupon Code</Label>
          <Input
            id="code"
            name="code"
            placeholder="RAADE100"
            value={couponData.code}
            onChange={onInputChange}
            className="uppercase"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="discount_type">Discount Type</Label>
          <Select
            onValueChange={(value) => onSelectChange('discount_type', value)}
            value={couponData.discount_type}
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
      
      {couponData.discount_type !== 'full' && (
        <div className="space-y-2">
          <Label htmlFor="discount_amount">
            {couponData.discount_type === 'percentage' ? 'Discount Percentage' : 'Discount Amount ($)'}
          </Label>
          <Input
            id="discount_amount"
            name="discount_amount"
            type="number"
            min={1}
            max={couponData.discount_type === 'percentage' ? 100 : undefined}
            value={couponData.discount_amount}
            onChange={onInputChange}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          name="description"
          placeholder="Special discount for early registrants"
          value={couponData.description}
          onChange={onInputChange}
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
            value={couponData.max_uses}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expires_at">Expiration Date (Optional)</Label>
          <Input
            id="expires_at"
            name="expires_at"
            type="date"
            value={couponData.expires_at}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CouponFormFields;
