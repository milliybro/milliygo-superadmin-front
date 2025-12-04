import { ListResponse } from '@/types'
import requestSuper from '@/utils/superRequest'
import { ITaxRates } from '../types'

export async function getTaxRatesList(
  params?: any,
): Promise<ListResponse<ITaxRates[]>> {
  const res: ListResponse<ITaxRates[]> = await requestSuper({
    url: '/tour-agents/',
    method: 'get',
    params,
  })

  return res
}

export async function getTaxRate(params?: any): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${params.id}/`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateTaxRate(params: {
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

export async function createTaxRate(data?: any): Promise<any> {
  const res: any = await requestSuper({
    url: '/account/users/',
    method: 'post',
    data,
  })

  return res
}

export async function deleteTaxRate(id: string | number): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'delete',
  })

  return res
}
