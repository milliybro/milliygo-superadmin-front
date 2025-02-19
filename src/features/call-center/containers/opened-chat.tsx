import { useEffect, useRef, useState } from 'react'
import { Button, Input, notification, Spin, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import SendIcon from '@/components/icons/send'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import AttachmentIcon from '@/components/icons/attachment'
import TickDoubleIcon from '@/components/icons/tick-double'

// import type { UploadChangeParam } from 'antd/es/upload'
import type {
  Dispatch,
  SetStateAction,
  FC,
  ChangeEvent,
  KeyboardEvent,
} from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { askUserInfo, createMessage, getChatRoom, getMessage } from '../api'
import BlurImage from '@/components/ui/blur-image'
import { ISendMessage } from '../types'
import FileIcon from '@/components/icons/file-icon'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close-icon'
import defaultUser from '../../../assets/default-user.png'


interface IProps {
  selectedChat: string
  setSelectedChat: Dispatch<SetStateAction<string | null>>
}

// type Message = {
//   text: string
//   isSentByUser: boolean
//   image?: string
// }

const OpenedChat: FC<IProps> = ({ selectedChat, setSelectedChat }) => {
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
    queryKey: ['chat', selectedChat],
    queryFn: async () => {
      const res = await getMessage({ id: selectedChat })
      return res
    },
    enabled: !!selectedChat,
  })

  const { data: list, refetch } = useQuery({
    queryKey: ['chat_room', selectedChat, data],
    queryFn: async () => {
      const res = await getChatRoom({ id: selectedChat })
      return res
    },
    enabled: !!selectedChat,
  })

  useEffect(() => {
    setMessages(list as any)
  }, [list])

  // const handleSendMessage = () => {
  //   if (selectedChat) {
  //     if (messageText.trim() || image) {
  //       create({ content: messageText, chat_room: selectedChat })
  //       console.log('New message:', { text: messageText, image })
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
  //   onError: () => {
  //     form.getFieldsError()
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
        messageFormData.append('chat_room', selectedChat + '')
      }

      if (selectedFile) {
        messageFormData.append('file', selectedFile)
      }

      return createMessage(messageFormData)
    },
    onSuccess: (values: ISendMessage) => {
      console.log(values)
      setMessageText('')
      setSelectedFile(null)
      scrollToBottom()
    },
  })

  const { mutate: askUser } = useMutation({
    mutationFn: () => askUserInfo(selectedChat),
    onSuccess: (values: ISendMessage) => {
      openNotification()
      console.log('User info fetched successfully:', values)
    },
    onError: error => {
      console.error('Failed to fetch user info:', error)
    },
  })
  const handleClick = () => {
    askUser()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      create()
    }
  }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedChat) {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzMDA0MzY1LCJpYXQiOjE3MzE0MDQzNjUsImp0aSI6IjI0Yzk3NWVhMWMzYjRjMWNhZDZiZTk2OTI0YzBmYjYzIiwidXNlcl9pZCI6MX0.xjbItyKCCu_l6GqBKlxA5dCpWbJiDuGrPx3QXNcfQKo'
      const url = `wss://websocket.emehmon.xdevs.uz/ws/support/?chat_room=${selectedChat}&token=${token}`
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

    console.log('images:', file)

    // if (file && file.type !== 'application/pdf') {
    //   alert('Iltimos, faqat PDF fayl yuklang!')
    //   return
    // } else {
    //   setSelectedFile(file)
    // }

    setSelectedFile(file)
  }

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-[24px] text-primary" />,
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          So'rov yuborildi
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            Foydalanuvchi ma'lumotlarini olish uchun so'rov yuborildi
          </Typography.Text>
        </div>
      ),
    })
  }
  return (
    <main className="!col-span-4 flex-1  bg-white border flex flex-col overflow-hidden border-border rounded-[16px]">
      <header className="p-4 border-b flex items-center justify-between text-center">
        <Button
          type="text"
          icon={<ArrowLeftIcon className="text-[24px] text-primary-dark" />}
          onClick={() => setSelectedChat(null)}
        />
        <div>
          <h3 className="text-lg font-semibold">{selectedChat}</h3>
          <p className="text-sm text-gray-500"></p>
        </div>
        <span></span>
      </header>

      <div
        className="relative flex-1 flex flex-col overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: '580px', overflowY: 'auto', position: 'relative' }}
      >
        {[...(messages || [])].reverse().map((message: any) => (
          <div
            key={message.id}
            className={`flex items-start ${
              message?.admin?.type === 'superuser' ? 'justify-end' : ''
            }`}
          >
            {message?.admin?.type !== 'superuser' && (
              <div className="size-[32px] border-border border mr-3 bg-secondary-light rounded-full overflow-hidden">
                <img
                  src={defaultUser}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={`rounded-lg p-3 w-fit max-w-[790px] min-w-[250px]  ${
                message?.admin?.type === 'superuser'
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-[#F8F8FA] rounded-tl-none text-primary-dark'
              }`}
            >
              {message?.admin?.type !== 'superuser' ? (
                <h4 className="text-[14px] font-bold break-words">
                  {message?.admin?.username}
                </h4>
              ) : null}

              <p className="text-[14px] break-words">{message?.content}</p>
              {message?.file && (
                <>
                  {message.file.endsWith('.jpg') ||
                  message.file.endsWith('.svg') ||
                  message.file.endsWith('.png') ||
                  message.file.endsWith('.webp') ? (
                    <img
                      src={message.file}
                      alt="Uploaded"
                      className="rounded-lg mt-2 w-40"
                    />
                  ) : (
                    <a
                      href={message.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline-none mt-2 flex items-center gap-2"
                    >
                      <div className="bg-blue-500 rounded-full flex justify-center items-center border-[#ffffff] p-2 border w-10 h-10">
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
                className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                  message?.admin?.type === 'superuser'
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
                  <TickDoubleIcon className="text-[16px] text-[#4DD282]" />
                ) : null}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      {data?.email_receive !== 'received' ? (
        <div className="bg-white p-4">
          <Button onClick={handleClick} className="w-full text-center">
            {t('common.request-data')}
          </Button>
        </div>
      ) : null}
      <footer className="p-4 border-t">
        {selectedFile && (
          <div
            className={`flex w-[150px] h-[100px] rounded-md ${
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
              className="w-full h-full object-cover bg-slate-200 p-2 rounded-tr-md rounded-br-md"
              alt="file"
            />
          </div>
        )}

        <div className="flex items-center">
          {/* <Upload
            showUploadList={false}
            beforeUpload={() => false}
            // onChange={handleImageChange}
            >
            <Button
            onClick={handleButtonClick}
            type="text"
            icon={<AttachmentIcon className="text-[24px] text-[#B7BFD5]" />}
            />
            </Upload> */}
          <Button
            type="link"
            onClick={handleButtonClick}
            aria-label="Upload file"
          >
            <AttachmentIcon />
          </Button>
          {/* <Input
            ref={fileInputRef}
            className="flex-1 placeholder:text-[#B7BFD5]"
            placeholder={`${t('common.message')}...`}
            variant="borderless"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
          /> */}
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
            icon={<SendIcon className="text-[24px] text-[#B7BFD5]" />}
            // onClick={create}
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

export default OpenedChat
