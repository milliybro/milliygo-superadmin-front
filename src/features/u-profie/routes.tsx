import type { CustomRoute } from '@/types'
import UProfilePage from './views'

const uProfileRoutes: CustomRoute = {
  id: 'u-profile',
  title: 'u-profile',
  path: 'u-profile',
  element: <UProfilePage />,
}

export default uProfileRoutes
