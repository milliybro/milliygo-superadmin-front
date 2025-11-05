import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IGuide, IHotelDetail, IHotelsItemReview, IHotelsRoom } from '../types'
import requestSuper from '@/utils/superRequest'

export async function getHotelDetail(
  params?: any,
  id?: number,
): Promise<ListResponse<IHotelDetail[]>> {
  const res: ListResponse<IHotelDetail[]> = await request({
    url: `/placements/placements/detail_info/${id}/`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelGuests(
  params?: any,
  id?: number,
): Promise<ListResponse<IHotelDetail[]>> {
  const res: ListResponse<IHotelDetail[]> = await request({
    url: `/superadmin/placements/${id}/guests/`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelDetailReview(
  params?: any,
  id?: number,
): Promise<ListResponse<IHotelsItemReview[]>> {
  const res: ListResponse<IHotelsItemReview[]> = await request({
    url: `/placement-reviews/placement_review/?placement=${id}`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelDetailRooms(
  params?: any,
  id?: number,
): Promise<ListResponse<IHotelsRoom[]>> {
  const res: ListResponse<IHotelsRoom[]> = await request({
    url: `/placements/rooms/?placement__id=${id}`,
    method: 'get',
    params,
  })

  return res
}

export async function getGuides(params?: any): Promise<ListResponse<IGuide[]>> {
  const res: ListResponse<any[]> = await requestSuper({
    url: '/guides/list/',
    method: 'get',
    params,
  })

  return res
}

export async function updateGuide(id: number, data: any) {
  return await requestSuper({
    url: `/guides/${id}/confirm-or-reject-guide/`,
    method: 'patch',
    data,
  })
}

export async function getGuide(id: number, params?: any): Promise<any> {
  const res: any = await request({
    url: `/guides/${id}/detail/`,
    method: 'get',
    params,
  })

  return res
}
