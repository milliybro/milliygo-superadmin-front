import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { IComplaintsTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'

const columns: TableColumnsType<IComplaintsTable> = [
  {
    title: 'common.hotel',
    dataIndex: 'hotelName',
    sorter: {
      compare: (a, b) => a.hotelName.localeCompare(b.hotelName),
      multiple: 4,
    },
  },
  {
    title: 'common.complaint',
    dataIndex: 'complaint',
    sorter: {
      compare: (a, b) => a.complaint.localeCompare(b.complaint),
      multiple: 3,
    },
  },
  {
    title: 'fields.user-fullname.label',
    dataIndex: 'userName',
    sorter: {
      compare: (a, b) => a.userName.localeCompare(b.userName),
      multiple: 2,
    },
  },
  {
    title: 'fields.date.label',
    dataIndex: 'date',
    sorter: {
      compare: (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      multiple: 1,
    },
  },
]

const data: IComplaintsTable[] = [
  {
    key: '1',
    hotelName: 'Oriente Palace Apartments',
    complaint: 'Неудобная кровать',
    userName: 'Иван Иванов',
    date: '2024-12-01',
  },
  {
    key: '2',
    hotelName: 'Grand Hotel',
    complaint: 'Грязный номер',
    userName: 'Петр Петров',
    date: '2024-11-30',
  },
  {
    key: '3',
    hotelName: 'City Inn',
    complaint: 'Шум от соседей',
    userName: 'Анна Смирнова',
    date: '2024-12-03',
  },
  {
    key: '4',
    hotelName: 'Sunset Resort',
    complaint: 'Плохое обслуживание',
    userName: 'Мария Иванова',
    date: '2024-12-02',
  },
]

const onChange: TableProps<IComplaintsTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const ComplaintsTable = () => {
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
    <Table<IComplaintsTable>
      columns={columns?.map(val => ({
        ...val,
        title: t(val.title as string),
      }))}
      dataSource={data}
      onChange={onChange}
      className="w-full h-full"
      rootClassName='custom-table'
      pagination={{
        pageSize: 10,
        total: 100,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],


        itemRender: itemRender,
      }}
    />
  )
}

export default ComplaintsTable
