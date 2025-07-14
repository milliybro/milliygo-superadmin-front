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
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex gap-3 items-center">
            <Typography.Text className="text-[24px] text-primary-dark font-semibold">
              Мой профиль
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
            "LINAA HOTEL" oilaviy korxonasi
          </Typography.Text>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Дата регистрации
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              7 января 2025 г.
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Статус
            </Typography.Text>
            <div className="text-[#4DD282] text-[14px] font-[500] rounded-[32px] py-2 px-3 bg-[#4DD2821F]">
              Активный
            </div>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Регистрирующий орган
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              Центр государственных услуг
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              ИНН
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              311816876
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              ОПФ
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              120 - Семейное предприятие
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              СООГУ
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              79994 - Субъекты предпринимательства, не вошедшие в структуры
              органов государственного и хозяйственного управления
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              ОКЭД
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              55100 - Гостиницы и аналогичные места проживания
            </Typography.Text>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Typography.Text className="text-[20px] font-[700]">
            Контактные данные
          </Typography.Text>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Электронная почта
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              YOQ@MAIL.RU
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Номер телефона
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
              +998 90 732 2707
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <Typography.Text className="text-[16px] font-[400] text-secondary w-[300px] block">
              Адрес
            </Typography.Text>
            <Typography.Text className="text-[16px] font-[500]">
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
