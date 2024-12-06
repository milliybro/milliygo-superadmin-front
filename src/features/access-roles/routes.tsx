import Container from './containers/container'
import AccessRole from './views/access-role'

import type { CustomRoute } from '@/types'
import AccessRoleAction from './views/access-role-action'

const accessRoleRoutes: CustomRoute = {
  id: 'accessRole',
  title: 'accessRole',
  path: 'access-role',
  element: <Container of={<AccessRole />} />,
  children: [
    {
      id: 'accessRoleAction',
      title: 'accessRoleAction',
      path: ':id',
      element: <AccessRoleAction />,
    },
  ],
}

export default accessRoleRoutes
