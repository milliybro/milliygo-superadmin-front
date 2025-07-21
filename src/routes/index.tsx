import { ROUTE_PATHS } from '@/config/constants'

import Root from '@/features/root'

import authRoutes from '@/features/auth/routes'
import usersRoutes from '@/features/users/routes'
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
import guidesRoutes from '@/features/guides/routes'
import placementRoutes from '@/features/placements/routes'
import touristsRoutes from '@/features/tourists/routes'
import landlordsRoutes from '@/features/landlords/routes'
import serviceProvidersRoutes from '@/features/service-providers/routes'
import travelAgenciesRoutes from '@/features/travel-agencies/routes'
import billingRoutes from '@/features/billing/routes'

export function createRoutesByRole(role: 'admin' | 'supplier'): CustomRoute[] {
  const commonAuthRoutes = [authRoutes]

  if (role === 'admin') {
    return [
      {
        id: 'root',
        path: ROUTE_PATHS.MAIN,
        element: <Root />,
        children: [
          statisticsRoutes,
          placementRoutes,
          touristsRoutes,
          landlordsRoutes,
          serviceProvidersRoutes,
          travelAgenciesRoutes,
          guidesRoutes,
          billingRoutes,

          complaintsRoutes,
          clientsRoutes,
          callCenterRoutes,
          servicesRoutes,
          tenantsRoutes,
          accommodationsRoutes,
          mainContentRoutes,
          usersRoutes,
          accessRoleRoutes,
        ],
      },
      ...commonAuthRoutes,
    ]
  }

  return commonAuthRoutes
}
