import { IUsers } from "@/features/users/types"
import { ListResponse } from "@/types"
// import { ListResponse } from "@/types"
import requestAuth from "@/utils/authRequest"
import request from "@/utils/axios"
import { Country, ICountry } from "../types"


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
      url: `/superadmin/bookings/list/`,
      method: 'get',
      params: {...params},
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

  export async function getCountries(
    params?: any,
  ): Promise<ListResponse<ICountry[]>> {
    const res: ListResponse<ICountry[]> = await requestAuth({
      url: '/regions/countries/',
      method: 'get',
      params,
    })
  
    return res
  }