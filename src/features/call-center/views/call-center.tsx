import { useEffect, useState } from 'react'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ChatsList from '../containers/chats-list'
import OpenedChat from '../containers/opened-chat'
import NoChatSelected from '../components/no-chat-selected'
import { useQuery } from '@tanstack/react-query'
import { getChatsList } from '../api'
import { useTranslation } from 'react-i18next'
import { ISupportChat } from '../types'

const CallCenter = () => {
  const { t } = useTranslation()
  const [selectedChat, setSelectedChat] = useState<null | ISupportChat>(null)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.call-center'), href: ROUTE_PATHS.CALL_CENTER },
    ])
  }, [])

  const {
    data: messagesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['messages-data'],
    queryFn: async () => {
      const res = await getChatsList({
        page_size: 10,
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('common.call-center')}
      </div>
      <div className="h-full grid grid-cols-6 gap-4">
        <ChatsList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          chatsData={messagesData}
          isLoading={isLoading}
          refetch={refetch}
        />
        {selectedChat ? (
          <OpenedChat
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  )
}

export default CallCenter
