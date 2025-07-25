import { ListResponse } from '@/types'
import requestAuth from '@/utils/authRequest'
import { IRegion, IRegionMapPoint, ITopDestination } from '../types'

export async function getRegions(): Promise<ListResponse<IRegion[]>> {
  const res: ListResponse<IRegion[]> = await requestAuth({
    url: '/regions/regions',
    method: 'get',
  })
  return res
}

export async function getRegion(id: number): Promise<IRegion> {
  const res: IRegion = await requestAuth({
    url: `/regions/regions/${id}`,
    method: 'get',
  })
  return res
}

export async function getTopDestinations(
  params?: any,
): Promise<ListResponse<ITopDestination[]>> {
  const res: ListResponse<ITopDestination[]> = await requestAuth({
    url: '/site-content/top_destinations',
    method: 'get',
    params,
  })
  return res
}

export async function createMapPoint(data: {
  region: number
  top_destination: number
  is_active: boolean
  front_data: object
}) {
  return await requestAuth({
    url: '/site-content/uzbekistans_map',
    method: 'post',
    data,
  })
}

export async function getRegionMapPoints(params: {
  region_id: number
  page?: number
  page_size?: number
}): Promise<ListResponse<IRegionMapPoint[]>> {
  return await requestAuth({
    url: `/site-content/uzbekistans_map/filter-with-region/`,
    method: 'get',
    params,
  })
}

export async function updateRegionMapPoint(data: {
  id: number
  region: number
  top_destination?: number
  is_active?: boolean
  front_data?: object
}) {
  const { id, ...rest } = data
  return await requestAuth({
    url: `/site-content/uzbekistans_map/${id}/`,
    method: 'patch',
    data: rest,
  })
}

export async function deleteRegionMapPoint(id: number) {
  return await requestAuth({
    url: `/site-content/uzbekistans_map/${id}`,
    method: 'delete',
  })
}
