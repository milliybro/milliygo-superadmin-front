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
      sorter: false,
      render: (_, record: any) => (
        <div className="flex items-center gap-[10px]">
          <Image
            src={record?.image}
            height={36}
            width={36}
            className="w-9 h-9 object-cover rounded-[8px]"
          />
          <span className="text-[14px] text-primary-dark font-medium">{_}</span>
        </div>
      ),
    },
    {
      title: 'guides.service-location',
      dataIndex: 'placements',
      sorter: false,
      render: (placements: string[]) => (
        <div className="flex items-center gap-[10px] flex-wrap">
          {placements && placements.length > 0 ? (
            placements.map((place, idx) => (
              <div
                key={idx}
                className="bg-[#6B728029] text-[#333] text-sm px-3 py-1 rounded-[8px]"
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
            sorter: false,
            render: (_: any) => (
              <span className="flex items-center px-[10px] py-[6px] gap-[10px] bg-[#FEF9C3] w-fit rounded-[6px]">
                {_ ? _ : '-'}
              </span>
            ),
          },
        ]
      : []),

    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: false,
      render: status => <GuidesStatusTag active={status} type={type} />,
    },
    {
      width: 1,
      title: 'common.action',
      dataIndex: 'id',
      render: val => <GuidesTableActionButton  id={val} type={type} />,
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

  // const transformedTenantsData =
  //   guidesData?.results.map((item: IHotelsTable) => ({
  //     key: item.id,
  //     id: item.id,
  //     schema_name: item.schema_name,
  //     username: item.username,
  //     is_active: item.is_active,
  //     password: item.password,
  //     domain: item.domain,
  //     start_date: item.start_date,
  //     end_date: item.end_date,
  //   })) || []

  const transformedTenantsData = [
    {
      key: 1,
      id: 1,
      fio: 'Alexandra Penova',
      placements: ['Toshkent', 'Samarqand'],
      rating: 2.5,
      status: 'active',
      image:
        'https://globalbar.se/wp-content/uploads/2023/07/Tourist-shutterstock.jpg',
    },
    {
      key: 1,
      id: 1,
      fio: 'Alexandra Penova',
      placements: ['Toshkent', 'Samarqand'],
      rating: 2.5,
      status: 'active',
      image:
        'https://globalbar.se/wp-content/uploads/2023/07/Tourist-shutterstock.jpg',
    },
  ]

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IGuidesTable>
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

export default GuidesTable
