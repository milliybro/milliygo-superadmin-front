import {  ICurrencyTypes } from '../types'
import billingRequest from '@/features/billing/billingRequest'
import { ListResponseBilling } from '@/features/billing/types/response.billing'

export async function getCurrencyTypesList(
  params?: any,
): Promise<ListResponseBilling<ICurrencyTypes>> {
  const res: ListResponseBilling<ICurrencyTypes> = await billingRequest({
    url: '/currency-types',
    method: 'get',
    params,
  })

  return res
}

export async function getCurrencyType(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/currency-types/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateCurrencyType(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/currency-types/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createCurrencyType(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/currency-types',
    method: 'post',
    data,
  })

  return res
}

export async function deleteCurrencyType(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/currency-types/${id}`,
    method: 'delete',
  })

  return res
}
