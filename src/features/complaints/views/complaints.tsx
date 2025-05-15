import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { useQuery } from '@tanstack/react-query'
import { getComplaintsList } from '../api'
import ComplaintsList from '../containers/complaints-list'
import OpenedChatComplaints from '../containers/opened-chat'
import NoChatSelected from '@/features/call-center/components/no-chat-selected'
// import NoComplaintsFound from '../components/no-complaints-found'

const Complaints = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [selectedChat, setSelectedChat] = useState<null | string>(null)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.complaints'), href: ROUTE_PATHS.COMPLAINTS },
    ])
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [])
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['complaints-data', currentPage],
    queryFn: async () => {
      const res = await getComplaintsList({
        page_size: pageSize,
        page: currentPage,
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('common.complaints')}
      </div>
      <div className="h-full grid grid-cols-6 gap-4">
        <ComplaintsList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          data={data}
          isLoading={isLoading}
          refetch={refetch}
        />
        {selectedChat ? (
          <OpenedChatComplaints
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

export default Complaints
