import { Table } from 'antd'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import type { IClientItemTable } from '../types'
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
    dataIndex: 'comment',
    width: 700,
  },
]

const data: IClientItemTable[] = [
  {
    key: '1',
    id: 1,
    name: 'Oriente Palace Apartments',
    period: '2024-12-01 - 2024-12-07',
    comment: 'Приезжали с семьей на неделю, и остались в восторге!',
  },
  {
    key: '2',
    id: 2,
    name: 'City Center Hotel',
    period: '2024-12-08 - 2024-12-14',
    comment: 'Номера просторные, чистые, с красивым видом на город.',
  },
  {
    key: '3',
    id: 3,
    name: 'Grand View Resort',
    period: '2024-12-15 - 2024-12-21',
    comment: 'Персонал вежливый и всегда готов помочь.',
  },
  {
    key: '4',
    id: 4,
    name: 'Sea Breeze Inn',
    period: '2024-12-22 - 2024-12-28',
    comment:
      'Завтраки были разнообразные и вкусные — особенно понравилась выпечка.',
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

const ClientsItemTable = () => {
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

  return (
    <Table<IClientItemTable>
      columns={columns.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={data}
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
