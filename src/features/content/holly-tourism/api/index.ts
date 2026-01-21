import request from '@/utils/axios'
import { IHollyTourism } from '../types'
import { ListResponse } from '@/types'
import requestSuper from '@/utils/superRequest'

export async function getHollyTourism(
  id: string | number,
  lang: string = 'en',
): Promise<IHollyTourism> {
  return await request({
    url: `/site-content/pilgrimage/tourism/${id}/`,
    method: 'get',
    headers: {
      'Accept-Language': lang,
    },
  })
}

export async function editHollyTourism(
  id: number | string,
  data: FormData,
  language: string,
) {
  return await request({
    url: `/site-content/pilgrimage/tourism/${id}/`,
    method: 'put',
    data,
    headers: {
      'Accept-Language': language,
    },
  })
}

export async function getHollyTourismList(
  params?: any,
): Promise<ListResponse<IHollyTourism[]>> {
  const res: ListResponse<IHollyTourism[]> = await requestSuper({
    url: '/site-content/pilgrimage/tourism/',
    method: 'get',
    params,
  })
  return res
}

export async function createHollyTourism(data: FormData) {
  return await request({
    url: '/site-content/pilgrimage/tourism/',
    method: 'post',
    data,
    headers: {
      'Accept-Language': 'en',
    },
  })
}

export async function deleteHollyTourismImage(
  id: number,
): Promise<IHollyTourism> {
  return await request({
    url: `/site-content/pilgrimage/tourism/${id}/image/delete/`,
    method: 'delete',
  })
}

export async function deleteHollyTourism(id: number) {
  return await requestSuper({
    url: `/site-content/pilgrimage/tourism/${id}/`,
    method: 'delete',
  })
}
