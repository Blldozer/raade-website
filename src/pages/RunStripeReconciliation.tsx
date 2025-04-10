
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * Run Stripe Reconciliation Page
 * 
 * A utility page that allows administrators to manually trigger a one-time
 * Stripe reconciliation process to ensure all payment records are synchronized
 * before sending emails.
 */
const RunStripeReconciliation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check admin authorization
  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data, error } = await supabase.rpc('is_admin');
          
        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Access Denied",
            description: "You need administrator privileges to access this page.",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        toast({
          title: "Authentication Error",
          description: "Please log in with an admin account.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
    
    checkAdmin();
  }, [navigate]);

  // Trigger Stripe reconciliation
  const runReconciliation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('stripe-reconcile', {
        body: { action: 'fetch-all' }
      });
      
      if (error) throw error;
      
      setResult(data);
      setIsComplete(true);
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${data.count} Stripe sessions.`,
      });
    } catch (err: any) {
      console.error("Error syncing data:", err);
      setError(err.message || "Failed to sync Stripe data");
      
      toast({
        title: "Sync Failed",
        description: "Failed to sync Stripe data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Run Stripe Reconciliation</CardTitle>
          <CardDescription>
            This will synchronize all Stripe payment records with the database.
            Use this before sending email campaigns to ensure all registrations are up to date.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isComplete ? (
            <div className="bg-green-50 p-4 rounded-md flex items-start space-x-3">
              <CheckCircle2 className="text-green-500 h-6 w-6 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">Synchronization Complete</h3>
                <p className="text-green-700 text-sm mt-1">
                  Successfully synchronized {result?.count || 0} Stripe sessions.
                </p>
                {result?.message && (
                  <p className="text-sm text-green-700 mt-2">{result.message}</p>
                )}
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md flex items-start space-x-3">
              <AlertCircle className="text-red-500 h-6 w-6 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800">Important</h3>
              <p className="text-blue-700 text-sm mt-1">
                This process will fetch all Stripe checkout sessions and ensure they are
                correctly recorded in the database. This helps identify any missing registrations
                before sending email campaigns.
              </p>
              <p className="text-blue-700 text-sm mt-2 font-medium">
                This process may take a minute or two to complete.
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/reconciliation')}
          >
            Go to Admin Dashboard
          </Button>
          
          {!isComplete && (
            <Button 
              onClick={runReconciliation}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : "Run Synchronization"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RunStripeReconciliation;
