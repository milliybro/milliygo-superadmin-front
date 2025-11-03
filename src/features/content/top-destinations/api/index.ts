import request from '@/utils/axios'
import { ITopDestination } from '../../types'

export async function deleteTopDestination(id: number | string) {
  return await request({
    url: `/site-content/top_destinations/${id}/`,
    method: 'DELETE',
  })
}

export async function createTopDestination(data: FormData) {
  return await request({
    url: '/site-content/top_destinations/',
    method: 'post',
    data,
  })
}

export async function editTopDestination(id: number | string, data: FormData) {
  return await request({
    url: `/site-content/top_destinations/${id}/`,
    method: 'put',
    data,
  })
}

export async function editTopDestinationPartial(
  id: number | string,
  data: FormData,
) {
  return await request({
    url: `/site-content/top_destinations/${id}/`,
    method: 'patch',
    data,
  })
}

export async function getTopDestination(
  id: string | number,
): Promise<ITopDestination> {
  return await request({
    url: `/site-content/top_destinations/${id}/`,
    method: 'get',
  })
}

export async function deleteTopDestinationImage(
  id: number,
): Promise<ITopDestination> {
  return await request({
    url: `/site-content/top_destinations/top_destinations_image_delete/?image_id=${id}`,
    method: 'delete',
  })
}
