import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IDiscover } from '../types'

export async function getDiscoveries(
  params?: any,
): Promise<ListResponse<IDiscover[]>> {
  return await request({
    url: '/site-content/discover/',
    method: 'GET',
    params,
  })
}

export async function getDiscovery(
  slug: string,
): Promise<IDiscover & { content: string | null }> {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'GET',
  })
}

export async function createDiscovery(data: FormData) {
  return await request({
    url: '/site-content/discover/',
    method: 'POST',
    data,
  })
}

export async function editDiscovery(slug: string, data: FormData) {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'PATCH',
    data,
  })
}

export async function deleteDiscovery(slug: string) {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'DELETE',
  })
}
