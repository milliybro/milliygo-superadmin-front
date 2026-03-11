import type { CustomRoute } from '@/types'
import Dashboard from './views/dashboard'

const dashboardRoutes: CustomRoute = {
  id: 'dashboard',
  title: 'dashboard',
  path: '/',
  element: <Dashboard />,
}

export default dashboardRoutes
