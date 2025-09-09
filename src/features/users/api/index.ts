import { ListResponse } from '@/types'
import { ISubmittedUserResponse, IUsers } from '../types'
import requestAuth from '@/utils/authRequest'
import requestSuper from '@/utils/superRequest'

export async function getUsersList(
  params?: any,
): Promise<ListResponse<IUsers[]>> {
  const res: ListResponse<IUsers[]> = await requestAuth({
    url: '/account/users/',
    method: 'get',
    params,
  })

  return res
}

export async function getUserRoles(
  params?: any,
): Promise<ListResponse<IUsers[]>> {
  const res: ListResponse<IUsers[]> = await requestAuth({
    url: '/account/user-roles/',
    method: 'get',
    params,
  })

  return res
}

export async function getUser(params?: any): Promise<IUsers> {
  const res: IUsers = await requestAuth({
    url: `/account/users/${params.id}/`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateUser(params: {
  id: string
  queryParams: any
}): Promise<ISubmittedUserResponse> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: ISubmittedUserResponse = await requestAuth({
    url: `/account/users/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function createUser(data?: any): Promise<ISubmittedUserResponse> {
  const res: ISubmittedUserResponse = await requestAuth({
    url: '/account/users/',
    method: 'post',
    data,
  })

  return res
}

export async function deleteUser(id: string | number): Promise<any> {
  const res: any = await requestAuth({
    url: `/account/users/${id}/`,
    method: 'delete',
  })

  return res
}

export async function updatePassword(id: number): Promise<{ new_password: string }> {
  return await requestSuper({
    url: `/account/users/${id}/password/update/`,
    method: 'patch',
  })
}
