import { ListResponse } from '@/types'
import requestSuper from '@/utils/superRequest'
import { IPaymentProviders } from '../types'

export async function getPaymentProvidersList(
  params?: any,
): Promise<ListResponse<IPaymentProviders[]>> {
  const res: ListResponse<IPaymentProviders[]> = await requestSuper({
    url: '/tour-agents/',
    method: 'get',
    params,
  })

  return res
}

export async function getPaymentProvider(params?: any): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${params.id}/`,
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
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function createPaymentProvider(data?: any): Promise<any> {
  const res: any = await requestSuper({
    url: '/account/users/',
    method: 'post',
    data,
  })

  return res
}

export async function deletePaymentProvider(id: string | number): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'delete',
  })

  return res
}
