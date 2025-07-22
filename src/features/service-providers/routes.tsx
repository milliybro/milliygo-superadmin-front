import Accommodations from './views/providers'

import type { CustomRoute } from '@/types'

const serviceProvidersRoutes: CustomRoute = {
  id: 'service-providers',
  title: 'service-providers',
  path: 'service-providers',
  element: <Accommodations />,
}

export default serviceProvidersRoutes
