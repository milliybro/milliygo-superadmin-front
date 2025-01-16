import { useEffect, useState } from 'react'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ChatsList from '../containers/chats-list'
import OpenedChat from '../containers/opened-chat'
import NoChatSelected from '../components/no-chat-selected'
import { useQuery } from '@tanstack/react-query'
import { getMessagesList } from '../api'

const CallCenter = () => {
  const [selectedChat, setSelectedChat] = useState<null | string>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: ROUTE_PATHS.MAIN },
      { title: 'Call-center', href: ROUTE_PATHS.CALL_CENTER },
    ])
  }, [])

  const { data: messagesData, isLoading } = useQuery({
    queryKey: ['messages-data', currentPage],
    queryFn: async () => {
      const res = await getMessagesList({
        page_size: 10,
        page: currentPage
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        Call-center
      </div>
      <div className="h-full grid grid-cols-12 gap-4">
        <ChatsList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messagesData={messagesData}
          isLoading={isLoading}
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
