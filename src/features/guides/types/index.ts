import { ListResponse } from '@/types'

export interface IHotelsItemTable {
  key: string
  id: number
  name: string
  date: string
  comments: string
  rating: number
}

export interface IGuide {
  user_id: number
  avatar: string
  full_name: string
  status: boolean
  rating: number
  regions: string[]
  guide_status: string
}

export interface ITenantsTable {
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

export interface IHotelDetail {
  id: number
  name: string | undefined
  description: string
  rating: number
  status: string
  amenities: string[]
  photos: string[]
}

export interface IHotelsItemReview {
  key: string
  id: number
  name: string
  date: string
  review: string
  rating: number
}

export interface IHotelsRoom {
  key: string
  id: number
  name: string
  typeNumber: string
  price: number
  status: string
}
export interface IHotelsGuests {
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

export interface IGuestsTable {
  key: number
  id: string | number
  fullName: string
  citizenship: string
  nation: string
  birthdate: string
  passport: string
  checkInOut: string
}

export interface IGuestsTransaction {
  key: string
  id: string
  fullName: string
  payment: string
  room: string
  paymentAmount: number
  checkInOut: string
  status: string
}

export interface IGuideContextType {
  guides: {
    data: ListResponse<IGuide[]> | undefined
    isLoading: boolean
    refetch: () => void
  }
}

export type IGuideStatus = 'accepted' | 'rejected' | 'in_progress'
