
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Download, Filter, RefreshCw, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

/**
 * AdminRegistrations Page
 * 
 * Displays all conference registrations in a unified view:
 * - Shows both Stripe payments and coupon registrations
 * - Provides filtering and search capabilities
 * - Supports data export
 * - Displays detailed registration information
 * - Built with responsive design for all device sizes
 */
const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ticketTypeFilter, setTicketTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const { toast } = useToast();

  // Fetch all registrations
  const fetchRegistrations = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('conference_registrations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setRegistrations(data || []);
      setFilteredRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Failed to load registrations",
        description: "Could not fetch registration data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = [...registrations];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        reg => 
          reg.full_name?.toLowerCase().includes(term) || 
          reg.email?.toLowerCase().includes(term) || 
          reg.organization?.toLowerCase().includes(term) ||
          reg.coupon_code?.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(reg => reg.status === statusFilter);
    }
    
    // Apply ticket type filter
    if (ticketTypeFilter !== "all") {
      result = result.filter(reg => reg.ticket_type === ticketTypeFilter);
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortOrder === "name") {
        return (a.full_name || "").localeCompare(b.full_name || "");
      } else {
        return 0;
      }
    });
    
    setFilteredRegistrations(result);
  }, [searchTerm, statusFilter, ticketTypeFilter, sortOrder, registrations]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export registrations as CSV
  const exportRegistrations = () => {
    const headers = [
      "Full Name", 
      "Email", 
      "Organization", 
      "Role", 
      "Ticket Type", 
      "Status", 
      "Coupon Code", 
      "Registered On",
      "Special Requests",
      "Verification Method"
    ];
    
    const csvData = filteredRegistrations.map(reg => [
      reg.full_name || "",
      reg.email || "",
      reg.organization || "",
      reg.role || "",
      reg.ticket_type || "",
      reg.status || "",
      reg.coupon_code || "",
      formatDate(reg.created_at),
      reg.special_requests || "",
      reg.verification_method || ""
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // Get payment method badge
  const getPaymentBadge = (registration: any) => {
    if (registration.coupon_code) {
      return <Badge className="bg-purple-500 hover:bg-purple-600" title={`Coupon: ${registration.coupon_code}`}>Coupon</Badge>;
    } else {
      return <Badge className="bg-blue-500 hover:bg-blue-600">Stripe</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl pt-24">
        <Card className="border-0 shadow-md dark:bg-gray-800">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">Conference Registrations</CardTitle>
                <CardDescription className="mt-1">
                  View and manage all conference registrations in one place
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchRegistrations}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={exportRegistrations}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <TabsList className="mb-2 md:mb-0">
                  <TabsTrigger value="all">All Registrations</TabsTrigger>
                  <TabsTrigger value="coupon">Coupon Registrations</TabsTrigger>
                  <TabsTrigger value="stripe">Stripe Payments</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name, email..."
                      className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={ticketTypeFilter} onValueChange={setTicketTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Ticket Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tickets</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="student-group">Student Group</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-full sm:w-[130px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <TabsContent value="all">
                {renderRegistrationsTable(filteredRegistrations)}
              </TabsContent>
              
              <TabsContent value="coupon">
                {renderRegistrationsTable(filteredRegistrations.filter(r => r.coupon_code))}
              </TabsContent>
              
              <TabsContent value="stripe">
                {renderRegistrationsTable(filteredRegistrations.filter(r => !r.coupon_code))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  function renderRegistrationsTable(data: any[]) {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      );
    }
    
    if (data.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500 flex flex-col items-center">
          <AlertCircle className="h-12 w-12 mb-4 text-gray-400" />
          <h3 className="text-lg font-medium">No registrations found</h3>
          <p className="mt-1">Try adjusting your filters or search terms</p>
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Total of {data.length} registrations found</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ticket</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell className="font-medium">{registration.full_name}</TableCell>
                <TableCell>{registration.email}</TableCell>
                <TableCell>
                  <span className="capitalize">{registration.ticket_type.replace("-", " ")}</span>
                </TableCell>
                <TableCell>{registration.organization || "—"}</TableCell>
                <TableCell>{formatDate(registration.created_at)}</TableCell>
                <TableCell>{getStatusBadge(registration.status)}</TableCell>
                <TableCell>{getPaymentBadge(registration)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default AdminRegistrations;
