import type { Dispatch, SetStateAction, FC } from 'react'
import { Avatar, Spin } from 'antd'
import defaultUser from '../../../assets/default-user.png'
import { useTranslation } from 'react-i18next'

interface IProps {
  selectedChat: string | null
  setSelectedChat: Dispatch<SetStateAction<string | null>>
  messagesData: any
  isLoading: boolean
}

const ChatsList: FC<IProps> = ({
  selectedChat,
  setSelectedChat,
  messagesData,
  isLoading,
}) => {
  const { t } = useTranslation()
  const handleChatSelect = (chat: string) => {
    setSelectedChat(chat)
  }

  const formatDate = (createdAt: any) => {
    if (!createdAt) return '00:00';
  
    const now = new Date();
    const messageDate = new Date(createdAt);
    const locale = localStorage.getItem('i18nextLng') || 'ru'; 
  
    const diffInMilliseconds = now.getTime() - messageDate.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  
    const weekDaysUzLat = ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'];
    const weekDaysUzCyr = ['якшанба', 'душанба', 'сешанба', 'чоршанба', 'пайшанба', 'жума', 'шанба'];
  
    if (diffInDays < 1) {
      return messageDate.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInDays < 2) {
      return t('common.night'); 
    } else if (diffInDays < 7) {
      if (locale === 'uz') {
        return weekDaysUzCyr[messageDate.getDay()];
      } else if (locale === 'oz') {
        return weekDaysUzLat[messageDate.getDay()];
      } else {
        return messageDate.toLocaleDateString(locale, { weekday: 'long' });
      }
    } else {
      return messageDate.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
  };
  

  return (
    <aside className="col-span-3 bg-white border flex-col overflow-hidden border-border rounded-[16px]">
      <Spin spinning={isLoading}>
        <ul className=" divide-y overflow-scroll h-[720px]">
          {messagesData?.length > 0 ? (
            messagesData
              .slice()
              .reverse()
              .map((name: any) => (
                <li
                  key={name.id}
                  className={`flex select-none items-center duration-200 justify-between py-4 px-6 hover:bg-gray-100 cursor-pointer ${
                    selectedChat === name.id ? 'bg-primary-light/50' : ''
                  }`}
                  onClick={() => handleChatSelect(name.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* <div className="size-[48px] rounded-full border-border border bg-secondary-light" /> */}
                    <Avatar
                      size={48}
                      src={defaultUser}
                      alt="user avatar image"
                    />
                    <div>
                      <p className="text-[16px] font-bold text-primary-dark">
                        ID:{name.id}
                      </p>
                      <p
                        className="text-sm text-gray-500 truncate w-[150px]"
                        title={name?.last_message?.content} // Tooltip for full message content
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
                    {name?.unread_messages_count !== 0 ? (
                      <span className="size-[20px] rounded-full bg-primary overflow-hidden flex items-center justify-center text-white text-[14px]">
                        {name?.unread_messages_count}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))
          ) : (
            <p className="text-gray-500">{t('common.no-chat')}</p>
          )}
        </ul>
      </Spin>
    </aside>
  )
}

export default ChatsList
