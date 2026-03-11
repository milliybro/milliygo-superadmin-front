import type { CustomRoute } from '@/types'
import Container from './containers/landlords-container'
import LandLords from './views/payments'
import LandlordsItem from './views/landlords-item'

const paymentsRoutes: CustomRoute = {
  id: 'payments',
  title: 'payments',
  path: 'payments',
  element: <Container of={<LandLords />} />,
  children: [
    {
      id: 'payments-item',
      title: 'payments-item',
      path: ':id',
      element: <LandlordsItem />,
    },
  ],
}

export default paymentsRoutes
