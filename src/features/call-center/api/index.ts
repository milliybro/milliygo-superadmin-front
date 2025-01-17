import { ListResponse } from "@/types"
import { ISupport } from "../types"
import requestSupport from "@/utils/supportRequest"

export async function getMessagesList(
    params?: any,
  ): Promise<ListResponse<ISupport[]>> {
    const res: ListResponse<ISupport[]> = await requestSupport({
      url: '/chats/chat/',
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getMessage(
    params?: any,
  ): Promise<ListResponse<ISupport[]>> {
    const res: ListResponse<ISupport[]> = await requestSupport({
      url: `/chats/chat/${params.id}`,
      method: 'get',
      params,
    })
  
    return res
  }

  export async function getChatRoom(
    params?: any,
  ): Promise<ListResponse<ISupport[]>> {
    const res: ListResponse<ISupport[]> = await requestSupport({
      url: `/chats/messages/?chat_room=${params.id}`,
      method: 'get',
      params,
    })
  
    return res
  }

  export async function createMessage(data: {

  }): Promise<any> {
    const res: any = await requestSupport({
      url: `/chats/messages/`,
      method: 'post',
      data,
    })
  
    return res
  }


  export async function askUserInfo(id:string): Promise<any> {
    const res: any = await requestSupport({
      url: `/chats/chat/${id}/ask_for_user_short_info/`,
      method: 'put',
      // data,
    })
  
    return res
  }
