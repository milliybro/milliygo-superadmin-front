import { Image, Table, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import HotelIcon from '@/components/icons/hotel'
import UsersNotFound from '@/features/users/components/users-not-found'
import { truthyObject } from '@/helpers/truthy-object'
import { useQuery } from '@tanstack/react-query'
import type { TableColumnsType, TableProps } from 'antd'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getAllPlacements } from '../api'
import type { IPlacement } from '../types'
import PlacementsFilters from './placements-filter'
import formatPhoneNumber from '@/helpers/format-phone-number'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { twMerge } from 'tailwind-merge'

const PlacementsTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const queries = useMemo(() => queryString.parse(search), [search])
  const isCompact = useCompactScreen()

  const { data: placementsData, isFetching } = useQuery({
    queryKey: ['placements-data', queries],
    queryFn: () =>
      getAllPlacements(truthyObject({ ...queries, page_size: 10 })),
    placeholderData: data => data,
  })

  const columns: TableColumnsType<IPlacement> = [
    {
      title: 'ID',
      dataIndex: 'idx',
      className: 'text-center',
      sorter: false,
      render: i => (+(queries?.page || 1) - 1) * 10 + i + 1,
      width: 0,
    },
    {
      title: t('fields.hotel-name.label'),
      dataIndex: 'placement_name',
      sorter: true,
      width: 0,
      render: (_, val) => (
        <div
          className={twMerge(
            'flex w-max items-center gap-[10px]',
            isCompact ? 'max-w-[264px]' : 'max-w-[440px]',
          )}
          title={val?.name}
        >
          <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-border bg-secondary-light">
            {val?.image ? (
              <Image
                src={val?.image}
                alt={val?.name}
                width={48}
                height={48}
                className="rounded-[8px] object-cover"
              />
            ) : (
              <HotelIcon fontSize={28} className="text-secondary/30" />
            )}
          </div>
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: t('fields.address.label'),
      width: 276,
      dataIndex: 'address',
      sorter: true,
      render: val => (
        <Tooltip
          title={val}
          key={val}
          className="line-clamp-1 text-sm font-medium"
          overlayInnerStyle={{
            fontSize: '0.875rem',
          }}
          placement="topLeft"
        >
          {val}
        </Tooltip>
      ),
    },
    {
      title: t('fields.location.label'),
      width: 276,
      dataIndex: 'address',
      sorter: true,
      render: val => (
        <div>
          {val ? (
            <Tooltip
              color="white"
              overlayInnerStyle={{
                color: '#3276FF',
                textAlign: 'center',
                textDecoration: 'underline',
                fontSize: '0.875rem',
              }}
              placement="topLeft"
              title={val}
              key={val}
            >
              <a
                style={{ textDecoration: 'underline' }}
                className="line-clamp-2 text-[#3276FF]"
              >
                {val}
              </a>
            </Tooltip>
          ) : (
            <div className="text-center">-</div>
          )}
        </div>
      ),
    },
    // {
    //   title: 'fields.price.label',
    //   dataIndex: 'price',
    //   sorter: {
    //     compare: (a, b) => a.price - b.price,
    //     multiple: 1,
    //   },
    //   render: val => (
    //     <div>
    //       {val ? formatAmount(val) : '0'} {t('common.sum')}
    //     </div>
    //   ),
    // },
    {
      title: t('fields.rating.label'),
      dataIndex: 'rating',
      sorter: true,
      width: 0,
      render: val => <RatingTag value={val} />,
    },
    {
      title: t('fields.phone.label'),
      dataIndex: 'phone',
      sorter: true,
      render: value => (
        <div className="text-sm font-medium">{formatPhoneNumber(value)}</div>
      ),
    },
    {
      title: t('fields.status.label'),
      dataIndex: 'status',
      sorter: true,
      render: status => <StatusTag active={status} />,
    },
    {
      width: 1,
      title: isCompact ? '' : t('common.action'),
      render: (id, val: any) => (
        <HotelsTableActionButton
          key={id}
          id={val.id}
          tenant_id={val.tenant ?? undefined}
          type={val?.type}
        />
      ),
    },
  ]

  const handleTableChange: TableProps<IPlacement>['onChange'] = (
    pagination,
    _,
    sorter,
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort.field
      : null

    const newPage = pagination.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <div className="p-4">
      <PlacementsFilters />
      <Table<IPlacement>
        columns={columns}
        dataSource={
          placementsData?.results?.map((item, i) => ({
            ...item,
            idx: i,
            key: item?.key + i,
          })) || []
        }
        className="side-borderless-table responsive-table pb-5"
        scroll={{ x: 'max-content' }}
        loading={isFetching}
        pagination={{
          current: +(queries?.page || 1),
          pageSize: 10,
          total: placementsData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default PlacementsTable
