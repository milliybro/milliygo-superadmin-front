import type { CustomRoute } from '@/types'
import Container from './containers/travel-agencies-container'
import TravelAgenciesItem from './views/travel-agencies-item'
import TravelAgencies from './views/travel-agencies'

const travelAgenciesRoutes: CustomRoute = {
  id: 'travel-agencies',
  title: 'travel-agencies',
  path: 'travel-agencies',
  element: <Container of={<TravelAgencies />} />,
  children: [
    {
      id: 'travel-agencies-item',
      title: 'travel-agencies-item',
      path: ':id',
      element: <TravelAgenciesItem />,
    },
  ],
}

export default travelAgenciesRoutes
