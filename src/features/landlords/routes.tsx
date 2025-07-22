import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/landlords'
import LandlordsItem from './views/landlords-item'

const landlordsRoutes: CustomRoute = {
  id: 'landlords',
  title: 'landlords',
  path: 'landlords',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'landlords-item',
      title: 'landlords-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default landlordsRoutes
