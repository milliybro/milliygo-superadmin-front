import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/support'
import LandlordsItem from './views/landlords-item'

const settingsRoutes: CustomRoute = {
  id: 'settings',
  title: 'settings',
  path: 'settings',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'settings-item',
      title: 'settings-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default settingsRoutes
