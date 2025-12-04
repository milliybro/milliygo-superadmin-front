import { ListResponse } from '@/types'
import requestSuper from '@/utils/superRequest'
import { ISubscriberServices } from '../types'

export async function getSubscriberServicesList(
  params?: any,
): Promise<ListResponse<ISubscriberServices[]>> {
  const res: ListResponse<ISubscriberServices[]> = await requestSuper({
    url: '/tour-agents/',
    method: 'get',
    params,
  })

  return res
}

export async function getSubscriberService(params?: any): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${params.id}/`,
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
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function createSubscriberService(data?: any): Promise<any> {
  const res: any = await requestSuper({
    url: '/account/users/',
    method: 'post',
    data,
  })

  return res
}

export async function deleteSubscriberService(id: string | number): Promise<any> {
  const res: any = await requestSuper({
    url: `/account/users/${id}/`,
    method: 'delete',
  })

  return res
}
