import type { PaginationProps, TableColumnsType } from 'antd'
import { Image, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import UsersNotFound from '@/features/users/components/users-not-found'

import GuidesTableActionButton from '../components/guides-table-action-button'
import type { IGuidesTable } from '../types'
import GuidesStatusTag from '../components/guides-status-tag'
import GuideViewModal from '../components/guide-view-modal'

const GuidesTable = ({
  guidesData,
  currentPage,
  setCurrentPage,
  isLoading,
  pageSize,
  type,
  refetch,
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
      title: 'hotel-guest.lfm',
      dataIndex: 'fio',
      sorter: true,
      render: (_, record: any) => (
        <div className="flex items-center gap-[10px]">
          <Image
            src={record?.image}
            height={36}
            width={36}
            className="h-9 w-9 rounded-[8px] object-cover"
          />
          <span className="text-sm font-medium text-primary-dark">{_}</span>
        </div>
      ),
    },
    {
      title: 'guides.service-location',
      dataIndex: 'placements',
      sorter: true,
      render: (placements: string[]) => (
        <div className="flex flex-wrap items-center gap-[10px]">
          {placements && placements.length > 0 ? (
            placements.map((place, idx) => (
              <div
                key={idx}
                className="rounded-[8px] bg-[#6B728029] px-3 py-1 text-sm text-[#333]"
              >
                {place}
              </div>
            ))
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },

    ...(type !== 'request'
      ? [
          {
            title: 'fields.rating.label',
            dataIndex: 'rating',
            sorter: true,
            render: (rating: any) => (
              <span className="flex w-fit items-center gap-[10px] rounded-[6px] bg-[#FEF9C3] px-[10px] py-[6px]">
                {rating !== null && rating !== undefined ? rating : '-'}
              </span>
            ),
          },
        ]
      : []),

    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: true,
      render: status => <GuidesStatusTag active={status} type={type} />,
    },
    {
      width: 1,
      title: 'common.action',
      dataIndex: 'id',
      render: val => (
        <GuidesTableActionButton id={val} type={type} refetch={refetch} />
      ),
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
    guidesData?.results.map((item: any) => ({
      key: item.id,
      id: item.user_id,
      fio: item.full_name,
      placements: item.regions,
      rating: item.rating,
      status: item.status,
      image: item.avatar,
    })) || []

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] bg-white">
      <Table<IGuidesTable>
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

export default GuidesTable
