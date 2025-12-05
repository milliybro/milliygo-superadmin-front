import Container from './containers/container'
import StatisticsInfrastructure from './views/Infrastructure'
import Statistics from './views/statistics'

import type { CustomRoute } from '@/types'

const statisticsRoutes: CustomRoute = {
  id: 'statistics',
  title: 'statistics',
  path: '/',
  element: <Container of={<StatisticsInfrastructure />} />,

  children: [
    {
      id: 'statistics-infrastructure',
      title: 'statistics.infrastructure',
      path: '/statistics/infrastructure',
      element: <StatisticsInfrastructure />,
    },
    {
      id: 'statistics-daily',
      title: 'statistics.daily',
      path: '/statistics/daily',
      element: <Statistics />,
    },
  ],
}

export default statisticsRoutes
