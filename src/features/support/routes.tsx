import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/support'
import LandlordsItem from './views/landlords-item'

const supportRoutes: CustomRoute = {
  id: 'support',
  title: 'support',
  path: 'support',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'support-item',
      title: 'support-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default supportRoutes
