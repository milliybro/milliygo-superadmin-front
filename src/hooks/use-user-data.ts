// import { useEffect, useState } from 'react'

import type { IUser } from '@/types'

const useUserData = (): IUser | null => {
  // const [user, setUser] = useState<IUser | null>(null)

  // useEffect(() => {
  //   const rawUser = localStorage.getItem('user_data')
  //   if (rawUser) {
  //     const parsedUser: IUser = JSON.parse(rawUser)
  //     setUser(parsedUser)
  //   }
  // }, [])

  const rawUser = localStorage.getItem('user')
  return rawUser ? JSON.parse(rawUser) : null
}

export default useUserData
