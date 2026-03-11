import Auth from './views/auth'
import SignIn from './views/sign-in'

import type { CustomRoute } from '@/types'

const authRoutes: CustomRoute = {
  id: 'auth',
  title: 'auth',
  path: 'auth',
  element: <Auth />,
  children: [
    {
      id: 'sign-in',
      title: 'sign-in',
      path: 'sign-in',
      element: <SignIn />,
    },
  ],
}

export default authRoutes
