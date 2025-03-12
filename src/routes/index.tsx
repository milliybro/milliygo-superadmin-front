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
import servicesRoutes from '@/features/services/routes'
import tenantsRoutes from '@/features/tenants/routes'
import statisticsRoutes from '@/features/statistics/routes'
import accommodationsRoutes from '@/features/accommodation-facilities/routes'
import mainContentRoutes from '@/features/main-content/routes'

const routes: CustomRoute[] = [
  {
    id: 'root',
    path: ROUTE_PATHS.MAIN,
    element: <Root />,
    children: [
      statisticsRoutes,
      complaintsRoutes,
      hotelsRoutes,
      clientsRoutes,
      callCenterRoutes,
      usersRoutes,
      accessRoleRoutes,
      servicesRoutes,
      tenantsRoutes,
      accommodationsRoutes,
      mainContentRoutes
    ],
  },
  authRoutes,
]

export default routes
