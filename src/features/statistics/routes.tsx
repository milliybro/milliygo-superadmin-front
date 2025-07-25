import Statistics from './views/statistics'

import type { CustomRoute } from '@/types'

const statisticsRoutes: CustomRoute = {
  id: 'statistics',
  title: 'statistics',
  path: '/',
  element: <Statistics />,
}

export default statisticsRoutes
