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