import { Dispatch, SetStateAction, useState } from 'react'
import { Table, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { IBillingReport } from '@/features/billing/types'
import { PaginationProps } from 'antd/lib'
import { twMerge } from 'tailwind-merge'
<<<<<<< HEAD
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'
=======
import UsersNotFound from '@/features/users/components/users-not-found'
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972

const PAGE_SIZE = 10
const STATIC_BILLING_DATA = {
  count: 2,
  results: [
    {
      id: 1,
      region: 'Ташкент',
      city: 'Юнусабадский',
      hotel_name: 'UZBEKISTAN Airways',
      month_year: 'Апрель 2024 г.',
      accrual_type: 'Наличный',
      count: 24,
      accrued: 2416131,
      date: '2025-06-30',
    },
    {
      id: 2,
      region: 'Ташкент',
      city: 'Юнусабадский',
      hotel_name: 'UZBEKISTAN Airways',
      month_year: 'Апрель 2024 г.',
      accrual_type: 'Наличный',
      count: 24,
      accrued: 2416131,
      date: '2025-06-30',
    },
  ],
}

type ReportsTableProps = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const ReportsTable = ({ currentPage, setCurrentPage }: ReportsTableProps) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IBillingReport> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: false,
      render: (_text, _record, index) =>
        (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: 'billing.region',
      dataIndex: 'region',
      sorter: true,
    },
    {
      title: 'billing.city',
      dataIndex: 'city',
      sorter: true,
    },
    {
      title: 'billing.hotel',
      dataIndex: 'hotel_name',
      sorter: true,
    },
    {
      title: 'billing.month-year',
      dataIndex: 'month_year',
      sorter: true,
    },
    {
      title: 'billing.accrual-type',
      dataIndex: 'accrual_type',
      sorter: true,
    },
    {
      title: 'billing.count',
      dataIndex: 'count',
      sorter: true,
    },
    {
      title: 'billing.accrued',
      dataIndex: 'accrued',
      sorter: true,
    },
    {
      title: 'fields.date.label',
      dataIndex: 'date',
      sorter: true,
    },
  ]

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
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
    <Table<any>
      bordered
      loading={false}
      dataSource={STATIC_BILLING_DATA?.results}
      scroll={{ x: 'max-content' }}
      columns={columns?.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      pagination={{
        pageSize: PAGE_SIZE,
        current: currentPage,
        hideOnSinglePage: true,
        showSizeChanger: false,
        itemRender: itemRender,
        position: ['bottomCenter'],
        onChange: handlePaginationChange,
        total: STATIC_BILLING_DATA?.count || 0,
      }}
      locale={{
        emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
}

export default ReportsTable
