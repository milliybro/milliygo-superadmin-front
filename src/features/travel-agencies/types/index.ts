interface ITourAgents {
  id: number
  file: string
  name: string
  expire_license_date: string
  address: {
    lat: number
    long: number
    address: string
  }[]
  phone_number: {
    phone_number: string
  }[]
}

export type { ITourAgents }
