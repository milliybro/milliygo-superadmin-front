import type { CustomRoute } from '@/types'
import ContractsPage from './views/contact'

const myContractRoutes: CustomRoute = {
  id: 'my-contracts',
  title: 'my-contracts',
  path: 'my-contracts',
  element: <ContractsPage />,
}

export default myContractRoutes
