import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { ITourAgents } from '../types'
import requestSuper from '@/utils/superRequest'

export async function getTourAgentsList(
  params?: any,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await requestSuper({
    url: '/tour-agents/',
    method: 'get',
    params,
  })

  return res
}

export async function getHotels(
  params?: any,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await request({
    url: '/superadmin/placements/',
    method: 'get',
    params,
  })

  return res
}

export async function getHotelDetail(
  params?: any,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await request({
    url: `/superadmin/placements/detail/`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelGuests(
  params?: any,
  id?: number,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await request({
    url: `/superadmin/placements/${id}/guests/`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelManagementGuests(
  params?: any,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await request({
    url: `/superadmin/placements/guests/`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelDetailReview(
  params?: any,
  id?: number,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await request({
    url: `/placement-reviews/placement_review/?placement=${id}`,
    method: 'get',
    params,
  })

  return res
}

export async function getHotelDetailRooms(params?: any): Promise<ITourAgents> {
  const res: ITourAgents = await request({
    url: `/superadmin/placements/rooms/`,
    method: 'get',
    params,
  })

  return res
}
