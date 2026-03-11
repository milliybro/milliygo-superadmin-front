import { Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import VideoReplayIcon from '@/components/icons/video-replay'

const UProfilePage = () => {
  const { t } = useTranslation()

  //   const { openModal } = useUserModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: 'Мой профиль', href: ROUTE_PATHS.USERS },
    ])
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Typography.Text className="text-2xl font-semibold text-primary-dark">
              Мой профиль
            </Typography.Text>
            <Typography.Text className="flex items-center gap-1 text-base font-medium text-[#2563EB]">
              Иструкция <VideoReplayIcon />
            </Typography.Text>
          </div>
          <Typography.Text className="text-sm font-normal text-secondary">
            Настройте свой профиль под себя
          </Typography.Text>
        </div>
      </div>
      <div className="flex h-full flex-col gap-9 overflow-hidden rounded-[16px] border border-border bg-white p-6 dark:bg-dark-bg">
        <div className="flex flex-col gap-6">
          <Typography.Text className="text-xl font-bold">
            "LINAA HOTEL" oilaviy korxonasi
          </Typography.Text>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              Дата регистрации
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              7 января 2025 г.
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              Статус
            </Typography.Text>
            <div className="rounded-[32px] bg-[#4DD2821F] px-3 py-2 text-sm font-medium text-[#4DD282]">
              Активный
            </div>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              Регистрирующий орган
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              Центр государственных услуг
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              ИНН
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              311816876
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              ОПФ
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              120 - Семейное предприятие
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              СООГУ
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              79994 - Субъекты предпринимательства, не вошедшие в структуры
              органов государственного и хозяйственного управления
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              ОКЭД
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Typography.Text className="text-xl font-bold">
            Контактные данные
          </Typography.Text>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              Электронная почта
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              YOQ@MAIL.RU
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              Номер телефона
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              +998 90 732 2707
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="block w-[300px] text-base font-normal text-secondary">
              Адрес
            </Typography.Text>
            <Typography.Text className="text-base font-medium">
              Toshkent shahri, Chilonzor tumani Lutfiy MFY, Lutfiy 4-tor
              ko’chasi, 12-uy
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UProfilePage
