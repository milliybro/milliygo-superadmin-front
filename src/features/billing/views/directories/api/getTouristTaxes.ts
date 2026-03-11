import billingRequest from '@/features/billing/billingRequest'
import { ITouristTaxes } from '../types'
import { ListResponseBilling } from '@/features/billing/types/response.billing'

export async function getTouristTaxesList(
  params?: any,
): Promise<ListResponseBilling<ITouristTaxes[]>> {
  const res: ListResponseBilling<ITouristTaxes[]> = await billingRequest({
    url: '/tourist-taxes',
    method: 'get',
    params,
  })

  return res
}

export async function getTouristTax(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/tourist-taxes/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateTouristTax(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/tourist-taxes/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createTouristTax(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/tourist-taxes',
    method: 'post',
    data,
  })

  return res
}

export async function deleteTouristTax(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/tourist-taxes/${id}`,
    method: 'delete',
  })

  return res
}
