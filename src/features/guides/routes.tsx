import type { CustomRoute } from '@/types'
import Guides from './views/guides'

const guidesRoutes: CustomRoute = {
  id: 'guides',
  title: 'guides',
  path: 'guides',
  element: <Guides />,
}

export default guidesRoutes
