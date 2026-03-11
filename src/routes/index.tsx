import { ROUTE_PATHS } from '@/config/constants'

import Root from '@/features/root'

import authRoutes from '@/features/auth/routes'
import callCenterRoutes from '@/features/call-center/routes'
import clientsRoutes from '@/features/clients/routes'

import accommodationsRoutes from '@/features/accommodation-facilities/routes'
import billingRoutes from '@/features/billing/routes'
import { contentRoutes } from '@/features/content/'
import guidesRoutes from '@/features/guides/routes'
import mainContentRoutes from '@/features/main-content/routes'

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
import getUserData from '@/utils/get-user-data'
import dashboardRoutes from '@/features/dashboard/routes'
import ordersRoutes from '@/features/orders/routes'
import partnersRoutes from '@/features/partners/routes'
import couriersRoutes from '@/features/couriers/routes'
import pricesRoutes from '@/features/prices/routes'
import paymentsRoutes from '@/features/payments/routes'
import supportRoutes from '@/features/support/routes'
import promoRoutes from '@/features/promo/routes'
import analiticsRoutes from '@/features/analitics/routes'
import regionsRoutes from '@/features/regions/routes'
import notificationRoutes from '@/features/notification/routes'
import settingsRoutes from '@/features/settings/routes'

export function createRoutesByRole(role: 'admin' | 'supplier'): CustomRoute[] {
  const commonAuthRoutes = [authRoutes, resetRoutes]
  const user = getUserData()

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
          dashboardRoutes,
          ordersRoutes,
          partnersRoutes,
          couriersRoutes,
          pricesRoutes,
          paymentsRoutes,
          supportRoutes,
          promoRoutes,
          analiticsRoutes,
          regionsRoutes,
          notificationRoutes,
          settingsRoutes,
          touristsRoutes,
          serviceProvidersRoutes,
          travelAgenciesRoutes,
          guidesRoutes,
          billingRoutes,
          actionHistoryRoutes,
          clientsRoutes,
          callCenterRoutes,
          servicesRoutes,
          tenantsRoutes,
          accommodationsRoutes,
          mainContentRoutes,
          contentRoutes,
        ],
      },
      { path: '/not-found', element: <NotFound /> },
      ...commonAuthRoutes,
    ]
  }

  return commonAuthRoutes
}
