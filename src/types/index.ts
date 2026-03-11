import { FC, SVGProps } from 'react'
import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router'

interface RouteExtensions {
  title?: string
  Icon?: (props: Partial<object>) => React.ReactElement | null
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & RouteExtensions>
}

type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject) &
  RouteExtensions

interface IBreadCrumb {
  title: string
  href?: string
}

interface IBreadCrumbsStore {
  breadCrumbs: IBreadCrumb[]
  setBreadCrumbs: (newBreadCrumbs: IBreadCrumb[]) => void
}

interface ListResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T
}

interface ListResponseShort<T> {
  count: number
  next: string
  previous: string
  results: T[]
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

interface User {
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

interface BranchUser {
  branch: number
  user: number
}

interface Groups {
  name: any
  description: any
  key: any
}

interface IErrorMessage {
  error_type: string
  field: any
  detail: string
  status_code: number
}

type SidebarItemType = {
  label: string
  icon?: FC<SVGProps<SVGSVGElement>>
  path?: string
  status?: string
  children?: Children[]
}
export interface Children {
  label: string
  path?: string
}

export type {
  IUser,
  User,
  CustomRoute,
  IBreadCrumb,
  IBreadCrumbsStore,
  ListResponse,
  IErrorMessage,
  ListResponseShort,
  SidebarItemType,
}
