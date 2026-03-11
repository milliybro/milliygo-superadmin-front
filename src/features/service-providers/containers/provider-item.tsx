import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import ProviderItemTable from '../components/item-table'
import DefaultImageIcon from '@/components/icons/default-image'
import { useQuery } from '@tanstack/react-query'
import { getOrganizationTypes } from '../api'
import { Typography } from 'antd'
import DownloadIcon from '@/components/icons/download-icon'
import MailAtSignIcon from '@/components/icons/mail-at-sign'
import ContactIcon from '@/components/icons/contact-icon'
import StatusIcon from '@/components/icons/status-icon'
import FilesIcon from '@/components/icons/files-icon'

const ProviderItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: t('routes.service-providers'),
        href: ROUTE_PATHS.SERVICE_PROVIDERS,
      },
      {
        title: t('common.booking'),
      },
    ])
  }, [])

  const { data } = useQuery({
    queryKey: ['organization-types'], //o'zgaradi
    queryFn: () => getOrganizationTypes(),
    refetchOnWindowFocus: false,
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold text-primary-dark">
            {t('common.booking')}{' '}
            <span className="text-[#2563EB]">«Миллий Травел» MCHJ</span>
          </div>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-3 gap-4">
        <div className="col-span-2 overflow-hidden rounded-[16px] border border-border bg-white dark:bg-dark-bg">
          <ProviderItemTable />
        </div>
        <div className="flex flex-col overflow-hidden rounded-[16px] border border-border bg-white px-4 py-6 dark:bg-dark-bg">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 h-[120px] w-[120px] rounded-[20px]">
              {data?.image ? (
                <img
                  className="h-[120px] w-[120px] shrink-0 rounded-[8px] object-cover"
                  src={data?.image}
                  alt=""
                />
              ) : (
                <div className="flex size-[120px] items-center justify-center rounded-[8px] border border-border bg-secondary-light">
                  <DefaultImageIcon className="size-[48px]" />
                </div>
              )}
            </div>

            <Typography.Text className="text-[18px] font-semibold">
              Миллий Травел MCHJ
            </Typography.Text>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex w-full items-center gap-3 rounded-[12px] bg-[#F8FAFC] p-4">
              <MailAtSignIcon />
              <Typography.Text className="text-[14px] text-[#1F2937]">
                milliytravel@gmail.com
              </Typography.Text>
            </div>
            <div className="flex w-full items-center gap-3 rounded-[12px] bg-[#F8FAFC] p-4">
              <ContactIcon />
              <Typography.Text className="text-[14px] text-[#1F2937]">
                +998 90 707 15 15
              </Typography.Text>
            </div>
            <div className="flex w-full items-center gap-3 rounded-[12px] bg-[#F8FAFC] p-4">
              <div className="flex w-full items-center gap-3">
                <StatusIcon />
                <Typography.Text className="text-[14px] text-[#1F2937]">
                  Статус
                </Typography.Text>
              </div>
              <div className="rounded-[6px] bg-[#DBEAFE] px-[10px] py-[6px] text-[12px] font-medium text-[#1E40AF]">
                Активен
              </div>
            </div>
            <div className="flex w-full items-center gap-3 rounded-[12px] bg-[#F8FAFC] p-4">
              <div className="flex w-full items-center gap-3">
                <FilesIcon />
                <Typography.Text className="text-[14px] text-[#1F2937]">
                  Сертификат.pdf
                </Typography.Text>
              </div>
              <div>
                <DownloadIcon className="text-[24px] text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderItem
