import ActionHistory from './views/action-history'

import type { CustomRoute } from '@/types'

const actionHistoryRoutes: CustomRoute = {
  id: 'actionHistory',
  title: 'actionHistory',
  path: 'action-history',
  element: <ActionHistory />,
}

export default actionHistoryRoutes
