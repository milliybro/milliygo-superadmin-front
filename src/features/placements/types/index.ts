export interface IPlacement {
  placement_id: number
  lat: number
  image: string
  long: number
  name: string
  phone: string | null
  address: string
  slug: string
  type_name: string
  key: string
  rating: number
  image_url: string
  resized_image_url: string
}

export interface IPlacementType {
  name: string
  key: string
}

interface IHotelsItemTable {
  key: string
  id: number
  name: string
  date: string
  comments: string
  rating: number
}

interface IHotelsTable {
  key: number
  id: number
  image: string
  address: string
  min_price: number
  star_rating: number
  price: number
  rating: number
  login: string
  password: string
  status: string
  balance: string
  placement_name: string
  placement_address: string
  full_name: string
}

interface IHotelDetail {
  id: number
  name: string | undefined
  description: string
  rating: number
  status: string
  amenities: string[]
  photos: string[]
}

interface IHotelsItemReview {
  key: string
  id: number
  name: string
  date: string
  review: string
  rating: number
}

interface IHotelsRoom {
  key: any
  id: any
  name: any
  status: boolean
  room_images: any
  room_name: any
  prices: any
  facilities: any
}
interface IHotelsGuests {
  key: number
  id: number
  citizenship: string
  passport_sn: string
  checkInOut: string
  first_name: string
  last_name: string
  nationality: string
  birth_date: string
  check_in: string
  check_out: string
  full_name: string
  passport: string
  start_date: string
  end_date: string
}

interface IGuestsTable {
  key: number
  id: string | number
  fullName: string
  citizenship: string
  nation: string
  birthdate: string
  passport: string
  checkInOut: string
}

interface IGuestsTransaction {
  key: string
  id: string
  fullName: string
  payment: string
  room: string
  paymentAmount: number
  checkInOut: string
  status: string
}
export type {
  IHotelDetail,
  IHotelsGuests,
  IHotelsItemReview,
  IHotelsItemTable,
  IHotelsTable,
  IHotelsRoom,
  IGuestsTable,
  IGuestsTransaction,
}
