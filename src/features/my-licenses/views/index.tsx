import { Button, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import VideoReplayIcon from '@/components/icons/video-replay'

const MyLicensesPage = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: 'Мои лицензии', href: ROUTE_PATHS.USERS },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex gap-3 items-center">
            <Typography.Text className="text-[24px] text-primary-dark font-semibold">
              Мои лицензии
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500] text-[#2563EB] flex items-center gap-1">
              Иструкция <VideoReplayIcon />
            </Typography.Text>
          </div>
          <Typography.Text className="text-[14px] font-[400] text-secondary">
            Настройте свой профиль под себя
          </Typography.Text>
        </div>
      </div>
      <div className="bg-white border flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] h-full p-6 flex flex-col gap-9">
        <div className="flex flex-col gap-6">
          <Typography.Text className="text-[20px] font-[700]">
            Лицензия (ИНН)
          </Typography.Text>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              ИНН юридического лица
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              7 января 2025 г.
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Название субъекта предпринимательства
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              7 января 2025 г.
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Дата регистрации
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              Центр государственных услуг
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Номер сертификата
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              311816876
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Номер сертификата
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              120 - Семейное предприятие
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Организационно-правовая форма
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              79994 - Субъекты предпринимательства, не вошедшие в структуры
              органов государственного и хозяйственного управления
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Домашний адрес (регион)
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Организационно-правовая форма
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Домашний адрес
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Адрес регистрации бизнеса (регион)
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Адрес регистрации бизнеса (район)
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
          <Button className="w-fit" size="large" type="primary">
            Заключить договор
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyLicensesPage
