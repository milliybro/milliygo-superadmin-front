import { Table } from 'antd'
import { Link, useParams, useSearchParams } from 'react-router'
// import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StarIcon from '@/components/icons/star'

import type { TableColumnsType, TableProps } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getHotelDetailReview } from '../api'
import { IHotelsItemReview } from '../types'
import dayjs from 'dayjs'
import UsersNotFound from '@/features/users/components/users-not-found'

interface IHotelDetailReview {
  id: number
  user?: {
    first_name: string
    last_name: string
  }
  review: string
  rating: number
}

const columns: TableColumnsType<IHotelsItemReview> = [
  {
    title: 'common.hotel',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    width: 250,
    render: (_, record) => (
      <Link to={`/hotels/`} className="underline text-primary">
        {record.name}
      </Link>
    ),
  },
  {
    width: 220,
    title: 'fields.rating.label',
    dataIndex: 'rating',
    sorter: {
      compare: (a, b) => a.rating - b.rating,
      multiple: 2,
    },
    render: (_, record) => (
      <div className="flex items-center gap-1 text-[20px]">
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
    sorter: {
      compare: (a, b) => a.date.localeCompare(b.date),
      multiple: 2,
    },
  },
  {
    title: 'common.comments',
    dataIndex: 'review',
    sorter: {
      compare: (a, b) => a.review.localeCompare(b.review),
      multiple: 1,
    },
    width: 700,
    render: (_, record) => (
      <span className="text-sm text-gray-700">{record.review}</span>
    ),
  },
]

const onChange: TableProps<IHotelsItemReview>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsItemReviews = ({ data }: { data: any }) => {
  const { t } = useTranslation()

  // const itemRender: PaginationProps['itemRender'] = (
  //   n,
  //   type,
  //   originalElement,
  // ) => {
  //   if (type === 'prev') {
  //     return (
  //       <span
  //         className={twMerge(
  //           'px-[16px] select-none duration-200 py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
  //           n === 0 ? 'opacity-0 pointer-events-none' : '',
  //         )}
  //       >
  //         {t('common.prev')}
  //       </span>
  //     )
  //   }
  //   if (type === 'next') {
  //     return (
  //       <span
  //         className={twMerge(
  //           'px-[16px] select-none py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
  //           n === 10 ? 'opacity-0 pointer-events-none' : '',
  //         )}
  //       >
  //         {t('common.next')}
  //       </span>
  //     )
  //   }

  //   return originalElement
  // }

  const [searchParams] = useSearchParams()
  const { id } = useParams<{ id: string }>()

  const type = searchParams.get('type') || '1'

  console.log(data, type, id)

  const { data: HotelDetailReview } = useQuery({
    queryKey: ['hotels-detail-review', data, id],
    queryFn: async () => {
      // if (!data || !id) throw new Error('ID is required')
      const res = await getHotelDetailReview(
        {},
        Number(type === 'site' ? id : data),
      )
      return res
    },
    enabled: !!(data || id),
  })

  const transformHotelDetailsToTableData = (
    data: IHotelDetailReview[],
  ): IHotelsItemReview[] => {
    return data.map((item, index: any) => {
      const { id, booking, review, rating, placement }: any = item
      return {
        key: index,
        id: id,
        name: placement !== null ? placement : 'Anonymous',
        date: `${dayjs(booking?.start_date).format('DD MMM, YYYY')} - ${dayjs(booking?.end_date).format('DD MMM, YYYY')}`,
        review: review || 'No review provided',
        rating: rating || 0,
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
      onChange={onChange}
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

export default HotelsItemReviews
