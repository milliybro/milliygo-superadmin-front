import ResetPassword from './views/reset'

import type { CustomRoute } from '@/types'

const resetRoutes: CustomRoute = {
  id: 'reset',
  title: 'reset',
  path: 'reset',
  element: <ResetPassword />,
}

export default resetRoutes
