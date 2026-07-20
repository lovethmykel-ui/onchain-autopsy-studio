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
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          plan: 'free' | 'pro' | 'studio_max'
          credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'studio_max'
          credits?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'studio_max'
          credits?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          topic: string
          type: string
          status: 'draft' | 'in_production' | 'completed' | 'failed' | 'archived'
          progress: number
          thumbnail_url: string | null
          workflow_type: string
          target_platform: string
          duration_target: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          topic: string
          type: string
          status?: 'draft' | 'in_production' | 'completed' | 'failed' | 'archived'
          progress?: number
          thumbnail_url?: string | null
          workflow_type: string
          target_platform?: string
          duration_target?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          topic?: string
          type?: string
          status?: 'draft' | 'in_production' | 'completed' | 'failed' | 'archived'
          progress?: number
          thumbnail_url?: string | null
          workflow_type?: string
          target_platform?: string
          duration_target?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      research: {
        Row: {
          id: string
          project_id: string
          report: string | null
          sources: Json
          evidence: Json
          timeline_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          report?: string | null
          sources?: Json
          evidence?: Json
          timeline_data?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          report?: string | null
          sources?: Json
          evidence?: Json
          timeline_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      scripts: {
        Row: {
          id: string
          project_id: string
          duration_type: '15min' | '30min' | '60min'
          narration: string | null
          scene_notes: string | null
          visual_directions: string | null
          broll_suggestions: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          duration_type: '15min' | '30min' | '60min'
          narration?: string | null
          scene_notes?: string | null
          visual_directions?: string | null
          broll_suggestions?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          duration_type?: '15min' | '30min' | '60min'
          narration?: string | null
          scene_notes?: string | null
          visual_directions?: string | null
          broll_suggestions?: Json
          created_at?: string
          updated_at?: string
        }
      }
      storyboards: {
        Row: {
          id: string
          project_id: string
          scenes: Json
          total_scenes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          scenes?: Json
          total_scenes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          scenes?: Json
          total_scenes?: number
          created_at?: string
          updated_at?: string
        }
      }
      generated_images: {
        Row: {
          id: string
          project_id: string
          prompt: string
          url: string | null
          model: string
          type: 'character' | 'location' | 'reenactment' | 'object' | 'prop' | 'environment' | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          prompt: string
          url?: string | null
          model: string
          type?: 'character' | 'location' | 'reenactment' | 'object' | 'prop' | 'environment' | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          prompt?: string
          url?: string | null
          model?: string
          type?: 'character' | 'location' | 'reenactment' | 'object' | 'prop' | 'environment' | null
          metadata?: Json
          created_at?: string
        }
      }
      generated_videos: {
        Row: {
          id: string
          project_id: string
          prompt: string
          url: string | null
          model: string
          resolution: string
          fps: number
          duration: number
          type: 'broll' | 'footage' | 'reenactment' | 'establishing' | 'transition' | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          prompt: string
          url?: string | null
          model: string
          resolution?: string
          fps?: number
          duration?: number
          type?: 'broll' | 'footage' | 'reenactment' | 'establishing' | 'transition' | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          prompt?: string
          url?: string | null
          model?: string
          resolution?: string
          fps?: number
          duration?: number
          type?: 'broll' | 'footage' | 'reenactment' | 'establishing' | 'transition' | null
          created_at?: string
        }
      }
      generated_audio: {
        Row: {
          id: string
          project_id: string
          type: 'narration' | 'interview' | 'character' | 'quote' | null
          url: string | null
          model: string
          voice_id: string | null
          duration: number
          transcript: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          type?: 'narration' | 'interview' | 'character' | 'quote' | null
          url?: string | null
          model: string
          voice_id?: string | null
          duration?: number
          transcript?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          type?: 'narration' | 'interview' | 'character' | 'quote' | null
          url?: string | null
          model?: string
          voice_id?: string | null
          duration?: number
          transcript?: string | null
          created_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          provider: string
          encrypted_key: string
          last_validated: string | null
          is_valid: boolean
          usage_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          encrypted_key: string
          last_validated?: string | null
          is_valid?: boolean
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          encrypted_key?: string
          last_validated?: string | null
          is_valid?: boolean
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
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
  }
}
