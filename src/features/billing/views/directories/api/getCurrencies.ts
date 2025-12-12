import { ListResponse } from '@/types'
import requestSuper from '@/utils/superRequest'
import { ICurrencies } from '../types'
import billingRequest from '@/features/billing/billingRequest'

export async function getCurrenciesList(
  params?: any,
): Promise<ListResponse<ICurrencies[]>> {
  const res: ListResponse<ICurrencies[]> = await billingRequest({
    url: '/currencies',
    method: 'get',
    params,
  })

  return res
}

export async function getCurrency(params?: any): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${params.id}/`,
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
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function createCurrency(data?: any): Promise<any> {
  const res: any = await requestSuper({
    url: '/account/users/',
    method: 'post',
    data,
  })

  return res
}

export async function deleteCurrency(id: string | number): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'delete',
  })

  return res
}
