export interface IRegion {
  id: number
  name: string
  code: string | null
  parent: any
}

export interface ITopDestination {
  id: number
  title: string
  description: string
  region: IRegion
  images: {
    id: number
    is_main: boolean
    file_path: string
  }[]
  video_url: string | null
  created_at: string
  updated_at: string
  status: boolean
}

export interface INominatimResponse {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  class: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  address: {
    building: string
    suburb: string
    house_number: string
    road: string
    amenity: string
    neighbourhood: string
    hamlet: string
    county: string
    city: string
    'ISO3166-2-lvl4': string
    postcode: string
    country: string
    country_code: string
  }

  boundingbox: string[]
}

export interface IRegionMapPoint {
  id: number
  region: IRegion
  top_destination: {
    id: number
    title: string
    description: string
    images: {
      id: number
      is_main: boolean
      file_path: string
    }[]
  }
  is_active: boolean
  front_data: {
    x: number
    y: number
    point_title: string
  }
}

export interface IExpertAdvice {
  id: number
  slug: string
  type: Type
  created_at: string
  updated_at: string
  image: string
  title: string
  status: boolean
  description: string
  social_links: any[]
  content: string
}

export interface IExpertAdviceDetailed {
  id: number
  slug: string
  type: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
  image: string
  title: string
  description: string
  content: string
  status: boolean
}

export interface IEventDetailed {
  id: number
  slug: string
  name: string
  description: string
  date: string
  location: string
  image: string
  organizer: string
  status: boolean
  content: string
  lon: number
  lat: number
}

export interface IInstagramDetailed {
  id: number
  title: string
  description: string
  url: string
  image: string
  is_active: boolean
}

export interface Type {
  id: number
  name: string
}

export interface Image {
  id: number
  is_main: boolean
  image_path: string
}

export interface IEvent {
  id: number
  slug: string
  name: string
  description: string
  date: string
  location: string
  status: boolean
  image: string
  organizer: string
}

export interface IInstagramContent {
  id: number
  title: string
  description: string
  url: string
  image: string
  is_active: boolean
}

export interface IPatchExpertAdviceData {
  title?: string
  description?: string
  content?: string
  uploaded_images?: string[]
  status?: boolean
  type?: number
}

export interface IPatchInstagramContentData {
  url?: string
  is_active?: boolean
}

export interface IPatchEventData {
  name?: string
  description?: string
  date?: string
  location?: string
  status?: boolean
  organizer?: string
}
