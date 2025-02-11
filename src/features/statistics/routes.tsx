import Statistics from './views/users'

import type { CustomRoute } from '@/types'

const statisticsRoutes: CustomRoute = {
  id: 'statistics',
  title: 'statistics',
  path: 'statistics',
  element: <Statistics />,
}

export default statisticsRoutes
