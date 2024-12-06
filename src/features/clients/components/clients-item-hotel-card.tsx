import { Divider } from 'antd'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import CloseIcon from '@/components/icons/close-icon'
import ArrowUpRightIcon from '@/components/icons/arrow-up-right'

const ClientsItemHotelCard = () => {
  const { t } = useTranslation()

  return (
    <div className="border border-b-border gap-4 flex p-4 rounded-[12px]">
      <div
        className="size-[120px] border-border border bg-secondary-light rounded-[12px] shrink-0"
        // style={{
        //   boxShadow:
        //     '0px 20px 13px 0px rgba(0, 0, 0, 0.03), 0px 8px 5px 0px rgba(0, 0, 0, 0.08)',
        // }}
      />

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-[10px]">
            <span className="text-[24px] font-semibold text-primary-dark">
              Hyatt Regency Tashkent
            </span>
            <RatingTag value={8.9} icon />
          </div>
          <Link
            to={'/'}
            className="underline text-primary flex items-center gap-1"
          >
            BoyKurgon Street 2, 100014, Tashkent{' '}
            <ArrowUpRightIcon className="text-[18px]" />
          </Link>
        </div>
        <div className="flex items-center text-[14px] text-secondary">
          <span>{t('fields.check-in-time.label')} 9 янв, 2024</span>
          <Divider type="vertical" className="mx-2 border-secondary/50" />
          <span>{t('fields.check-out-time.label')} 22 янв, 2024</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="text-[18px] text-primary-dark font-semibold">
              TWIN DLX
            </span>
            <span className="px-2 py-0.5 border-secondary text-[12px] text-secondary border rounded-[6px]">
              DLX 123
            </span>
            <span className="text-secondary text-[14px]">2 729 000 UZS</span>
          </div>
          <span className="inline-flex items-center gap-1 text-secondary text-[14px]">
            <CloseIcon className="text-[16px]" />
            {t('common.nights-count', { count: 13 })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ClientsItemHotelCard
