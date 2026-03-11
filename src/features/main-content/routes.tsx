import MainContent from './views'

import type { CustomRoute } from '@/types'

const mainContentRoutes: CustomRoute = {
  id: 'main-content',
  title: 'main-content',
  path: 'main-content',
  element: <MainContent />,
}

export default mainContentRoutes
