import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { IHotelsTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'

const columns: TableColumnsType<IHotelsTable> = [
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
    title: 'fields.hotel-name.label',
    dataIndex: 'hotelName',
    sorter: {
      compare: (a, b) => a.hotelName.localeCompare(b.hotelName),
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
    title: 'fields.location.label',
    dataIndex: 'location',
    sorter: {
      compare: (a, b) => a.location.localeCompare(b.location),
      multiple: 2,
    },
  },
  {
    title: 'fields.price.label',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 1,
    },
  },
  {
    title: 'fields.rating.label',
    dataIndex: 'rating',
    sorter: {
      compare: (a, b) => a.rating - b.rating,
      multiple: 1,
    },
    render: () => <RatingTag value={8.9} />,
  },
  {
    title: 'fields.login.label',
    dataIndex: 'login',
    sorter: {
      compare: (a, b) => a.login.localeCompare(b.login),
      multiple: 1,
    },
  },
  {
    title: 'fields.password.label',
    dataIndex: 'password',
    sorter: {
      compare: (a, b) => a.password.localeCompare(b.password),
      multiple: 1,
    },
  },
  {
    title: 'fields.contact-person.label',
    dataIndex: 'contactPerson',
    sorter: {
      compare: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
      multiple: 1,
    },
  },
  {
    title: 'fields.status.label',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status.localeCompare(b.status),
      multiple: 1,
    },
    render: () => <StatusTag active />,
  },
  {
    title: 'fields.balance.label',
    dataIndex: 'balance',
    sorter: {
      compare: (a, b) => a.balance - b.balance,
      multiple: 1,
    },
  },
  {
    width: 1,
    title: 'common.action',
    dataIndex: 'id',
    render: val => <HotelsTableActionButton id={val} />,
  },
]

const data: IHotelsTable[] = [
  {
    key: '1',
    id: 1,
    hotelName: 'Radisson BLU',
    location: 'Tashkent',
    price: 120,
    rating: 8.9,
    login: 'john.doe',
    password: '********',
    contactPerson: 'John Brown',
    status: 'Active',
    balance: 500,
  },
  {
    key: '2',
    id: 2,
    hotelName: 'Hilton',
    location: 'Samarkand',
    price: 150,
    rating: 9.2,
    login: 'jim.green',
    password: '********',
    contactPerson: 'Jim Green',
    status: 'Inactive',
    balance: 300,
  },
  {
    key: '3',
    id: 3,
    hotelName: 'Hyatt Regency',
    location: 'Bukhara',
    price: 100,
    rating: 8.5,
    login: 'joe.black',
    password: '********',
    contactPerson: 'Joe Black',
    status: 'Active',
    balance: 400,
  },
  {
    key: '4',
    id: 4,
    hotelName: 'Sheraton',
    location: 'Khiva',
    price: 130,
    rating: 9.0,
    login: 'jim.red',
    password: '********',
    contactPerson: 'Jim Red',
    status: 'Pending',
    balance: 600,
  },
]

const onChange: TableProps<IHotelsTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsTable = () => {
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
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IHotelsTable>
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

export default HotelsTable
