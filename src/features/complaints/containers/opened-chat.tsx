import { useEffect, useRef, useState } from 'react'
import { Button, Image, Input, Spin } from 'antd'

// import SendIcon from '@/components/icons/send'
import ArrowLeftIcon from '@/components/icons/arrow-left'
// import AttachmentIcon from '@/components/icons/attachment'
import TickDoubleIcon from '@/components/icons/tick-double'

// import type { UploadChangeParam } from 'antd/es/upload'
import type {
  Dispatch,
  SetStateAction,
  FC,
  ChangeEvent,
  KeyboardEvent,
  // ChangeEvent,
  // KeyboardEvent,
} from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
// import { askUserInfo, createMessage, getChatRoom, getMessage } from '../api'
// import BlurImage from '@/components/ui/blur-image'
// import { ISendMessage } from '../types'
import FileIcon from '@/components/icons/file-icon'
import {
  createComplaints,
  getComplaintsChatRoom,
  getComplaintsMessage,
} from '../api'
import defaultUser from '../../../assets/default-user.png'
import { ISendMessage } from '@/features/call-center/types'
import { useTranslation } from 'react-i18next'
import BlurImage from '@/components/ui/blur-image'
import AttachmentIcon from '@/components/icons/attachment'
import SendIcon from '@/components/icons/send'
import dayjs from 'dayjs'

interface IProps {
  selectedChat: any
  setSelectedChat: Dispatch<SetStateAction<string | null>>
}

// type Message = {
//   text: string
//   isSentByUser: boolean
//   image?: string
// }

const OpenedChatComplaints: FC<IProps> = ({
  selectedChat,
  setSelectedChat,
}) => {
  const { t } = useTranslation()
  // const [form] = Form.useForm()
  const [messageText, setMessageText] = useState('')
  // const [image, setImage] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const { data } = useQuery({
    queryKey: ['chat_complaints', selectedChat],
    queryFn: async () => {
      const res = await getComplaintsMessage({ id: selectedChat?.id })
      return res
    },
    enabled: !!selectedChat,
  })

  const { data: list, refetch } = useQuery({
    queryKey: ['chat_room_complaints', selectedChat, data],
    queryFn: async () => {
      const res = await getComplaintsChatRoom({ id: selectedChat?.id })
      return res
    },
    enabled: !!selectedChat,
  })

  useEffect(() => {
    setMessages(list?.results as any)
  }, [list])

  // const handleSendMessage = () => {
  //   if (selectedChat) {
  //     if (messageText.trim() || image) {
  //       create({ content: messageText, chat_room: selectedChat })
  //       setMessageText('')
  //       setImage(null)
  //     }
  //   }
  // }
  // const handleSendMessage = () => {
  //   if (selectedChat) {
  //     // setMessages([...messages, messageText])

  //     if (messageText.trim() || image) {
  //       create({
  //         content: messageText,
  //         chat_room: selectedChat,
  //         file: image,
  //       })
  //       setMessageText('')
  //       setImage(null)
  //     }
  //   }
  // }

  // const { mutate: create, isPending } = useMutation({
  //   mutationFn: (values: any) => createMessage({ ...values }),
  //   onSuccess: () => {
  //     refetch()
  //   },
  // })
  const scrollToBottom = () => {
    const chatBody = chatBodyRef.current
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight
    }
  }

  const { mutate: create, isPending: isSendingMessage } = useMutation({
    mutationFn: () => {
      const messageFormData = new FormData()
      messageFormData.append('content', messageText)

      if (selectedChat) {
        messageFormData.append('conversation', selectedChat?.id + '')
      }

      if (selectedFile) {
        messageFormData.append('file', selectedFile)
      }

      return createComplaints(messageFormData)
    },
    onSuccess: (_: ISendMessage) => {
      setMessageText('')
      setSelectedFile(null)
      scrollToBottom()
    },
  })

  // const { mutate: askUser } = useMutation({
  //   mutationFn: () => askUserInfo(selectedChat?.id),
  //   onSuccess: (values: ISendMessage) => {
  //     // openNotification()
  //   },
  // })
  // const handleClick = () => {
  //   askUser()
  // }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      create()
    }
  }

  const user_id = JSON.parse(localStorage.getItem('user') || '1')?.id

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedChat) {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDA0MzY1LCJpYXQiOjE3MzE0MDQzNjUsImp0aSI6IjI0Yzk3NWVhMWMzYjRjMWNhZDZiZTk2OTI0YzBmYjYzIiwidXNlcl9pZCI6MX0.xjbItyKCCu_l6GqBKlxA5dCpWbJiDuGrPx3QXNcfQKo'
      const url = `wss://websocket.emehmon.xdevs.uz/ws/complaint/?chat_room=${selectedChat?.id}&token=${token}`
      const socket = new WebSocket(url)
      socketRef.current = socket

      const handleMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data)

        if (data.message) {
          setMessages(prevMessages => [...prevMessages, data.message])
        }
        refetch()
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
        // Optionally, attempt to reconnect
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
  }, [selectedChat])

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null

    // if (file && file.type !== 'application/pdf') {
    //   alert('Iltimos, faqat PDF fayl yuklang!')
    //   return
    // } else {
    //   setSelectedFile(file)
    // }

    setSelectedFile(file)
  }

  // const openNotification = () => {
  //   notification.info({
  //     closeIcon: null,
  //     className:
  //       'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
  //     icon: <CheckmarkCircleIcon className="text-2xl text-primary" />,
  //     message: (
  //       <Typography.Text className="text-lg font-semibold leading-[22.95px]">
  //         So'rov yuborildi
  //       </Typography.Text>
  //     ),
  //     placement: 'topRight',
  //     description: (
  //       <div>
  //         <Button
  //           size="small"
  //           type="text"
  //           className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
  //           icon={<CloseIcon className="text-base" />}
  //           onClick={() => notification.destroy()}
  //         />
  //         <Typography.Text className="text-secondary text-base">
  //           Foydalanuvchi ma'lumotlarini olish uchun so'rov yuborildi
  //         </Typography.Text>
  //       </div>
  //     ),
  //   })
  // }
  return (
    <main className="!col-span-4 flex flex-1 flex-col overflow-hidden rounded-[16px] border border-border bg-white">
      <header className="flex items-center justify-between border-b p-4 text-center">
        <Button
          type="text"
          icon={<ArrowLeftIcon className="text-2xl text-primary-dark" />}
          onClick={() => setSelectedChat(null)}
        />
        <div>
          <h3 className="text-lg font-semibold">
            {selectedChat.placement[0]?.name}
          </h3>
          <p className="text-sm text-gray-500"></p>
        </div>
        <span></span>
      </header>

      <div
        className="relative flex flex-1 flex-col space-y-2 overflow-y-auto p-4"
        style={{ maxHeight: '620px', overflowY: 'auto', position: 'relative' }}
      >
        {[...(messages || [])]
          .reverse()
          .reduce((acc: any[], message: any, index, arr) => {
            const currentDate = new Date(message.created_at).toDateString()
            const prevDate =
              index > 0
                ? new Date(arr[index - 1].created_at).toDateString()
                : null

            if (currentDate !== prevDate) {
              acc.push({ type: 'date', date: currentDate })
            }

            acc.push({ type: 'message', data: message })
            return acc
          }, [])
          .map((item: any, index: number) => {
            if (item.type === 'date') {
              return (
                <div
                  key={`date-${index}`}
                  className="my-4 text-center text-sm font-medium text-gray-500"
                >
                  {dayjs(item.date).format('D MMMM')}
                </div>
              )
            }

            const message = item.data

            return (
              <div
                key={message.id}
                className={`flex items-start ${
                  message?.user?.type === 'superuser' ? 'justify-end' : ''
                }`}
              >
                {message?.user?.type !== 'superuser' && (
                  <div className="mr-3 size-[32px] overflow-hidden rounded-full border border-border bg-secondary-light">
                    <img
                      src={defaultUser}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`w-fit min-w-[250px] max-w-[790px] rounded-lg p-3 ${
                    message?.user?.id === user_id
                      ? 'rounded-tr-none bg-blue-500 text-white'
                      : 'rounded-tl-none bg-[#F8F8FA] text-primary-dark'
                  }`}
                >
                  <p className="text-lg font-semibold text-[#232E40]">
                    {message?.user?.first_name} {message?.user?.last_name}
                  </p>
                  <p className="break-words text-sm font-normal">
                    {message?.content}
                  </p>
                  {message?.file && (
                    <>
                      {['.jpg', '.svg', '.png', '.webp'].some(ext =>
                        message.file.endsWith(ext),
                      ) ? (
                        <Image
                          src={message.file}
                          alt="Uploaded"
                          className="mt-2 w-40 rounded-lg"
                        />
                      ) : (
                        <a
                          href={message.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-none mt-2 flex items-center gap-2 text-white"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff] bg-blue-500 p-2">
                            <FileIcon />
                          </div>
                          {message.file.substring(
                            message.file.lastIndexOf('/') + 1,
                          )}
                        </a>
                      )}
                    </>
                  )}
                  <div
                    className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                      message?.user?.id === user_id
                        ? 'text-white'
                        : 'text-secondary'
                    }`}
                  >
                    <span>
                      {new Date(message?.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {message?.admin?.type === 'superuser' ? (
                      <TickDoubleIcon className="text-base text-[#4DD282]" />
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}

        <div ref={chatEndRef}></div>
      </div>
      <footer className="border-t p-4">
        {selectedFile && (
          <div
            className={`flex h-[100px] w-[150px] rounded-md ${
              selectedFile ? '-mt-[100px] bg-slate-200' : 'bg-slate-200'
            }`}
          >
            <Button type="link" aria-label="close">
              <button onClick={() => setSelectedFile(null)}>x</button>
            </Button>
            <BlurImage
              src={URL.createObjectURL(selectedFile)}
              width={100}
              height={100}
              className="h-full w-full rounded-br-md rounded-tr-md bg-slate-200 object-cover p-2"
              alt="file"
            />
          </div>
        )}

        <div className="flex items-center">
          <Button
            type="link"
            onClick={handleButtonClick}
            aria-label="Upload file"
          >
            <AttachmentIcon />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Input
            className="border-0 bg-[#FFF]"
            placeholder={`${t('common.message')}...`}
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSendingMessage}
          />
          <Spin spinning={isSendingMessage} />
          <Button
            loading={isSendingMessage}
            type="text"
            icon={<SendIcon className="text-2xl text-[#B7BFD5]" />}
            onClick={() => {
              if (messageText || selectedFile) {
                create()
              }
            }}
          />
        </div>
      </footer>
    </main>
  )
}

export default OpenedChatComplaints
