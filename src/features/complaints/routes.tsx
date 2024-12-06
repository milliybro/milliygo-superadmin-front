import Complaints from './views/complaints'

import type { CustomRoute } from '@/types'

const complaintsRoutes: CustomRoute = {
  id: 'complaints',
  title: 'complaints',
  path: 'complaints',
  element: <Complaints />,
}

export default complaintsRoutes
