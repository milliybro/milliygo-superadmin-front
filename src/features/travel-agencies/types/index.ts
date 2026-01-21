interface ITourAgents {
  id: number
  file: string
  name: string
  expire_license_date: string
  address: string
  phone_number: string
}

interface IAgentTourData {
  id: number
  name: string
  duration_days: number
  type_tour: string
  number_people: number
  price: number
}

export type { ITourAgents, IAgentTourData }
