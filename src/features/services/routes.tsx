import Services from './views/services'

import type { CustomRoute } from '@/types'
import ServicesAction from './views/services-action'
import Container from './containers/container'

const servicesRoutes: CustomRoute = {
  id: 'services',
  title: 'services',
  path: 'services',
  element: <Container of={<Services />} />,
  children: [
    {
      id: 'servicesAction',
      title: 'servicesAction',
      path: ':id',
      element: <ServicesAction />,
    },
  ],
}

export default servicesRoutes
