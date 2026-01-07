import type { CustomRoute } from '@/types'
import Billing from './views/billing'
import Reports from './views/reports'
import Directories from './views/directories/directories'
import Currencies from './views/directories/views/currencies/currencies'
import PaymentProviders from './views/directories/views/payment-providers/payment-providers'
import TaxRates from './views/directories/views/tax-rates/tax-rates'
import TouristTaxes from './views/directories/views/tourist-taxes/tourist-taxes'
import SubscriberServices from './views/directories/views/subscriber-services/subscriber-services'
import PaymentsTypes from './views/directories/views/payments-types/payments-types'
import { Navigate } from 'react-router'
import OperatorCommissions from './views/directories/views/operator-commissions/operator-commissions'
import CurrencyTypes from './views/directories/views/currency-types/currency-types'

const billingRoutes: CustomRoute = {
  id: 'billing',
  path: 'billing',
  children: [
    {
      id: 'billing-reports',
      title: 'billing-reports',
      path: 'reports',
      element: <Reports />,
    },
    {
      id: 'billing-directories',
      title: 'billing-directories',
      path: 'directories',
      element: <Directories />,
      children: [
        { path: 'currencies', element: <Currencies /> },
        { path: 'currency-types', element: <CurrencyTypes /> },
        { path: 'payment-providers', element: <PaymentProviders /> },
        { path: 'tax-rates', element: <TaxRates /> },
        { path: 'tourist-taxes', element: <TouristTaxes /> },
        { path: 'subscriber-services', element: <SubscriberServices /> },
        { path: 'payments-types', element: <PaymentsTypes /> },
        { path: 'operator-commissions', element: <OperatorCommissions /> },
        { path: '', element: <Navigate to="currencies" replace /> },
      ],
    },
    {
      id: 'billing-transactions',
      title: 'billing-transactions',
      path: 'transactions',
      element: <Billing />,
    },
    {
      id: 'billing-integration',
      title: 'billing-integration',
      path: 'integration',
      element: <Billing />,
    },
    {
      id: 'billing-registers',
      title: 'billing-registers',
      path: 'registers',
      element: <Billing />,
    },
    {
      id: 'billing-tourist-transactions',
      title: 'billing-tourist-transactions',
      path: 'tourist-transactions',
      element: <Billing />,
    },
  ],
}

export default billingRoutes
