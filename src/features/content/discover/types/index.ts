export interface IDiscover {
  id: number
  slug: string
  name: string
  description: string
  image: string
}

export type DiscoverSocials =
  | 'instagram'
  | 'telegram'
  | 'youtube'
  | 'facebook'
  | 'tiktok'
  | 'website'

export interface EditDiscoverParams {
  translations: {
    ru: {
      name: string
      description: string
      content: string
    }
    en: {
      name: string
      description: string
      content: string
    }
    'uz-latin': {
      name: string
      description: string
      content: string
    }
    'uz-cyrillic': {
      name: string
      description: string
      content: string
    }
  }
  image: File | null
  social_links: {
    platform: DiscoverSocials
    url: string
  }[]
}
