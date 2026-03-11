import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/prices'
import LandlordsItem from './views/landlords-item'

const pricesRoutes: CustomRoute = {
  id: 'prices',
  title: 'prices',
  path: 'prices',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'prices-item',
      title: 'prices-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default pricesRoutes
