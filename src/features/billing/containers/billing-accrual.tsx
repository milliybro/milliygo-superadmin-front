import type { PaginationProps, TableColumnsType } from 'antd'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import UsersNotFound from '@/features/users/components/users-not-found'

import type { IGuidesTable } from '../types'
import GuideViewModal from '@/features/guides/components/guide-view-modal'

const staticBillingData = {
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
const BillingAccrualTable = ({
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
    })) || []

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white">
      <Table<any>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedTenantsData}
        className="h-full w-full"
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
      <GuideViewModal />
    </div>
  )
}

export default BillingAccrualTable
