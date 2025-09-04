interface IHotelsItemTable {
  key: string
  id: number
  name: string
  date: string
  comments: string
  rating: number
}

interface IGuidesTable {
  key: number
  id: number
  fio: string
  placements: any
  rating: number
  status: string
}

interface IGuide {
  id: number
  certificate_file: string
  publishing_status: string
  guide_category: number
  full_name: string
  citizenship_name: string
  nationality_name: string
  phone: string
}

interface ITenantsTable {
  key?: string
  id?: number
  schema_name: string
  username: string
  password: string
  domain: string
  is_active: string
  start_date: string
  end_date: string
  user_id?: number | null
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
  key: string
  id: number
  name: string
  typeNumber: string
  price: number
  status: string
}
interface IHotelsGuests {
  key: number
  id: number
  citizenship: string
  passport: string
  checkInOut: string
  first_name: string
  last_name: string
  nationality: string
  birth_date: string
  check_in: string
  check_out: string
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
  ITenantsTable,
  IHotelsGuests,
  IHotelsItemReview,
  IHotelsItemTable,
  IGuidesTable,
  IHotelsRoom,
  IGuestsTable,
  IGuestsTransaction,
  IGuide,
}
