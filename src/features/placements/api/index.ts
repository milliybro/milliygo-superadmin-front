import { ListResponse } from '@/types'
import request from '@/utils/axios'
import {
  IHotelDetail,
  IHotelsItemReview,
  IHotelsRoom,
  IHotelsTable,
  IPlacement,
  IPlacementType,
} from '../types'

export async function getAllPlacements(
  params?: any,
): Promise<ListResponse<IPlacement[]>> {
  const res: ListResponse<IPlacement[]> = await request({
    url: '/placements/',
    method: 'get',
    params,
  })

  return res
}

export async function getPlacementTypes(params?: any) {
  const res: IPlacementType[] = await request({
    url: '/placements/types/',
    method: 'get',
    params,
  })

  return res
}

export async function getHotelsList(
  params?: any,
): Promise<ListResponse<IHotelsTable[]>> {
  const res: ListResponse<IHotelsTable[]> = await request({
    url: '/superadmin/placements/list/',
    method: 'get',
    params,
  })

  return res
}

export async function getHotels(
  params?: any,
): Promise<ListResponse<IHotelsTable[]>> {
  const res: ListResponse<IHotelsTable[]> = await request({
    url: '/superadmin/placements/',
    method: 'get',
    params,
  })

  return res
}

export async function getHotelDetail(
  params?: any,
): Promise<ListResponse<IHotelDetail[]>> {
  const res: ListResponse<IHotelDetail[]> = await request({
    url: `/superadmin/placements/detail/`,
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

export async function getHotelManagementGuests(
  params?: any,
): Promise<ListResponse<IHotelDetail[]>> {
  const res: ListResponse<IHotelDetail[]> = await request({
    url: `/superadmin/placements/guests/`,
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

export async function getHotelDetailRooms(params?: any): Promise<IHotelsRoom> {
  const res: IHotelsRoom = await request({
    url: `/superadmin/placements/rooms/`,
    method: 'get',
    params,
  })

  return res
}
