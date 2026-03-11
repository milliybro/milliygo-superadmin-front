export interface InfrastructureCard {
  total_accommodations: TotalAccommodations
  hotel_and_similar_places: HotelAndSimilarPlaces
  specialized_accommodation_facilities: SpecializedAccommodationFacilities
  public_placement_object: PublicPlacementObject
  sanatorium_places: SanatoriumPlaces
}

export interface TotalAccommodations {
  year: number
  value: any
  previous_year: number
  yoy_change: any
}

export interface HotelAndSimilarPlaces {
  year: number
  value: any
  previous_year: number
  yoy_change: any
}

export interface SpecializedAccommodationFacilities {
  year: number
  value: any
  previous_year: number
  yoy_change: any
}

export interface PublicPlacementObject {
  year: number
  value: any
  previous_year: number
  yoy_change: any
}

export interface SanatoriumPlaces {
  year: number
  value: any
  previous_year: number
  yoy_change: any
}
