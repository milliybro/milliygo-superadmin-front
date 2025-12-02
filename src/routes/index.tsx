import { ROUTE_PATHS } from '@/config/constants'

import Root from '@/features/root'

import accessRoleRoutes from '@/features/access-roles/routes'
import authRoutes from '@/features/auth/routes'
import callCenterRoutes from '@/features/call-center/routes'
import clientsRoutes from '@/features/clients/routes'
import complaintsRoutes from '@/features/complaints/routes'
import usersRoutes from '@/features/users/routes'

import accommodationsRoutes from '@/features/accommodation-facilities/routes'
import billingRoutes from '@/features/billing/routes'
import { contentRoutes } from '@/features/content/'
import guidesRoutes from '@/features/guides/routes'
import landlordsRoutes from '@/features/landlords/routes'
import mainContentRoutes from '@/features/main-content/routes'
import placementRoutes from '@/features/placements/routes'
import serviceProvidersRoutes from '@/features/service-providers/routes'
import servicesRoutes from '@/features/services/routes'
import statisticsRoutes from '@/features/statistics/routes'
import tenantsRoutes from '@/features/tenants/routes'
import touristsRoutes from '@/features/tourists/routes'
import travelAgenciesRoutes from '@/features/travel-agencies/routes'
import Error from '@/views/error'
import type { CustomRoute } from '@/types'
import NotFound from '@/views/not-found'
import actionHistoryRoutes from '@/features/action-history/routes'
import resetRoutes from '@/features/reset/routes'
import useUserData from '@/hooks/use-user-data'

export function createRoutesByRole(role: 'admin' | 'supplier'): CustomRoute[] {
  const commonAuthRoutes = [authRoutes, resetRoutes]
  const user = useUserData()

  if (role === 'admin') {
    if (user?.username === 'statistics_admin') {
      return [
        {
          id: 'root',
          path: ROUTE_PATHS.MAIN,
          element: <Root />,
          errorElement: <Error />,
          children: [statisticsRoutes],
        },
        { path: '/not-found', element: <NotFound /> },
        ...commonAuthRoutes,
      ]
    }

    return [
      {
        id: 'root',
        path: ROUTE_PATHS.MAIN,
        element: <Root />,
        errorElement: <Error />,
        children: [
          statisticsRoutes,
          placementRoutes,
          touristsRoutes,
          landlordsRoutes,
          serviceProvidersRoutes,
          travelAgenciesRoutes,
          guidesRoutes,
          billingRoutes,
          actionHistoryRoutes,
          complaintsRoutes,
          clientsRoutes,
          callCenterRoutes,
          servicesRoutes,
          tenantsRoutes,
          accommodationsRoutes,
          mainContentRoutes,
          usersRoutes,
          accessRoleRoutes,
          contentRoutes,
        ],
      },
      { path: '/not-found', element: <NotFound /> },
      ...commonAuthRoutes,
    ]
  }

  return commonAuthRoutes
}
