export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: number
          members: number[]
          name: string
          owner: number
        }
        Insert: {
          id: number
          members: number[]
          name: string
          owner: number
        }
        Update: {
          id?: number
          members?: number[]
          name?: string
          owner?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_id_fkey"
            columns: ["id"]
            referencedRelation: "task_owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      task_items: {
        Row: {
          completed: boolean
          item_id: number
          task_id: number
          text: string
        }
        Insert: {
          completed?: boolean
          item_id?: number
          task_id: number
          text: string
        }
        Update: {
          completed?: boolean
          item_id?: number
          task_id?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_items_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      task_owners: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          edited_at: string
          id: number
          owner: number
          title: string
        }
        Insert: {
          created_at?: string
          edited_at?: string
          id?: number
          owner: number
          title: string
        }
        Update: {
          created_at?: string
          edited_at?: string
          id?: number
          owner?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_owner_fkey"
            columns: ["owner"]
            referencedRelation: "task_owners"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          groups: number[]
          id: number
          name: string
          uuid: string
        }
        Insert: {
          groups: number[]
          id?: number
          name: string
          uuid: string
        }
        Update: {
          groups?: number[]
          id?: number
          name?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "task_owners"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
