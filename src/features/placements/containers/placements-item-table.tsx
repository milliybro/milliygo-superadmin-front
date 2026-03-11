import { Table } from 'antd'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import StarIcon from '@/components/icons/star'

import UsersNotFound from '@/features/users/components/users-not-found'
import { useQuery } from '@tanstack/react-query'
import type { TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { getPlacementDetailReview } from '../api'
import { IHotelsItemReview } from '../types'

interface IHotelDetailReview {
  id: number
  start_date: string
  end_date: string
  first_name?: string
  last_name?: string
  review: string
  rating: number
  owner_response: string
  fullname: string
}

const columns: TableColumnsType<IHotelsItemReview> = [
  {
    title: 'placements.guest-name',
    dataIndex: 'fullname',
    sorter: true,
    width: 250,
    render: _ => <div className="text-primary underline">{_}</div>,
  },
  {
    width: 220,
    title: 'fields.rating.label',
    dataIndex: 'rating',
    sorter: true,
    render: (_, record) => (
      <div className="flex items-center gap-1 text-xl">
        {Array.from({ length: record.rating }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
    ),
  },
  {
    width: 220,
    title: 'common.period',
    dataIndex: 'date',
    sorter: true,
  },
  {
    title: 'placements.guest-comment',
    dataIndex: 'review',
    sorter: true,
    width: 700,
    render: (_, record) => (
      <span className="text-sm text-gray-700">{record.review}</span>
    ),
  },
  {
    title: 'placements.owner-response',
    dataIndex: 'owner_response',
    sorter: true,
    width: 700,
    render: (_, record) => (
      <span className="text-sm text-gray-700">{record.owner_response}</span>
    ),
  },
]

const PlacementsItemReviews = ({ data }: { data: any }) => {
  const { t } = useTranslation()

  const { id } = useParams<{ id: string }>()

  const { data: HotelDetailReview } = useQuery({
    queryKey: ['hotels-detail-review', data, id],
    queryFn: async () => {
      const res = await getPlacementDetailReview({}, data?.id)
      return res
    },
    enabled: !!(data || id),
  })

  const transformHotelDetailsToTableData = (
    data: IHotelDetailReview[],
  ): IHotelsItemReview[] => {
    return data.map((item, index: any) => {
      const { id, review, rating, placement }: any = item
      return {
        key: index,
        id: id,
        name: placement !== null ? placement : 'Anonymous',
        date: `${dayjs(item?.start_date).format('DD MMM, YYYY')} - ${dayjs(item?.end_date).format('DD MMM, YYYY')}`,
        review: review || 'No review provided',
        rating: rating || 0,
        owner_response: item.owner_response || '',
        fullname: item?.first_name + ' ' + item?.last_name,
        start_date: item.start_date,
        end_date: item.end_date,
      }
    })
  }

  return (
    <Table<IHotelsItemReview>
      columns={columns.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={
        HotelDetailReview?.results
          ? transformHotelDetailsToTableData(HotelDetailReview.results)
          : []
      }
      pagination={false}
      locale={{
        emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
}

export default PlacementsItemReviews
