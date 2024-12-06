import { useEffect, useState } from 'react'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ChatsList from '../containers/chats-list'
import OpenedChat from '../containers/opened-chat'
import NoChatSelected from '../components/no-chat-selected'

const CallCenter = () => {
  const [selectedChat, setSelectedChat] = useState<null | string>(null)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: ROUTE_PATHS.MAIN },
      { title: 'Call-center', href: ROUTE_PATHS.CALL_CENTER },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        Call-center
      </div>
      <div className="h-full grid grid-cols-12 gap-4">
        <ChatsList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
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
