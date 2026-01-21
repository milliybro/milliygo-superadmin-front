import type { CustomRoute } from '@/types'
import { Navigate } from 'react-router'
import { lazy } from 'react'
import Billing from './views/billing'
import Reports from './views/reports'
import Directories from './views/directories/directories'
import { BillingPath } from './views/directories/paths'
const Currencies = lazy(() => import('./views/directories/views/currencies/currencies'))
const CurrencyTypes = lazy(() => import('./views/directories/views/currency-types/currency-types'))
const PaymentProviders = lazy(() => import('./views/directories/views/payment-providers/payment-providers'))
const TouristTaxes = lazy(() => import('./views/directories/views/tourist-taxes/tourist-taxes'))
const SubscriberServices = lazy(() => import('./views/directories/views/subscriber-services/subscriber-services'))
const OperatorCommissions = lazy(() => import('./views/directories/views/operator-commissions/operator-commissions'))
const ProviderContracts = lazy(()=> import('./views/directories/views/provider-contracts/provider-contracts')) 

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
        { path: BillingPath.currencies, element: <Currencies /> },
        { path: BillingPath['currency-types'], element: <CurrencyTypes /> },
        { path: BillingPath['payment-providers'], element: <PaymentProviders /> },
        { path: BillingPath['tourist-taxes'], element: <TouristTaxes /> },
        { path: BillingPath['subscriber-services'], element: <SubscriberServices /> },
        { path: BillingPath['operator-commissions'], element: <OperatorCommissions /> },
        { path: BillingPath['provider-contracts'], element: <ProviderContracts /> },
        { path: '', element: <Navigate to={BillingPath.currencies} replace /> },
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
