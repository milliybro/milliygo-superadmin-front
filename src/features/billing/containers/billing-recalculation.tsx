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
      region: 'Ташкент',
      hotel_name: 'UZBEKISTAN Airways',
      tip: 'Санаторий',
      pay_number: 8695400345,
      start_period: '2025-06-30',
      end_period: '2025-06-30',
      note: 'с 01-06-2018 был изменен сертификат, а именно звезды-4, 18%, перерасчет с 10% на 18%',
    },
    {
      id: 2,
      region: 'Ташкент',
      hotel_name: 'UZBEKISTAN Airways',
      tip: 'Санаторий',
      pay_number: 8695400345,
      start_period: '2025-06-30',
      end_period: '2025-06-30',
      note: 'с 01-06-2018 был изменен сертификат, а именно звезды-4, 18%, перерасчет с 10% на 18%',
    },
  ],
}
const BillingRecalculateTable = ({
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
      title: 'billing.hotel',
      dataIndex: 'hotel_name',
      sorter: true,
    },
    {
      title: 'fields.date.label',
      dataIndex: 'tip',
      sorter: true,
    },
    {
      title: 'billing.contract',
      dataIndex: 'pay_number',
      sorter: true,
    },
    {
      title: 'billing.start-period',
      dataIndex: 'start_period',
      sorter: true,
    },
    {
      title: 'billing.end-period',
      dataIndex: 'end_period',
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
      hotel_name: item.hotel_name,
      tip: item.tip,
      pay_number: item.pay_number,
      start_period: item.start_period,
      end_period: item.end_period,
      note: item.note,
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

export default BillingRecalculateTable
