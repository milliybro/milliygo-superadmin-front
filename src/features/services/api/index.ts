import { ListResponse } from "@/types"
import { ISevicesTable } from "../types"
import request from "@/utils/axios"

export async function getRoomFacilities(
    params?: any,
  ): Promise<ListResponse<ISevicesTable[]>> {
    const res: ListResponse<ISevicesTable[]> = await request({
      url: '/placement_references/r_facility/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getPlacementsFacilities(
    params?: any,
  ): Promise<ListResponse<ISevicesTable[]>> {
    const res: ListResponse<ISevicesTable[]> = await request({
      url: '/placement_references/facility/',
      method: 'get',
      params,
    })
    return res
  }

  export async function getProhibitionsFacilities(
    params?: any,
  ): Promise<ListResponse<ISevicesTable[]>> {
    const res: ListResponse<ISevicesTable[]> = await request({
      url: '/placement_references/prohibitions/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getRoomFacilitiesCategory(
    params?: any,
  ): Promise<ListResponse<ISevicesTable[]>> {
    const res: ListResponse<ISevicesTable[]> = await request({
      url: '/placement_references/r_facility_categories/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getPlacementFacilitiesCategory(
    params?: any,
  ): Promise<ListResponse<ISevicesTable[]>> {
    const res: ListResponse<ISevicesTable[]> = await request({
      url: '/placement_references/facility_categories/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function createRoomFacility(
    data?: any,
  ): Promise<ISevicesTable> {
    const res: ISevicesTable = await request({
      url: `/placement_references/r_facility/`,
      method: 'post',
      data,
    })
  
    return res
  }

  export async function createFacility(
    data?: any,
  ): Promise<ISevicesTable> {
    const res: ISevicesTable = await request({
      url: `/placement_references/facility/`,
      method: 'post',
      data,
    })
  
    return res
  }

  export async function createProhibitionsFacility(
    data?: any,
  ): Promise<ISevicesTable> {
    const res: ISevicesTable = await request({
      url: `/placement_references/prohibitions/`,
      method: 'post',
      data,
    })
  
    return res
  }

  export async function getIconsList(
    params?: any,
  ): Promise<ListResponse<ISevicesTable[]>> {
    const res: ListResponse<ISevicesTable[]> = await request({
      url: '/placement_references/icon_files/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getRFacility(
    params?: any,
  ): Promise<ISevicesTable> {
    const res: ISevicesTable = await request({
      url: `/placement_references/r_facility/${params.id}/`,
      method: 'get',
      params: params.queryParams,
    })
  
    return res
  }


  export async function getFacility(
    params?: any,
  ): Promise<ISevicesTable> {
    const res: ISevicesTable = await request({
      url: `/placement_references/facility/${params.id}/`,
      method: 'get',
      params: params.queryParams,
    })
  
    return res
  }

  export async function getProhibition(
    params?: any,
  ): Promise<ISevicesTable> {
    const res: ISevicesTable = await request({
      url: `/placement_references/prohibitions/${params.id}/`,
      method: 'get',
      params: params.queryParams,
    })
  
    return res
  }


  export async function updateRFacility(params: { id: string; queryParams: any }): Promise<ISevicesTable> {
    const { id, queryParams } = params;
    if (!id) {
      throw new Error('User ID is required for updating a user.');
    }
    const res: ISevicesTable = await request({
      url: `/placement_references/r_facility/${id}/`,
      method: 'patch',
      data: queryParams,
    });
  
    return res;
  }

  export async function updateFacility(params: { id: string; queryParams: any }): Promise<ISevicesTable> {
    const { id, queryParams } = params;
    if (!id) {
      throw new Error('User ID is required for updating a user.');
    }
    const res: ISevicesTable = await request({
      url: `/placement_references/facility/${id}/`,
      method: 'patch',
      data: queryParams,
    });
  
    return res;
  }

  export async function updateProhibition(params: { id: string; queryParams: any }): Promise<ISevicesTable> {
    const { id, queryParams } = params;
    if (!id) {
      throw new Error('User ID is required for updating a user.');
    }
    const res: ISevicesTable = await request({
      url: `/placement_references/prohibitions/${id}/`,
      method: 'patch',
      data: queryParams,
    });
  
    return res;
  }