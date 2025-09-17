import requestSuper from '@/utils/authRequest'
import { IAccessRoleTable } from '../types'

export async function getAccessRoles(params?: any): Promise<IAccessRoleTable> {
  const res: IAccessRoleTable = await requestSuper({
    url: `/account/user-roles/`,
    method: 'get',
    params: { ...params },
  })

  return res
}

export async function createRole(data?: any): Promise<IAccessRoleTable> {
  const res: IAccessRoleTable = await requestSuper({
    url: `/account/user-roles/`,
    method: 'post',
    data,
  })

  return res
}

export async function updateRole(params: {
  id: string
  queryParams: any
}): Promise<IAccessRoleTable> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: IAccessRoleTable = await requestSuper({
    url: `/account/user-roles/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function getRole(params?: any): Promise<IAccessRoleTable> {
  const res: IAccessRoleTable = await requestSuper({
    url: `/account/user-roles/${params.id}/`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}
