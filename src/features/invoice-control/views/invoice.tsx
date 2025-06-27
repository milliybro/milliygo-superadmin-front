import { Button, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'


import VideoReplayIcon from '@/components/icons/video-replay'
import InvoiceControlTable from '../containers/invoice-table'

const InvoiceControlPage = () => {
  const { t } = useTranslation()

  //   const { openModal } = useUserModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: 'Контроль счетов-фактур', href: ROUTE_PATHS.USERS },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex gap-3 items-center">
            <Typography.Text className="text-[24px] text-primary-dark font-semibold">
              Контроль счетов-фактур
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500] text-[#2563EB] flex items-center gap-1">
              Иструкция <VideoReplayIcon />
            </Typography.Text>
          </div>
          <Typography.Text className="text-[14px] font-[400] text-secondary">
            Здесь вы можете создать и настроить свою услугу.
          </Typography.Text>
        </div>
        <Button
          className="inline-flex items-center gap-2 bg-[#4DD282]"
          type="primary"
        >
          Перейти UDOCS
        </Button>
      </div>
      <div className="bg-white border flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
        <InvoiceControlTable />
      </div>
    </div>
  )
}

export default InvoiceControlPage
