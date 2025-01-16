import { create } from 'zustand'

export interface IUserInfo {
  id: number
  last_login: any
  is_superuser: boolean
  username: string
  first_name: string
  middle_name: any
  last_name: string
  email: string
  avatar: string
  phone: any
  pinfl: any
  passport_sn: any
  passport_given_by: any
  passport_expire_date: any
  position: any
  address: any
  is_staff: boolean
  is_active: boolean
  date_joined: string
  groups: any[]
  region: any
  district: any
  country: any
  type: any
  user_permissions: any[]
  notification: any[]
  language: any[]
  deleted: any
  deleted_by_cascade: boolean
  birth_date: any
  gender: string
  unsubscribe_reason: any
  confirm_code: any
  expire_code: any
  created_at: string
  updated_at: string
  organization: number
  telegram_id: number | null
}

interface AuthState {
  isAuthenticated: boolean
  userInfo: any | IUserInfo
  // eslint-disable-next-line no-unused-vars
  login: (userData: object) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  if (typeof window !== 'undefined') {
    const storedAuthState = localStorage.getItem('authState')
    const initialAuthState: AuthState = storedAuthState
      ? JSON.parse(storedAuthState)
      : { isAuthenticated: false, userInfo: {} }

    return {
      ...initialAuthState,
      login: (userData) => {
        set({ isAuthenticated: true, userInfo: userData })
        localStorage.setItem(
          'authState',
          JSON.stringify({ isAuthenticated: true, userInfo: userData })
        )
      },
      logout: () => {
        set({ isAuthenticated: false, userInfo: {} })
        localStorage.removeItem('authState')
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
      },
    }
  }

  return { isAuthenticated: false, userInfo: {}, login: () => {}, logout: () => {} }
})
