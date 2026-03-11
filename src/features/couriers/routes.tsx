import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/couriers'
import LandlordsItem from './views/landlords-item'

const couriersRoutes: CustomRoute = {
  id: 'couriers',
  title: 'couriers',
  path: 'couriers',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'couriers-item',
      title: 'couriers-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default couriersRoutes
