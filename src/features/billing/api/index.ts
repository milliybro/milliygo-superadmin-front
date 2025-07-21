import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IHotelDetail, IHotelsItemReview, IHotelsRoom } from '../types'
import { IHotelsTable } from '@/features/hotels/types'

export async function getTenantsList(
  params?: any,
): Promise<ListResponse<IHotelsTable[]>> {
  const res: ListResponse<IHotelsTable[]> = await request({
    url: '/superadmin/placement-integrations/',
    method: 'get',
    params,
  })

  return res
}

export async function createTenant(data?: any): Promise<IHotelsTable> {
  const res: IHotelsTable = await request({
    url: `/superadmin/placement-integrations/`,
    method: 'post',
    data,
  })

  return res
}

export async function updateTenant(params: {
  id: string
  queryParams: any
}): Promise<IHotelsTable> {
  const { id, queryParams } = params
  if (!id) {
    throw new Error('User ID is required for updating a user.')
  }
  const res: IHotelsTable = await request({
    url: `/superadmin/placement-integrations/${id}/`,
    method: 'patch',
    data: queryParams,
  })

  return res
}
export async function getTenant(params?: any): Promise<IHotelsTable> {
  const res: IHotelsTable = await request({
    url: `/superadmin/placement-integrations/${params.id}`,
    method: 'get',
    params: params.queryParams,
  })

  return res
}

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
