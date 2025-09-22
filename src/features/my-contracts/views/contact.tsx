import { Button, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddIcon from '@/components/icons/add'
import ContactsTable from '../containers/contracts-table'
import VideoReplayIcon from '@/components/icons/video-replay'

const ContractsPage = () => {
  const { t } = useTranslation()

  //   const { openModal } = useUserModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.users'), href: ROUTE_PATHS.USERS },
    ])
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Typography.Text className="text-2xl font-semibold text-primary-dark">
              Мои контракты
            </Typography.Text>
            <Typography.Text className="flex items-center gap-1 text-base font-[500] text-[#2563EB]">
              Иструкция <VideoReplayIcon />
            </Typography.Text>
          </div>
          <Typography.Text className="text-sm font-[400] text-secondary">
            Здесь вы можете создать и настроить свою услугу.
          </Typography.Text>
        </div>
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          //   onClick={openModal}
        >
          <AddIcon /> {t('users-page.add-user')}
        </Button>
        {/* <UserModal refetch={refetch} /> */}
      </div>
      {/* <UsersFilters /> */}
      <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white dark:bg-dark-bg">
        <ContactsTable />
      </div>
    </div>
  )
}

export default ContractsPage
