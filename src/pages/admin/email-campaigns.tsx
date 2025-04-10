
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Email Campaigns Admin Page
 * 
 * A centralized interface for sending email campaigns to conference registrants:
 * - Create and manage email campaigns
 * - Send personalized next steps emails with conference details
 * - Preview email templates
 * - Track campaign performance
 * - Filter recipients by various criteria
 * 
 * This page targets admin users who need to communicate with registrants.
 */
export default function EmailCampaignsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [testEmails, setTestEmails] = useState("");
  const [recipientCount, setRecipientCount] = useState<number | null>(null);
  const [campaignResult, setCampaignResult] = useState<any>(null);
  const [isDryRun, setIsDryRun] = useState(true);
  const [filters, setFilters] = useState({
    ticketTypes: {
      student: true,
      professional: true,
      "student-group": true,
    },
    registrantTypes: {
      individual: true,
      "group-leader": true,
      "group-member": false,
    },
    status: "completed"
  });

  const handleFilterChange = (category: string, key: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: checked
      }
    }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status
    }));
  };

  const runCampaign = async (dryRun = true) => {
    try {
      setIsLoading(true);
      setCampaignResult(null);
      
      // Build filter data from current state
      const filterData = {
        ticketTypes: Object.entries(filters.ticketTypes)
          .filter(([_, selected]) => selected)
          .map(([type]) => type),
        registrantTypes: Object.entries(filters.registrantTypes)
          .filter(([_, selected]) => selected)
          .map(([type]) => type),
        status: filters.status
      };
      
      // Parse test emails if provided
      const testEmailsArray = testEmails
        .split(",")
        .map(email => email.trim())
        .filter(email => email.length > 0);
      
      const response = await supabase.functions.invoke(
        'send-next-steps-campaign',
        {
          body: {
            dryRun,
            filters: filterData,
            testEmails: testEmailsArray.length > 0 ? testEmailsArray : undefined,
            campaignName: `Next Steps Campaign - ${new Date().toLocaleDateString()}`
          }
        }
      );
      
      if (response.error) {
        throw new Error(`Campaign error: ${response.error.message}`);
      }
      
      setCampaignResult(response.data);
      
      if (dryRun) {
        setRecipientCount(response.data.recipients?.length || 0);
        toast({
          title: "Dry Run Completed",
          description: `${response.data.recipients?.length || 0} recipients would receive this email.`,
        });
      } else {
        toast({
          title: "Campaign Sent!",
          description: `Successfully sent to ${response.data.results?.sent || 0} recipients.`,
        });
      }
    } catch (error) {
      console.error("Campaign error:", error);
      toast({
        title: "Campaign Error",
        description: error instanceof Error ? error.message : "Failed to send campaign",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestRun = () => {
    setIsDryRun(true);
    runCampaign(true);
  };

  const handleSendCampaign = () => {
    setIsDryRun(false);
    runCampaign(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 font-simula text-raade-navy">Email Campaigns</h1>

      <Tabs defaultValue="nextsteps" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="nextsteps">Next Steps Campaign</TabsTrigger>
          <TabsTrigger value="history">Campaign History</TabsTrigger>
        </TabsList>

        <TabsContent value="nextsteps">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-simula">Next Steps Email Campaign</CardTitle>
                  <CardDescription>
                    Send personalized next steps emails to conference registrants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 font-simula">Recipient Filters</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Ticket Types</h4>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="student" 
                                checked={filters.ticketTypes.student}
                                onCheckedChange={(checked) => 
                                  handleFilterChange('ticketTypes', 'student', checked as boolean)
                                }
                              />
                              <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="professional" 
                                checked={filters.ticketTypes.professional}
                                onCheckedChange={(checked) => 
                                  handleFilterChange('ticketTypes', 'professional', checked as boolean)
                                }
                              />
                              <Label htmlFor="professional">Professional</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="student-group" 
                                checked={filters.ticketTypes["student-group"]}
                                onCheckedChange={(checked) => 
                                  handleFilterChange('ticketTypes', 'student-group', checked as boolean)
                                }
                              />
                              <Label htmlFor="student-group">Student Group</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Registrant Types</h4>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="individual" 
                                checked={filters.registrantTypes.individual}
                                onCheckedChange={(checked) => 
                                  handleFilterChange('registrantTypes', 'individual', checked as boolean)
                                }
                              />
                              <Label htmlFor="individual">Individual</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="group-leader" 
                                checked={filters.registrantTypes["group-leader"]}
                                onCheckedChange={(checked) => 
                                  handleFilterChange('registrantTypes', 'group-leader', checked as boolean)
                                }
                              />
                              <Label htmlFor="group-leader">Group Leader</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="group-member" 
                                checked={filters.registrantTypes["group-member"]}
                                onCheckedChange={(checked) => 
                                  handleFilterChange('registrantTypes', 'group-member', checked as boolean)
                                }
                              />
                              <Label htmlFor="group-member">Group Member</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Registration Status</h4>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="status-completed" 
                                checked={filters.status === "completed"}
                                onCheckedChange={(checked) => {
                                  if (checked) handleStatusChange("completed");
                                }}
                              />
                              <Label htmlFor="status-completed">Completed</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="status-pending" 
                                checked={filters.status === "pending"}
                                onCheckedChange={(checked) => {
                                  if (checked) handleStatusChange("pending");
                                }}
                              />
                              <Label htmlFor="status-pending">Pending</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 font-simula">Test Delivery</h3>
                      <div className="space-y-2">
                        <Label htmlFor="test-emails">Test Email Addresses (comma-separated)</Label>
                        <Textarea 
                          id="test-emails" 
                          placeholder="test@example.com, another@example.com"
                          value={testEmails}
                          onChange={(e) => setTestEmails(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <p className="text-sm text-gray-500">
                          Enter email addresses to send test emails. If provided, filters will be ignored.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div>
                    {recipientCount !== null && (
                      <p className="text-sm">
                        This campaign will reach <strong>{recipientCount}</strong> recipients.
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleTestRun}
                      disabled={isLoading}
                    >
                      {isLoading && isDryRun ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Test Run
                    </Button>
                    <Button 
                      onClick={handleSendCampaign}
                      disabled={isLoading || recipientCount === null || recipientCount === 0}
                    >
                      {isLoading && !isDryRun ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Send Campaign
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {campaignResult && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="font-simula">
                      {isDryRun ? "Test Results" : "Campaign Results"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isDryRun ? (
                      <div>
                        <p className="mb-4">
                          <strong>{campaignResult.recipients?.length || 0}</strong> recipients would receive this email.
                        </p>
                        
                        {campaignResult.recipients && campaignResult.recipients.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Recipients Preview:</h4>
                            <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                              {campaignResult.recipients.slice(0, 10).map((recipient: any, index: number) => (
                                <div key={index} className="text-sm py-1 border-b last:border-b-0">
                                  {recipient.name || recipient.email}
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({recipient.email})
                                  </span>
                                </div>
                              ))}
                              {campaignResult.recipients.length > 10 && (
                                <div className="text-sm py-1 text-gray-500">
                                  ...and {campaignResult.recipients.length - 10} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-green-50 p-3 rounded-full">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Campaign Sent</h4>
                            <p className="text-sm text-gray-500">Campaign ID: {campaignResult.campaignId}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Recipients</p>
                            <p className="text-2xl font-bold">{campaignResult.results?.total || 0}</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Successfully Sent</p>
                            <p className="text-2xl font-bold text-green-600">{campaignResult.results?.sent || 0}</p>
                          </div>
                          <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Failed</p>
                            <p className="text-2xl font-bold text-red-600">{campaignResult.results?.failed || 0}</p>
                          </div>
                        </div>
                        
                        {campaignResult.details && campaignResult.details.failed && campaignResult.details.failed.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                              Failed Deliveries:
                            </h4>
                            <div className="max-h-40 overflow-y-auto border rounded-md p-2 bg-red-50">
                              {campaignResult.details.failed.map((failure: any, index: number) => (
                                <div key={index} className="text-sm py-1 border-b last:border-b-0">
                                  <strong>{failure.email}</strong>
                                  <p className="text-xs text-red-600 mt-1">{failure.error}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-simula">Email Preview</CardTitle>
                  <CardDescription>
                    What recipients will see
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-3 border-b">
                      <div className="text-sm font-medium">Subject:</div>
                      <div>John, We're Excited to Welcome You to RAADE at Rice!</div>
                    </div>
                    <div className="h-[400px] overflow-y-auto">
                      <iframe 
                        src="/email-preview?template=nextSteps" 
                        className="w-full h-full border-0"
                        title="Email Preview"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This is a simplified preview. Each email will be personalized with the recipient's name.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="font-simula">Campaign Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <strong className="block">Sender:</strong>
                      Ife Idakolo, RAADE &lt;conference@raadeconf.com&gt;
                    </div>
                    <div>
                      <strong className="block">Reply-To:</strong>
                      raade@rice.edu
                    </div>
                    <div>
                      <strong className="block">Contains:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Welcome message</li>
                        <li>Conference schedule</li>
                        <li>Parking information</li>
                        <li>Workshop details</li>
                        <li>Social media links</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="font-simula">Campaign History</CardTitle>
              <CardDescription>
                View past email campaigns and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-gray-500">
                Campaign history will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
