import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/promo'
import LandlordsItem from './views/landlords-item'

const analiticsRoutes: CustomRoute = {
  id: 'analitics',
  title: 'analitics',
  path: 'analitics',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'analitics-item',
      title: 'analitics-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default analiticsRoutes
