import { Table, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'

import HotelIcon from '@/components/icons/hotel'
import BlurImage from '@/components/ui/blur-image'
import CompactViewButton from '@/components/ui/compact-view-button'
import UsersNotFound from '@/features/users/components/users-not-found'
import formatPhoneNumber from '@/helpers/format-phone-number'
import { truthyObject } from '@/helpers/truthy-object'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { EyeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import type { TableColumnsType, TableProps } from 'antd'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router'
import { getAllPlacements } from '../api'
import type { IPlacement } from '../types'
import PlacementsFilters from './placements-filter'

const PlacementsTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queries = useParsedQuery()
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
      dataIndex: 'name',
      sorter: true,
      width: 0,
      render: (_, val) => (
        <div
          className="flex w-max max-w-[247px] items-center gap-[10px] 2xl:max-w-[440px]"
          title={val?.name}
        >
          <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-border bg-secondary-light">
            <BlurImage
              src={val?.resized_image_url || val?.image_url || ''}
              fallbackEl={
                <HotelIcon fontSize={28} className="text-[#d9d9d9]" />
              }
              alt={val?.name}
              width={48}
              height={48}
              className="rounded-[8px] object-cover"
              preview={{
                src: val?.image_url,
                mask: (
                  <div className="flex items-center justify-center">
                    <EyeOutlined className="text-lg text-white" />
                  </div>
                ),
                imageRender: originalNode => (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {originalNode}
                  </div>
                ),
                rootClassName: 'custom-image-preview',
              }}
            />
          </div>
          <span className="truncate font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: t('hotels-page.region'),
      dataIndex: 'region',
      sorter: true,
      render: val => (
        <Tooltip
          title={val}
          key={val}
          className="line-clamp-1 max-w-[185px] font-medium"
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
      title: t('billing.district'),
      dataIndex: 'district',
      sorter: true,
      render: val => (
        <Tooltip
          title={val}
          key={val}
          className="line-clamp-1 max-w-[185px] font-medium"
          overlayInnerStyle={{
            fontSize: '0.875rem',
          }}
          placement="topLeft"
        >
          {val}
        </Tooltip>
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
      dataIndex: 'avg_rating',
      sorter: true,
      width: 0,
      render: val => (
        <div className="max-w-[72px] 2xl:max-w-max">
          <RatingTag value={val} />
        </div>
      ),
    },
    {
      title: t('fields.phone.label'),
      dataIndex: 'phone',
      sorter: true,
      render: value => (
        <div className="font-medium">{formatPhoneNumber(value)}</div>
      ),
    },
    {
      title: t('fields.status.label'),
      dataIndex: 'status',
      sorter: true,
      render: status => (
        <div className="2xl:mr-0">
          <StatusTag active={status} />
        </div>
      ),
    },
    {
      width: 1,
      dataIndex: 'id',
      title: isCompact ? '' : t('common.action'),
      render: id => (
        <CompactViewButton
          onClick={() =>
            navigate(
              pathname +
                '/' +
                id +
                '?' +
                (id !== undefined ? 'tenant_id=' + id + '&' : '') +
                (queries?.type__key !== undefined
                  ? 'type=' + queries?.type__key
                  : ''),
            )
          }
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
    <div className="px-4 pb-4">
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
        className="side-borderless-table responsive-table"
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
