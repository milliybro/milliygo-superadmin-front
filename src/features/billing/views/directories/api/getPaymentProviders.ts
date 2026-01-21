import { ListResponseBilling } from '@/features/billing/types/response.billing'
import { IPaymentProviders } from '../types'
import billingRequest from '@/features/billing/billingRequest'

export async function getPaymentProvidersList(
  params?: any,
): Promise<ListResponseBilling<IPaymentProviders>> {
  const res: ListResponseBilling<IPaymentProviders> = await billingRequest({
    url: '/payment-providers',
    method: 'get',
    params,
  })

  return res
}

export async function getPaymentProvider(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/payment-providers/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updatePaymentProvider(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/payment-providers/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createPaymentProvider(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/payment-providers',
    method: 'post',
    data,
  })

  return res
}

export async function deletePaymentProvider(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/payment-providers/${id}`,
    method: 'delete',
  })

  return res
}
