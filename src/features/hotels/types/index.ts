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
  balance: string
}


interface IHotelsRoom {
  key: string
  id: number
  typeNumber: string
  price: number
  status: string
}

interface IGuestsTable {
  key: string
  id: string
  fullName: string
  citizenship: string
  nation: string
  birthdate: string
  passport: string
  checkInOut: string
  status: boolean
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
export type { IHotelsItemTable, IHotelsTable, IHotelsRoom, IGuestsTable, IGuestsTransaction }
