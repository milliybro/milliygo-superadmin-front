import { ListResponse } from '@/types'
import { IRegions, ITourist, ITouristCount, ITouristsTable } from '../types'
import requestSuper from '@/utils/superRequest'

export async function getTouristsList(
  params?: any,
): Promise<ListResponse<ITouristsTable[]>> {
  const res: ListResponse<ITouristsTable[]> = await requestSuper({
    url: '/account/users/tourists/',
    method: 'get',
    params,
  })

  return res
}

export async function getTouristsCount(): Promise<ITouristCount> {
  const res: ITouristCount = await requestSuper({
    url: '/account/users/tourists/count/',
    method: 'get',
  })

  return res
}

export async function getRegions(
  params?: any,
): Promise<ListResponse<IRegions[]>> {
  const res: ListResponse<IRegions[]> = await requestSuper({
    url: '/regions/regions/',
    method: 'get',
    params,
  })

  return res
}

export async function getDistricts(
  params?: any,
): Promise<ListResponse<IRegions[]>> {
  const res: ListResponse<IRegions[]> = await requestSuper({
    url: '/regions/districts/',
    method: 'get',
    params,
  })

  return res
}

export async function getTourist(params?: any): Promise<ITourist> {
  const res: ITourist = await requestSuper({
    url: `/account/users/${params.id}/detail/`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}
