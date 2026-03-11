import Tenants from './views/tenants'
import Container from './containers/tenants-container'

import type { CustomRoute } from '@/types'

const tenantsRoutes: CustomRoute = {
  id: 'tenants',
  title: 'tenants',
  path: 'tenants',
  element: <Container of={<Tenants />} />,
  // children: [
  //   {
  //     id: 'hotels-item',
  //     title: 'hotels-item',
  //     path: ':id',
  //     element: <HotelsItem />,
  //   },
  // ],
}

export default tenantsRoutes
