interface IUsersTable {
  key: string
  id: number
  fullName: string
  first_name: string
  last_name: string
  middle_name: string
  phone: string
  gender: string
  username: string
  password: string
  position: string
  status: boolean
  name: string
  address: string
  price: number
  rating: number
  contact: string
}

interface IDestinations {
  title: string
  font_color: string
  content_files: any
}
interface IType {
  name: string
}

export type { IUsersTable, IDestinations, IType }
