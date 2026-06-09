export interface Profile {
  id: string
  name: string
  created_at: string
}

export interface Event {
  id: string
  host_id: string
  title: string
  cover_url: string | null
  shot_limit: number
  guest_cap: number
  reveal_at: string | null
  is_revealed: boolean
  status: "active" | "developing" | "revealed" | "archived"
  join_code: string
  created_at: string
}

export interface Guest {
  id: string
  event_id: string
  token: string
  shots_remaining: number
  joined_at: string
}

export interface Photo {
  id: string
  event_id: string
  guest_id: string | null
  storage_path: string
  width: number
  height: number
  taken_at: string
}
