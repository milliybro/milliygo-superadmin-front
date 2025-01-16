import type {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  ReactElement,
  SVGProps,
} from 'react'

interface ISupportModalProps {
  icon: JSXElementConstructor<SVGProps<SVGSVGElement>>
  title: string
  description: string
  children?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
}
interface AuthTokens {
  access: string
  refresh: string
}

interface BranchUser {
  branch: number
  user: number
}

interface Groups {
  name: any
  description: any
  key: any
}

interface IUser {
  id: number
  username: string
  first_name: string
  last_name: string
  avatar: string
  email: string
  phone: string
  birth_date: string
  gender: string
  type: string
  password_changed: boolean
  branch_user: BranchUser
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  groups: Groups
  user_permissions: any[]
  date_joined: string
  last_login: string
  created_at: string
  updated_at: string
  deleted: any
  deleted_by_cascade: boolean
}

interface AuthResponse {
  auth_tokens: AuthTokens
  user: IUser
  refresh: string
  access: string
}

export type { ISupportModalProps, AuthResponse }
