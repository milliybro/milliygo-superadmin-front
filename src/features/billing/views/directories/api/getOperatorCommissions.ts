import {  IOperatorCommissions } from '../types'
import billingRequest from '@/features/billing/billingRequest'
import { ListResponseBilling } from '@/features/billing/types/response.billing'

export async function getOperatorCommissionsList(
  params?: any,
): Promise<ListResponseBilling<IOperatorCommissions[]>> {
  const res: ListResponseBilling<IOperatorCommissions[]> = await billingRequest({
    url: '/operator-commissions',
    method: 'get',
    params,
  })

  return res
}

export async function getOperatorCommission(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/operator-commissions/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateOperatorCommission(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/operator-commissions/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createOperatorCommission(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/operator-commissions',
    method: 'post',
    data,
  })
  return res
}

export async function deleteOperatorCommission(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/operator-commissions/${id}`,
    method: 'delete',
  })

  return res
}
