export interface IDiscover {
  id: number
  slug: string
  name: string | null
  description: string | null
  image: string | null
  content: string | null
  status: boolean
  social_links: {
    platform: DiscoverSocials
    url: string
  }[]
}

export interface ICreateDiscoverForm {
  content: string
  name: string
  description: string
  status: boolean
  social_links: {
    platform: DiscoverSocials
    url: string
  }[]
  translate_all: boolean
  refresh_cache: boolean
}

export type DiscoverSocials =
  | 'instagram'
  | 'telegram'
  | 'youtube'
  | 'facebook'
  | 'tiktok'
  | 'website'

export interface EditDiscoverParams {
  name: string
  description: string
  content: string
  image: File | null
  social_links: {
    platform: DiscoverSocials
    url: string
  }[]
}
