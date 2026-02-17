import Container from './containers/container'
import ProviderItem from './containers/provider-item'
import Accommodations from './views/providers'

import type { CustomRoute } from '@/types'

const serviceProvidersRoutes: CustomRoute = {
  id: 'service-providers',
  title: 'service-providers',
  path: 'service-providers',
  element: <Container of={<Accommodations />} />,
  children: [
    {
      id: 'provider-item',
      title: 'provider-item',
      path: ':id',
      element: <ProviderItem />,
    },
  ],
}

export default serviceProvidersRoutes
