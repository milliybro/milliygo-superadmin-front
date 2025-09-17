import { IUsers } from '@/features/users/types'
import { ListResponse } from '@/types'
// import { ListResponse } from "@/types"

import request from '@/utils/axios'
import { ICountry } from '../types'
import requestSuper from '@/utils/superRequest'

export async function getUser(params?: any): Promise<IUsers> {
  const res: IUsers = await requestSuper({
    url: `/account/super-admin/users/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function getClientBooking(params?: any): Promise<IUsers> {
  const res: IUsers = await request({
    url: `/superadmin/bookings/list/`,
    method: 'get',
    params: { ...params },
  })

  return res
}

export async function getClientReview(params?: any): Promise<IUsers> {
  const res: IUsers = await request({
    url: `/placement-reviews/placement_review/?user=${params.id}/`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

export async function getCountries(
  params?: any,
): Promise<ListResponse<ICountry[]>> {
  const res: ListResponse<ICountry[]> = await requestSuper({
    url: '/regions/countries/',
    method: 'get',
    params,
  })

  return res
}
