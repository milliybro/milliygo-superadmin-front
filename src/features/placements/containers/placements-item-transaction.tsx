import { Divider, PaginationProps, Table, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import CheckMarkIcon from '@/components/icons/check-mark-icon'
import PaymentSuccessIcon from '@/components/icons/payment-success-icon'
import { formatAmount } from '@/helpers/format-amount'
import StatusRoomTag from '../components/status-tag'
import { IGuestsTransaction } from '../types'

const columns: TableColumnsType<IGuestsTransaction> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: false,
  },
  {
    title: 'common.fullName-guest',
    dataIndex: 'fullName',
    sorter: false,
  },
  {
    title: 'common.payment-method',
    dataIndex: 'payment',
    sorter: false,
  },
  {
    title: 'common.room',
    dataIndex: 'room',
    sorter: false,
  },
  {
    title: 'common.payment-amount',
    dataIndex: 'paymentAmount',
    sorter: false,
    render: val => <div>{formatAmount(val)} UZS</div>,
  },
  {
    title: 'fields.status.label',
    dataIndex: 'status',
    render: status => <StatusRoomTag status={status} />,
  },
  {
    title: 'common.date-and-time',
    dataIndex: 'checkInOut',
    sorter: false,
  },
]

const data: IGuestsTransaction[] = [
  {
    key: '1',
    id: '#TX123',
    fullName: 'Alisher Makhmudov',
    payment: 'Наличные',
    room: 'Двухместный номер с 2 отдельными кроватями',
    paymentAmount: 5000000,
    checkInOut: '11.11.2024 14:45',
    status: 'Подтвержден',
  },
  {
    key: '2',
    id: '#TX124',
    fullName: 'Victor Chernov',
    payment: 'Кредитная карта',
    room: 'Двухместный номер с 2 отдельными кроватями',
    paymentAmount: 5000000,
    checkInOut: '11.11.2024 14:45',
    status: 'В ожидании',
  },
  {
    key: '3',
    id: '#TX125',
    fullName: 'Andrei Galkin',
    payment: 'Онлайн оплата',
    room: 'Двухместный номер с 2 отдельными кроватями',
    paymentAmount: 5000000,
    checkInOut: '11.11.2024 14:45',
    status: 'Отменен',
  },
  {
    key: '4',
    id: '#TX126',
    fullName: 'Alexandra Penova',
    payment: 'Наличные',
    room: 'Двухместный номер с 2 отдельными кроватями',
    paymentAmount: 5000000,
    checkInOut: '11.11.2024 14:45',
    status: 'Свободный',
  },
]

const PlacementsItemTransactions = () => {
  const { t } = useTranslation()

  const itemRender: PaginationProps['itemRender'] = (
    n,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <span
          className={twMerge(
            'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary duration-200',
            n === 0 ? 'pointer-events-none opacity-0' : '',
          )}
        >
          {t('common.prev')}
        </span>
      )
    }
    if (type === 'next') {
      return (
        <span
          className={twMerge(
            'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary',
            n === 10 ? 'pointer-events-none opacity-0' : '',
          )}
        >
          {t('common.next')}
        </span>
      )
    }

    return originalElement
  }
  return (
    <div>
      <div className="rounded-[12px] border-[1px] p-6">
        <div>
          <p className="text-base font-normal text-[#777E90]">
            {t('fields.balance.label')}
          </p>
          <h1 className="text-2xl font-semibold text-[#0A0D2C]">
            {formatAmount(514350000)} UZS
          </h1>
        </div>
        <Divider className="" />
        <div className="flex gap-4">
          <div className="flex w-full justify-between rounded-xl border bg-[#F8F8FA] p-3">
            <div className="flex items-center gap-4 text-sm font-normal text-[#777E90]">
              <CheckMarkIcon />
              {t('common.approved')}
            </div>
            <p className="text-sm font-medium text-[#0A0D2C]">
              {formatAmount(365984365)} UZS
            </p>
          </div>
          <div className="flex w-full justify-between rounded-xl border bg-[#F8F8FA] p-3">
            <div className="flex items-center gap-4 text-sm font-normal text-[#777E90]">
              <PaymentSuccessIcon />
              {t('common.accrued')}
            </div>
            <p className="text-sm font-medium text-[#0A0D2C]">
              {formatAmount(148365635)} UZS
            </p>
          </div>
        </div>
      </div>
      <Table<IGuestsTransaction>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={data}
        className="h-full w-full"
        pagination={{
          pageSize: 10,
          total: 100,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],

          itemRender: itemRender,
        }}
      />
    </div>
  )
}

export default PlacementsItemTransactions
