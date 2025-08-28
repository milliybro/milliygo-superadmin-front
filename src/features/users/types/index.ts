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
  full_name: string
}

interface IUsers {
  full_name: string
  type_name: string
  id: number
  name: string
  key: string
  icon: any
  created_at: string
  first_name: string
  last_name: string
  middle_name: string
  display_name?: string
  phone: string
  gender: string
  username: string
  password: string
  position: string
  status: boolean
  is_active: boolean
  passport_sn: string
  birth_date: string
  country: number
  role: string
  code: number
  type: IType
  country_name: string
  nationality_name: string
  email: string
}
interface IType {
  name: string
}

export type { IUsersTable, IUsers }
