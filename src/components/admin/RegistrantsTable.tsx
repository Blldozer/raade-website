
import React, { useState } from "react";
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import CSVExportButton from "./CSVExportButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

/**
 * Unified Registrant data structure matching the database view
 */
export type UnifiedRegistrant = {
  id: string;
  full_name: string;
  email: string;
  organization: string;
  role: string;
  ticket_type: string;
  status: string;
  registrant_type: string;
  created_at: string;
  email_verified: boolean;
  from_known_institution: boolean;
  group_id?: string;
  group_size?: number;
  is_group_leader?: boolean;
  coupon_code?: string;
  additional_data?: any;
};

/**
 * Props for the RegistrantsTable component
 */
interface RegistrantsTableProps {
  /**
   * Array of registrant data to display
   */
  registrants: UnifiedRegistrant[];
  
  /**
   * Loading state to display while fetching data
   */
  isLoading?: boolean;
}

/**
 * Column definitions for CSV export mapping
 * Maps database field names to friendly display names
 */
const CSV_COLUMNS: Record<keyof UnifiedRegistrant, string> = {
  id: "ID",
  full_name: "Full Name",
  email: "Email",
  organization: "Organization",
  role: "Role",
  ticket_type: "Ticket Type",
  status: "Status",
  registrant_type: "Registrant Type",
  created_at: "Registration Date",
  email_verified: "Email Verified",
  from_known_institution: "From Known Institution",
  group_id: "Group ID",
  group_size: "Group Size",
  is_group_leader: "Is Group Leader",
  coupon_code: "Coupon Code",
  additional_data: "Additional Data"
};

/**
 * RegistrantsTable Component
 * 
 * Displays unified registrant data in a table format with filtering,
 * sorting, and CSV export capabilities.
 */
const RegistrantsTable: React.FC<RegistrantsTableProps> = ({ 
  registrants, 
  isLoading = false 
}) => {
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  
  /**
   * Apply filters to registrant data
   */
  const filteredRegistrants = registrants.filter(reg => {
    // Text search filter (case insensitive)
    const searchMatch = !searchTerm || 
      reg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.organization?.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Type filter
    const typeMatch = filterType === "all" || 
      reg.registrant_type === filterType ||
      (filterType === "group" && 
        (reg.registrant_type === "group-leader" || reg.registrant_type === "group-member"));
    
    return searchMatch && typeMatch;
  });
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Conference Registrants</CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search registrants..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Registrant type filter */}
            <div className="flex gap-2 items-center w-full sm:w-48">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select 
                value={filterType}
                onValueChange={setFilterType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Registrants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Registrants</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="group">Group (All)</SelectItem>
                  <SelectItem value="group-leader">Group Leaders</SelectItem>
                  <SelectItem value="group-member">Group Members</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* CSV Export button */}
            <CSVExportButton
              data={filteredRegistrants}
              filename="RAADE_Conference_Registrants"
              columns={CSV_COLUMNS}
              disabled={isLoading || filteredRegistrants.length === 0}
              buttonText={`Export ${filteredRegistrants.length} ${
                filterType === "all" ? "Registrants" : filterType
              }`}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Registration Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading registrants data...
                  </TableCell>
                </TableRow>
              ) : filteredRegistrants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No registrants found matching the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRegistrants.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.full_name || "—"}</TableCell>
                    <TableCell>{reg.email || "—"}</TableCell>
                    <TableCell>{reg.organization || "—"}</TableCell>
                    <TableCell>{reg.ticket_type || "—"}</TableCell>
                    <TableCell>
                      {reg.is_group_leader 
                        ? `Group Leader (${reg.group_size})`
                        : reg.registrant_type === "group-member" 
                          ? "Group Member"
                          : "Individual"}
                    </TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.status === "confirmed" 
                            ? "bg-green-100 text-green-800" 
                            : reg.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {reg.status || "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {reg.email_verified ? (
                        <span className="text-green-600">✓ Verified</span>
                      ) : (
                        <span className="text-red-600">✗ Not Verified</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrantsTable;
