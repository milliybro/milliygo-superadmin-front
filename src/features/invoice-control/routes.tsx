import type { CustomRoute } from '@/types'
import InvoiceControlPage from './views/invoice'

const invoiceControlRoutes: CustomRoute = {
  id: 'invoice-control',
  title: 'invoice-control',
  path: 'invoice-control',
  element: <InvoiceControlPage />,
}

export default invoiceControlRoutes
