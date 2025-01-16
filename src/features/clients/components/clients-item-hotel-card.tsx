import { Divider } from 'antd'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import CloseIcon from '@/components/icons/close-icon'
import ArrowUpRightIcon from '@/components/icons/arrow-up-right'
import { formatAmount } from '@/helpers/format-amount'

const ClientsItemHotelCard = ({ items }: { items: any }) => {
  const { t } = useTranslation()
  console.log(items)
  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }
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
              {items?.placement?.name}
            </span>
            <RatingTag value={items?.placement?.star_rating} icon />
          </div>
          <Link
            to={'/'}
            className="underline text-primary flex items-center gap-1"
          >
            {items?.placement?.address}
            <ArrowUpRightIcon className="text-[18px]" />
          </Link>
        </div>
        <div className="flex items-center text-[14px] text-secondary">
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
            <span className="text-[18px] text-primary-dark font-semibold">
              TWIN DLX
            </span>
            <span className="px-2 py-0.5 border-secondary text-[12px] text-secondary border rounded-[6px]">
              DLX 123
            </span>
            <span className="text-secondary text-[14px]">
              {formatAmount(items?.items[0]?.subtotal) || 0} UZS
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-secondary text-[14px]">
            <CloseIcon className="text-[16px]" />
            {t('common.nights-count', { count: daysCount })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ClientsItemHotelCard
