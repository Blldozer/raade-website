import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import RegistrantsTable, { UnifiedRegistrant } from "@/components/admin/RegistrantsTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

/**
 * AdminReconciliation Page Component
 * 
 * An admin dashboard page that provides:
 * 1. Export of unified registrant data as CSV for email marketing integration
 * 2. Management of Stripe payment reconciliation data
 */
const AdminReconciliation = () => {
  const [registrants, setRegistrants] = useState<UnifiedRegistrant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  /**
   * Fetch unified registrants data from Supabase
   */
  const fetchRegistrants = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('unified_registrants')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setRegistrants(data || []);
    } catch (error) {
      console.error('Error fetching registrants:', error);
      toast({
        title: "Error fetching registrants",
        description: "Could not load registrant data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchRegistrants();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="registrants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="registrants">Registrants Data</TabsTrigger>
          <TabsTrigger value="payments">Payment Reconciliation</TabsTrigger>
        </TabsList>
        
        {/* Registrants Tab */}
        <TabsContent value="registrants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Registrant Data</CardTitle>
              <CardDescription>
                Export unified registrant data for use with email marketing tools like Brevo,
                Mailchimp, or other platforms. Filter and search before exporting.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <RegistrantsTable 
            registrants={registrants} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        {/* Payments Tab - Keeping existing functionality */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Reconciliation</CardTitle>
              <CardDescription>
                Review and reconcile payment data from Stripe with registrations in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Existing payment reconciliation content - kept as is */}
              <p className="text-gray-600">
                This section will display payment reconciliation data... 
                (Payment reconciliation UI to be implemented separately)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReconciliation;
