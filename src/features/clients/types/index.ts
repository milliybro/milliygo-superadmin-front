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
}

interface IClientItemTable {
  key: string
  id: number
  name: string
  period: string
  comment: string
}

export type { IClientTable, IClientItemTable }
