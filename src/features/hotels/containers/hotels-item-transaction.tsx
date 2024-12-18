import {
  Divider,
  PaginationProps,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { twMerge } from 'tailwind-merge'
import { IGuestsTransaction } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import StatusRoomTag from '../components/status-tag'
import CheckMarkIcon from '@/components/icons/check-mark-icon'
import PaymentSuccessIcon from '@/components/icons/payment-success-icon'

const columns: TableColumnsType<IGuestsTransaction> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 3,
    },
  },
  {
    title: 'common.fullName-guest',
    dataIndex: 'fullName',
    sorter: {
      compare: (a, b) => a.fullName.localeCompare(b.fullName),
      multiple: 3,
    },
  },
  {
    title: 'common.payment-method',
    dataIndex: 'payment',
    sorter: {
      compare: (a, b) => a.payment.localeCompare(b.payment),
      multiple: 2,
    },
  },
  {
    title: 'common.room',
    dataIndex: 'room',
    sorter: {
      compare: (a, b) => a.room.localeCompare(b.room),
      multiple: 1,
    },
  },
  {
    title: 'common.payment-amount',
    dataIndex: 'paymentAmount',
    sorter: {
      compare: (a, b) => a.paymentAmount - b.paymentAmount,
      multiple: 1,
    },
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
    sorter: {
      compare: (a, b) => a.checkInOut.localeCompare(b.checkInOut),
      multiple: 1,
    },
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

const onChange: TableProps<IGuestsTransaction>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsItemTransactions = () => {
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
            'px-[16px] select-none duration-200 py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
            n === 0 ? 'opacity-0 pointer-events-none' : '',
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
            'px-[16px] select-none py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
            n === 10 ? 'opacity-0 pointer-events-none' : '',
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
      <div className="p-6 border-[1px] rounded-[12px]">
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
          <div className="w-full p-3 rounded-xl border bg-[#F8F8FA] flex justify-between">
            <div className="flex items-center gap-4 text-sm font-normal text-[#777E90]">
              <CheckMarkIcon />
              {t('common.approved')}
            </div>
            <p className="text-[#0A0D2C] text-[15px] font-medium">
              {formatAmount(365984365)} UZS
            </p>
          </div>
          <div className=" w-full p-3 rounded-xl border bg-[#F8F8FA] flex justify-between">
            <div className="flex items-center gap-4 text-sm font-normal text-[#777E90]">
              <PaymentSuccessIcon />
              {t('common.accrued')}
            </div>
            <p className="text-[#0A0D2C] text-[15px] font-medium">
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
        onChange={onChange}
        className="w-full h-full"
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

export default HotelsItemTransactions
