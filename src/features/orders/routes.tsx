import type { CustomRoute } from '@/types'
import Container from './containers/placements-container'
import PlacementsItem from './views/placements-item'
import OrderManagement from './views/orders'

const ordersRoutes: CustomRoute = {
  id: 'orders',
  title: 'orders',
  path: 'orders',
  element: <Container of={<OrderManagement />} />,
  children: [
    {
      id: 'placements-item',
      title: 'placements-item',
      path: ':id',
      element: <PlacementsItem />,
    },
  ],
}

export default ordersRoutes
