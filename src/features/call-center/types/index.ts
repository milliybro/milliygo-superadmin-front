export interface ISupportChat {
  id: number
  admins: any
  user_session: string | null
  last_message: ISupportMessage | null
  unread_messages_count: number
  chat_detail: {
    id: number
    username: string
    first_name: string
    last_name: string
    middle_name: string
    email: string
    phone: string | null
    avatar: string | null
    telegram_id: number | null
    type: any
  }
  email_receive: string
}

export interface ISupportMessage {
  id: number
  admin: IChatAdmin
  is_me: boolean
  updated_at: string
  created_at: string
  content: string | null
  file: string | null
  device_id: number | null
  chat_room: number
  user_session: null
}

export interface IChatAdmin {
  id: number
  username: string
  first_name: string | null
  last_name: string | null
  middle_name: string | null
  email: string | null
  phone: string | null
  avatar: string
  telegram_id: number | null
  type: any
}

interface ISupport {
  id: number
  name: string
  key: string
  icon: any
  created_at: string
  first_name: string
  last_name: string
  middle_name: string
  phone: string
  gender: string
  username: string
  password: string
  position: string
  status: boolean
  is_active: boolean
}

export interface ICreateChat {
  id: number
  updated_at: string
  created_at: string
  user_session: string
  admins: number[]
}
export interface ISendMessage {
  id: number
  admin: any
  updated_at: string
  created_at: string
  content: string
  file: any
  chat_room: number
  user_session: string
}

export type { ISupport }
