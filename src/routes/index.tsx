import { ROUTE_PATHS } from '@/config/constants'

import Root from '@/features/root'

import authRoutes from '@/features/auth/routes'
import usersRoutes from '@/features/users/routes'
import hotelsRoutes from '@/features/hotels/routes'
import clientsRoutes from '@/features/clients/routes'
import complaintsRoutes from '@/features/complaints/routes'
import callCenterRoutes from '@/features/call-center/routes'
import accessRoleRoutes from '@/features/access-roles/routes'

import type { CustomRoute } from '@/types'

const routes: CustomRoute[] = [
  {
    id: 'root',
    path: ROUTE_PATHS.MAIN,
    element: <Root />,
    children: [
      complaintsRoutes,
      hotelsRoutes,
      clientsRoutes,
      callCenterRoutes,
      usersRoutes,
      accessRoleRoutes,
    ],
  },
  authRoutes,
]

export default routes
