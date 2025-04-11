export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      approved_edu_domains: {
        Row: {
          created_at: string
          domain: string
          id: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
        }
        Relationships: []
      }
      conference_registrations: {
        Row: {
          coupon_code: string | null
          created_at: string
          dietary_requirements: string | null
          email: string
          email_verified: boolean | null
          first_name: string | null
          from_known_institution: boolean | null
          full_name: string
          id: string
          last_name: string | null
          organization: string
          payment_method: string | null
          role: string
          special_requests: string | null
          status: string
          ticket_type: string
          updated_at: string
          verification_method: string | null
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string
          dietary_requirements?: string | null
          email: string
          email_verified?: boolean | null
          first_name?: string | null
          from_known_institution?: boolean | null
          full_name: string
          id?: string
          last_name?: string | null
          organization: string
          payment_method?: string | null
          role: string
          special_requests?: string | null
          status?: string
          ticket_type: string
          updated_at?: string
          verification_method?: string | null
        }
        Update: {
          coupon_code?: string | null
          created_at?: string
          dietary_requirements?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string | null
          from_known_institution?: boolean | null
          full_name?: string
          id?: string
          last_name?: string | null
          organization?: string
          payment_method?: string | null
          role?: string
          special_requests?: string | null
          status?: string
          ticket_type?: string
          updated_at?: string
          verification_method?: string | null
        }
        Relationships: []
      }
      coupon_codes: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          current_uses: number
          description: string | null
          discount_amount: number | null
          discount_type: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          current_uses?: number
          description?: string | null
          discount_amount?: number | null
          discount_type: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          current_uses?: number
          description?: string | null
          discount_amount?: number | null
          discount_type?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donation_type: string
          donor_email: string | null
          donor_name: string | null
          id: string
          is_anonymous: boolean
          message: string | null
          payment_intent_id: string | null
          payment_status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donation_type: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean
          message?: string | null
          payment_intent_id?: string | null
          payment_status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donation_type?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean
          message?: string | null
          payment_intent_id?: string | null
          payment_status?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_campaign_recipients: {
        Row: {
          campaign_id: string
          click_count: number | null
          error_message: string | null
          id: string
          metadata: Json | null
          open_count: number | null
          registrant_email: string
          registrant_id: string
          registrant_type: string
          sent_at: string
          status: string
        }
        Insert: {
          campaign_id: string
          click_count?: number | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          open_count?: number | null
          registrant_email: string
          registrant_id: string
          registrant_type: string
          sent_at?: string
          status?: string
        }
        Update: {
          campaign_id?: string
          click_count?: number | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          open_count?: number | null
          registrant_email?: string
          registrant_id?: string
          registrant_type?: string
          sent_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          filters: Json | null
          id: string
          name: string
          sent_at: string | null
          status: string
          target_audience: string[] | null
          template_name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json | null
          id?: string
          name: string
          sent_at?: string | null
          status?: string
          target_audience?: string[] | null
          template_name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json | null
          id?: string
          name?: string
          sent_at?: string | null
          status?: string
          target_audience?: string[] | null
          template_name?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          subject: string
          template_content: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          subject: string
          template_content: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          subject?: string
          template_content?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      email_tracking: {
        Row: {
          coupon_code: string | null
          created_at: string
          email: string
          email_type: string
          failure_reason: string | null
          first_name: string | null
          full_name: string
          group_size: number | null
          id: string
          is_known_institution: boolean | null
          last_name: string | null
          last_retry_at: string | null
          metadata: Json | null
          retry_count: number
          sent_at: string | null
          status: string
          ticket_type: string
          updated_at: string
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string
          email: string
          email_type: string
          failure_reason?: string | null
          first_name?: string | null
          full_name: string
          group_size?: number | null
          id?: string
          is_known_institution?: boolean | null
          last_name?: string | null
          last_retry_at?: string | null
          metadata?: Json | null
          retry_count?: number
          sent_at?: string | null
          status: string
          ticket_type: string
          updated_at?: string
        }
        Update: {
          coupon_code?: string | null
          created_at?: string
          email?: string
          email_type?: string
          failure_reason?: string | null
          first_name?: string | null
          full_name?: string
          group_size?: number | null
          id?: string
          is_known_institution?: boolean | null
          last_name?: string | null
          last_retry_at?: string | null
          metadata?: Json | null
          retry_count?: number
          sent_at?: string | null
          status?: string
          ticket_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_verifications: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          from_known_institution: boolean | null
          id: string
          ticket_type: string
          token: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          from_known_institution?: boolean | null
          id?: string
          ticket_type: string
          token: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          from_known_institution?: boolean | null
          id?: string
          ticket_type?: string
          token?: string
          verified?: boolean
        }
        Relationships: []
      }
      group_registration_members: {
        Row: {
          created_at: string
          email: string
          email_verified: boolean
          first_name: string | null
          from_known_institution: boolean | null
          full_name: string | null
          group_id: string
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          email_verified?: boolean
          first_name?: string | null
          from_known_institution?: boolean | null
          full_name?: string | null
          group_id: string
          id?: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          email_verified?: boolean
          first_name?: string | null
          from_known_institution?: boolean | null
          full_name?: string | null
          group_id?: string
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_registration_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      group_registrations: {
        Row: {
          completed: boolean
          created_at: string
          group_size: number
          id: string
          lead_email: string
          lead_first_name: string | null
          lead_last_name: string | null
          lead_name: string
          lead_organization: string
          payment_completed: boolean
          ticket_type: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          group_size: number
          id?: string
          lead_email: string
          lead_first_name?: string | null
          lead_last_name?: string | null
          lead_name: string
          lead_organization: string
          payment_completed?: boolean
          ticket_type: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          group_size?: number
          id?: string
          lead_email?: string
          lead_first_name?: string | null
          lead_last_name?: string | null
          lead_name?: string
          lead_organization?: string
          payment_completed?: boolean
          ticket_type?: string
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          contact_name: string
          country: string
          created_at: string
          email: string
          expected_outcome: string | null
          id: string
          organization_name: string
          organization_type: string
          phone: string | null
          project_idea: string
          status: Database["public"]["Enums"]["application_status"]
          timeline: string | null
          updated_at: string
        }
        Insert: {
          contact_name: string
          country: string
          created_at?: string
          email: string
          expected_outcome?: string | null
          id?: string
          organization_name: string
          organization_type: string
          phone?: string | null
          project_idea: string
          status?: Database["public"]["Enums"]["application_status"]
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          contact_name?: string
          country?: string
          created_at?: string
          email?: string
          expected_outcome?: string | null
          id?: string
          organization_name?: string
          organization_type?: string
          phone?: string | null
          project_idea?: string
          status?: Database["public"]["Enums"]["application_status"]
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      stripe_reconciliation_data: {
        Row: {
          amount_total: number | null
          checkout_session_id: string | null
          created_at: string
          customer_email: string | null
          customer_name: string | null
          id: string
          metadata: Json | null
          notes: string | null
          payment_intent_id: string | null
          payment_status: string | null
          raw_data: Json | null
          reconciled: boolean | null
          reconciled_at: string | null
          reconciliation_status: string | null
          updated_at: string
        }
        Insert: {
          amount_total?: number | null
          checkout_session_id?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          payment_intent_id?: string | null
          payment_status?: string | null
          raw_data?: Json | null
          reconciled?: boolean | null
          reconciled_at?: string | null
          reconciliation_status?: string | null
          updated_at?: string
        }
        Update: {
          amount_total?: number | null
          checkout_session_id?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          payment_intent_id?: string | null
          payment_status?: string | null
          raw_data?: Json | null
          reconciled?: boolean | null
          reconciled_at?: string | null
          reconciliation_status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      student_applications: {
        Row: {
          created_at: string
          email: string
          full_name: string
          graduation_year: string | null
          id: string
          major: string
          phone: string | null
          portfolio_link: string | null
          skills: string | null
          status: Database["public"]["Enums"]["application_status"]
          university: string
          updated_at: string
          why_join_raade: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          graduation_year?: string | null
          id?: string
          major: string
          phone?: string | null
          portfolio_link?: string | null
          skills?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          university: string
          updated_at?: string
          why_join_raade: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          graduation_year?: string | null
          id?: string
          major?: string
          phone?: string | null
          portfolio_link?: string | null
          skills?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          university?: string
          updated_at?: string
          why_join_raade?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      unified_registrants: {
        Row: {
          additional_data: Json | null
          coupon_code: string | null
          created_at: string | null
          email: string | null
          email_verified: boolean | null
          first_name: string | null
          from_known_institution: boolean | null
          full_name: string | null
          group_id: string | null
          group_size: number | null
          id: string | null
          is_group_leader: boolean | null
          last_name: string | null
          organization: string | null
          registrant_type: string | null
          role: string | null
          status: string | null
          ticket_type: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_current_uses: {
        Args: { coupon_code_param: string }
        Returns: number
      }
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      increment_coupon_usage: {
        Args: { coupon_code_param: string }
        Returns: number
      }
      increment_retry_count: {
        Args: { record_id: string }
        Returns: number
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      application_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      application_status: ["pending", "approved", "rejected"],
    },
  },
} as const
