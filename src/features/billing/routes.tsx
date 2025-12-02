import type { CustomRoute } from '@/types'
import Billing from './views/billing'
import Reports from './views/reports'
import Directories from './views/directories'

const billingRoutes: CustomRoute = {
  id: 'billing',
  path: 'billing',
  children: [
    {
      id: 'billing-reports',
      title: 'billing-reports',
      path: 'reports',
      element: <Reports />,
    },
    {
      id: 'billing-directories',
      title: 'billing-directories',
      path: 'directories',
      element: <Directories />,
    },
    {
      id: 'billing-transactions',
      title: 'billing-transactions',
      path: 'transactions',
      element: <Billing />,
    },
    {
      id: 'billing-integration',
      title: 'billing-integration',
      path: 'integration',
      element: <Billing />,
    },
    {
      id: 'billing-registers',
      title: 'billing-registers',
      path: 'registers',
      element: <Billing />,
    },
    {
      id: 'billing-tourist-transactions',
      title: 'billing-tourist-transactions',
      path: 'tourist-transactions',
      element: <Billing />,
    },
  ],
}

export default billingRoutes
