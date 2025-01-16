import { Table } from 'antd'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import type { IClientItemTable, IClientReview } from '../types'
import type { TableColumnsType, TableProps } from 'antd'

const columns: TableColumnsType<IClientItemTable> = [
  {
    title: 'common.hotel',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    width: 250,
    render: value => (
      <Link to="/" className="underline text-primary">
        {value}
      </Link>
    ),
  },
  {
    width: 220,
    title: 'common.period',
    dataIndex: 'period',
    sorter: {
      compare: (a, b) => a.period.localeCompare(b.period),
      multiple: 2,
    },
  },
  {
    title: 'common.comments',
    dataIndex: 'review',
    width: 700,
  },
]

const onChange: TableProps<IClientItemTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const ClientsItemTable = ({ reviews }: { reviews: any }) => {
  const { t } = useTranslation()
  const transformHotelDetailsToTableData = (data: any): IClientItemTable[] => {
    return data.map((item:any, index: any) => {
      const { id } = item
      return {
        key: index,
        id: id,
        name: item.name,
        review: item?.review || 0,
        status: item?.status || 'defaultStatus',
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
      onChange={onChange}
      pagination={false}
      // pagination={{
      //   pageSize: 10,
      //   total: 100,
      //   hideOnSinglePage: true,
      //   showSizeChanger: false,
      //   position: ['bottomCenter'],

      //   itemRender: itemRender,
      // }}
    />
  )
}

export default ClientsItemTable
