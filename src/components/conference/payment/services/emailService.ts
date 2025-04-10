
import { supabase } from "@/integrations/supabase/client";
import { RegistrationFormData } from "../../RegistrationFormTypes";
import { format } from "date-fns";

/**
 * Email delivery status enum
 */
export enum EmailDeliveryStatus {
  QUEUED = "queued",
  SENDING = "sending",
  DELIVERED = "delivered",
  FAILED = "failed",
  RETRYING = "retrying",
}

/**
 * Email type enum
 */
export enum EmailType {
  VERIFICATION = "verification",
  CONFIRMATION = "confirmation",
  PAYMENT_RECEIPT = "payment_receipt",
  ERROR_NOTIFICATION = "error_notification",
}

/**
 * Email record interface for tracking email metadata
 */
export interface EmailRecord {
  id?: string;
  email: string;
  fullName: string;
  ticketType: string; 
  emailType: EmailType;
  status: EmailDeliveryStatus;
  failureReason?: string;
  retryCount: number;
  isKnownInstitution?: boolean;
  groupSize?: number;
  couponCode?: string;
  metadata?: Record<string, any>;
  sentAt?: string;
  lastRetryAt?: string;
}

/**
 * Response interface for email sending operations
 */
export interface EmailSendResponse {
  success: boolean;
  emailRecordId?: string;
  error?: Error;
  status?: EmailDeliveryStatus;
}

/**
 * Enhanced Email Service
 * 
 * Provides robust email handling capabilities:
 * - Tracks all email operations in database for auditability
 * - Implements retry logic with exponential backoff
 * - Records metadata for troubleshooting
 * - Supports different email types with specialized handling
 * - Designed for better error recovery and reporting
 */
export class EmailService {
  /**
   * Maximum retry attempts for email sending
   */
  private static MAX_RETRIES = 3;
  
  /**
   * Base delay for exponential backoff (in milliseconds)
   */
  private static BASE_RETRY_DELAY = 1000;
  
  /**
   * Create an email tracking record in the database
   * Uses raw SQL queries to avoid TypeScript issues with the new table
   */
  private static async createEmailRecord(data: Omit<EmailRecord, "id" | "status" | "retryCount">): Promise<string | null> {
    try {
      // Use SQL query to insert into the new table since TypeScript doesn't recognize it yet
      const { data: record, error } = await supabase
        .from('email_tracking' as any)
        .insert({
          email: data.email,
          full_name: data.fullName,
          ticket_type: data.ticketType,
          email_type: data.emailType,
          status: EmailDeliveryStatus.QUEUED,
          retry_count: 0,
          is_known_institution: data.isKnownInstitution || false,
          group_size: data.groupSize,
          coupon_code: data.couponCode,
          metadata: data.metadata || {},
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single();
        
      if (error) {
        console.error("Failed to create email record:", error);
        return null;
      }
      
      return record?.id || null;
    } catch (error) {
      console.error("Exception creating email record:", error);
      return null;
    }
  }
  
  /**
   * Update an email record's status
   * Uses raw SQL queries to avoid TypeScript issues with the new table
   */
  private static async updateEmailStatus(
    id: string, 
    status: EmailDeliveryStatus, 
    failureReason?: string
  ): Promise<boolean> {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString(),
      };
      
      if (status === EmailDeliveryStatus.DELIVERED) {
        updateData.sent_at = new Date().toISOString();
      }
      
      if (status === EmailDeliveryStatus.RETRYING) {
        updateData.last_retry_at = new Date().toISOString();
        
        // Use a direct SQL query for incrementing retry count
        try {
          const { data: retryData, error: retryError } = await supabase
            .rpc('increment_retry_count' as any, { record_id: id });
          
          if (retryError) {
            console.error(`Failed to increment retry count for ${id}:`, retryError);
          }
        } catch (retryError) {
          console.error(`Exception incrementing retry count for ${id}:`, retryError);
        }
      }
      
      if (failureReason) {
        updateData.failure_reason = failureReason;
      }
      
      const { error } = await supabase
        .from('email_tracking' as any)
        .update(updateData)
        .eq('id', id);
        
      if (error) {
        console.error(`Failed to update email record ${id} status:`, error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Exception updating email record ${id} status:`, error);
      return false;
    }
  }
  
  /**
   * Send a verification email to the user
   */
  static async sendVerificationEmail(
    email: string, 
    fullName: string, 
    ticketType: string,
    isKnownInstitution: boolean = false
  ): Promise<EmailSendResponse> {
    // Create email record first
    const emailRecordId = await this.createEmailRecord({
      email,
      fullName,
      ticketType,
      emailType: EmailType.VERIFICATION,
      isKnownInstitution
    });
    
    if (!emailRecordId) {
      console.warn("Could not create email tracking record, but will still attempt to send");
    }
    
    try {
      // Update status to sending
      if (emailRecordId) {
        await this.updateEmailStatus(emailRecordId, EmailDeliveryStatus.SENDING);
      }
      
      // Invoke the Supabase edge function to send the verification email
      const { data, error } = await supabase.functions.invoke(
        'send-verification-email',
        {
          body: {
            email,
            fullName,
            ticketType,
            isKnownInstitution
          }
        }
      );
      
      if (error) {
        console.error("Error sending verification email:", error);
        
        if (emailRecordId) {
          await this.updateEmailStatus(
            emailRecordId, 
            EmailDeliveryStatus.FAILED,
            error.message
          );
        }
        
        return { 
          success: false, 
          emailRecordId,
          error,
          status: EmailDeliveryStatus.FAILED
        };
      }
      
      // Update status to delivered
      if (emailRecordId) {
        await this.updateEmailStatus(emailRecordId, EmailDeliveryStatus.DELIVERED);
      }
      
      return { 
        success: true, 
        emailRecordId,
        status: EmailDeliveryStatus.DELIVERED 
      };
    } catch (error) {
      console.error("Exception sending verification email:", error);
      
      if (emailRecordId) {
        await this.updateEmailStatus(
          emailRecordId, 
          EmailDeliveryStatus.FAILED,
          (error as Error).message
        );
      }
      
      return { 
        success: false, 
        emailRecordId,
        error: error as Error,
        status: EmailDeliveryStatus.FAILED
      };
    }
  }
  
  /**
   * Send a confirmation email after successful registration
   */
  static async sendConfirmationEmail(
    registrationData: RegistrationFormData,
    retryAttempt: number = 0
  ): Promise<EmailSendResponse> {
    // Extract necessary information
    const { email, fullName, ticketType, groupSize, couponCode } = registrationData;
    
    // Create email record for tracking
    const emailRecordId = await this.createEmailRecord({
      email,
      fullName,
      ticketType,
      emailType: EmailType.CONFIRMATION,
      groupSize,
      couponCode,
      metadata: {
        retry_attempt: retryAttempt,
        organization: registrationData.organization,
        payment_time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
      }
    });
    
    if (!emailRecordId) {
      console.warn("Could not create email tracking record, but will still attempt to send");
    }
    
    try {
      // Update status to sending
      if (emailRecordId) {
        await this.updateEmailStatus(emailRecordId, EmailDeliveryStatus.SENDING);
      }
      
      // Invoke the Supabase edge function to send the confirmation email
      const { data, error } = await supabase.functions.invoke(
        'send-conference-confirmation',
        {
          body: {
            fullName,
            email,
            ticketType,
            groupSize,
            couponCode,
            retryAttempt
          }
        }
      );
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        
        // Check if we should retry
        if (retryAttempt < this.MAX_RETRIES) {
          // Calculate delay with exponential backoff
          const retryDelay = this.BASE_RETRY_DELAY * Math.pow(2, retryAttempt);
          
          console.log(`Will retry sending confirmation email in ${retryDelay}ms (attempt ${retryAttempt + 1})`);
          
          if (emailRecordId) {
            await this.updateEmailStatus(emailRecordId, EmailDeliveryStatus.RETRYING);
          }
          
          // Schedule retry
          return new Promise((resolve) => {
            setTimeout(async () => {
              const retryResult = await this.sendConfirmationEmail(
                registrationData,
                retryAttempt + 1
              );
              resolve(retryResult);
            }, retryDelay);
          });
        }
        
        if (emailRecordId) {
          await this.updateEmailStatus(
            emailRecordId, 
            EmailDeliveryStatus.FAILED,
            error.message
          );
        }
        
        return { 
          success: false, 
          emailRecordId,
          error,
          status: EmailDeliveryStatus.FAILED
        };
      }
      
      // Update status to delivered
      if (emailRecordId) {
        await this.updateEmailStatus(emailRecordId, EmailDeliveryStatus.DELIVERED);
      }
      
      return { 
        success: true, 
        emailRecordId,
        status: EmailDeliveryStatus.DELIVERED 
      };
    } catch (error) {
      console.error("Exception sending confirmation email:", error);
      
      // Check if we should retry
      if (retryAttempt < this.MAX_RETRIES) {
        // Calculate delay with exponential backoff
        const retryDelay = this.BASE_RETRY_DELAY * Math.pow(2, retryAttempt);
        
        console.log(`Will retry sending confirmation email in ${retryDelay}ms (attempt ${retryAttempt + 1})`);
        
        if (emailRecordId) {
          await this.updateEmailStatus(emailRecordId, EmailDeliveryStatus.RETRYING);
        }
        
        // Schedule retry
        return new Promise((resolve) => {
          setTimeout(async () => {
            const retryResult = await this.sendConfirmationEmail(
              registrationData,
              retryAttempt + 1
            );
            resolve(retryResult);
          }, retryDelay);
        });
      }
      
      if (emailRecordId) {
        await this.updateEmailStatus(
          emailRecordId, 
          EmailDeliveryStatus.FAILED,
          (error as Error)?.message
        );
      }
      
      return { 
        success: false, 
        emailRecordId,
        error: error as Error,
        status: EmailDeliveryStatus.FAILED
      };
    }
  }
  
  /**
   * Get email delivery status by ID
   * Uses raw SQL queries to avoid TypeScript issues with the new table
   */
  static async getEmailStatus(emailId: string): Promise<EmailDeliveryStatus | null> {
    try {
      // Use a direct SQL query to get the status
      const { data, error } = await supabase
        .from('email_tracking' as any)
        .select('status')
        .eq('id', emailId)
        .single();
        
      if (error || !data) {
        console.error("Error fetching email status:", error);
        return null;
      }
      
      return data.status as EmailDeliveryStatus;
    } catch (error) {
      console.error("Exception fetching email status:", error);
      return null;
    }
  }
}
