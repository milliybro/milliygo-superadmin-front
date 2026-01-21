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
  lang: string = 'en',
): Promise<IDiscover & { content: string | null }> {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'GET',
    headers: {
      'Accept-Language': lang,
    },
  })
}

export async function createDiscovery(data: FormData) {
  return await request({
    url: '/site-content/discover/',
    method: 'POST',
    data,
    headers: {
      'Accept-Language': 'en',
    },
  })
}

export async function editDiscovery(
  slug: string,
  data: FormData,
  language: string,
) {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'PUT',
    data,
    headers: {
      'Accept-Language': language,
    },
  })
}

export async function patchDiscover(
  slug: string,
  data: { status: boolean },
  language: string,
) {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'PATCH',
    data,
    headers: {
      'Accept-Language': language,
    },
  })
}

export async function deleteDiscovery(slug: string) {
  return await request({
    url: `/site-content/discover/${slug}/`,
    method: 'DELETE',
  })
}
