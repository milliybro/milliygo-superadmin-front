import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/support'
import LandlordsItem from './views/landlords-item'

const regionsRoutes: CustomRoute = {
  id: 'regions',
  title: 'regions',
  path: 'regions',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'region-item',
      title: 'region-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default regionsRoutes
