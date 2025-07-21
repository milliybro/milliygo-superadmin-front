import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IRegion, ITopDestination } from '../types'

export async function getRegions(): Promise<ListResponse<IRegion[]>> {
  const res: ListResponse<IRegion[]> = await request({
    url: '/regions/regions',
    method: 'get',
  })
  return res
}

export async function getTopDestinations(
  params?: any,
): Promise<ListResponse<ITopDestination[]>> {
  const res: ListResponse<ITopDestination[]> = await request({
    url: '/site_settings/top_destinations',
    method: 'get',
    params,
  })
  return res
}
