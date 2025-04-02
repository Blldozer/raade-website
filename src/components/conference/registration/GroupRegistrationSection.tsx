
import { UseFormWatch, UseFormSetValue, Control, useWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData, TICKET_TYPES_ENUM, calculateTotalPrice } from "../RegistrationFormTypes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Controller } from "react-hook-form";

interface GroupRegistrationSectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
}

/**
 * GroupRegistrationSection Component
 * 
 * Displays group registration fields when the student group ticket type is selected.
 * Provides dynamic form fields for entering group member emails and size.
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 * @param control - React Hook Form control object
 */
const GroupRegistrationSection = ({
  watch,
  setValue,
  control
}: GroupRegistrationSectionProps) => {
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize");
  
  // Only show for student group registrations
  if (ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP) {
    return null;
  }

  // Calculate total price for the group
  const totalPrice = calculateTotalPrice(ticketType, groupSize);
  const pricePerPerson = 30; // This should match the price in RegistrationFormTypes.ts
  
  return (
    <div className="space-y-4 rounded-md p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <h3 className="text-base font-semibold">Group Registration Details</h3>
      <div>
        <Label htmlFor="groupSize">Number of Attendees</Label>
        <Input
          type="number"
          id="groupSize"
          placeholder="Enter number of attendees (minimum 5)"
          min={5}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setValue("groupSize", value >= 5 ? value : 5);
          }}
          value={groupSize || 5}
          className="max-w-[200px]"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Minimum 5 attendees required for group discount
        </p>
      </div>
      
      {groupSize && groupSize >= 5 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Price:</span>
            <span className="font-semibold text-[#274675] dark:text-[#FBB03B]">
              ${totalPrice}.00 (${pricePerPerson}.00 per person)
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You'll be able to provide attendee details after registration
          </p>
          
          <Controller
            control={control}
            name="groupEmails"
            render={({ field }) => (
              <div className="space-y-2">
                <Label>Group Leader Email</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  As the group organizer, your email will be used as the primary contact
                </p>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default GroupRegistrationSection;
