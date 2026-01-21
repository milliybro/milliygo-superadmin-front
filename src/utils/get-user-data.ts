import type { IUser } from '@/types'

const getUserData = (): IUser | null => {
  const rawUser = localStorage.getItem('user')
  return rawUser ? JSON.parse(rawUser) : null
}

export default getUserData
