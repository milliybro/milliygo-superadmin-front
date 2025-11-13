import type { PaginationProps, TableColumnsType, TableProps } from 'antd'
import { Button, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import UsersNotFound from '@/features/users/components/users-not-found'

import UserIcon from '@/components/icons/user'
import BlurImage from '@/components/ui/blur-image'
import { truthyObject } from '@/helpers/truthy-object'
import queryString from 'query-string'
import { memo, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import GuidesStatusTag from './guides-status-tag'
import { useGuideContext } from '../hooks/use-guide-context'
import EyeIcon from '@/components/icons/eye'
import GuidePendingActionButton from './guide-pending-action-button'

interface GuidesTableProps {
  onViewGuide: (guideId: number) => void
  onRejectGuide: (guideId: number) => void
}

const GuidesTable = memo(({ onViewGuide, onRejectGuide }: GuidesTableProps) => {
  const { t } = useTranslation()
  const { search, pathname } = useLocation()
  const query = useMemo(() => queryString.parse(search), [search])
  const navigate = useNavigate()

  const currentPage = +(query?.page || 1)
  const tab = query?.guide_status as 'accepted' | 'in_progress' | 'rejected'

  const {
    guides: { data: guidesData, isLoading },
  } = useGuideContext()

  const columns: TableColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: false,
      render: (_text, _record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'hotel-guest.lfm',
      dataIndex: 'full_name',
      sorter: true,
      render: (_, record: any) => (
        <div className="flex items-center gap-[10px]">
          <BlurImage
            src={record?.image}
            height={36}
            width={36}
            className="h-9 w-9 rounded-lg border object-cover"
            fallbackEl={
              <div className="flex size-9 items-center justify-center rounded-lg border bg-secondary/10">
                <UserIcon className="text-2xl text-secondary" />
              </div>
            }
          />
          <span className="text-sm font-medium text-primary-dark">{_}</span>
        </div>
      ),
    },
    {
      title: 'guides.service-location',
      dataIndex: 'regions',
      sorter: true,
      render: (placements: (string | null)[]) => (
        <div className="flex flex-wrap items-center gap-[10px]">
          {placements && placements.length > 0 ? (
            placements.map(
              (place, idx) =>
                place && (
                  <div
                    key={idx}
                    className="rounded-[8px] bg-[#6B728029] px-3 py-1 text-sm text-[#333]"
                  >
                    {place}
                  </div>
                ),
            )
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    ...(tab !== 'in_progress'
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
      render: () => <GuidesStatusTag type={tab} />,
    },
    ...(tab === 'in_progress'
      ? [
          {
            width: 1,
            title: 'common.action',
            dataIndex: 'user_id',
            render: (id: number) => (
              <GuidePendingActionButton guideId={id} onReject={onRejectGuide} />
            ),
          },
        ]
      : []),
    {
      width: 1,
      title: 'common.action',
      dataIndex: 'user_id',
      render: val => (
        <Button
          className="inline-flex items-center gap-2 font-medium text-primary"
          type="text"
          onClick={() => onViewGuide(val)}
        >
          <EyeIcon className="text-xl" />
          {t('common.more-details')}
        </Button>
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

  const handleTableChange: TableProps['onChange'] = (pagination, _, sorter) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort?.field
      : null

    const newPage = pagination?.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...query,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <Table
      columns={columns?.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      loading={isLoading}
      dataSource={guidesData?.results?.map(item => ({
        ...item,
        key: item.user_id,
      }))}
      pagination={{
        current: currentPage,
        pageSize: 10,
        total: guidesData?.count || 0,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        itemRender: itemRender,
      }}
      onChange={handleTableChange}
      className="side-borderless-table responsive-table h-full w-full"
      locale={{
        emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
})

export default GuidesTable
