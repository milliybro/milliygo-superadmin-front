import type { CustomRoute } from '@/types'
import Placements from './views/placements'
import Container from './containers/placements-container'
import PlacementsItem from './views/placements-item'

const placementRoutes: CustomRoute = {
  id: 'placements',
  title: 'placements',
  path: 'placements',
  element: <Container of={<Placements />} />,
  children: [
    {
      id: 'placements-item',
      title: 'placements-item',
      path: ':id',
      element: <PlacementsItem />,
    },
  ],
}

export default placementRoutes
