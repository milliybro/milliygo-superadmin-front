import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IDiscover } from '../types'

export async function getDiscoveries(
  params?: any,
): Promise<ListResponse<IDiscover[]>> {
  return await request({
    url: '/site-content/discover',
    method: 'GET',
    params,
  })
}
