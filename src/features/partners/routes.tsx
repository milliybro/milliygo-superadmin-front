import Partners from './views/partners'

import type { CustomRoute } from '@/types'

const partnersRoutes: CustomRoute = {
  id: 'partners',
  title: 'partners',
  path: 'partners',
  element: <Partners />,
}

export default partnersRoutes
