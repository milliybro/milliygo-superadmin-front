import { ListResponse, ListResponseShort } from '@/types'
import {
  IEvent,
  IExpertAdvice,
  IInstagramContent,
  IPatchEventData,
  IPatchExpertAdviceData,
  IPatchInstagramContentData,
  IRegion,
  IRegionMapPoint,
  ITopDestination,
} from '../types'
import requestSuper from '@/utils/superRequest'

export async function getRegions(
  params?: any,
): Promise<ListResponse<IRegion[]>> {
  const res: ListResponse<IRegion[]> = await requestSuper({
    url: '/regions/regions',
    method: 'get',
    params,
  })
  return res
}

export async function getRegion(id: number): Promise<IRegion> {
  const res: IRegion = await requestSuper({
    url: `/regions/regions/${id}`,
    method: 'get',
  })
  return res
}

export async function getTopDestinations(
  params?: any,
): Promise<ListResponse<ITopDestination[]>> {
  const res: ListResponse<ITopDestination[]> = await requestSuper({
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
  return await requestSuper({
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
  return await requestSuper({
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
  return await requestSuper({
    url: `/site-content/uzbekistans_map/${id}/`,
    method: 'patch',
    data: rest,
  })
}

export async function deleteRegionMapPoint(id: number) {
  return await requestSuper({
    url: `/site-content/uzbekistans_map/${id}`,
    method: 'delete',
  })
}

export async function getExpertAdvices(params?: {
  page?: number | string
  page_size?: number
  ordering?: string
}): Promise<ListResponseShort<IExpertAdvice>> {
  return await requestSuper({
    url: '/site-content/expert_advice/',
    method: 'get',
    params,
  })
}

export async function deleteExpertAdvice(slug: string) {
  return await requestSuper({
    url: `/site-content/expert_advice/${slug}/`,
    method: 'delete',
  })
}

export async function createExpertAdvice(data: IPatchExpertAdviceData) {
  return await requestSuper({
    url: `/site-content/expert_advice/`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function patchExpertAdvice(
  slug: string,
  data: IPatchExpertAdviceData,
) {
  return await requestSuper({
    url: `/site-content/expert_advice/${slug}/`,
    method: 'patch',
    data,
  })
}

export async function getEvents(params?: {
  page?: number | string
  page_size?: number
  ordering?: string
}): Promise<ListResponseShort<IEvent>> {
  return await requestSuper({
    url: '/site-content/events/',
    method: 'get',
    params,
  })
}

export async function deleteEvent(slug: string) {
  return await requestSuper({
    url: `/site-content/events/${slug}/`,
    method: 'delete',
  })
}

export async function createEvent(data: IPatchExpertAdviceData) {
  return await requestSuper({
    url: `/site-content/events/`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function patchEvent(slug: string, data: IPatchEventData) {
  return await requestSuper({
    url: `/site-content/events/${slug}/`,
    method: 'patch',
    data,
  })
}

export async function getInstagramContents(params?: {
  page?: number
  page_size?: number
  ordering?: string
}): Promise<ListResponseShort<IInstagramContent>> {
  return await requestSuper({
    url: '/site-content/instagram_contents/',
    method: 'get',
    params,
  })
}

export async function deleteInstagramContent(id: number) {
  return await requestSuper({
    url: `/site-content/instagram_contents/${id}/`,
    method: 'delete',
  })
}

export async function createInstagramContent(data: IPatchExpertAdviceData) {
  return await requestSuper({
    url: `/site-content/instagram_contents/`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function patchInstagramContent(
  id: number,
  data: IPatchInstagramContentData,
) {
  return await requestSuper({
    url: `/site-content/instagram_contents/${id}/`,
    method: 'patch',
    data,
  })
}
