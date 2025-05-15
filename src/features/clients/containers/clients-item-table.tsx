import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import UsersNotFound from '@/features/users/components/users-not-found'
import type { TableColumnsType } from 'antd'
import formatDate from '../components/format-date'
import type { IClientItemTable } from '../types'

const columns: TableColumnsType<IClientItemTable> = [
  {
    title: 'common.hotel',
    dataIndex: 'placement',
    sorter: {
      compare: (a, b) => a.placement.localeCompare(b.placement),
      multiple: 3,
    },
    render: value => (
      <Link to="/" className="underline text-primary">
        {value}
      </Link>
    ),
  },
  {
    title: 'common.period',
    dataIndex: 'period',
    sorter: {
      compare: (a, b) => a.period.localeCompare(b.period),
      multiple: 2,
    },
    render: value => {
      return (
        <div className="">
          {formatDate(value?.start_date)} - {formatDate(value?.end_date)}
        </div>
      )
    },
  },
  {
    title: 'common.comments',
    dataIndex: 'review',
  },
]

const ClientsItemTable = ({ reviews }: { reviews: any }) => {
  const { t } = useTranslation()
  const transformHotelDetailsToTableData = (data: any): IClientItemTable[] => {
    return data.map((item: any, index: any) => {
      const { id } = item
      return {
        key: index,
        id: id,
        placement: item.placement,
        review: item?.review || 0,
        status: item?.status || 'defaultStatus',
        period: item?.booking,
      }
    })
  }

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

  return (
    <Table<IClientItemTable>
      columns={columns.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={
        reviews?.results
          ? transformHotelDetailsToTableData(reviews.results)
          : []
      }
      pagination={false}
      // pagination={{
      //   pageSize: 10,
      //   total: 100,
      //   hideOnSinglePage: true,
      //   showSizeChanger: false,
      //   position: ['bottomCenter'],

      //   itemRender: itemRender,
      // }}
      locale={{
        emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
}

export default ClientsItemTable
