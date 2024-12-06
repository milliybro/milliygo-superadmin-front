import { useState } from 'react'
import { Button, Input, Upload } from 'antd'
import { useTranslation } from 'react-i18next'

import SendIcon from '@/components/icons/send'
import CloseIcon from '@/components/icons/close-icon'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import AttachmentIcon from '@/components/icons/attachment'
import TickDoubleIcon from '@/components/icons/tick-double'

import type { UploadChangeParam } from 'antd/es/upload'
import type { Dispatch, SetStateAction, FC } from 'react'

interface IProps {
  selectedChat: string
  setSelectedChat: Dispatch<SetStateAction<string | null>>
}

type Message = {
  text: string
  isSentByUser: boolean
  image?: string
}

type MessagesState = {
  [key: string]: Message[]
}

const OpenedChat: FC<IProps> = ({ selectedChat, setSelectedChat }) => {
  const { t } = useTranslation()
  const [messageText, setMessageText] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const [messages, setMessages] = useState<MessagesState>({
    'Aziza Matchanova': [
      {
        text: "Здравствуйте, я остановилась в 'Hilton Tashkent City' и столкнулась с проблемой...",
        isSentByUser: false,
      },
      {
        text: 'Извините за доставленные неудобства! Мы понимаем, как это может повлиять на комфорт...',
        isSentByUser: true,
      },
    ],
    'Евгения Малышева': [
      { text: 'Здравствуйте, Алексей! Как ваши дела?', isSentByUser: false },
    ],
  })

  const handleImageChange = (info: UploadChangeParam) => {
    const file = info.file.originFileObj
    if (info.file.status === 'done' && file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleSendMessage = () => {
    if (selectedChat) {
      if (messageText.trim() || image) {
        const newMessages = [...messages[selectedChat]]
        newMessages.push({ text: messageText, isSentByUser: true })
        if (image) {
          newMessages.push({ text: 'Image', image, isSentByUser: true })
        }
        setMessages(prevMessages => ({
          ...prevMessages,
          [selectedChat]: newMessages,
        }))
        setMessageText('')
        setImage(null)
      }
    }
  }
  return (
    <main className="flex-1 col-span-9 bg-white border flex flex-col overflow-hidden border-border rounded-[16px]">
      <header className="p-4 border-b flex items-center justify-between text-center">
        <Button
          type="text"
          icon={<ArrowLeftIcon className="text-[24px] text-primary-dark" />}
          onClick={handleSendMessage}
        />
        <div>
          <h3 className="text-lg font-semibold">{selectedChat}</h3>
          <p className="text-sm text-gray-500">Была онлайн 2 дня назад</p>
        </div>
        <Button
          type="text"
          icon={<CloseIcon className="text-[24px] text-primary-dark" />}
          onClick={() => setSelectedChat(null)}
        />
      </header>

      <div className="flex-1 flex flex-col justify-end overflow-y-auto p-4 space-y-2">
        {messages?.[selectedChat]?.map((message, index) => (
          <div
            key={index}
            className={`flex items-start ${message.isSentByUser ? 'justify-end' : ''}`}
          >
            {message.isSentByUser ? null : (
              <div className="size-[32px] border-border border mr-3 bg-secondary-light rounded-full overflow-hidden" />
            )}
            <div
              className={`rounded-lg p-3 w-fit max-w-[790px]  ${
                message.isSentByUser
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-[#F8F8FA] rounded-tl-none text-primary-dark'
              }`}
            >
              <p className="text-[14px] break-words">{message.text}</p>
              {message.image && (
                <img
                  src={message.image}
                  alt="Uploaded"
                  className="rounded-lg mt-2 w-40"
                />
              )}

              <div
                className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                  message.isSentByUser ? ' text-white' : 'text-secondary'
                }`}
              >
                <span>12:00</span>
                {message.isSentByUser ? (
                  <TickDoubleIcon className="text-[16px] text-[#4DD282]" />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="p-4 border-t">
        <div className="flex items-center">
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            <Button
              type="text"
              icon={<AttachmentIcon className="text-[24px] text-[#B7BFD5]" />}
            />
          </Upload>
          <Input
            className="flex-1 placeholder:text-[#B7BFD5]"
            placeholder={`${t('common.message')}...`}
            variant="borderless"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
          />

          <Button
            type="text"
            icon={<SendIcon className="text-[24px] text-[#B7BFD5]" />}
            onClick={handleSendMessage}
          />
        </div>
      </footer>
    </main>
  )
}

export default OpenedChat
