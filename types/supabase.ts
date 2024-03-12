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
      planning: {
        Row: {
          available: boolean
          created_at: string
          date: string
          player_uuid: string
          uuid: string
        }
        Insert: {
          available?: boolean
          created_at?: string
          date: string
          player_uuid: string
          uuid?: string
        }
        Update: {
          available?: boolean
          created_at?: string
          date?: string
          player_uuid?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "planning_player_uuid_fkey"
            columns: ["player_uuid"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["uuid"]
          }
        ]
      }
      player: {
        Row: {
          champion_pool: string[] | null
          created_at: string
          game_name: string
          puuid: string
          role: Database["public"]["Enums"]["player_role"]
          tag_line: string
          user_uuid: string | null
          uuid: string
        }
        Insert: {
          champion_pool?: string[] | null
          created_at?: string
          game_name?: string
          puuid: string
          role: Database["public"]["Enums"]["player_role"]
          tag_line?: string
          user_uuid?: string | null
          uuid?: string
        }
        Update: {
          champion_pool?: string[] | null
          created_at?: string
          game_name?: string
          puuid?: string
          role?: Database["public"]["Enums"]["player_role"]
          tag_line?: string
          user_uuid?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      teams_of_user: {
        Args: {
          user_uuid: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      player_role: "top" | "jungle" | "mid" | "bottom" | "support"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
