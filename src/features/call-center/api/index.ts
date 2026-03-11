import { ListResponse } from '@/types'
import { ISupport, ISupportChat, ISupportMessage } from '../types'
import requestSupport from '@/utils/supportRequest'

export async function getChatsList(
  params?: any,
): Promise<ListResponse<ISupportChat[]>> {
  const res: ListResponse<ISupportChat[]> = await requestSupport({
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
    url: `/chats/chat/${params?.id}`,
    method: 'get',
  })

  return res
}

export async function getChatMessages(
  params?: any,
): Promise<ListResponse<ISupportMessage[]>> {
  const res: ListResponse<ISupportMessage[]> = await requestSupport({
    url: `/chats/messages/`,
    method: 'get',
    params,
  })

  return res
}

export async function createMessage(data: FormData): Promise<any> {
  const res: any = await requestSupport({
    url: `/chats/messages/`,
    method: 'post',
    data,
  })

  return res
}

export async function askUserInfo(id: string): Promise<any> {
  const res: any = await requestSupport({
    url: `/chats/chat/${id}/ask_for_user_short_info/`,
    method: 'put',
    // data,
  })

  return res
}
