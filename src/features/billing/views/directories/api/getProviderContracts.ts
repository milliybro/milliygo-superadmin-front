import { ListResponseBilling } from '@/features/billing/types/response.billing'
import { IProviderContracts } from '../types'
import billingRequest from '@/features/billing/billingRequest'

export async function getProviderContarctsList(
  params?: any,
): Promise<ListResponseBilling<IProviderContracts[]>> {
  const res: ListResponseBilling<IProviderContracts[]> = await billingRequest({
    url: '/payment-provider-contracts',
    method: 'get',
    params,
  })

  return res
}

export async function getProviderContarcts(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/payment-provider-contracts/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateProviderContarcts(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/payment-provider-contracts/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createProviderContarcts(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/payment-provider-contracts',
    method: 'post',
    data,
  })

  return res
}

export async function deleteProviderContarcts(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/payment-provider-contracts/${id}`,
    method: 'delete',
  })

  return res
}
