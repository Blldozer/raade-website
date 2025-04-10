
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * Admin Reconciliation Page
 * 
 * Allows administrators to manage and reconcile Stripe and database inconsistencies:
 * - View payments from Stripe that don't have matching database records
 * - Execute one-time sync between Stripe and database
 * - Manually create registration records for missing data
 * - View reconciliation history and audit log
 */
const AdminReconciliation = () => {
  const [activeTab, setActiveTab] = useState("missing");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [missingRegistrations, setMissingRegistrations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    ticket_type: 'professional',
    role: 'attendee',
    organization: '',
    special_requests: '',
    from_known_institution: false
  });
  const navigate = useNavigate();

  // Check admin authorization
  useEffect(() => {
    async function checkAdmin() {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .rpc('is_admin');
          
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
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAdmin();
  }, [navigate]);

  // Load missing registrations
  useEffect(() => {
    if (activeTab === "missing") {
      fetchMissingRegistrations();
    }
  }, [activeTab]);

  // Fetch missing registrations from the reconciliation function
  const fetchMissingRegistrations = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('stripe-reconcile', {
        body: {},
        query: { action: 'find-missing' }
      });
      
      if (error) throw error;
      
      setMissingRegistrations(data.missingRegistrations || []);
    } catch (error) {
      console.error("Error fetching missing registrations:", error);
      toast({
        title: "Error",
        description: "Failed to load missing registrations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger a full Stripe data sync
  const syncStripeData = async () => {
    setIsSyncing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('stripe-reconcile', {
        body: {},
        query: { action: 'fetch-all' }
      });
      
      if (error) throw error;
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${data.count} Stripe sessions.`,
      });
      
      // Refresh the missing registrations
      await fetchMissingRegistrations();
    } catch (error) {
      console.error("Error syncing Stripe data:", error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync Stripe data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle selecting a record for reconciliation
  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
    setFormData({
      email: record.customer_email || '',
      full_name: record.customer_name || '',
      ticket_type: 'professional',
      role: 'attendee',
      organization: '',
      special_requests: '',
      from_known_institution: false
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle ticket type selection
  const handleTicketTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      ticket_type: value
    }));
  };

  // Handle role selection
  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  // Reconcile a registration
  const handleReconcile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('stripe-reconcile', {
        body: {
          ...formData,
          checkout_session_id: selectedRecord.checkout_session_id
        },
        query: { action: 'reconcile' }
      });
      
      if (error) throw error;
      
      toast({
        title: "Registration Reconciled",
        description: "Successfully created the missing registration record.",
      });
      
      // Refresh the list and clear selection
      await fetchMissingRegistrations();
      setSelectedRecord(null);
    } catch (error) {
      console.error("Error reconciling registration:", error);
      toast({
        title: "Reconciliation Failed",
        description: "Failed to create registration record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && !missingRegistrations.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Stripe Reconciliation Admin</h1>
          <p className="text-muted-foreground">Manage and fix inconsistencies between Stripe and database records</p>
        </div>
        
        <Button
          onClick={syncStripeData}
          disabled={isSyncing}
          className="flex items-center"
        >
          {isSyncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Sync Stripe Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="missing" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="missing">Missing Registrations</TabsTrigger>
              <TabsTrigger value="history">Reconciliation History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="missing" className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Stripe Payments Missing in Database</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchMissingRegistrations}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
              
              {missingRegistrations.length === 0 ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">No Missing Registrations</h3>
                  <p className="text-muted-foreground">All Stripe payments have matching database records</p>
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {missingRegistrations.map((record) => (
                        <TableRow 
                          key={record.checkout_session_id}
                          className={selectedRecord?.checkout_session_id === record.checkout_session_id ? 
                            "bg-muted/50" : ""}
                        >
                          <TableCell>{record.customer_email}</TableCell>
                          <TableCell>{record.customer_name}</TableCell>
                          <TableCell>${record.amount_total}</TableCell>
                          <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => handleSelectRecord(record)}
                            >
                              Reconcile
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="border rounded-md p-4">
              <div className="py-8 text-center">
                <h3 className="text-lg font-medium">Reconciliation History</h3>
                <p className="text-muted-foreground">View past reconciliations and their outcomes</p>
                <p className="mt-4">Coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          {selectedRecord ? (
            <Card>
              <CardHeader>
                <CardTitle>Reconcile Registration</CardTitle>
                <CardDescription>
                  Create a registration record for this Stripe payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReconcile} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="ticket_type" className="text-sm font-medium">Ticket Type</label>
                    <Select 
                      value={formData.ticket_type}
                      onValueChange={handleTicketTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="student-group">Student Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">Role</label>
                    <Select 
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="attendee">Attendee</SelectItem>
                        <SelectItem value="speaker">Speaker</SelectItem>
                        <SelectItem value="organizer">Organizer</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="organization" className="text-sm font-medium">Organization</label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="special_requests" className="text-sm font-medium">Special Requests</label>
                    <Input
                      id="special_requests"
                      name="special_requests"
                      value={formData.special_requests}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="from_known_institution"
                      name="from_known_institution"
                      checked={formData.from_known_institution}
                      onChange={handleInputChange}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="from_known_institution" className="text-sm font-medium">
                      From Known Institution
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRecord(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleReconcile}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : 'Create Registration'}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Registration Reconciliation</CardTitle>
                <CardDescription>
                  Sync Stripe payments with database records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-muted rounded-md">
                  <AlertCircle className="h-6 w-6 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a Stripe payment from the left panel to create a
                      missing registration record in the database.
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={syncStripeData}
                      disabled={isSyncing}
                    >
                      {isSyncing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Sync all Stripe data
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={fetchMissingRegistrations}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Refresh missing registrations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReconciliation;
