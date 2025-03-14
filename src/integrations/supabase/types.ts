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
          created_at: string
          dietary_requirements: string | null
          email: string
          email_verified: boolean | null
          from_known_institution: boolean | null
          full_name: string
          id: string
          organization: string
          role: string
          special_requests: string | null
          status: string
          ticket_type: string
          updated_at: string
          verification_method: string | null
        }
        Insert: {
          created_at?: string
          dietary_requirements?: string | null
          email: string
          email_verified?: boolean | null
          from_known_institution?: boolean | null
          full_name: string
          id?: string
          organization: string
          role: string
          special_requests?: string | null
          status?: string
          ticket_type: string
          updated_at?: string
          verification_method?: string | null
        }
        Update: {
          created_at?: string
          dietary_requirements?: string | null
          email?: string
          email_verified?: boolean | null
          from_known_institution?: boolean | null
          full_name?: string
          id?: string
          organization?: string
          role?: string
          special_requests?: string | null
          status?: string
          ticket_type?: string
          updated_at?: string
          verification_method?: string | null
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
          from_known_institution: boolean | null
          group_id: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          email_verified?: boolean
          from_known_institution?: boolean | null
          group_id: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          email_verified?: boolean
          from_known_institution?: boolean | null
          group_id?: string
          id?: string
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
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
