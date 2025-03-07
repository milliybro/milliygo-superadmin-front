import { ListResponse } from "@/types"
import requestChat from "@/utils/chatRequest"
import { IComplaintsTable } from "../types"
import { ISupport } from "@/features/call-center/types"

export async function getComplaintsList(
    params?: any,
  ): Promise<ListResponse<IComplaintsTable[]>> {
    const res: ListResponse<IComplaintsTable[]> = await requestChat({
      url: '/chats/conversations/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getComplaintsMessage(
    params?: any,
  ): Promise<ListResponse<ISupport[]>> {
    const res: ListResponse<ISupport[]> = await requestChat({
      url: `/chats/conversation-detail/${params.id}`,
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getComplaintsChatRoom(
    params?: any,
  ): Promise<ListResponse<ISupport[]>> {
    const res: ListResponse<ISupport[]> = await requestChat({
      url: `/chats/messages/?conversation_id=${params.id}`,
      method: 'get',
      params,
    })
  
    return res
  }

  export async function createComplaints(data: {

  }): Promise<any> {
    const res: any = await requestChat({
      url: `/chats/create-message/`,
      method: 'post',
      data,
    })
  
    return res
  }
 