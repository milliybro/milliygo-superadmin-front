import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IHotelDetail, IHotelsItemReview, IHotelsRoom } from '../types'




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
