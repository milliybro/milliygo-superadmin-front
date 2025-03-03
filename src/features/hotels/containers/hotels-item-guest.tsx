import { PaginationProps, Table, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'

import { twMerge } from 'tailwind-merge'
import { IGuestsTable, IHotelsGuests } from '../types'
import HotelsItemTableActionButton from '../components/hotels-items-table-action'
import { useQuery } from '@tanstack/react-query'
import { getHotelManagementGuests } from '../api'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import formatDate from '@/features/clients/components/format-date'
import GuestModal from '../components/guest-modal'
import GuestsNotFound from '../components/guest-not-found'

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

// const onChange: TableProps<IGuestsTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
//   console.log('params', pagination, filters, sorter, extra)
// }

const HotelsItemGuest = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams] = useSearchParams()

  const columns: TableColumnsType<IGuestsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
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
      width: 170,
      sorter: {
        compare: (a, b) => a.checkInOut.localeCompare(b.checkInOut),
        multiple: 1,
      },
      render: val => <div>{val}</div>,
    },
    {
      width: 200,
      title: 'common.action',
      dataIndex: 'id',
      render: id => <HotelsItemTableActionButton id={id} />,
    },
  ]
  console.log(setCurrentPage, setPageSize)

  // const { data: guests } = useQuery({
  //   queryKey: ['hotel-guests', id, currentPage],
  //   queryFn: async () => {
  //     if (!id) throw new Error('ID is required')
  //     const res = await getHotelGuests(
  //       { page_size: 10, page: currentPage },
  //       Number(id),
  //     )
  //     return res
  //   },
  //   enabled: !!id,
  // })
  const tenant_id = searchParams.get('tenant_id')
  const type = searchParams.get('type')

  const lang = localStorage.getItem('i18nextLng')

  

  const { data: guests } = useQuery({
    queryKey: ['hotel-guests', id, currentPage, lang],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelManagementGuests(
        {
          id: id,
          page_size: 10,
          page: currentPage,
          ...(type === 'management' ? { tenant_id: tenant_id } : {}),
          type: type,
        },
        // Number(id),
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
      fullName: guest?.full_name,
      citizenship: guest?.citizenship || 'N/A',
      nation: guest?.nationality || 'N/A',
      birthdate: guest?.birth_date || 'N/A',
      passport: guest?.passport || 'N/A',
      checkInOut:
        guest?.start_date && guest?.end_date
          ? `${formatDate(guest.start_date)} - ${formatDate(guest.end_date)}`
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
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div>
      <Table<IGuestsTable>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={
          guests ? transformHotelDetailsToTableData(guests as any) : []
        }
        onChange={pagination => handlePaginationChange(pagination.current!)}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: guests?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
          itemRender: itemRender,
          onChange: handlePaginationChange,
        }}
        locale={{
          emptyText: <GuestsNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
      />
      <GuestModal />

    </div>
  )
}

export default HotelsItemGuest
