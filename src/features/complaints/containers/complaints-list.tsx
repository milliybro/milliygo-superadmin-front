import {
  type Dispatch,
  type SetStateAction,
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Avatar, Spin } from 'antd'
import defaultUser from '../../../assets/default-user.png'
import { useTranslation } from 'react-i18next'

interface IProps {
  selectedChat: string | null
  setSelectedChat: Dispatch<SetStateAction<string | null>>
  data: any
  isLoading: boolean
  refetch: () => void
}

const ComplaintsList: FC<IProps> = ({
  selectedChat,
  setSelectedChat,
  data,
  isLoading,
}) => {
  const { t } = useTranslation()
  const socketRef = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    if (data?.results) {
      setMessages(data.results)
    }
  }, [data])

  const handleChatSelect = (chat: string) => {
    setSelectedChat(chat)
  }

  const user_id = JSON.parse(localStorage.getItem('user') || '1')?.id

  const formatDate = (createdAt: any) => {
    if (!createdAt) return '00:00'

    const now = new Date()
    const messageDate = new Date(createdAt)
    const locale = localStorage.getItem('i18nextLng') || 'ru'

    const diffInMilliseconds = now.getTime() - messageDate.getTime()
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)

    const weekDaysUzLat = [
      'yakshanba',
      'dushanba',
      'seshanba',
      'chorshanba',
      'payshanba',
      'juma',
      'shanba',
    ]
    const weekDaysUzCyr = [
      'якшанба',
      'душанба',
      'сешанба',
      'чоршанба',
      'пайшанба',
      'жума',
      'шанба',
    ]

    if (diffInDays < 1) {
      return messageDate.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      })
    } else if (diffInDays < 2) {
      return t('common.night')
    } else if (diffInDays < 7) {
      if (locale === 'uz') {
        return weekDaysUzCyr[messageDate.getDay()]
      } else if (locale === 'oz') {
        return weekDaysUzLat[messageDate.getDay()]
      } else {
        return messageDate.toLocaleDateString(locale, { weekday: 'long' })
      }
    } else {
      return messageDate.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && user_id) {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDA0MzY1LCJpYXQiOjE3MzE0MDQzNjUsImp0aSI6IjI0Yzk3NWVhMWMzYjRjMWNhZDZiZTk2OTI0YzBmYjYzIiwidXNlcl9pZCI6MX0.xjbItyKCCu_l6GqBKlxA5dCpWbJiDuGrPx3QXNcfQKo'
      const url = `wss://websocket.emehmon.xdevs.uz/ws/complaint-conversation-list/?user_id=${user_id}&token=${token}`
      const socket = new WebSocket(url)
      socketRef.current = socket

      const handleMessage = (event: MessageEvent) => {
        const newMessage = JSON.parse(event.data)

        if (newMessage.type === 'complaint_conversation_list') {
          const parsedMessages = newMessage.message

          setMessages(parsedMessages)
        }
      }

      socket.addEventListener('message', handleMessage)

      socket.onopen = () => {
        console.log('WebSocket connection opened')
      }

      socket.onerror = error => {
        console.error('WebSocket error:', error)
      }

      socket.onclose = event => {
        console.log('WebSocket connection closed', event)
        // setTimeout(() => {
        //   if (selectedChat) {
        //     socketRef.current = new WebSocket(url);
        //   }
        // }, 5000);
      }

      return () => {
        if (socketRef.current) {
          socketRef.current.removeEventListener('message', handleMessage)
          socketRef.current.close()
          socketRef.current = null
        }
      }
    }
  }, [user_id])

  // const data = [
  //   {
  //     id: 119,
  //     type: 'complaint',
  //     unread_count: 0,
  //     users: [],
  //     last_message: {
  //       content: 'hi',
  //       created_at: '2025-02-18T09:44:34.882535Z',
  //       user: {
  //         id: 12,
  //         username: '52706035440011',
  //         first_name: 'SHOHRUH',
  //         last_name: 'RUSTAMOV',
  //         middle_name: 'TOLLIBOY O‘G‘LI',
  //         email: '',
  //         phone: '90 496 90 07',
  //         avatar: 'https://auth.emehmon.xdevs.uz//media/users/default.png',
  //         telegram_id: '1930372151',
  //         type: null,
  //       },
  //     },
  //     object_id: 87,
  //     placement: [
  //       {
  //         id: 87,
  //         name: 'Marriot',
  //         image:
  //           'https://marriot.em.xdevs.uz/media/marriot/relative_media/placements/490863217_kZGzf0r.jpg',
  //       },
  //     ],
  //     created_at: '2025-02-07T17:44:12.657628Z',
  //   },
  // ]

  return (
    <aside className="!col-span-2 bg-white border flex-col overflow-hidden border-border rounded-[16px]">
      <Spin spinning={isLoading}>
        <ul className=" divide-y overflow-scroll h-[720px]">
          {messages?.length > 0 ? (
            messages?.slice().map((name: any, i: number) => (
              <li
                key={name.id}
                className={`select-none flex items-center gap-4 duration-200 py-4 px-6 hover:bg-gray-100 cursor-pointer ${
                  selectedChat === name.id ? 'bg-primary-light/50' : ''
                }`}
                onClick={() => handleChatSelect(name)}
              >
                <span className="p-0 m-0">{i + 1}.</span>
                <div className="flex justify-between w-full p-0 m-0">
                  <div className="ms-0 ps-0 flex items-center gap-4">
                    {/* <div className="size-[48px] rounded-full border-border border bg-secondary-light" /> */}
                    <Avatar
                      size={48}
                      src={defaultUser}
                      alt="user avatar image"
                    />
                    <div>
                      <p className="text-[16px] font-bold text-primary-dark truncate w-[210px]">
                        {name?.last_message?.user?.first_name
                          ? name?.last_message?.user?.first_name +
                            ' ' +
                            name?.last_message?.user?.last_name
                          : `ID: ` + name?.id}
                      </p>
                      <p
                        className="text-sm text-gray-500 truncate w-[210px]"
                        title={name?.last_message?.content}
                      >
                        {name?.last_message?.content}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex shrink-0 flex-col items-end gap-2">
                    <span className="text-[12px] text-secondary">
                      {name?.last_message?.created_at
                        ? formatDate(name.last_message.created_at)
                        : '00:00'}
                    </span>
                    {name?.unread_count !== 0 ? (
                      <span className="size-[20px] rounded-full bg-primary overflow-hidden flex items-center justify-center text-white text-[14px]">
                        {name?.unread_count}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 h-full flex flex-row justify-center items-center pt-8">
              {t('common.no-chat')}
            </p>
          )}
        </ul>
      </Spin>
    </aside>
  )
}

export default ComplaintsList
