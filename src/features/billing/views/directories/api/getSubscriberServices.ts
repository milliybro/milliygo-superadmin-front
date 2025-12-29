import { ISubscriberServices } from '../types'
import { ListResponseBilling } from '@/features/billing/types/response.billing'
import billingRequest from '@/features/billing/billingRequest'

export async function getSubscriberServicesList(
  params?: any,
): Promise<ListResponseBilling<ISubscriberServices[]>> {
  const res: ListResponseBilling<ISubscriberServices[]> = await billingRequest({
    url: '/subscription-tariffs',
    method: 'get',
    params,
  })

  return res
}

export async function getSubscriberService(params?: any): Promise<any> {
  const res: any = await billingRequest({
    url: `/subscription-tariffs/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateSubscriberService(params: {
  id: string
  queryParams: any
}): Promise<any> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: any = await billingRequest({
    url: `/subscription-tariffs/${id}`,
    method: 'put',
    data: queryParams,
  })

  return res
}

export async function createSubscriberService(data?: any): Promise<any> {
  const res: any = await billingRequest({
    url: '/subscription-tariffs',
    method: 'post',
    data,
  })

  return res
}

export async function deleteSubscriberService(id: string | number): Promise<any> {
  const res: any = await billingRequest({
    url: `/subscription-tariffs/${id}`,
    method: 'delete',
  })

  return res
}
