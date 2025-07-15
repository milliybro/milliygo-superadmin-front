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
import guidesRoutes from '@/features/guides/routes'
import myContractRoutes from '@/features/my-contracts/routes'
import invoiceControlRoutes from '@/features/invoice-control/routes'
import uProfileRoutes from '@/features/u-profie/routes'
import myLicensesRoutes from '@/features/my-licenses/routes'
import { contentRoutes } from '@/features/content/'

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
          complaintsRoutes,
          hotelsRoutes,
          clientsRoutes,
          callCenterRoutes,
          servicesRoutes,
          tenantsRoutes,
          accommodationsRoutes,
          mainContentRoutes,
          guidesRoutes,
          usersRoutes,
          accessRoleRoutes,
          contentRoutes,
        ],
      },
      ...commonAuthRoutes,
    ]
  }

  if (role === 'supplier') {
    return [
      {
        id: 'udocs-root',
        path: ROUTE_PATHS.MAIN,
        element: <Root />,
        children: [
          uProfileRoutes,
          myLicensesRoutes,
          myContractRoutes,
          invoiceControlRoutes,
        ],
      },
      ...commonAuthRoutes,
    ]
  }

  return commonAuthRoutes
}
