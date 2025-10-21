import { Divider, Image } from 'antd'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import CloseIcon from '@/components/icons/close-icon'
import ArrowUpRightIcon from '@/components/icons/arrow-up-right'
import { formatAmount } from '@/helpers/format-amount'
import formatDate from './format-date'

const ClientsItemHotelCard = ({ items }: { items: any }) => {
  const { t } = useTranslation()

  const calculateDaysDifference = (
    startDate: string,
    endDate: string,
  ): number => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    if (isNaN(start) || isNaN(end)) return 0

    const differenceInMilliseconds = end - start
    return differenceInMilliseconds / (1000 * 60 * 60 * 24)
  }

  const daysCount = calculateDaysDifference(items?.start_date, items?.end_date)

  return (
    <div className="flex gap-4 rounded-[12px] border border-b-border p-4">
      <Image
        width={120}
        height={120}
        src={items?.image}
        className="size-[120px] shrink-0 rounded-[12px] border border-border bg-secondary-light object-cover"
        // style={{
        //   boxShadow:
        //     '0px 20px 13px 0px rgba(0, 0, 0, 0.03), 0px 8px 5px 0px rgba(0, 0, 0, 0.08)',
        // }}
      />

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-[10px]">
            <span className="text-2xl font-semibold text-primary-dark">
              {items?.name}
            </span>
            <RatingTag value={items?.avg_rating} icon />
          </div>
          <Link
            to={'/'}
            className="flex items-center gap-1 text-end text-primary underline"
          >
            {items?.address}
            <ArrowUpRightIcon className="text-lg" />
          </Link>
        </div>
        <div className="flex items-center text-sm text-secondary">
          <span>
            {t('fields.check-in-time.label')} {formatDate(items?.start_date)}
          </span>
          <Divider type="vertical" className="mx-2 border-secondary/50" />
          <span>
            {t('fields.check-out-time.label')} {formatDate(items?.end_date)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="text-lg font-semibold text-primary-dark">
              {items?.room_type}
            </span>
            <span className="rounded-[6px] border border-secondary px-2 py-0.5 text-xs text-secondary">
              {items?.room_number}
            </span>
            <span className="text-sm text-secondary">
              {formatAmount(items?.total_price) || 0} UZS
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-secondary">
            <CloseIcon className="text-base" />
            {t('common.nights-count', { count: daysCount })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ClientsItemHotelCard
