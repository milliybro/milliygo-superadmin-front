import type { PaginationProps, TableColumnsType } from 'antd'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import UsersNotFound from '@/features/users/components/users-not-found'

import type { IGuidesTable } from '../types'

const staticBillingData = {
  count: 2,
  results: [
    {
      id: 1,
      region: 'Ташкент',
      city: 'Юнусабадский',
      hotel_name: 'UZBEKISTAN Airways',
      date: '2025-06-30',
      contract: '2348945',
      operation: '23',
      pay_number: 8695400345,
      sum: 490003000,
      accountant: 'Alexandra Penova',
      note: 'Должно быть некоторое количество остатков для максимум 2 строк',
    },
    {
      id: 2,
      region: 'Ташкент',
      city: 'Юнусабадский',
      hotel_name: 'UZBEKISTAN Airways',
      date: '2025-06-30',
      contract: '2348945',
      operation: '23',
      pay_number: 8695400345,
      sum: 490003000,
      accountant: 'Alexandra Penova',
      note: 'Должно быть некоторое количество остатков для максимум 2 строк',
    },
  ],
}
const BillingPaymentsTable = ({
  guidesData,
  currentPage,
  setCurrentPage,
  isLoading,
  pageSize,
}: any) => {
  const { t } = useTranslation()
  const columns: TableColumnsType<IGuidesTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: false,
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
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
      title: 'fields.date.label',
      dataIndex: 'date',
      sorter: true,
    },
    {
      title: 'billing.contract',
      dataIndex: 'contract',
      sorter: true,
    },
    {
      title: 'billing.operation',
      dataIndex: 'operation',
      sorter: true,
    },
    {
      title: 'billing.pay_number',
      dataIndex: 'pay_number',
      sorter: true,
    },
    {
      title: 'billing.sum',
      dataIndex: 'sum',
      sorter: true,
    },
    {
      title: 'billing.accountant',
      dataIndex: 'accountant',
      sorter: true,
    },
    {
      title: 'billing.note',
      dataIndex: 'note',
      sorter: true,
    },
  ]

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

  const transformedTenantsData =
    staticBillingData?.results.map((item: any) => ({
      key: item.id,
      id: item.id,
      region: item.region,
      city: item.city,
      hotel_name: item.hotel_name,
      month_year: item.month_year,
      accrual_type: item.accrual_type,
      count: item.count,
      accrued: item.accrued,
      date: item.date,
      contract: item.contract,
      operation: item.operation,
      pay_number: item.pay_number,
      sum: item.sum,
      accountant: item.accountant,
      note: item.note,
    })) || []

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<any>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedTenantsData}
        className="w-full h-full"
        bordered
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: guidesData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
          itemRender: itemRender,
          onChange: handlePaginationChange,
        }}
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
      />
    </div>
  )
}

export default BillingPaymentsTable
