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
