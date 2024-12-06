import Users from './views/users'

import type { CustomRoute } from '@/types'

const usersRoutes: CustomRoute = {
  id: 'users',
  title: 'users',
  path: 'users',
  element: <Users />,
}

export default usersRoutes
