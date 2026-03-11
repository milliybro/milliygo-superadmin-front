import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/support'
import LandlordsItem from './views/landlords-item'

const notificationRoutes: CustomRoute = {
  id: 'notification',
  title: 'notification',
  path: 'notification',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'notification-item',
      title: 'notification-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default notificationRoutes
