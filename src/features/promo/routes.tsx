import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/promo'
import LandlordsItem from './views/landlords-item'

const promoRoutes: CustomRoute = {
  id: 'promo',
  title: 'promo',
  path: 'promo',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'promo-item',
      title: 'promo-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default promoRoutes
