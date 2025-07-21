import type { CustomRoute } from '@/types'
import Billing from './views/billing'

const billingRoutes: CustomRoute = {
  id: 'billing',
  title: 'billing',
  path: 'billing',
  element: <Billing />,
}

export default billingRoutes
