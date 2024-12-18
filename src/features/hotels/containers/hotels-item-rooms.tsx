import { PaginationProps, Table, TableColumnsType, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { IHotelsRoom } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import TickDoubleIcon from '@/components/icons/tick-double'
import StatusRoomTag from '../components/status-tag'

const columns: TableColumnsType<IHotelsRoom> = [
  {
    title: 'ID',
    dataIndex: 'id',
    className: 'text-center',
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 4,
    },
  },
  {
    title: 'common.type-number',
    dataIndex: 'typeNumber',
    sorter: {
      compare: (a, b) => a.typeNumber.localeCompare(b.typeNumber),
      multiple: 3,
    },
    render: val => (
      <div className="flex items-center gap-[10px]">
        <div className="size-[48px] bg-secondary-light border-border border rounded-[8px]" />
        <span className="text-[14px] text-primary-dark font-medium">{val}</span>
      </div>
    ),
  },
  {
    title: 'common.price-night',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 1,
    },
    render: val => <div>{formatAmount(val)} сум</div>,
  },
  {
    title: 'common.convenience',
    dataIndex: 'convenience',
    sorter: {
      compare: (a, b) => a.typeNumber.localeCompare(b.typeNumber),
      multiple: 1,
    },
    render: () => (
      <div className="text-sm text-[#4DD282] flex flex-col gap-2">
        <span className="flex items-center gap-1">
          <TickDoubleIcon />
          Завтрак включен
        </span>
        <span className="flex items-center gap-1">
          <TickDoubleIcon />
          Бесплатная отмена
        </span>
        <span className="flex items-center gap-1">
          <TickDoubleIcon />
          Нет предоплаты
        </span>
      </div>
    ),
  },
  {
    title: 'fields.status.label',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status.localeCompare(b.status),
      multiple: 1,
    },
    render: ({status}) => <StatusRoomTag status={status} />,
  },
]

const data: IHotelsRoom[] = [
  {
    key: '1',
    id: 1,
    typeNumber: 'Двухместный номер с 2 отдельными кроватями',
    price: 5320000,
    status: 'Свободный',
  },
  {
    key: '2',
    id: 2,
    typeNumber: 'Двухместный номер с 2 отдельными кроватями',
    price: 150,
    status: 'Забронировано',
  },
  {
    key: '3',
    id: 3,
    typeNumber: 'Двухместный номер с 2 отдельными кроватями',
    price: 5320000,
    status: 'Свободный',
  },
  {
    key: '4',
    id: 4,
    typeNumber: 'Двухместный номер с 2 отдельными кроватями',
    price: 130,
    status: 'Забронировано',
  },
]
const onChange: TableProps<IHotelsRoom>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}
const HotelsItemRooms = () => {
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
      <Table<IHotelsRoom>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
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

export default HotelsItemRooms
