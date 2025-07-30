interface IHotelsItemTable {
  key: string
  id: number
  name: string
  date: string
  comments: string
  rating: number
}

interface IApartmentsTable {
  placement_name: string
  id: number
  apartment_name: string
  lat: number
  long: number
  room_price: string
  full_name: string
  phone: string
  status: boolean
}

interface ILandlordsTable {
  key: number
  id: number
  per_price: number
  status: string
  placement_name: string
  contact_person: string
  location: string
  phone_number: string
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
  ILandlordsTable,
  IHotelDetail,
  IHotelsGuests,
  IHotelsItemReview,
  IHotelsItemTable,
  IApartmentsTable,
  IHotelsRoom,
  IGuestsTable,
  IGuestsTransaction,
}
