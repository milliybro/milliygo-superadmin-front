import type { PaginationProps, TableColumnsType } from 'antd'
import { Button, Table, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import UsersNotFound from '@/features/users/components/users-not-found'

import UserIcon from '@/components/icons/user'
import BlurImage from '@/components/ui/blur-image'
import CompactViewButton from '@/components/ui/compact-view-button'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useTableChangeHandler } from '@/hooks/use-table-change-handler'
import { memo, useEffect } from 'react'
import { useGuideContext } from '../hooks/use-guide-context'
import GuidePendingActionButton from './guide-pending-action-button'
import { useSearchParams } from 'react-router'
import GuidesFilters from './guides-select'
import CopyIcon from '@/components/icons/copy-icon'
import ArrowDownIcon from '@/components/icons/arrow-down'
import LanguagesCell from './languages-cell'
import StarIcon from '@/components/icons/star'

interface GuidesTableProps {
  onViewGuide: (guideId: number) => void
  onRejectGuide: (guideId: number) => void
}

const GuidesTable = memo(({ onViewGuide, onRejectGuide }: GuidesTableProps) => {
  const { t } = useTranslation()
  const query = useParsedQuery()
  const tableChangeHandler = useTableChangeHandler()

  const currentPage = +(query?.page || 1)
  const tab =
    (query?.guide_status as
      | 'accepted'
      | 'in_progress'
      | 'rejected'
      | undefined) ?? 'accepted'

  const isCompact = useCompactScreen()

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const guideStatus = searchParams.get('guide_status')

    if (!guideStatus) {
      const params = new URLSearchParams(searchParams)
      params.set('guide_status', 'accepted')

      setSearchParams(params, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const {
    guides: { data: guidesData, isLoading },
  } = useGuideContext()

  const columns: TableColumnsType = [
    {
      title: '№',
      dataIndex: 'id',
      className: 'text-center',
      sorter: false,
      render: (_text, _record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'hotel-guest.lfm',
      dataIndex: 'full_name',
      width: 309,
      sorter: true,
      render: (_, record: any) => (
        <div className="flex items-center gap-[10px]">
          <div className="h-9 w-9 flex-shrink-0">
            <BlurImage
              src={record?.avatar}
              height={36}
              width={36}
              className="!h-9 !w-9 rounded-lg border object-cover"
              fallbackEl={
                <div className="flex size-9 items-center justify-center rounded-lg border bg-secondary/10">
                  <UserIcon className="text-2xl text-secondary" />
                </div>
              }
            />
          </div>
          <span className="text-sm font-medium text-primary-dark">{_}</span>
        </div>
      ),
    },
    {
      title: t('guides.number-certificate'),
      dataIndex: 'sertificate_number',
      className: 'text-center',
      sorter: false,
      render: (value: any) => {
        const text = value ? String(value) : ''

        return (
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm">{text || '-'}</div>

            <Tooltip title={t('guides.copy')} placement="top">
              <Button
                type="text"
                size="small"
                icon={<CopyIcon />}
                disabled={!text}
                onClick={e => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(text)
                }}
              />
            </Tooltip>
          </div>
        )
      },
    },
    {
      title: t('guides.certificate-status'),
      dataIndex: 'guide_status',
      className: 'text-center',
      sorter: false,
      render: (status: string) => {
        const map: Record<string, { text: string; className: string }> = {
          accepted: {
            text: t('guides.status.accepted'),
            className: 'bg-[#CCFBF1] text-[#115E59]',
          },
          expired: {
            text: t('guides.status.expired'),
            className: 'bg-[#F8D7DA] text-[#C0392B]',
          },
          suspended: {
            text: t('guides.status.suspended'),
            className: 'bg-[#FFF3CD] text-[#B58105]',
          },
          revoked: {
            text: t('guides.status.revoked'),
            className: 'bg-[#E5E7EB] text-[#6B7280]',
          },
        }

        const item = map[status] || {
          text: '-',
          className: 'bg-gray-100 text-gray-500',
        }

        return (
          <div className="flex justify-center">
            <span
              className={`rounded-[10px] px-3 py-1 text-sm font-medium ${item.className}`}
            >
              {item.text}
            </span>
          </div>
        )
      },
    },
    {
      title: t('guides.category-guide'),
      dataIndex: 'category',
      className: 'text-center',
      sorter: false,
      render: (category: string) => {
        const map: Record<string, { text: string; icon: React.ReactNode }> = {
          high: {
            text: 'guides.categories.high',
            icon: (
              <ArrowDownIcon className="rotate-180 text-[20px] text-[#2DBE9D]" />
            ),
          },
          first: {
            text: 'guides.categories.first',
            icon: (
              <div className="flex flex-col gap-[5.5px]">
                <span className="h-[2px] w-4 rounded bg-[#3B82F6]" />
                <span className="h-[2px] w-4 rounded bg-[#3B82F6]" />
              </div>
            ),
          },
          second: {
            text: 'guides.categories.second',
            icon: (
              <div className="flex flex-col gap-[5.5px]">
                <span className="h-[2px] w-4 rounded bg-[#F59E0B]" />
                <span className="h-[2px] w-4 rounded bg-[#F59E0B]" />
              </div>
            ),
          },
          none: {
            text: 'guides.categories.none',
            icon: (
              <div className="flex flex-col gap-[5.5px]">
                <span className="h-[2px] w-4 rounded bg-secondary" />
                <span className="h-[2px] w-4 rounded bg-secondary" />
              </div>
            ),
          },
        }

        const item = map[category] || {
          text: category || '-',
          icon: null,
        }

        return (
          <div className="flex items-center justify-center gap-1">
            {item.icon}
            <span className="text-sm font-medium text-primary-dark">
              {t(item.text)}
            </span>
          </div>
        )
      },
    },
    {
      title: t('guides.lang'),
      dataIndex: 'languages',
      sorter: true,
      render: (languages: (string | null)[]) => (
        <LanguagesCell languages={languages} />
      ),
    },
    {
      title: t('guides.main-region'),
      width: 200,
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
              <span className="flex items-center gap-[5px]">
                <StarIcon className="-mt-1 text-[20px] text-[#FFC107]" />
                {rating !== null && rating !== undefined ? rating : '-'}
              </span>
            ),
          },
        ]
      : []),
    // {
    //   title: 'fields.status.label',
    //   dataIndex: 'status',
    //   sorter: true,
    //   render: () => <GuidesStatusTag type={tab} />,
    // },
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
      title: isCompact ? '' : 'common.action',
      dataIndex: 'user_id',
      render: val => <CompactViewButton onClick={() => onViewGuide(val)} />,
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

  return (
    <div>
      <GuidesFilters />
      <Table
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={guidesData?.results?.map(item => ({
          ...item,
          category: 'none',
          key: item.user_id,
          languages: ['Русский', 'Узбекский'],
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
        onChange={tableChangeHandler}
        className="side-borderless-table responsive-table h-full w-full"
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
      />
    </div>
  )
})

export default GuidesTable
