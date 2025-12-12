import Container from './containers/container'
import StatisticsCompany from './views/company'
import InboundTourism from './views/inbound'
import StatisticsInfrastructure from './views/Infrastructure'

import type { CustomRoute } from '@/types'
import OutboundTourism from './views/outbound'
import UMehmonActive from './views/u-mehmon'

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
      id: 'statistics-company',
      title: 'statistics.company',
      path: '/statistics/company',
      element: <StatisticsCompany />,
    },
    {
      id: 'statistics-inbound',
      title: 'statistics.inbound_tourism',
      path: '/statistics/inbound',
      element: <InboundTourism />,
    },
    {
      id: 'statistics-outbound',
      title: 'statistics.outbound_tourism',
      path: '/statistics/outbound',
      element: <OutboundTourism />,
    },
    {
      id: 'statistics-umehmon-active',
      title: 'statistics.umehmon-active',
      path: '/statistics/u-mehmon',
      element: <UMehmonActive />,
    },
  ],
}

export default statisticsRoutes
