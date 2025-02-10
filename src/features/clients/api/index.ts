import { IUsers } from "@/features/users/types"
import { ListResponse } from "@/types"
import requestAuth from "@/utils/authRequest"
import request from "@/utils/axios"


export async function getUser(
    params?: any,
  ): Promise<IUsers> {
    const res: IUsers = await requestAuth({
      url: `/account/users/${params.id}`,
      method: 'get',
      params: params.queryParams,
    })
  
    return res
  }

  export async function getClientBooking(
    params?: any,
  ): Promise<IUsers> {
    const res: IUsers = await request({
      url: `/bookings/bookings/?user=${params.id}`,
      method: 'get',
      params: params.queryParams,
    })
  
    return res
  }

  export async function getClientReview(
    params?: any,
  ): Promise<IUsers> {
    const res: IUsers = await request({
      url: `/placement-reviews/placement_review/?user=${params.id}`,
      method: 'get',
      params: params.queryParams,
    })
  
    return res
  }