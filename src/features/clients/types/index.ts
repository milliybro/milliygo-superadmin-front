interface IClientTable {
  key: string
  id: number
  fullName: string
  passportData: string
  phoneNumber: string
  birthYear: number
  gender: string
  entryDate: string
  exitDate: string
  country: string
  nationality: string
  country_name: string
}

interface Country {
  id: number
  name: string
  code: string
}

interface IClientItemTable {
  key: string
  id: number
  name: string
  period: string
  comment: string
}
interface IClientReview {
  key: string
  id: number
  name: string
  typeNumber: string
  price: number
  status: string
}

interface ICountry {
  id: number
  translations: string
  code: string
  sp_id: number | null
  name: string
  results: any
}
export type { IClientTable, IClientItemTable, IClientReview, Country, ICountry }
