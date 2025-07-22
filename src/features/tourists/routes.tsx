import Tourists from './views/tourists'

import type { CustomRoute } from '@/types'

const touristsRoutes: CustomRoute = {
  id: 'tourists',
  title: 'tourists',
  path: 'tourists',
  element: <Tourists />,
}

export default touristsRoutes
