import Clients from './views/clients'
import ClientsItem from './views/clients-item'
import Container from './containers/clients-container'

import type { CustomRoute } from '@/types'

const clientsRoutes: CustomRoute = {
  id: 'clients',
  title: 'clients',
  path: 'clients',
  element: <Container of={<Clients />} />,
  children: [
    {
      id: 'clients-item',
      title: 'clients-item',
      path: ':id',
      element: <ClientsItem />,
    },
  ],
}

export default clientsRoutes
