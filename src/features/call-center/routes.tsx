import CallCenter from './views/call-center'

import type { CustomRoute } from '@/types'

const callCenterRoutes: CustomRoute = {
  id: 'callCenter',
  title: 'callCenter',
  path: 'call-center',
  element: <CallCenter />,
}

export default callCenterRoutes
