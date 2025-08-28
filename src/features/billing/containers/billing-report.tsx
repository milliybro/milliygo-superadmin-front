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
      hotel_name: 'UZBEKISTAN Airways',
      tin: 34,
      fund_number: 34,
      number_beds: 66,
      stars: 5,
      guest_count: 2,
      spent_day: '5%',
      bca: 375000,
      tour_fee: 119000,
      accrued_days: 20000,
      total_sum: 51000000,
    },
    {
      id: 2,
      hotel_name: 'UZBEKISTAN Airways',
      tin: 34,
      fund_number: 34,
      number_beds: 66,
      stars: 5,
      guest_count: 2,
      spent_day: '5%',
      bca: 375000,
      tour_fee: 119000,
      accrued_days: 20000,
      total_sum: 51000000,
    },
  ],
}
const BillingReportTable = ({
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
      title: 'billing.hotel',
      dataIndex: 'hotel_name',
      sorter: true,
    },
    {
      title: 'common.tin',
      dataIndex: 'tin',
      sorter: true,
    },
    {
      title: 'billing.fund_number',
      dataIndex: 'fund_number',
      sorter: true,
    },
    {
      title: 'billing.number_beds',
      dataIndex: 'number_beds',
      sorter: true,
    },
    {
      title: 'billing.stars',
      dataIndex: 'stars',
      sorter: true,
    },
    {
      title: 'billing.guest-count',
      dataIndex: 'guest_count',
      sorter: true,
    },
    {
      title: 'billing.spent-day',
      dataIndex: 'spent_day',
      sorter: true,
    },
    {
      title: 'billing.bca',
      dataIndex: 'bca',
      sorter: true,
    },
    {
      title: 'billing.tour-fee',
      dataIndex: 'tour_fee',
      sorter: true,
    },
    {
      title: 'billing.accrued-days',
      dataIndex: 'accrued_days',
      sorter: true,
    },
    {
      title: 'billing.total-sum',
      dataIndex: 'total_sum',
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
      hotel_name: item.hotel_name,
      tin: item.tin,
      fund_number: item.fund_number,
      number_beds: item.number_beds,
      stars: item.stars,
      guest_count: item.guest_count,
      spent_day: item.spent_day,
      bca: item.bca,
      tour_fee: item.tour_fee,
      accrued_days: item.accrued_days,
      total_sum: item.total_sum,
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

export default BillingReportTable
