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
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          meta_title: string | null
          meta_description: string | null
          published_at: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      location_pages: {
        Row: {
          id: string
          template_type: string
          location_name: string
          location_slug: string
          url: string
          tier: number | null
          distance_km: number | null
          bts_time_mins: number | null
          taxi_time_mins: number | null
          walking_time_mins: number | null
          taxi_fare_estimate: string | null
          bts_route: string | null
          walking_directions: string | null
          nearby_landmarks: string | null
          nearby_hotels: string | null
          nearby_offices: string | null
          google_maps_embed: string | null
          h1_title: string
          meta_description: string | null
          unique_intro: string | null
          area_pain_point: string | null
          lengolf_pitch: string | null
          other_attractions: string | null
          area_description: string | null
          simulator_specs: string | null
          lesson_packages: string | null
          instructor_info: string | null
          corporate_packages: string | null
          max_capacity: string | null
          catering_options: string | null
          club_rental_info: string | null
          featured_image: string | null
          gallery_images: string | null
          schema_markup: Json | null
          internal_links: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_type: string
          location_name: string
          location_slug: string
          url: string
          tier?: number | null
          distance_km?: number | null
          bts_time_mins?: number | null
          taxi_time_mins?: number | null
          walking_time_mins?: number | null
          taxi_fare_estimate?: string | null
          bts_route?: string | null
          walking_directions?: string | null
          nearby_landmarks?: string | null
          nearby_hotels?: string | null
          nearby_offices?: string | null
          google_maps_embed?: string | null
          h1_title: string
          meta_description?: string | null
          unique_intro?: string | null
          area_pain_point?: string | null
          lengolf_pitch?: string | null
          other_attractions?: string | null
          area_description?: string | null
          simulator_specs?: string | null
          lesson_packages?: string | null
          instructor_info?: string | null
          corporate_packages?: string | null
          max_capacity?: string | null
          catering_options?: string | null
          club_rental_info?: string | null
          featured_image?: string | null
          gallery_images?: string | null
          schema_markup?: Json | null
          internal_links?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_type?: string
          location_name?: string
          location_slug?: string
          url?: string
          tier?: number | null
          distance_km?: number | null
          bts_time_mins?: number | null
          taxi_time_mins?: number | null
          walking_time_mins?: number | null
          taxi_fare_estimate?: string | null
          bts_route?: string | null
          walking_directions?: string | null
          nearby_landmarks?: string | null
          nearby_hotels?: string | null
          nearby_offices?: string | null
          google_maps_embed?: string | null
          h1_title?: string
          meta_description?: string | null
          unique_intro?: string | null
          area_pain_point?: string | null
          lengolf_pitch?: string | null
          other_attractions?: string | null
          area_description?: string | null
          simulator_specs?: string | null
          lesson_packages?: string | null
          instructor_info?: string | null
          corporate_packages?: string | null
          max_capacity?: string | null
          catering_options?: string | null
          club_rental_info?: string | null
          featured_image?: string | null
          gallery_images?: string | null
          schema_markup?: Json | null
          internal_links?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      club_sets: {
        Row: {
          id: string
          name: string
          brand: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          brand: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          brand?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      used_clubs_inventory: {
        Row: {
          id: string
          brand: string
          model: string | null
          club_type: string
          gender: string
          condition: string
          price: number
          cost: number | null
          description: string | null
          image_url: string | null
          available_for_sale: boolean
          available_for_rental: boolean
          set_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand: string
          model?: string | null
          club_type: string
          gender?: string
          condition: string
          price: number
          cost?: number | null
          description?: string | null
          image_url?: string | null
          available_for_sale?: boolean
          available_for_rental?: boolean
          set_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand?: string
          model?: string | null
          club_type?: string
          gender?: string
          condition?: string
          price?: number
          cost?: number | null
          description?: string | null
          image_url?: string | null
          available_for_sale?: boolean
          available_for_rental?: boolean
          set_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "used_clubs_inventory_set_id_fkey"
            columns: ["set_id"]
            referencedRelation: "club_sets"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          page_source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          message: string
          page_source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string
          page_source?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      google_reviews_public: {
        Row: {
          reviewer_name: string
          star_rating: string
          comment: string | null
          language: string | null
          review_created_at: string
        }
        Relationships: []
      }
    }
    Functions: {
      get_google_reviews_stats: {
        Args: Record<string, never>
        Returns: { total_reviews: number; avg_rating: number }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
