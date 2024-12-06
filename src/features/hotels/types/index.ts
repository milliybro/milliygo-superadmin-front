interface IHotelsItemTable {
  key: string
  id: number
  name: string
  period: string
  comments: string
  rating: number
}

interface IHotelsTable {
  key: string
  id: number
  hotelName: string
  location: string
  price: number
  rating: number
  login: string
  password: string
  contactPerson: string
  status: string
  balance: number
}
export type { IHotelsItemTable, IHotelsTable }
