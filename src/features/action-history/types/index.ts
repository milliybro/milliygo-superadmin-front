export interface IActionHistory {
  _id: string
  service: string
  action: string
  user: number
  tenant: string
  timestamp: string
  data: IData
}

interface IData {
  id: number
  deleted: any
  deleted_by_cascade: boolean
  ordered_by: string
  tour_item: string
  number_of_participants: number
  status: string
  comment: string
}
