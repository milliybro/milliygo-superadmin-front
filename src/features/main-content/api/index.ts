import { ListResponse } from '@/types'
import { IDestinations } from '../types'
import requestAuth from '@/utils/authRequest'
import request from '@/utils/axios'
import { IUsers } from '@/features/accommodation-facilities/types'

export async function getRecreationList(
  params?: any,
): Promise<ListResponse<IDestinations[]>> {
  const res: ListResponse<IDestinations[]> = await request({
    url: '/site_settings/content_main_page/',
    method: 'get',
    params,
  })

  return res
}

export async function getUsersList(
  params?: any,
): Promise<ListResponse<IUsers[]>> {
  const res: ListResponse<IUsers[]> = await requestAuth({
    url: '/account/super-admin/users/',
    method: 'get',
    params,
  })

  return res
}
export async function createRecreation(data?: any): Promise<IDestinations> {
  const res: IDestinations = await request({
    url: `/site_settings/content_main_page/ `,
    method: 'post',
    data,
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

export async function updateRecreation(params: {
  id: string
  queryParams: any
}): Promise<IDestinations> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: IDestinations = await request({
    url: `/site_settings/content_main_page/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function getUser(params?: any): Promise<IUsers> {
  const res: IUsers = await requestAuth({
    url: `/account/super-admin/users/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function updateUser(params: {
  id: string
  queryParams: any
}): Promise<IUsers> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: IUsers = await requestAuth({
    url: `/account/super-admin/users/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}

export async function getRecreation(params?: any): Promise<IDestinations> {
  const res: IDestinations = await request({
    url: `/site_settings/content_main_page/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

// export async function getUserRoles(
//   params?: any,
// ): Promise<ListResponse<IDestinations[]>> {
//   const res: ListResponse<IDestinations[]> = await requestAuth({
//     url: '/account/user-roles/',
//     method: 'get',
//     params,
//   })

//   return res
// }

export async function createUser(data?: any): Promise<any> {
  const res: IUsers = await requestAuth({
    url: `/account/super-admin/users/`,
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

// export async function deleteUser(id: string | number): Promise<any> {
//   const res: any = await requestAuth({
//     url: `/account/super-admin/users/${id}/`,
//     method: 'delete',
//   })

//   return res
// }
