import { ICurrencies } from '../types'
import billingRequest from '@/features/billing/billingRequest'
import { ListResponseBilling } from '@/features/billing/types/response.billing'

export async function getCurrenciesList(
  params?: any,
): Promise<ListResponseBilling<ICurrencies[]>> {
  const res: ListResponseBilling<ICurrencies[]> = await billingRequest({
    url: '/currencies',
    method: 'get',
    params,
  })

  return res
}

export async function getCurrency(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/currencies/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateCurrency(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/currencies/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createCurrency(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/currencies',
    method: 'post',
    data,
  })
  return res
}

export async function deleteCurrency(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/currencies/${id}`,
    method: 'delete',
  })

  return res
}
