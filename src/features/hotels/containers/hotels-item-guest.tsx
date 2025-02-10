import { PaginationProps, Table, TableColumnsType, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'

import { twMerge } from 'tailwind-merge'
import { IGuestsTable, IHotelsGuests } from '../types'
import HotelsItemTableActionButton from '../components/hotels-items-table-action'
import { useQuery } from '@tanstack/react-query'
import { getHotelGuests } from '../api'
import { useState } from 'react'
import { useParams } from 'react-router'

// interface IHotelDetailGuests {
//   id: number
//   first_name: string
//   last_name: string
//   citizenship: string
//   nationality: string
//   birth_date: string
//   passport: string
//   check_in: string
//   check_out: string
// }

const columns: TableColumnsType<IGuestsTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a: any, b: any) => a.id - b.id,
      multiple: 1,
    },
  },
  {
    title: 'fields.fullname.label',
    dataIndex: 'fullName',
    sorter: {
      compare: (a, b) => a.fullName.localeCompare(b.fullName),
      multiple: 3,
    },
  },
  {
    title: 'fields.citizenship.label',
    dataIndex: 'citizenship',
    sorter: {
      compare: (a, b) => a.citizenship.localeCompare(b.citizenship),
      multiple: 2,
    },
  },
  {
    title: 'common.nation',
    dataIndex: 'nation',
    sorter: {
      compare: (a, b) => a.nation.localeCompare(b.nation),
      multiple: 1,
    },
  },
  {
    title: 'common.birthdate',
    dataIndex: 'birthdate',
    sorter: {
      compare: (a, b) => a.birthdate.localeCompare(b.birthdate),
      multiple: 1,
    },
    render: text => {
      if (!text) return '-'
      const date = new Date(text)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    },
  },
  {
    title: 'common.passport',
    dataIndex: 'passport',
    sorter: {
      compare: (a, b) => a.passport.localeCompare(b.passport),
      multiple: 1,
    },
  },
  {
    title: 'common.check-in-out',
    dataIndex: 'checkInOut',
    sorter: {
      compare: (a, b) => a.checkInOut.localeCompare(b.checkInOut),
      multiple: 1,
    },
  },
  {
    width: 200,
    title: 'common.action',
    dataIndex: 'id',
    render: id => <HotelsItemTableActionButton id={id} />,
  },
]

const onChange: TableProps<IGuestsTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsItemGuest = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  console.log(setCurrentPage, setPageSize)

  const { data: guests } = useQuery({
    queryKey: ['hotel-guests', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelGuests(
        { page_size: 10, page: currentPage },
        Number(id),
      )
      return res
    },
    enabled: !!id,
  })

  function transformHotelDetailsToTableData(
    guests: IHotelsGuests[],
  ): IGuestsTable[] {
    return guests.map(guest => ({
      key: guest?.id,
      id: guest?.id || 'N/A',
      fullName: `${guest?.first_name || ''} ${guest?.last_name || ''}`.trim(),
      citizenship: guest?.citizenship || 'Unknown',
      nation: guest?.nationality || 'Unknown',
      birthdate: guest?.birth_date || 'N/A',
      passport: guest?.passport || 'N/A',
      checkInOut:
        guest?.check_in && guest?.check_out
          ? `${guest.check_in} - ${guest.check_out}`
          : '-',
    }))
  }

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
      <Table<IGuestsTable>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={
          guests?.results
            ? transformHotelDetailsToTableData(guests.results as any)
            : []
        }
        onChange={onChange}
        className="w-full h-full"
        pagination={{
          pageSize: pageSize,
          total: guests?.count,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],

          itemRender: itemRender,
        }}
      />
    </div>
  )
}

export default HotelsItemGuest
