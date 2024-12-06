import Hotels from './views/hotels'
import HotelsItem from './views/hotels-item'

import Container from './containers/hotels-container'

import type { CustomRoute } from '@/types'

const hotelsRoutes: CustomRoute = {
  id: 'hotels',
  title: 'hotels',
  path: 'hotels',
  element: <Container of={<Hotels />} />,
  children: [
    {
      id: 'hotels-item',
      title: 'hotels-item',
      path: ':id',
      element: <HotelsItem />,
    },
  ],
}

export default hotelsRoutes
