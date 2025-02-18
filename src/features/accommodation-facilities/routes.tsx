import Accommodations from './views/accommodations'

import type { CustomRoute } from '@/types'

const accommodationsRoutes: CustomRoute = {
  id: 'accommodations',
  title: 'accommodations',
  path: 'accommodations',
  element: <Accommodations />,
}

export default accommodationsRoutes
