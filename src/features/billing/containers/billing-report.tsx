import type { PaginationProps, TableColumnsType } from 'antd'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import UsersNotFound from '@/features/users/components/users-not-found'

import type { IGuidesTable } from '../types'
import GuideViewModal from '../components/guide-view-modal'

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
      sorter: false,
    },
    {
      title: 'common.tin',
      dataIndex: 'tin',
      sorter: false,
    },
    {
      title: 'billing.fund_number',
      dataIndex: 'fund_number',
      sorter: false,
    },
    {
      title: 'billing.number_beds',
      dataIndex: 'number_beds',
      sorter: false,
    },
    {
      title: 'billing.stars',
      dataIndex: 'stars',
      sorter: false,
    },
    {
      title: 'billing.guest-count',
      dataIndex: 'guest_count',
      sorter: false,
    },
    {
      title: 'billing.spent-day',
      dataIndex: 'spent_day',
      sorter: false,
    },
    {
      title: 'billing.bca',
      dataIndex: 'bca',
      sorter: false,
    },
    {
      title: 'billing.tour-fee',
      dataIndex: 'tour_fee',
      sorter: false,
    },
    {
      title: 'billing.accrued-days',
      dataIndex: 'accrued_days',
      sorter: false,
    },
    {
      title: 'billing.total-sum',
      dataIndex: 'total_sum',
      sorter: false,
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
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<any>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedTenantsData}
        className="w-full h-full"
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
