import type { CustomRoute } from '@/types'
import MyLicensesPage from './views'

const myLicensesRoutes: CustomRoute = {
  id: 'my-licenses',
  title: 'my-licenses',
  path: 'my-licenses',
  element: <MyLicensesPage />,
}

export default myLicensesRoutes
